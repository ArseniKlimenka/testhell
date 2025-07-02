using Adacta.AdInsure.Framework.Core.Common;
using Newtonsoft.Json;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.Requests
{
    public class ContractRisksRequest
    {
        [JsonProperty("contractNumber")]
        public string ContractNumber { get; set; }

        [JsonProperty("bodyRisks")]
        public string BodyRisks { get; set; }

        [JsonProperty("commonBodyRisks")]
        public string CommonBodyRisks { get; set; }
    }
}
