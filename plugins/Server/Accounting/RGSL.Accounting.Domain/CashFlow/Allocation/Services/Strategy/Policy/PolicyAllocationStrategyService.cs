using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Adacta.AdInsure.Core.API.Shared.Services;
using Adacta.AdInsure.Framework.Core.ApplicationContext;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.DataSource.Services;
using Adacta.AdInsure.Framework.Core.Domain.Entities.IntegrationService.Interfaces;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.Framework.Core.Localization;
using Adacta.AdInsure.Framework.Messaging.TransactionalOutbox;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces.Posting;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.Policy;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.Policy.Request;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Interfaces;
using Adacta.AdInsure.RGSL.Common.API.Shared.Services;
using Adacta.AdInsure.RGSL.PAS.API.Internal.Contracts;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Constants;
using Newtonsoft.Json.Linq;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services.Strategy.Policy
{
    public class PolicyAllocationStrategyService : IAllocationStrategyServiceRGSL
    {
        private readonly IPolicyMatchingPostingServiceRGSL _policyMatchingPostingServiceRGSL;
        private readonly IAllocationRepositoryRGSL _allocationRepositoryRGSL;
        private readonly IBankStatementRepositoryRGSL _bankStatementRepositoryRGSL;
        private readonly IBankStatementServiceRGSL _bankStatementServiceRGSL;
        private readonly IPolicyAllocationStrategyRepository _policyAllocationStrategyRepository;
        private readonly IPendingPaymentService _pendingPaymentService;
        private readonly IPayableCommissionService _payableCommissionService;
        private readonly ILocalizationService _localizationService;
        private readonly ITranslationServiceRGSL _translationServiceRGSL;
        private readonly IIntegrationServiceExecutor _integrationServiceExecutor;
        private readonly IDataSourceService _dataSourceService;
        private readonly IContractTransitionService _contractTransitionService;
        private readonly ICurrencyConverterService _currencyConverterService;
        private readonly ITransactionManager _transactionManager;

        public PolicyAllocationStrategyService(
            IPolicyMatchingPostingServiceRGSL policyMatchingPostingServiceRGSL,
            IAllocationRepositoryRGSL allocationRepositoryRGSL,
            IBankStatementRepositoryRGSL bankStatementRepositoryRGSL,
            IBankStatementServiceRGSL bankStatementServiceRGSL,
            IPolicyAllocationStrategyRepository policyAllocationStrategyRepository,
            IPendingPaymentService pendingPaymentService,
            IPayableCommissionService payableCommissionService,
            ILocalizationService localizationService,
            ITranslationServiceRGSL translationServiceRGSL,
            IIntegrationServiceExecutor integrationServiceExecutor,
            IDataSourceService dataSourceService,
            IContractTransitionService contractTransitionService,
            ICurrencyConverterService currencyConverterService,
            ITransactionManager transactionManager)
        {
            _policyMatchingPostingServiceRGSL = policyMatchingPostingServiceRGSL;
            _allocationRepositoryRGSL = allocationRepositoryRGSL;
            _bankStatementRepositoryRGSL = bankStatementRepositoryRGSL;
            _bankStatementServiceRGSL = bankStatementServiceRGSL;
            _policyAllocationStrategyRepository = policyAllocationStrategyRepository;
            _pendingPaymentService = pendingPaymentService;
            _payableCommissionService = payableCommissionService;
            _localizationService = localizationService;
            _translationServiceRGSL = translationServiceRGSL;
            _integrationServiceExecutor = integrationServiceExecutor;
            _dataSourceService = dataSourceService;
            _contractTransitionService = contractTransitionService;
            _currencyConverterService = currencyConverterService;
            _transactionManager = transactionManager;
        }

        public AllocationDocument GetAllocationDocument(string documentNo)
        {
            return GetAllocationDocument(documentNo, null);
        }

        public List<AllocationDocumentInstallmentDetails> GetAllocationInstallmentDetailsCollection(long allocationId)
        {
            var allocation = _allocationRepositoryRGSL.GetAllocations(new GetAllocationsRequest { AllocationId = allocationId }).Single();
            var policyAllocation = _policyAllocationStrategyRepository.GetAllocations(new GetPolicyAllocationsRequest { AllocationId = allocationId }).Single();
            var installments = _policyAllocationStrategyRepository.GetInstallmentsDetails(new GetInstallmentsDetailsRequest
            {
                DocumentNo = allocation.DocumentNo,
                DueDate = policyAllocation.DueDate,
            });

            if (installments.Select(_ => _.DueDate).Distinct().Count() > 1)
            {
                throw new InvalidOperationException("Only one due date is allowed.");
            }

            var detailsCollection = installments
                .GroupBy(_ => new
                {
                    _.PostingDate,
                    _.ObjectCode,
                    _.SourceLineId,
                    _.IsLife,
                })
                .Select(_ => new PolicyAllocationDocumentInstallmentDetails
                {
                    PostingDate = _.Key.PostingDate,
                    ObjectCode = _.Key.ObjectCode,
                    SourceLineId = _.Key.SourceLineId,
                    IsLife = _.Key.IsLife,
                    Amount = _.Sum(i => i.Amount),
                    OpenAmount = _.Sum(i => i.OpenAmount),
                })
                .OrderByDescending(_ => _.IsLife)
                .ThenByDescending(_ => _.Amount)
                .ThenBy(_ => _.SourceLineId)
                .ThenBy(_ => _.ObjectCode)
                .ThenBy(_ => _.PostingDate)
                .ToList<AllocationDocumentInstallmentDetails>();

            return detailsCollection;
        }

        public void BeforeAllocation(BankStatementItemRGSL bsi, AllocationRGSL allocation, AllocationDocument allocationDocument, AllocationDocumentInstallment installment)
        {
            if (bsi.Direction != BankStatementItemDirectionRGSL.Incoming)
            {
                throw new BusinessException(_translationServiceRGSL.Translate("ACC_CF_WRONG_DIRECTION"));
            }

            if (bsi.PaymentSourceId != BankStatementItemPaymentSourceIdRGSL.RSD)
            {
                var anotherAllocations = _allocationRepositoryRGSL.GetAllocations(
                    new GetAllocationsRequest
                    {
                        NoCancelations = true,
                        DocumentNo = allocation.DocumentNo,
                    });

                var anotherBankStatementItemIds = anotherAllocations.Select(_ => _.BankStatementItemId).Distinct().ToList();
                var anotherBankStatementItems = _bankStatementRepositoryRGSL.GetBankStatementItems(new BankStatement.Requests.GetBankStatementItemRequest
                {
                    BankStatementItemIds = anotherBankStatementItemIds,
                });

                if (anotherBankStatementItems.Any(_ => _.PaymentSourceId == BankStatementItemPaymentSourceIdRGSL.RSD))
                {
                    throw new BusinessException(PaymentReferenceAllocationErrorConsts.RsdAllocated, _translationServiceRGSL.Translate("ACC_CF_RSD_ALLOCATION_EXISTS"));
                }
            }
        }

        public void AfterAllocation(BankStatementItemRGSL bsi, AllocationRGSL allocation, AllocationDocument allocationDocument, AllocationDocumentInstallment installment)
        {
            var policyDocument = (PolicyAllocationDocument) allocationDocument;
            var policyInstallment = (PolicyAllocationDocumentInstallment) installment;

            var policyAllocation = new PolicyAllocationRGSL();
            policyAllocation.AllocationId = allocation.AllocationId.Value;
            policyAllocation.DueDate = policyInstallment.DueDate;
            policyAllocation.IsFirstInstallment = policyInstallment.IsFirstInstallment;

            if (allocation.PayCurrencyCode == allocation.DocCurrencyCode)
            {
                policyAllocation.ExchangeDifference = 0m;
            }
            else
            {
                decimal amountDocDate;
                decimal? manualExchangeRate = allocationDocument.ManualExchangeRate;
                bool individual = !string.IsNullOrEmpty(policyDocument.InsuredCode);
                if (manualExchangeRate.HasValue && individual && !policyInstallment.IsFirstInstallment)
                {
                    manualExchangeRate = null;
                }

                if (manualExchangeRate.HasValue)
                {
                    amountDocDate = Math.Round(policyInstallment.Amount * manualExchangeRate.Value, 2);
                }
                else
                {
                    amountDocDate = _currencyConverterService.ToLocalCurrency(policyInstallment.Amount, allocation.DocCurrencyCode, policyInstallment.DueDate).Money.Amount;
                }


                decimal amountPayDate = _currencyConverterService.ToLocalCurrency(policyInstallment.Amount, allocation.DocCurrencyCode, bsi.PaymentDate).Money.Amount;
                policyAllocation.ExchangeDifference = amountPayDate - amountDocDate;
            }

            _policyAllocationStrategyRepository.CreateAllocation(policyAllocation);
        }

        public async Task BeforeAllocationCancellation(AllocationCancelRequest request, AllocationRGSL cancelledAllocation)
        {
            if (cancelledAllocation.Cancelled)
            {
                throw new InvalidOperationException("Already cancelled!");
            }

            var anotherAllocation = _allocationRepositoryRGSL.GetAllocations(
                new GetAllocationsRequest
                {
                    NoCancelations = true,
                    DocumentNo = cancelledAllocation.DocumentNo,
                    AllocationIdFromExclusive = cancelledAllocation.AllocationId,
                })
                .FirstOrDefault();

            if (anotherAllocation != null)
            {
                throw new BusinessException(_localizationService.Localize("##ACC_CF_LATER_ALLOCATION_EXISTS", "Allocation cancellation not possible. Allocation on later date ({0}) exists.", anotherAllocation.CreateDate.ToString("dd.MM.yyyy", CultureInfo.InvariantCulture)));
            }

            var policyState = _policyAllocationStrategyRepository.GetPolicyInfo(cancelledAllocation.DocumentNo);

            if (policyState.StateCode == RGSLPolicyStatusEnum.Cancelled ||
                policyState.StateCode == RGSLPolicyStatusEnum.CancelledByAmendment)
            {
                var bankStatementItems = _bankStatementRepositoryRGSL.GetBankStatementItems(new BankStatement.Requests.GetBankStatementItemRequest
                {
                    BankStatementItemId = cancelledAllocation.BankStatementItemId,
                });
                var bankStatementItem = bankStatementItems.Single();
                var overpaymentAllocationIds = await GetAllowedToCancelAllocations(cancelledAllocation.DocumentNo);
                bool isOverpayment = overpaymentAllocationIds.Contains(cancelledAllocation.AllocationId.Value);

                if (bankStatementItem.PaymentSourceId != BankStatementItemPaymentSourceIdRGSL.RSD)
                {
                    if (isOverpayment)
                    {
                        if (!request.CancelOverpayments)
                        {
                            throw new BusinessException(_translationServiceRGSL.Translate("ACC_CF_CANCEL_OVERPAYMENT_ERROR"));
                        }
                    }
                    else
                    {
                        bool hasSpecialRole = ApplicationContext.Authorization.HasPermission("CancelAllocationsOfCancelledContracts");
                        if (!hasSpecialRole)
                        {
                            throw new BusinessException(_translationServiceRGSL.Translate("ACC_CF_POLICY_IS_CANCELLED_ERROR"));
                        }
                    }
                }
            }
        }

        private async Task<IList<long>> GetAllowedToCancelAllocations(string contractNumber)
        {
            var criteria = new JObject();
            var contractNumbers = new[] { contractNumber };
            criteria.Add("contractNumbers", JArray.FromObject(contractNumbers));

            var data = new JObject();
            data.Add("criteria", criteria);

            var serviceRequest = new JObject();
            serviceRequest.Add("data", data);

            var response = await _dataSourceService.ExecuteAsync("GetAllocationsToCancelDataSource", new JsonObject(serviceRequest), false);
            var result = response.ParsedJson["data"].Children<JObject>().ToList();
            var ids = result
                .Select(_ => _.SelectToken("resultData").SelectToken("allocationId").Value<long>())
                .ToList();
            return ids;
        }

        public void AfterAllocationCancellation(AllocationRGSL cancelledAllocation, AllocationRGSL cancelingAllocation)
        {
            var policyAllocation = _policyAllocationStrategyRepository.GetAllocations(new GetPolicyAllocationsRequest { AllocationId = cancelledAllocation.AllocationId.Value }).Single();
            policyAllocation.AllocationId = cancelingAllocation.AllocationId.Value;
            _policyAllocationStrategyRepository.CreateAllocation(policyAllocation);

            var bankStatementItems = _bankStatementRepositoryRGSL.GetBankStatementItems(new BankStatement.Requests.GetBankStatementItemRequest
            {
                BankStatementItemId = cancelledAllocation.BankStatementItemId,
            });
            var bankStatementItem = bankStatementItems.Single();
            if (bankStatementItem.PaymentSourceId == BankStatementItemPaymentSourceIdRGSL.RSD &&
                bankStatementItem.StatusId == BankStatementItemStatusRGSL.NotAllocated)
            {
                _bankStatementServiceRGSL.SetStatus(cancelledAllocation.BankStatementItemId, BankStatementItemStatusRGSL.Cancelled, Guid.NewGuid());
            }

            ExecuteAfterCommit(async () => await AfterAllocationCancellationAfterTransaction(cancelledAllocation, policyAllocation));
        }

        public void AfterMatching(BankStatementItemRGSL bsi, AllocationRGSL allocation, MatchingRGSL matching, AllocationDocumentInstallmentDetails allocationInstallmentDetails, Guid businessEventId)
        {
            var policyAllocationInstallmentDetails = (PolicyAllocationDocumentInstallmentDetails) allocationInstallmentDetails;

            var policyMatching = new PolicyMatchingRGSL
            {
                MatchingId = matching.MatchingId.Value,
                ObjectCode = policyAllocationInstallmentDetails.ObjectCode,
                SourceLineId = policyAllocationInstallmentDetails.SourceLineId,
                PostAmount = matching.DocAmount,
                IsLife = policyAllocationInstallmentDetails.IsLife,
                IsAdvancePayment = bsi.TransactionDate < policyAllocationInstallmentDetails.PostingDate,
                IsPosted = false,
                PostingDate = policyAllocationInstallmentDetails.PostingDate,
            };

            _policyAllocationStrategyRepository.CreateMatching(new List<PolicyMatchingRGSL> { policyMatching });

            _policyMatchingPostingServiceRGSL.PaymentAllocation(bsi, allocation, matching, policyMatching, businessEventId);
        }

        public void AfterMatchingCancellation(BankStatementItemRGSL bsi, AllocationRGSL allocation, IList<MatchingRGSL> cancelledMatchings, IList<MatchingRGSL> cancelingMatchings, Guid businessEventId)
        {
            var cancelledPolicyMatchings = _policyAllocationStrategyRepository.GetMatchings(new GetPolicyMatchingsRequest
            {
                MatchingIds = cancelledMatchings.Select(_ => _.MatchingId.Value).ToList(),
                WithCancellations = true,
            });

            var cancelingPolicyMatchings = cancelledMatchings.Select(cancelledMatching =>
            {
                var cancelingMatching = cancelingMatchings.Single(_ => _.CancelledMatchingId == cancelledMatching.MatchingId.Value);
                var cancelledPolicyMatching = cancelledPolicyMatchings.Single(_ => _.MatchingId.Value == cancelledMatching.MatchingId.Value);
                return RevertPolicyMatching(cancelledPolicyMatching, cancelingMatching);
            }).ToList();

            _policyAllocationStrategyRepository.CreateMatching(cancelingPolicyMatchings);

            foreach (var cancelingMatching in cancelingMatchings)
            {
                var cancelingPolicyMatching = cancelingPolicyMatchings.Single(_ => _.MatchingId.Value == cancelingMatching.MatchingId.Value);
                _policyMatchingPostingServiceRGSL.PostCancellation(bsi, allocation, cancelingMatching, cancelingPolicyMatching, businessEventId);
                _policyMatchingPostingServiceRGSL.PaymentAllocation(bsi, allocation, cancelingMatching, cancelingPolicyMatching, businessEventId);
            }
        }

        public Task FinishAllocations(string documentNo, IList<AllocationRGSL> createdAllocations, Guid businessEventId)
        {
            ExecuteAfterCommit(async () => await FinishAllocationsAfterTransaction(documentNo, createdAllocations));
            return Task.CompletedTask;
        }

        private void ExecuteAfterCommit(Func<Task> action)
        {
            _transactionManager.ExecuteAfterCommit(() =>
            {
                Task task = action();
                task.Wait();
                return task;
            });
        }

        private async Task AfterAllocationCancellationAfterTransaction(AllocationRGSL cancelledAllocation, PolicyAllocationRGSL policyAllocation)
        {
            _payableCommissionService.Cancel(cancelledAllocation.DocumentNo, policyAllocation.DueDate);

            if (policyAllocation.IsFirstInstallment)
            {
                await PostPremiumIncreaseTransactions(cancelledAllocation.DocumentNo, cancelledAllocation.AllocationId.Value.ToString(CultureInfo.InvariantCulture), true);
                await RecalculateInvoicedCommission(cancelledAllocation.DocumentNo, policyAllocation.DueDate);
            }
        }

        private async Task FinishAllocationsAfterTransaction(string documentNo, IList<AllocationRGSL> createdAllocations)
        {
            var allocDoc = (PolicyAllocationDocument) GetAllocationDocument(documentNo);
            var installments = allocDoc.AllocationInstallments
                .Cast<PolicyAllocationDocumentInstallment>()
                .ToList();

            if (allocDoc.StateCode == RGSLPolicyStatusEnum.Active)
            {
                var firstInstallment = installments.Single(_ => _.IsFirstInstallment);
                if (firstInstallment.OpenAmount == 0 && firstInstallment.DueDate <= DateTime.Now.Date)
                {
                    await _contractTransitionService.MakeTransition(documentNo, "Active_to_Activated");
                }
                return;
            }

            var allocationIds = createdAllocations.Select(_ => _.AllocationId.Value).ToList();
            var policyAllocations = _policyAllocationStrategyRepository.GetAllocations(new GetPolicyAllocationsRequest { AllocationIds = allocationIds });
            var firstInstallmentAllocations = policyAllocations.Where(_ => _.IsFirstInstallment).ToList();
            if (firstInstallmentAllocations.Any())
            {
                string allocationIdsStr = string.Join(',', firstInstallmentAllocations.Select(_ => _.AllocationId.Value.ToString(CultureInfo.InvariantCulture)));
                await PostPremiumIncreaseTransactions(documentNo, allocationIdsStr, false);
                await RecalculateInvoicedCommission(documentNo, null);
            }

            await AllocationClientCheckEventCreate(documentNo, allocationIds);

            await _pendingPaymentService.CheckAndPost(documentNo);
        }

        private static PolicyMatchingRGSL RevertPolicyMatching(PolicyMatchingRGSL cancelledPolicyMatching, MatchingRGSL cancelingMatching)
        {
            var policyMatching = cancelledPolicyMatching.Clone();
            policyMatching.MatchingId = cancelingMatching.MatchingId.Value;
            policyMatching.PostAmount *= -1m;
            return policyMatching;
        }

        private AllocationDocument GetAllocationDocument(string documentNo, DateTime? dueDate)
        {
            var installments = _policyAllocationStrategyRepository.GetInstallmentsDetails(new GetInstallmentsDetailsRequest
            {
                DocumentNo = documentNo,
                DueDate = dueDate,
            });

            var allocationInstallments = installments
                .GroupBy(_ => _.DueDate)
                .Select(_ => new PolicyAllocationDocumentInstallment
                {
                    DueDate = _.Key,
                    Amount = _.Sum(i => i.Amount),
                    OpenAmount = _.Sum(i => i.OpenAmount),
                    CurrencyCode = _.Select(_ => _.CurrencyCode).Distinct().Single(),
                    IsFirstInstallment = _.Select(i => i.IsFirstInstallment).Distinct().Single(),
                })
                .OrderBy(_ => _.DueDate)
                .ToList<AllocationDocumentInstallment>();

            var policyInfo = _policyAllocationStrategyRepository.GetPolicyInfo(documentNo);
            var stateCode = policyInfo.StateCode;
            return new PolicyAllocationDocument
            {
                StateCode = policyInfo.StateCode,
                InsuredCode = policyInfo.InsuredCode,
                ManualExchangeRate = policyInfo.ManualExchangeRate,
                AllocationInstallments = allocationInstallments,
            };
        }

        private async Task RecalculateInvoicedCommission(string documentNo, DateTime? repostFromDate)
        {
            string repostDate = repostFromDate.HasValue ? "\"repostFromDate\":\"" + repostFromDate.Value.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture) + "\"" : "\"repostFromBegining\":true";
            string stringRequest = "{\"contracts\":[{\"contractNumber\":\"" + documentNo + "\", " + repostDate + "}]}";
            var request = new JsonObject(stringRequest);
            var response = await _integrationServiceExecutor.Execute("RecalculateInvoicedCommission", "1", request);
            if (response.Code == (int) IntegrationServiceResponseConst.Error)
            {
                string errorMessage = response.Content.ParsedJson["errorResponse"]["message"].ToString();
                throw new BusinessException(errorMessage);
            }
            if (response.Code != (int) IntegrationServiceResponseConst.Success)
            {
                string errorMessage = response.Content.ParsedJson.ToString();
                throw new InvalidOperationException(errorMessage);
            }
        }

        private async Task PostPremiumIncreaseTransactions(string documentNo, string allocationId, bool isCancellation)
        {
            string postingDescription = $"Premium increase for first installment on payment {(isCancellation ? "de" : "")}allocation (allocation_id: {allocationId})";
            var stringRequest = $"{{\"contractNumbers\":[\"{documentNo}\"], \"postingDescription\": \"{postingDescription}\" }}";
            var request = new JsonObject(stringRequest);
            var response = await _integrationServiceExecutor.Execute("PostPremiumIncreaseTransactions", "1", request);
            if (response.Code == (int) IntegrationServiceResponseConst.Error)
            {
                var errorMessage = response.Content.ParsedJson["errorResponse"]["message"].ToString();
                throw new BusinessException(errorMessage);
            }
            if (response.Code != (int) IntegrationServiceResponseConst.Success)
            {
                string errorMessage = response.Content.ParsedJson.ToString();
                throw new InvalidOperationException(errorMessage);
            }
        }

        private async Task AllocationClientCheckEventCreate(string documentNo, IEnumerable<long> allocationIds)
		{
            var stringRequest = $"{{\"contractNumber\": \"{documentNo}\", \"allocationIds\": [{string.Join(", ", allocationIds)}]}}";
            
            var request = new JsonObject(stringRequest);
            var response = await _integrationServiceExecutor.Execute("AllocationClientCheckEventCreateIntegrationService", "1", request);

            if (response.Code == (int) IntegrationServiceResponseConst.Error)
            {
                var errorMessage = response.Content.ParsedJson["errorResponse"]["message"].ToString();
                throw new BusinessException(errorMessage);
            }
            if (response.Code != (int) IntegrationServiceResponseConst.Success)
            {
                string errorMessage = response.Content.ParsedJson.ToString();
                throw new InvalidOperationException(errorMessage);
            }
        }
    }
}
