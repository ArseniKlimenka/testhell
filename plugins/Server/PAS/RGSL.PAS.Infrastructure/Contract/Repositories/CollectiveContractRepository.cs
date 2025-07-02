using Adacta.AdInsure.RGSL.Common.Domain;
using Adacta.AdInsure.RGSL.PAS.Domain.Contract.DTO;
using Adacta.AdInsure.RGSL.PAS.Domain.Contract.Repositories;
using Adacta.AdInsure.RGSL.PAS.Infrastructure.Contract.Queries;
using Spring.Expressions.Parser.antlr.collections;
using System;
using System.Collections.Generic;
using System.Globalization;
using DatabaseFactory = Adacta.AdInsure.Framework.Core.Data.Orm.DatabaseFactory;

namespace Adacta.AdInsure.RGSL.PAS.Infrastructure.Contract.Repositories
{
    public class CollectiveContractRepository : ICollectiveContractRepository
    {
        private readonly DatabaseFactory _databaseFactory;

        public CollectiveContractRepository(DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public void ClearInsuredList(ClearInsuredListDomainRequest request)
        {
            string sql = CollectiveContractQueries.ClearInsuredListQuery();

            using var db = _databaseFactory.CreateDatabase();
            db.Execute(sql, request);
        }

        public long WriteInsured(WriteInsuredDomainRequest request)
        {
            string sql = CollectiveContractQueries.WriteInsuredQuery();

            using var db = _databaseFactory.CreateDatabase();
            object resp = db.Insert(sql, "id", (object) request);
            long id = Convert.ToInt64(resp, CultureInfo.InvariantCulture);

            return id;
        }

        public void ClearRiskList(ClearRiskListDomainRequest request)
        {
            string sql = CollectiveContractQueries.ClearRiskQuery();

            using var db = _databaseFactory.CreateDatabase();
            db.Execute(sql, request);

            if (request.IsNeedClearSummaryRiskData)
            {
                sql = CollectiveContractQueries.ClearSummaryRiskDataQuery();

                db.Execute(sql, request);
            }
        }

        public void WriteRisk(WriteRiskDomainRequest request)
        {
            string sql = CollectiveContractQueries.WriteRiskQuery();
            using var db = _databaseFactory.CreateDatabase();
            RepositoryHelper.BulkInsert(db, sql, request.Risks);
        }

        public void SetInsuredCalculatedData(WriteInsuredDomainRequest request)
        {
            string sql = CollectiveContractQueries.SetInsuredCalculatedDataQuery();

            using var db = _databaseFactory.CreateDatabase();
            db.Execute(sql, request);
        }

        public void SetInsuredPartyCode(WriteInsuredDomainRequest request)
        {
            string sql = CollectiveContractQueries.SetInsuredPartyCodeQuery();

            using var db = _databaseFactory.CreateDatabase();
            db.Execute(sql, request);
        }

        public void ClearRiskExpList(ClearRiskExpListDomainRequest request)
        {
            string sql = CollectiveContractQueries.ClearRiskExpQuery();

            using var db = _databaseFactory.CreateDatabase();
            db.Execute(sql, request);
        }

        public void WriteRiskExp(WriteRiskExpDomainRequest request)
        {
            string sql = CollectiveContractQueries.WriteRiskExpQuery();

            using var db = _databaseFactory.CreateDatabase();
            RepositoryHelper.BulkInsert(db, sql, request.Risks);
        }

        public void WriteTestLog(string comment)
        {
            string sql = CollectiveContractQueries.WriteTestLogQuery();

            using var db = _databaseFactory.CreateDatabase();
            db.Execute(sql, new { comment });
        }
    }
}
