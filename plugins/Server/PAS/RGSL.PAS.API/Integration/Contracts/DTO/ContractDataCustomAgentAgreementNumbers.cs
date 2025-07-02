using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.PAS.API.Integration.Contracts.DTO
{
    public class ContractDataCustomAgentAgreementNumbers
    {
        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("numbers")]
        public IList<string> Numbers { get; set; }

    }
}
