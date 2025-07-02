using Adacta.AdInsure.Framework.Core.Transactions;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.Policy;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Commission.Services;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Services
{
    public class PayableCommissionService : IPayableCommissionService
    {
        private readonly IPolicyAllocationStrategyRepository _policyAllocationStrategyRepository;
        private readonly IMatchingRepositoryRGSL _matchingRepositoryRGSL;
        private readonly IPayableCommissionRepository _payableCommissionRepository;
        private readonly IPolicyCommissionAppService _policyCommissionAppService;

        public PayableCommissionService(
            IPolicyAllocationStrategyRepository policyAllocationStrategyRepository,
            IMatchingRepositoryRGSL matchingRepositoryRGSL,
            IPayableCommissionRepository payableCommissionRepository,
            IPolicyCommissionAppService policyCommissionAppService)
        {
            _policyAllocationStrategyRepository = policyAllocationStrategyRepository;
            _matchingRepositoryRGSL = matchingRepositoryRGSL;
            _payableCommissionRepository = payableCommissionRepository;
            _policyCommissionAppService = policyCommissionAppService;
        }

        [Transaction]
        public void Create(string documentNo, DateTime dueDate)
        {
            bool migrated = CheckMigrationTable(documentNo, dueDate);

            var policyMatchings = _policyAllocationStrategyRepository.GetMatchings(new GetPolicyMatchingsRequest { DocumentNo = documentNo, DueDate = dueDate });
            var matchings = _matchingRepositoryRGSL.GetMatchings(new GetMatchingRequest { MatchingIds = policyMatchings.Select(_ => _.MatchingId.Value).ToList() });
            var commissions = _policyCommissionAppService.GetPolicyCommission(new GetPolicyCommissionRequest { ContractNumber = documentNo, DueDate = dueDate });

            var pcs = new List<PayableCommission>(matchings.Count);
            foreach (var matching in matchings)
            {
                var policyMatching = policyMatchings.Single(_ => _.MatchingId.Value == matching.MatchingId.Value);
                var itemCommissions = commissions.Items
                    .Where(_ =>
                        _.ContractNumber == documentNo &&
                        _.ObjectCode == policyMatching.ObjectCode &&
                        _.ItemCode == policyMatching.SourceLineId)
                    .ToList();

                foreach (var itemCommission in itemCommissions)
                {
                    var pc = new PayableCommission
                    {
                        MatchingId = matching.MatchingId.Value,
                        CreateDate = DateTime.UtcNow,

                        PolicyCommissionHkey = itemCommission.PolicyCommissionHkey,
                        ObjectCode = itemCommission.ObjectCode,
                        ItemCode = itemCommission.ItemCode,
                        PeriodNumber = itemCommission.PeriodNumber,
                        DocBaseAmount = matching.DocAmount,
                        IsMigrated = migrated,
                    };

                    pcs.Add(pc);
                }
            }

            _payableCommissionRepository.CreatePC(pcs);
        }

        private bool CheckMigrationTable(string documentNo, DateTime dueDate)
        {
            bool migrated = _payableCommissionRepository.IsMigrated(documentNo, dueDate);
            if (migrated)
            {
                var previousPC = _payableCommissionRepository.GetPC(new GetPcRequest
                {
                    DocumentNo = documentNo,
                    DueDate = dueDate,
                    FetchCancelled = true,
                });
                migrated = !previousPC.Any();
            }

            return migrated;
        }

        [Transaction]
        public void Cancel(string documentNo, DateTime dueDate)
        {
            var pcsToCancel = _payableCommissionRepository.GetPC(new GetPcRequest
            {
                DocumentNo = documentNo,
                DueDate = dueDate,
            });

            if (!pcsToCancel.Any())
            {
                return;
            }

            var reverted = pcsToCancel
                .Select(RevertPC)
                .ToList();

            _payableCommissionRepository.SetCancelled(pcsToCancel);
            _payableCommissionRepository.CreatePC(reverted);
        }

        private PayableCommission RevertPC(PayableCommission pcToRevert)
        {
            var reverted = pcToRevert.Clone();
            pcToRevert.Cancelled = true;
            reverted.PayableCommissionId = null;
            reverted.CancelledPcId = pcToRevert.PayableCommissionId.Value;
            reverted.DocBaseAmount *= -1;
            reverted.IsMigrated = false;

            return reverted;
        }
    }
}
