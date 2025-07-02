using Newtonsoft.Json;
using System;

namespace Adacta.AdInsure.RGSL.PAS.API.Integration.Contracts.DTO
{
    public class ContractDataCustomPayment
    {
        [JsonProperty("dueDate")]
        public DateTime DueDate { get; set; }

        [JsonProperty("installmentAmount")]
        public Decimal InstallmentAmount { get; set; }

        [JsonProperty("installmentOpenAmount")]
        public Decimal InstallmentOpenAmount { get; set; }

        [JsonProperty("payAmount")]
        public Decimal PayAmount { get; set; }

        [JsonProperty("docAmount")]
        public Decimal DocAmount { get; set; }
    }
}
