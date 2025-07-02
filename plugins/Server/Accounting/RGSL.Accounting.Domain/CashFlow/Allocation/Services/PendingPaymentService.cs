using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Domain.Entities.IntegrationService.Interfaces;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.Framework.Core.Transactions;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces.Posting;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.Policy;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.Policy.Request;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Interfaces;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services
{
    public class PendingPaymentService : IPendingPaymentService
    {
        private readonly IPolicyMatchingPostingServiceRGSL _policyMatchingPostingService;
        private readonly IPendingPaymentRepositoryRGSL _pendingPaymentRepository;
        private readonly IMatchingRepositoryRGSL _matchingRepository;
        private readonly IAllocationRepositoryRGSL _allocationRepository;
        private readonly IPolicyAllocationStrategyRepository _policyAllocationStrategyRepository;
        private readonly IPayableCommissionService _payableCommissionService;
        private readonly IIntegrationServiceExecutor _integrationServiceExecutor;
        private readonly IBankStatementRepositoryRGSL _bankStatementRepository;

        public PendingPaymentService(
            IPolicyMatchingPostingServiceRGSL policyMatchingPostingService,
            IPendingPaymentRepositoryRGSL pendingPaymentRepository,
            IMatchingRepositoryRGSL matchingRepository,
            IAllocationRepositoryRGSL allocationRepository,
            IPolicyAllocationStrategyRepository policyAllocationStrategyRepository,
            IPayableCommissionService payableCommissionService,
            IIntegrationServiceExecutor integrationServiceExecutor,
            IBankStatementRepositoryRGSL bankStatementRepository)
        {
            _policyMatchingPostingService = policyMatchingPostingService;
            _pendingPaymentRepository = pendingPaymentRepository;
            _matchingRepository = matchingRepository;
            _allocationRepository = allocationRepository;
            _policyAllocationStrategyRepository = policyAllocationStrategyRepository;
            _payableCommissionService = payableCommissionService;
            _integrationServiceExecutor = integrationServiceExecutor;
            _bankStatementRepository = bankStatementRepository;
        }

        [Transaction]
        public async Task<IList<long>> CheckAndPost(string documentNo)
        {
            var matchingIds = _pendingPaymentRepository.GetMatchingIdsToPost(documentNo);
            if (!matchingIds.Any())
            {
                return matchingIds;
            }

            var matchings = _matchingRepository.GetMatchings(new GetMatchingRequest { MatchingIds = matchingIds });
            var policyMatchings = _policyAllocationStrategyRepository.GetMatchings(new GetPolicyMatchingsRequest { MatchingIds = matchingIds });

            var allocationIds = matchings.Select(_ => _.AllocationId).Distinct().ToList();
            var allocations = _allocationRepository.GetAllocations(new GetAllocationsRequest { AllocationIds = allocationIds });
            var policyAllocations = _policyAllocationStrategyRepository.GetAllocations(new GetPolicyAllocationsRequest { AllocationIds = allocationIds });

            var bsiIds = allocations.Select(_ => _.BankStatementItemId).Distinct().ToList();
            var bsiCollection = _bankStatementRepository.GetBankStatementItems(new GetBankStatementItemRequest { BankStatementItemIds = bsiIds });

            var items = matchings.Select(matching =>
            {
                var policyMatching = policyMatchings.Single(_ => _.MatchingId.Value == matching.MatchingId.Value);
                var allocation = allocations.Single(_ => _.AllocationId.Value == matching.AllocationId);
                var policyAllocation = policyAllocations.Single(_ => _.AllocationId.Value == matching.AllocationId);
                var bsi = bsiCollection.Single(_ => _.BankStatementItemId.Value == allocation.BankStatementItemId);

                return new
                {
                    bsi,
                    allocation,
                    policyAllocation,
                    matching,
                    policyMatching,
                };
            })
                .OrderBy(_ => _.policyAllocation.DueDate)
                .ThenBy(_ => _.allocation.AllocationId)
                .ThenBy(_ => _.matching.MatchingId)
                .ToList();

            if (matchingIds.Count != items.Count)
            {
                throw new InvalidOperationException("Wrong items count");
            }

            Guid businessEventId = Guid.NewGuid();
            var contracts = allocations.GroupBy(_ => _.DocumentNo);
            foreach (var contract in contracts)
            {
                long lastBsiId = contract.Max(_ => _.BankStatementItemId);
                var bsi = bsiCollection.Single(_ => _.BankStatementItemId.Value == lastBsiId);
                await PostRevaluationTransactions(contract.Key, bsi.PaymentDate, businessEventId);
            }

            foreach (var item in items)
            {
                _policyMatchingPostingService.Post(item.bsi, item.allocation, item.policyAllocation, item.matching, item.policyMatching, businessEventId);
            }
            _matchingRepository.SetMatchingPosted(matchingIds);

            var dueDates = items
                .Select(_ => _.policyAllocation.DueDate)
                .Distinct()
                .OrderBy(_ => _)
                .ToList();

            ProcessPC(documentNo, dueDates);

            return matchingIds;
        }

        private async Task PostRevaluationTransactions(string documentNo, DateTime newRevaluationDate, Guid businessEventId)
        {
            string stringRequest = "{\"contractNumbers\":[\"" + documentNo + "\"], " +
                "\"newRevaluationDate\":\"" + newRevaluationDate.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture) + "\"" +
                ",\"businessEventId\": \"" + businessEventId.ToString() + "\",\"postingDescription\": \"Matching posting\"}";
            var request = new JsonObject(stringRequest);
            var response = await _integrationServiceExecutor.Execute("PostRevaluationTransactions", "1", request);
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

        private void ProcessPC(string documentNo, IList<DateTime> dueDates)
        {
            var installmentDetails = _policyAllocationStrategyRepository.GetInstallmentsDetails(new GetInstallmentsDetailsRequest
            {
                DocumentNo = documentNo,
                DueDates = dueDates,
            });
            foreach (var dueDate in dueDates)
            {
                var details = installmentDetails
                    .Where(_ => _.DueDate == dueDate)
                    .ToList();

                decimal openAmount = details.Sum(_ => _.OpenAmount);

                if (openAmount == 0)
                {
                    _payableCommissionService.Create(documentNo, dueDate);
                }
            }
        }
    }
}
