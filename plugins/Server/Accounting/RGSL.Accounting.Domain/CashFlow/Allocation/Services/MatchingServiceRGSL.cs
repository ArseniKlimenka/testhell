using Adacta.AdInsure.Framework.Core.Ioc.Ninject;
using Adacta.AdInsure.Framework.Core.Transactions;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Requests;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services
{
    public class MatchingServiceRGSL : IMatchingServiceRGSL
    {
        private readonly IBankStatementRepositoryRGSL _bankStatementRepositoryRGSL;
        private readonly IAllocationRepositoryRGSL _allocationRepositoryRGSL;
        private readonly IMatchingRepositoryRGSL _matchingRepositoryRGSL;

        public MatchingServiceRGSL(
            IBankStatementRepositoryRGSL bankStatementRepositoryRGSL,
            IAllocationRepositoryRGSL allocationRepositoryRGSL,
            IMatchingRepositoryRGSL matchingRepositoryRGSL)
        {
            _bankStatementRepositoryRGSL = bankStatementRepositoryRGSL;
            _allocationRepositoryRGSL = allocationRepositoryRGSL;
            _matchingRepositoryRGSL = matchingRepositoryRGSL;
        }

        [Transaction]
        public void Match(long allocationId, Guid businessEventId)
        {
            var allocation = _allocationRepositoryRGSL.GetAllocations(new GetAllocationsRequest { AllocationId = allocationId }).Single();
            var bsi = _bankStatementRepositoryRGSL.GetBankStatementItems(new GetBankStatementItemRequest { BankStatementItemId = allocation.BankStatementItemId }).Single();
            var strategy = GetStrategy(allocation.DocumentTypeId);
            var allocationInstallmentDetailsCollection = strategy.GetAllocationInstallmentDetailsCollection(allocationId); //for policy we split allocation by SourceLine, IsLife and Payer

            var amountsCollection = GetMatchingDocAmountSplit(allocation.DocAmount, allocation.ToleranceDocAmount, allocationInstallmentDetailsCollection);

            for (int i = 0; i < allocationInstallmentDetailsCollection.Count; i++)
            {
                var amounts = amountsCollection[i];

                if (amounts.DocAmount == 0m && amounts.ToleranceDocAmount == 0)
                {
                    continue;
                }

                var allocationInstallmentDetails = allocationInstallmentDetailsCollection[i];
                var matching = new MatchingRGSL();
                matching.AllocationId = allocation.AllocationId.Value;
                matching.DocAmount = amounts.DocAmount;
                matching.ToleranceDocAmount = amounts.ToleranceDocAmount;
                matching.CreateDate = DateTime.UtcNow;

                _matchingRepositoryRGSL.CreateMatching(matching);
                strategy.AfterMatching(bsi, allocation, matching, allocationInstallmentDetails, businessEventId);
            }
        }

        [Transaction]
        public void Cancel(long allocationId, Guid businessEventId)
        {
            var allocation = _allocationRepositoryRGSL.GetAllocations(new GetAllocationsRequest { AllocationId = allocationId }).Single();
            var bsi = _bankStatementRepositoryRGSL.GetBankStatementItems(new GetBankStatementItemRequest { BankStatementItemId = allocation.BankStatementItemId }).Single();
            var strategy = GetStrategy(allocation.DocumentTypeId);

            var matchings = _matchingRepositoryRGSL.GetMatchings(new GetMatchingRequest
            {
                AllocationId = allocationId,
                NoCancelations = true,
            });

            var cancelingMatchings = new List<MatchingRGSL>(matchings.Count);
            foreach (var cancelledMatching in matchings)
            {
                var cancelingMatching = RevertMatching(cancelledMatching);
                _matchingRepositoryRGSL.SetCancelled(cancelledMatching.MatchingId.Value);
                _matchingRepositoryRGSL.CreateMatching(cancelingMatching);
                cancelingMatchings.Add(cancelingMatching);
            }
            strategy.AfterMatchingCancellation(bsi, allocation, matchings, cancelingMatchings, businessEventId);
        }

        private static MatchingRGSL RevertMatching(MatchingRGSL cancelledMatching)
        {
            var cancelingMatching = cancelledMatching.Clone();
            cancelledMatching.Cancelled = true;
            cancelingMatching.CancelledMatchingId = cancelledMatching.MatchingId.Value;
            cancelingMatching.DocAmount *= -1m;
            cancelingMatching.ToleranceDocAmount *= -1m;
            cancelingMatching.CreateDate = DateTime.UtcNow;
            return cancelingMatching;
        }

        public static MatchingAmounts[] GetMatchingDocAmountSplit(decimal allocationAmount, decimal toleranceAmount, List<AllocationDocumentInstallmentDetails> allocationInstallmentDetailsCollection)
        {
            var result = new MatchingAmounts[allocationInstallmentDetailsCollection.Count];
            decimal overpaymentAmount = Math.Min(toleranceAmount, 0);
            decimal underpaymentAmount = Math.Max(toleranceAmount, 0);

            decimal totalAmount = allocationAmount + overpaymentAmount;

            for (int i = 0; i < result.Length; i++)
            {
                var allocationInstallmentDetails = allocationInstallmentDetailsCollection[i];
                decimal amount = Math.Min(totalAmount, allocationInstallmentDetails.OpenAmount);
                totalAmount -= amount;

                var amounts = new MatchingAmounts()
                {
                    DocAmount = amount,
                    ToleranceDocAmount = underpaymentAmount != 0m ? allocationInstallmentDetails.OpenAmount - amount : 0m,
                };
                result[i] = amounts;
            }

            if (overpaymentAmount != 0m)
            {
                var item = result[^1];
                item.DocAmount -= overpaymentAmount;
                item.ToleranceDocAmount = overpaymentAmount;
            }

            if (totalAmount != 0m)
            {
                throw new InvalidOperationException("Not distributed matching amount " + totalAmount);
            }

            if (result.Sum(_ => _.ToleranceDocAmount) != toleranceAmount)
            {
                throw new InvalidOperationException("Wrong tolerance calculated!");
            }

            if (result.Sum(_ => _.DocAmount) != allocationAmount)
            {
                throw new InvalidOperationException("Wrong matching amount distributed!");
            }

            return result;
        }

        private static IAllocationStrategyServiceRGSL GetStrategy(DocumentTypeRGSL documentTypeId)
        {
            return NinjectKernel.Instance.Get<IAllocationStrategyServiceRGSL>(documentTypeId.ToString());
        }
    }

    public class MatchingAmounts
    {
        public decimal DocAmount { get; set; }
        public decimal ToleranceDocAmount { get; set; }

        public override bool Equals(object obj)
        {
            MatchingAmounts other = obj as MatchingAmounts;
            if (other == null)
            {
                return false;
            }
            return
                DocAmount == other.DocAmount &&
                ToleranceDocAmount == other.ToleranceDocAmount;
        }

        public override int GetHashCode()
        {
            return (DocAmount.GetHashCode() << 2) ^ ToleranceDocAmount.GetHashCode();
        }

        public override string ToString()
        {
            return $"DocAmount = {DocAmount}, ToleranceDocAmount = {ToleranceDocAmount}";
        }
    }
}
