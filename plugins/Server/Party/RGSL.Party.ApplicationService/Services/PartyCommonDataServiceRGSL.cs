using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.RGSL.Party.API.DTO;
using Adacta.AdInsure.RGSL.Party.API.Services;
using Adacta.AdInsure.RGSL.Party.Domain.Interfaces;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Party.ApplicationServices.Services
{
    public class PartyCommonDataServiceRGSL : IPartyCommonDataServiceRGSL
    {
        private readonly IPartyCommonDataDomainServiceRGSL _domainService;

        public PartyCommonDataServiceRGSL(IPartyCommonDataDomainServiceRGSL domainService)
        {
            _domainService = domainService;
        }

        public JsonObject GetBodyByCode(string code)
        {
            return _domainService.GetBodyByCode(code);
        }

        public IList<PartyAccountDataRGSL> GetPartyAccountData(PartyAccountDataRequest request)
        {
            return _domainService.GetPartyAccountData(request);
        }

        public IList<PartyAddressDataRGSL> GetPartyAddressData(PartyDataRequest request)
        {
            return _domainService.GetPartyAddressData(request);
        }

        public IList<PartyCommonDataRGSL> GetPartyCommonData(PartyCommonDataRequest request)
        {
            return _domainService.GetPartyCommonData(request);
        }

        public IList<PartyDocumentDataRGSL> GetPartyDocumentData(PartyDataRequest request)
        {
            return _domainService.GetPartyDocumentData(request);
        }

        public IList<PartyEmployeeDataRGSL> GetPartyEmployeeData(PartyEmployeeDataRequest request)
        {
            return _domainService.GetPartyEmployeeData(request);
        }
    }
}
