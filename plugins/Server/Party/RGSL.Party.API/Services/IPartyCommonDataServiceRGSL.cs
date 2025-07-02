using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.RGSL.Party.API.DTO;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Party.API.Services
{
    public interface IPartyCommonDataServiceRGSL
    {
        JsonObject GetBodyByCode(string code);
        public IList<PartyAccountDataRGSL> GetPartyAccountData(PartyAccountDataRequest request);
        public IList<PartyAddressDataRGSL> GetPartyAddressData(PartyDataRequest request);
        public IList<PartyCommonDataRGSL> GetPartyCommonData(PartyCommonDataRequest request);
        public IList<PartyDocumentDataRGSL> GetPartyDocumentData(PartyDataRequest request);
        public IList<PartyEmployeeDataRGSL> GetPartyEmployeeData(PartyEmployeeDataRequest request);
    }
}
