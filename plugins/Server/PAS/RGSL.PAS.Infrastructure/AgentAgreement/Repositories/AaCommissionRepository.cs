using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.DataSource.Services;
using Adacta.AdInsure.RGSL.Common.Domain;
using Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement;
using Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Responses;
using Adacta.AdInsure.RGSL.PAS.Domain.AgentAgreement.Repositories;
using Adacta.AdInsure.RGSL.PAS.Infrastructure.AgentAgreement.Queries;
using Newtonsoft.Json.Linq;
using NPoco;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.PAS.Infrastructure.AgentAgreement.Repositories
{
    public class AaCommissionRepository : IAaCommissionRepository
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;
        private readonly IDataSourceService _dataSourceService;

        public AaCommissionRepository(
            Framework.Core.Data.Orm.DatabaseFactory databaseFactory,
            IDataSourceService dataSourceService)
        {
            _databaseFactory = databaseFactory;
            _dataSourceService = dataSourceService;
        }

        public GetContractResponse GetContracts(GetContractRequest request)
        {
            using var db = _databaseFactory.CreateDatabase();
            string table = "#CONTRACT_NUMBERS_FILTER";
            db.Execute($"create table {table} (CONTRACT_NUMBER nvarchar(64) not null)");

            string sql = AaCommissionQueries.SelectContracts();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql);
            bool criteriaDefined = false;

            if (request.ContractNumbers != null)
            {
                RepositoryHelper.BulkInsert(db, $"insert into {table} (CONTRACT_NUMBER) values (@ContractNumber)", request.ContractNumbers.Select(_ => new { ContractNumber = _ }));
                builder.Where($"polh.CONTRACT_NUMBER in (select CONTRACT_NUMBER from {table} f)");
                criteriaDefined = true;
            }

            RepositoryHelper.ValidateCriteria(criteriaDefined);
            var contracts = db.Fetch<AaContractShortInfo>(template);
            db.Execute($"drop table {table}");
            return new GetContractResponse { Contracts = contracts };
        }

        public async Task<List<JObject>> GetCommissionRules(CalculateCommissionRequest request)
        {
            using var db = _databaseFactory.CreateDatabase();
            string table = "#CONTRACT_NUMBERS_FILTER";
            db.Execute($"create table {table} (CONTRACT_NUMBER nvarchar(64) not null)");

            var serviceRequest = new JObject();
            var data = new JObject();
            var criteria = new JObject();
            serviceRequest.Add("data", data);
            data.Add("criteria", criteria);
            bool criteriaDefined = false;

            if (request.ContractNumbers != null)
            {
                RepositoryHelper.BulkInsert(db, $"insert into {table} (CONTRACT_NUMBER) values (@ContractNumber)", request.ContractNumbers.Select(_ => new { ContractNumber = _ }));
                criteria.Add("contractNumbersTmpTable", table);
                criteriaDefined = true;
            }

            RepositoryHelper.ValidateCriteria(criteriaDefined);
            var response = await _dataSourceService.ExecuteAsync("GetPolicyAaCommissionDataSource", new JsonObject(serviceRequest), false);
            db.Execute($"drop table {table}");
            return response.ParsedJson["data"].Children<JObject>().ToList();
        }
    }
}
