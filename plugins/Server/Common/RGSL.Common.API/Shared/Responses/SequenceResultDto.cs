using Newtonsoft.Json;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Responses
{
    public class SequenceResultDto
    {
        [JsonProperty("sequenceName")]
        public string SequenceName { get; set; }

        [JsonProperty("ids")]
        public List<long> Ids { get; set; }
    }
}
