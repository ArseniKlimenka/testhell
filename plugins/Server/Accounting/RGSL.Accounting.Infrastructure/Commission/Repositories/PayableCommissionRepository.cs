using Adacta.AdInsure.RGSL.Accounting.Domain.Commission;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Requests;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.Commission.Queries;
using Adacta.AdInsure.RGSL.Common.Domain;
using NPoco;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.Commission.Repositories
{
    public class PayableCommissionRepository : IPayableCommissionRepository
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public PayableCommissionRepository(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public void CreatePC(IList<PayableCommission> newPCs)
        {
            string sql = PayableCommissionQueries.InsertPC();

            var createdDate = DateTime.UtcNow;
            foreach (var pc in newPCs)
            {
                pc.CreateDate = createdDate;
            }

            using var db = _databaseFactory.CreateDatabase();
            RepositoryHelper.BulkInsert(db, sql, newPCs);
        }

        public IList<PayableCommission> GetPC(GetPcRequest request)
        {
            string sql = PayableCommissionQueries.SelectPC();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql);
            bool criteriaDefined = false;

            if (!request.FetchCancelled)
            {
                builder.Where("pc.CANCELLED = 0");
                builder.Where("pc.CANCELLED_PC_ID is null");
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

            RepositoryHelper.ValidateCriteria(criteriaDefined);
            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<PayableCommission>(template);
        }

        public void SetCancelled(IList<PayableCommission> pcsToCancel)
        {
            using var db = _databaseFactory.CreateDatabase();

            var pcIds = pcsToCancel
                .Select(_ => _.PayableCommissionId.Value)
                .ToList();

            int resp = db.Execute("update acc_impl.payable_commission set cancelled = 1 where cancelled = 0 and payable_commission_id in (@0)", pcIds);
            RepositoryHelper.CheckRowUpdatedResult(resp, pcsToCancel.Count);
        }

        public bool IsMigrated(string documentNo, DateTime dueDate)
        {
            string sql = "select count(*) from acc_impl.BOK_MIGRATED_PC where CONTRACT_NUMBER = @0 and @1 between START_PERIOD_DATE and END_PERIOD_DATE and MIGRATED_AOEW = 1";

            using var db = _databaseFactory.CreateDatabase();
            int count = db.Single<int>(sql, documentNo, dueDate);
            return count > 0;
        }
    }
}
