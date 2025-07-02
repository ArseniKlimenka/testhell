using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Adacta.AdInsure.Core.Domain.CurrencyConversion.Interfaces;
using Adacta.AdInsure.Framework.Core.Events;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.Framework.Core.Ioc.Ninject;
using Adacta.AdInsure.Framework.Core.Localization;
using Adacta.AdInsure.Framework.Core.Transactions;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Responses;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Responses;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Requests;
using Adacta.AdInsure.RGSL.Common.Domain;
using Azure;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services
{
    public class AllocationServiceRGSL : IAllocationServiceRGSL
    {
        private readonly IAllocationRepositoryRGSL _allocationRepositoryRGSL;
        private readonly IBankStatementServiceRGSL _bankStatementServiceRGSL;
        private readonly IBankStatementRepositoryRGSL _bankStatementRepositoryRGSL;
        private readonly IMatchingServiceRGSL _matchingServiceRGSL;
        private readonly IReferenceNumberServiceRGSL _referenceNumberService;
        private readonly ICurrencyExchangeRateService _currencyExchangeRateService;
        private readonly IAllocationToleranceServiceRGSL _allocationToleranceServiceRGSL;
        private readonly ILocalizationService _localizationService;
		private readonly IDomainEventDispatcher _domainEventDispatcher;

		public AllocationServiceRGSL(
            IAllocationRepositoryRGSL allocationRepositoryRGSL,
            IBankStatementServiceRGSL bankStatementServiceRGSL,
            IBankStatementRepositoryRGSL bankStatementRepositoryRGSL,
            IMatchingServiceRGSL matchingServiceRGSL,
            IReferenceNumberServiceRGSL referenceNumberService,
            ICurrencyExchangeRateService currencyExchangeRateService,
            IAllocationToleranceServiceRGSL allocationToleranceServiceRGSL,
            ILocalizationService localizationService,
			IDomainEventDispatcher domainEventDispatcher)
        {
            _allocationRepositoryRGSL = allocationRepositoryRGSL;
            _bankStatementServiceRGSL = bankStatementServiceRGSL;
            _bankStatementRepositoryRGSL = bankStatementRepositoryRGSL;
            _matchingServiceRGSL = matchingServiceRGSL;
            _referenceNumberService = referenceNumberService;
            _currencyExchangeRateService = currencyExchangeRateService;
            _allocationToleranceServiceRGSL = allocationToleranceServiceRGSL;
            _localizationService = localizationService;
			_domainEventDispatcher = domainEventDispatcher;
		}

        [Transaction]
        public async Task<AllocateResponse> Allocate(AllocateRequest request)
        {
            var referenceNumber = _referenceNumberService.GetRef(request.ReferenceNo);

            if (referenceNumber == null)
            {
                throw new BusinessException(_localizationService.Localize("##ACC_CF_REF_NUMBER_NOT_EXIST", "Reference number {0} does not exist.", request.ReferenceNo));
            }

            Guid businessEventId = Guid.NewGuid();
            var documentTypeId = referenceNumber.DocumentTypeId;
            var documentNo = referenceNumber.DocumentNo;
            _allocationRepositoryRGSL.Lock(request.BankStatementItemId, documentNo);
            var strategy = GetStrategy(documentTypeId);
            var allocationDocument = strategy.GetAllocationDocument(documentNo);

            var bsi = _bankStatementRepositoryRGSL.GetBankStatementItems(new GetBankStatementItemRequest { BankStatementItemId = request.BankStatementItemId }).Single();
            var amountsCollection = GetAllocationAmountSplitByInstallments(request, allocationDocument, bsi);
            var allocations = new List<AllocationRGSL>();

            for (int i = 0; i < allocationDocument.AllocationInstallments.Count; i++)
            {
                var installment = allocationDocument.AllocationInstallments[i];
                var amounts = amountsCollection[i];

                if (amounts.docAmount == 0m & amounts.payAmount == 0m)
                {
                    continue;
                }

                var alloc = new AllocationRGSL();
                alloc.BankStatementItemId = request.BankStatementItemId;
                alloc.DocAmount = amounts.docAmount;
                alloc.PayAmount = amounts.payAmount;
                alloc.ToleranceDocAmount = amounts.toleranceDocAmount;
                alloc.PayCurrencyCode = bsi.CurrencyCode;
                alloc.DocCurrencyCode = installment.CurrencyCode;
                alloc.DocRate = amounts.docRate;
                alloc.PayRate = amounts.payRate;
                alloc.CreateDate = DateTime.UtcNow;
                alloc.DocumentNo = documentNo;
                alloc.DocumentTypeId = documentTypeId;

                ValidateAllocation(bsi, alloc);
                strategy.BeforeAllocation(bsi, alloc, allocationDocument, installment);

                _allocationRepositoryRGSL.CreateAllocation(alloc);
                _bankStatementServiceRGSL.RefreshStatusAndOpenAmount(request.BankStatementItemId);

                strategy.AfterAllocation(bsi, alloc, allocationDocument, installment);

                _matchingServiceRGSL.Match(alloc.AllocationId.Value, businessEventId);

                allocations.Add(alloc);
            }

            await strategy.FinishAllocations(documentNo, allocations, businessEventId);

            var allocationIds = allocations.Select(x => x.AllocationId.Value).ToList();

			_domainEventDispatcher.Raise(new AllocationFinishedEvent(allocationIds, documentTypeId, request.BankStatementItemId, documentNo));

			return new AllocateResponse()
            {
                AllocatedAmount = amountsCollection.Sum(_ => _.payAmount),
                AllocationIds = allocations.Select(_ => _.AllocationId.Value).ToList(),
            };
        }

        [Transaction]
        public async Task<AllocationCancelResponse> Cancel(AllocationCancelRequest request)
        {
            LockAllocation(request.AllocationId);

            var cancelledAlloc = _allocationRepositoryRGSL.GetAllocations(new GetAllocationsRequest { AllocationId = request.AllocationId }).Single();

            var strategy = GetStrategy(cancelledAlloc.DocumentTypeId);
            await strategy.BeforeAllocationCancellation(request, cancelledAlloc);

            _matchingServiceRGSL.Cancel(request.AllocationId, request.BusinessEventId);

            var cancelingAlloc = RevertAllocation(cancelledAlloc);

            _allocationRepositoryRGSL.SetCancelled(cancelledAlloc.AllocationId.Value);
            _allocationRepositoryRGSL.CreateAllocation(cancelingAlloc);
            _bankStatementServiceRGSL.RefreshStatusAndOpenAmount(cancelledAlloc.BankStatementItemId);

            strategy.AfterAllocationCancellation(cancelledAlloc, cancelingAlloc);

            return new AllocationCancelResponse();
        }

        private void LockAllocation(long allocationId)
        {
            var alloc = _allocationRepositoryRGSL.GetAllocations(new GetAllocationsRequest { AllocationId = allocationId }).Single();
            _allocationRepositoryRGSL.Lock(alloc.BankStatementItemId, alloc.DocumentNo);
        }

        private static void ValidateAllocation(BankStatementItemRGSL bsi, AllocationRGSL alloc)
        {
            var allowedStatuses = new List<BankStatementItemStatusRGSL>()
            {
                BankStatementItemStatusRGSL.NotAllocated,
                BankStatementItemStatusRGSL.PartiallyAllocated,
            };

            if (alloc.DocAmount == 0m | alloc.PayAmount == 0m)
            {
                throw new InvalidOperationException("Zero allocation amount");
            }

            if (!allowedStatuses.Contains(bsi.StatusId))
            {
                throw new InvalidOperationException("Payment is in incorrect status");
            }

            if (bsi.OpenAmount < alloc.PayAmount)
            {
                throw new InvalidOperationException("Open amount is not enough");
            }
        }

        private static AllocationRGSL RevertAllocation(AllocationRGSL cancelledAlloc)
        {
            var cancelingAlloc = cancelledAlloc.Clone();

            cancelledAlloc.Cancelled = true;
            cancelingAlloc.CancelledAllocationId = cancelledAlloc.AllocationId.Value;
            cancelingAlloc.PayAmount *= -1m;
            cancelingAlloc.DocAmount *= -1m;
            cancelingAlloc.ToleranceDocAmount *= -1m;
            cancelingAlloc.CreateDate = DateTime.UtcNow;
            return cancelingAlloc;
        }

        private AllocationAmounts[] GetAllocationAmountSplitByInstallments(AllocateRequest request, AllocationDocument allocationDocument, BankStatementItemRGSL bsi)
        {
            var allocationInstallments = allocationDocument.AllocationInstallments;
            var firstUpdaidInstallment = allocationInstallments.First(_ => _.OpenAmount != 0);
            string currencyCode = firstUpdaidInstallment.CurrencyCode;

            GetAmounts(request, currencyCode, bsi, out decimal allocationDocAmount, out decimal allocationPayAmount, out decimal docRate, out decimal payRate);

            var result = new AllocationAmounts[allocationInstallments.Count];

            for (int i = 0; i < allocationInstallments.Count; i++)
            {
                AllocationAmounts amounts = new AllocationAmounts();
                var allocationInstallment = allocationInstallments[i];

                if (allocationInstallment.OpenAmount == 0 || allocationDocAmount == 0)
                {
                    continue;
                }

                if (allocationInstallment.CurrencyCode != currencyCode)
                {
                    throw new BusinessException(_localizationService.Localize("##ACC_CF_DIFFERENT_CURRENCY_FOR_ONE_PAYMENT", "Different currencies for one payment is not allowed"));
                }

                var toleranceResult = _allocationToleranceServiceRGSL.ApplyTolerance(request.ToleranceType, currencyCode, allocationInstallment.Amount, allocationInstallment.OpenAmount, allocationDocAmount);

                allocationDocAmount -= toleranceResult.AllocationAmount;

                amounts.docAmount = toleranceResult.AllocationAmount;
                amounts.payAmount = toleranceResult.AllocationAmount; //if different currency, payAmount is overwritten below
                amounts.docRate = docRate;
                amounts.payRate = payRate;
                amounts.toleranceDocAmount = toleranceResult.Tolerance;

                result[i] = amounts;
            }

            if (allocationDocAmount < 0m || (!request.AllowAllocationAmountDeviation && allocationDocAmount > 0m))
            {
                throw new BusinessException(_localizationService.Localize("##ACC_CF_NOT_DISTRIBUTED_AMOUNT", "Not distributed amount: {0}", allocationDocAmount));
            }

            if (bsi.CurrencyCode != currencyCode)
            {
                if (allocationDocAmount != 0)
                {
                    decimal paidDocAmount = result.Sum(_ => _.docAmount);
                    allocationPayAmount = paidDocAmount * docRate;
                }

                var docAmounts = result.Select(_ => _.docAmount).ToArray();
                var payAmounts = AmountsHelper.GetDistribution(docAmounts, AmountsHelper.RoundCurrency(allocationPayAmount));
                for (int i = 0; i < result.Length; i++)
                {
                    result[i].payAmount = payAmounts[i];
                }
            }

            return result;
        }

        private void GetAmounts(AllocateRequest request, string currencyCode, BankStatementItemRGSL bsi, out decimal allocationDocAmount, out decimal allocationPayAmount, out decimal docRate, out decimal payRate)
        {
            allocationPayAmount = Math.Round(request.PayAmount, 2);

            var convertPayResponse = _currencyExchangeRateService.GetExchangeRate(bsi.CurrencyCode, bsi.PaymentDate);
            payRate = convertPayResponse.Item2.Rate * convertPayResponse.Item2.Unit.Value;

            var convertDocResponse = _currencyExchangeRateService.GetExchangeRate(currencyCode, bsi.PaymentDate);
            docRate = convertDocResponse.Item2.Rate * convertDocResponse.Item2.Unit.Value;

            if (bsi.CurrencyCode != currencyCode)
            {

                if (request.DocAmount.HasValue)
                {
                    allocationDocAmount = Math.Round(request.DocAmount.Value, 2);
                }
                else
                {
                    allocationDocAmount = Math.Round(allocationPayAmount * payRate / docRate, 2);
                }
            }
            else
            {
                allocationDocAmount = allocationPayAmount;
            }
        }

        private static IAllocationStrategyServiceRGSL GetStrategy(DocumentTypeRGSL documentTypeId)
        {
            return NinjectKernel.Instance.Get<IAllocationStrategyServiceRGSL>(documentTypeId.ToString());
        }

        [DebuggerDisplay("docAmount = {docAmount}, payAmount = {payAmount}, toleranceDocAmount = {toleranceDocAmount}")]
        struct AllocationAmounts
        {
            public decimal docAmount;
            public decimal payAmount;
            public decimal docRate;
            public decimal payRate;
            public decimal toleranceDocAmount;
        }
    }
}
