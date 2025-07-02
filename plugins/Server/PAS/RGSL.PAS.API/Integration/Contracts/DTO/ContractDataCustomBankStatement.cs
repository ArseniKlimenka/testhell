using Newtonsoft.Json;
using System;

namespace Adacta.AdInsure.RGSL.PAS.API.Integration.Contracts.DTO
{
    public class ContractDataCustomBankStatement
    {
        [JsonProperty("openAmount")]
        public Decimal OpenAmount { get; set; }

        [JsonProperty("transactionDate")]
        public DateTime TransactionDate { get; set; }
    }
}
