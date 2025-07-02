using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Queries;
using Adacta.AdInsure.RGSL.Common.Domain;
using NPoco;
using System;
using System.Collections.Generic;
using System.Globalization;

namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Repositories
{
    public class AllocationRepositoryRGSL : IAllocationRepositoryRGSL
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public AllocationRepositoryRGSL(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public void Lock(long bankStatementItemId, string documentNo)
        {
            using var db = _databaseFactory.CreateDatabase();
            db.Execute("select 1 from ACC_IMPL.BANK_STATEMENT_ITEM with (updlock) where BANK_STATEMENT_ITEM_ID = @0", bankStatementItemId);
            db.Execute("select 1 from acc_impl.REFERENCE_NUMBER with (updlock) where DOCUMENT_NO = @0", documentNo);
            db.Execute("select 1 from acc_impl.ALLOCATION with (updlock) where DOCUMENT_NO = @0", documentNo);
        }

        public void CreateAllocation(AllocationRGSL allocation)
        {
            string sql = AllocationQueriesRGSL.CreateAllocation();

            using var db = _databaseFactory.CreateDatabase();
            // Insert an allocation and get its generated id
            var id = db.Insert(sql, "ALLOCATION_ID", (object) allocation);
            allocation.AllocationId = Convert.ToInt64(id, CultureInfo.InvariantCulture);
        }

        public IList<AllocationRGSL> GetAllocations(GetAllocationsRequest request)
        {
            string sql = AllocationQueriesRGSL.GetAllocation();
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

            if (request.BankStatementItemId.HasValue)
            {
                builder.Where("alc.bank_statement_item_id = @0", request.BankStatementItemId);
                criteriaDefined = true;
            }

            if (request.DocumentNo != null)
            {
                builder.Where("alc.document_no = @0", request.DocumentNo);
                criteriaDefined = true;
            }

            if (request.AllocationIdFromExclusive != null)
            {
                builder.Where("alc.allocation_id > @0", request.AllocationIdFromExclusive);
            }

            if (request.NoCancelations)
            {
                builder.Where("alc.cancelled = 0 and alc.cancelled_allocation_id is null");
            }

            RepositoryHelper.ValidateCriteria(criteriaDefined);
            using var db = _databaseFactory.CreateDatabase();
            var allocations = db.Fetch<AllocationRGSL>(template);
            return allocations;
        }

        public decimal GetAllocationPayAmount(long bankStatementItemId)
        {
            string sql = AllocationQueriesRGSL.GetAllocationPayAmount();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql);

            builder.Where("alc.bank_statement_item_id = @0", bankStatementItemId);

            using var db = _databaseFactory.CreateDatabase();
            var payAmount = db.Single<decimal>(template);
            return payAmount;
        }

        public void SetCancelled(long allocationId)
        {
            using var db = _databaseFactory.CreateDatabase();
            var resp = db.Execute("update acc_impl.allocation set cancelled = 1 where allocation_id = @0", allocationId);
            RepositoryHelper.CheckRowUpdatedResult(resp);
        }
    }
}
