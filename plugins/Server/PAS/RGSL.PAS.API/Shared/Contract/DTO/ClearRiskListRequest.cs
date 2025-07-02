using Newtonsoft.Json;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.DTO
{
    public class ClearRiskListRequest
    {
        [JsonProperty("contractNumber")]
        public string ContractNumber { get; set; }

        [JsonProperty("isNeedClearSummaryRiskData")]
        public bool IsNeedClearSummaryRiskData { get; set; }
    }
}
