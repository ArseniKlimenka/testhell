using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.RGSL.Party.API.DTO;
using Adacta.AdInsure.RGSL.Party.Domain.Interfaces;
using Adacta.AdInsure.RGSL.Party.Domain.Repositories;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Party.Domain.Services
{
    public class PartyCommonDataDomainServiceRGSL : IPartyCommonDataDomainServiceRGSL
    {
        private readonly IPartyCommonDataRepositoryRGSL _repository;

        public PartyCommonDataDomainServiceRGSL(IPartyCommonDataRepositoryRGSL repository)
        {
            _repository = repository;
        }

        public JsonObject GetBodyByCode(string code)
        {
            return _repository.GetBodyByCode(code);
        }

        public IList<PartyAccountDataRGSL> GetPartyAccountData(PartyAccountDataRequest request)
        {
            return _repository.GetPartyAccountData(request);
        }

        public IList<PartyAddressDataRGSL> GetPartyAddressData(PartyDataRequest request)
        {
            return _repository.GetPartyAddressData(request);
        }

        public IList<PartyCommonDataRGSL> GetPartyCommonData(PartyCommonDataRequest request)
        {
            return _repository.GetPartyCommonData(request);
        }

        public IList<PartyDocumentDataRGSL> GetPartyDocumentData(PartyDataRequest request)
        {
            return _repository.GetPartyDocumentData(request);
        }

        public IList<PartyEmployeeDataRGSL> GetPartyEmployeeData(PartyEmployeeDataRequest request)
        {
            return _repository.GetPartyEmployeeData(request);
        }
    }
}
