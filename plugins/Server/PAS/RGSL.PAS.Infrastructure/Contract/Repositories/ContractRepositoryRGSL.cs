using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.Requests;
using Adacta.AdInsure.RGSL.PAS.Domain.Contract.Repositories;
using Adacta.AdInsure.RGSL.PAS.Infrastructure.Contract.Queries;
using NPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using DatabaseFactory = Adacta.AdInsure.Framework.Core.Data.Orm.DatabaseFactory;

namespace Adacta.AdInsure.RGSL.PAS.Infrastructure.Contract.Repositories
{
    public class ContractRepositoryRGSL : IContractRepositoryRGSL
    {
        private readonly DatabaseFactory _databaseFactory;

        public ContractRepositoryRGSL(DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public IEnumerable<ContractInfoRGSL> GetContractsInfoByNumber(ContractsInfoRequest request)
        {
            if (!request?.Numbers?.Any() ?? true)
            {
                throw new ArgumentNullException(nameof(request), "Request is empty!");
            }

            if (request.Numbers.Count() > 1000)
            {
                throw new ArgumentOutOfRangeException(nameof(request), "Numbers count must be less or equal to 1000!");
            }

            using var db = _databaseFactory.CreateDatabase();

            var query = ContractQueriesRGSL.GetContractsInfoQuery();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(query);

            builder.Where($"ctr.CONTRACT_NUMBER in (@Numbers)", new { Numbers = request.Numbers });

            var contracts = db.Fetch<ContractInfoRGSL>(template);

            return contracts;
        }

        public ContractSysDataRGSL GetContractSysDataByNumber(ContractSysDataRequest request)
        {
            if (string.IsNullOrWhiteSpace(request?.Number))
            {
                throw new ArgumentNullException(nameof(request), "Request is empty!");
            }

            using var db = _databaseFactory.CreateDatabase();

            var query = ContractQueriesRGSL.GetContractOrAmendmentSysDataQuery();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(query);

            builder.Where($"ctr.CONTRACT_NUMBER = @Number", new { Number = request.Number });

            var contract = db.Fetch<ContractSysDataRGSL>(template).FirstOrDefault();

            return contract;
        }

        public void UpdateContractRisks(ContractRisksRequest request)
        {
            if (string.IsNullOrWhiteSpace(request?.ContractNumber))
            {
                throw new ArgumentNullException(nameof(request), "ContractNumber is missing!");
            }

            using var db = _databaseFactory.CreateDatabase();

            var contractNumber = request.ContractNumber;
            var bodyRisks = request.BodyRisks;
            var commonBodyRisks = request.CommonBodyRisks;
            db.Execute(ContractQueriesRGSL.UpdateContractRisksQuery(), new { contractNumber, bodyRisks, commonBodyRisks });
        }
    }
}
