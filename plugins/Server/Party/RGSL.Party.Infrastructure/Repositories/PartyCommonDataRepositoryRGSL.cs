using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.RGSL.Common.Domain;
using Adacta.AdInsure.RGSL.Party.API.DTO;
using Adacta.AdInsure.RGSL.Party.Domain.Queries;
using Adacta.AdInsure.RGSL.Party.Domain.Repositories;
using NPoco;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Party.Infrastructure.Repositories
{
    public class PartyCommonDataRepositoryRGSL : IPartyCommonDataRepositoryRGSL
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;
        private readonly IPartyCommonDataQueriesRGSL _queries;

        public PartyCommonDataRepositoryRGSL(Framework.Core.Data.Orm.DatabaseFactory databaseFactory, IPartyCommonDataQueriesRGSL queries)
        {
            _databaseFactory = databaseFactory;
            _queries = queries;
        }

        public JsonObject GetBodyByCode(string code)
        {
            using (var db = _databaseFactory.CreateDatabase())
            {
                var body = db.ExecuteScalar<string>(_queries.GetPartyBody(), code);

                if (string.IsNullOrEmpty(body))
                {
                    throw new BusinessException($"Failed to resolve party with code={code}, it likely does not exist in database!");
                }

                return new JsonObject(body);
            }
        }

        public IList<PartyAccountDataRGSL> GetPartyAccountData(PartyAccountDataRequest request)
        {
            string sql = _queries.GetPartyAccountData();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql);
            bool criteriaDefined = false;

            // add conditions:

            if (!string.IsNullOrEmpty(request.PartyCode))
            {
                builder.Where("pth.PARTY_CODE = @0", request.PartyCode);
                criteriaDefined = true;
            }

            if (!string.IsNullOrEmpty(request.AccountNo))
            {
                builder.Where("bs.BANK_ACCOUNT = @0", request.AccountNo);
                criteriaDefined = true;
            }

            RepositoryHelper.ValidateCriteria(criteriaDefined);
            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<PartyAccountDataRGSL>(template);
        }

        public IList<PartyAddressDataRGSL> GetPartyAddressData(PartyDataRequest request)
        {
            string sql = _queries.GetPartyAddressData();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql);
            bool criteriaDefined = false;

            // add conditions:

            if (!string.IsNullOrEmpty(request.PartyCode))
            {
                builder.Where("pt.PARTY_CODE = @0", request.PartyCode);
                criteriaDefined = true;
            }

            RepositoryHelper.ValidateCriteria(criteriaDefined);
            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<PartyAddressDataRGSL>(template);
        }

        public IList<PartyCommonDataRGSL> GetPartyCommonData(PartyCommonDataRequest request)
        {
            string sql = _queries.GetPartyCommonData();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql);
            bool criteriaDefined = false;

            // add joins:

            if (!string.IsNullOrEmpty(request.ServiceProviderCode))
            {
                builder.LeftJoin("ORG_IMPL.SERVICE_PROVIDER_INFO_SAT_LATEST sps on sps.PARTY_CODE = pth.PARTY_CODE");
                builder.LeftJoin("ORG_IMPL.SERVICE_PROVIDER_HUB sph on sph.SERVICE_PROVIDER_HKEY = sps.SERVICE_PROVIDER_INFO_HKEY");
            }

            if (!string.IsNullOrEmpty(request.OrganisationUnitCode))
            {
                builder.LeftJoin("ORG_IMPL.SERVICE_PROVIDER_INFO_SAT_LATEST sps on sps.PARTY_CODE = pth.PARTY_CODE");
                builder.LeftJoin("ORG_IMPL.SERVICE_PROVIDER_HUB sph on sph.SERVICE_PROVIDER_HKEY = sps.SERVICE_PROVIDER_INFO_HKEY");
                builder.LeftJoin("ORG_IMPL.ORGANISATION_UNIT_INFO_SAT_LATEST ous on ous.PARTNER_CODE = sph.SERVICE_PROVIDER_CODE");
            }

            // add conditions:

            if (!string.IsNullOrEmpty(request.PartyCode))
            {
                builder.Where("pt.PARTY_CODE = @0", request.PartyCode);
                criteriaDefined = true;
            }

            if (!string.IsNullOrEmpty(request.ServiceProviderCode))
            {
                builder.Where("sph.SERVICE_PROVIDER_CODE = @0", request.ServiceProviderCode);
                criteriaDefined = true;
            }

            if (!string.IsNullOrEmpty(request.OrganisationUnitCode))
            {
                builder.Where("ous.CODE = @0", request.OrganisationUnitCode);
                criteriaDefined = true;
            }

            RepositoryHelper.ValidateCriteria(criteriaDefined);
            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<PartyCommonDataRGSL>(template);
        }

        public IList<PartyDocumentDataRGSL> GetPartyDocumentData(PartyDataRequest request)
        {
            string sql = _queries.GetPartyDocumentData();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql);
            bool criteriaDefined = false;

            // add conditions:

            if (!string.IsNullOrEmpty(request.PartyCode))
            {
                builder.Where("pt.PARTY_CODE = @0", request.PartyCode);
                criteriaDefined = true;
            }

            RepositoryHelper.ValidateCriteria(criteriaDefined);
            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<PartyDocumentDataRGSL>(template);
        }

        public IList<PartyEmployeeDataRGSL> GetPartyEmployeeData(PartyEmployeeDataRequest request)
        {
            string sql = _queries.GetPartyEmployeeData();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql);
            bool criteriaDefined = false;

            // add conditions:

            if (!string.IsNullOrEmpty(request.EmployeeTabNumber))
            {
                builder.Where("sps.TAB_NUMBER = @0", request.EmployeeTabNumber);
                criteriaDefined = true;
            }

            RepositoryHelper.ValidateCriteria(criteriaDefined);
            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<PartyEmployeeDataRGSL>(template);
        }
    }
}