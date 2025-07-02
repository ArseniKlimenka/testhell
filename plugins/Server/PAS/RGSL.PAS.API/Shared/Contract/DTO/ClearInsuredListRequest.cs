using Newtonsoft.Json;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.DTO
{
    public class ClearInsuredListRequest
    {
        [JsonProperty("contractNumber")]
        public string ContractNumber { get; set; }
        
    }
}
