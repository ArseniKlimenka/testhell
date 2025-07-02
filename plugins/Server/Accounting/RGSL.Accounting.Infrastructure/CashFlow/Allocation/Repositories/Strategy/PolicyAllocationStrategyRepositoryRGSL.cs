using System.Collections.Generic;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.Policy;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.Policy.DTO;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.Policy.Request;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.Policy.Responses;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services.Strategy.Policy;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Queries.Strategy;
using Adacta.AdInsure.RGSL.Common.Domain;
using NPoco;

namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Repositories.Strategy
{
    public class PolicyAllocationStrategyRepositoryRGSL : IPolicyAllocationStrategyRepository
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public PolicyAllocationStrategyRepositoryRGSL(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public void CreateAllocation(PolicyAllocationRGSL policyAllocation)
        {
            string sql = PolicyAllocationStrategyQueries.Insert_PolicyAllocation();
            using var db = _databaseFactory.CreateDatabase();
            db.Execute(sql, policyAllocation);
        }

        public void CreateMatching(IList<PolicyMatchingRGSL> policyMatchings)
        {
            string sql = PolicyAllocationStrategyQueries.Insert_PolicyMatching();
            using var db = _databaseFactory.CreateDatabase();
            RepositoryHelper.BulkInsert(db, sql, policyMatchings);
        }

        public IList<PolicyAllocationRGSL> GetAllocations(GetPolicyAllocationsRequest request)
        {
            string sql = PolicyAllocationStrategyQueries.Select_PolicyAllocation();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql);
            bool criteriaDefined = false;

            if (request.AllocationId.HasValue)
            {
                builder.Where("alc.allocation_id = @0", request.AllocationId.Value);
                criteriaDefined = true;
            }

            if (request.AllocationIds != null)
            {
                builder.Where("alc.allocation_id in (@0)", request.AllocationIds);
                criteriaDefined = true;
            }

            RepositoryHelper.ValidateCriteria(criteriaDefined);
            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<PolicyAllocationRGSL>(template);
        }

        public List<PolicyInstallmentDetailsDto> GetInstallmentsDetails(GetInstallmentsDetailsRequest request)
        {
            string sql = PolicyAllocationStrategyQueries.Select_InstallmentDetails();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql, new { documentNumber = request.DocumentNo });

            if (request.DueDate.HasValue)
            {
                builder.WhereNamed("PP", "ppl.DUE_DATE = @0", request.DueDate);
                builder.WhereNamed("matching", "alcp.DUE_DATE = @0", request.DueDate);
            }

            if (request.DueDates != null)
            {
                builder.WhereNamed("PP", "ppl.DUE_DATE in (@0)", request.DueDates);
                builder.WhereNamed("matching", "alcp.DUE_DATE in (@0)", request.DueDates);
            }

            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<PolicyInstallmentDetailsDto>(template);
        }

        public IList<PolicyMatchingRGSL> GetMatchings(GetPolicyMatchingsRequest request)
        {
            string sql = PolicyAllocationStrategyQueries.Select_PolicyMatching();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql);
            bool criteriaDefined = false;

            // add joins:

            if (request.DocumentNo != null || request.DueDate.HasValue)
            {
                builder.Join("acc_impl.ALLOCATION alc on alc.ALLOCATION_ID = mat.ALLOCATION_ID");

                if (request.DueDate.HasValue)
                {
                    builder.Join("acc_impl.ALLOCATION_POLICY alcp on alcp.ALLOCATION_ID = mat.ALLOCATION_ID");
                }
            }

            // add conditions:

            if (request.MatchingId.HasValue)
            {
                builder.Where("matp.matching_id = @0", request.MatchingId.Value);
                criteriaDefined = true;
            }

            if (request.MatchingIds != null)
            {
                builder.Where("matp.matching_id in (@0)", request.MatchingIds);
                criteriaDefined = true;
            }

            if (request.DocumentNo != null)
            {
                builder.Where("alc.document_no = @0", request.DocumentNo);
                criteriaDefined = true;
            }

            if (request.DueDate.HasValue)
            {
                builder.Where("alcp.due_date = @0", request.DueDate.Value);
            }

            if (!request.WithCancellations)
            {
                builder.Where("mat.cancelled = 0 and mat.cancelled_matching_id is null");
            }

            RepositoryHelper.ValidateCriteria(criteriaDefined);
            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<PolicyMatchingRGSL>(template);
        }

        public GetPolicyInfoResponse GetPolicyInfo(string documentNo)
        {
            string sql = PolicyAllocationStrategyQueries.GetPolicyState();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql);

            builder.Where("ph.contract_number = @0", documentNo);

            using var db = _databaseFactory.CreateDatabase();
            return db.Single<GetPolicyInfoResponse>(template);
        }
    }
}
