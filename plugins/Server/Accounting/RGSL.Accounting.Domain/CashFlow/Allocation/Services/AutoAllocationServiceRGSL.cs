using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.Framework.Core.Transactions;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Responses;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Requests;
using Adacta.AdInsure.RGSL.Common.Domain;
using Spring.Transaction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services
{
    public class AutoAllocationServiceRGSL : IAutoAllocationServiceRGSL
    {
        private readonly IAllocationServiceRGSL _allocationServiceRGSL;
        private readonly IBankStatementRepositoryRGSL _bankStatementRepositoryRGSL;
        private readonly IPaymentReferencesService _paymentReferencesService;

        public AutoAllocationServiceRGSL(
            IAllocationServiceRGSL allocationServiceRGSL,
            IBankStatementRepositoryRGSL bankStatementRepositoryRGSL,
            IPaymentReferencesService paymentReferencesService)
        {
            _allocationServiceRGSL = allocationServiceRGSL;
            _bankStatementRepositoryRGSL = bankStatementRepositoryRGSL;
            _paymentReferencesService = paymentReferencesService;
        }

        [Transaction(TransactionPropagation.Never)]
        public async Task<AutoAllocateResponse> AutoAllocate(AutoAllocateRequest request)
        {
            AutoAllocateResponse response = new AutoAllocateResponse();
            var bankStatementItems = new List<BankStatementItemRGSL>(request.BankStatementItemIds.Count);

            foreach (var items in ArrayHelper.Chunks(request.BankStatementItemIds))
            {
                var chunkBankStatementItems = _bankStatementRepositoryRGSL.GetBankStatementItems(new GetBankStatementItemRequest { BankStatementItemIds = items });
                bankStatementItems.AddRange(chunkBankStatementItems);
            }

            bankStatementItems = bankStatementItems
                .Where(_ => _.OpenAmount != 0)
                .OrderBy(_ => _.TransactionDate)
                .ToList();

            foreach (var bsi in bankStatementItems)
            {
                var paymentReferences = _paymentReferencesService.GetPaymentReferences(bsi.BankStatementItemId.Value);

                foreach (PaymentReference payReference in paymentReferences)
                {
                    var res = await AllocateToReferenceNo(bsi, payReference.ReferenceNo);
                    response.AllocationResponses.Add(res);
                }
            }

            return response;
        }

        private async Task<AutoAllocationItemResponse> AllocateToReferenceNo(BankStatementItemRGSL bsi, string referenceNo)
        {
            var res = new AutoAllocationItemResponse();
            var allocateRequest = new AllocateRequest()
            {
                BankStatementItemId = bsi.BankStatementItemId.Value,
                PayAmount = bsi.OpenAmount,
                ReferenceNo = referenceNo,
                ToleranceType = MapBSIToleranceTypeToAllocationToleranceType(bsi.ToleranceType),
                AllowAllocationAmountDeviation = true,
            };

            //Store potential error messages on allocation
            var paymentRef = new PaymentReference()
            {
                BankStatementItemId = allocateRequest.BankStatementItemId,
                ReferenceNo = allocateRequest.ReferenceNo,
                LastUpdated = DateTime.Now,
            };

            try
            {
                var allocResponse =  await _allocationServiceRGSL.Allocate(allocateRequest);
                res.AllocatedAmount = allocResponse.AllocatedAmount;
            }
            catch (BusinessException e)
            {
                paymentRef.ErrorCode = e.Code;
                paymentRef.ErrorMessage = "Error: " + e.Message;
            }
            catch (Exception e)
            {
                paymentRef.ErrorMessage = e.ToString();
            }

            res.AllocationError = paymentRef.ErrorMessage;

            _paymentReferencesService.UpdatePaymentReferenceMessage(paymentRef);

            res.ReferenceNo = referenceNo;
            res.BankStatementItemNo = bsi.BankStatementItemNo;
            return res;
        }

        private static AllocationToleranceType MapBSIToleranceTypeToAllocationToleranceType(BankStatementItemToleranceType bsiToleranceType)
        {
            switch (bsiToleranceType)
            {
                case BankStatementItemToleranceType.Standard:
                    return AllocationToleranceType.Standard;
                case BankStatementItemToleranceType.Extended:
                    return AllocationToleranceType.Extended;
                case BankStatementItemToleranceType.ExtendedUnderPayment:
                    return AllocationToleranceType.ExtendedUnderPayment;
                case BankStatementItemToleranceType.ExtendedOverPayment:
                    return AllocationToleranceType.ExtendedOverPayment;
                default:
                    return AllocationToleranceType.None;

            }
        }
    }
}
