using Newtonsoft.Json.Linq;

namespace Adacta.AdInsure.RGSL.Party.API.DTO
{
    public class CheckContractorsResult
    {
        public int ContractorPartyCode { get; set; }
        public JObject CheckResultData { get; set; }
    }
}
