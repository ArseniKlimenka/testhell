using Newtonsoft.Json;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.DTO
{
    public class ClearRiskExpListRequest
    {
        [JsonProperty("contractNumber")]
        public string ContractNumber { get; set; }
    }
}
