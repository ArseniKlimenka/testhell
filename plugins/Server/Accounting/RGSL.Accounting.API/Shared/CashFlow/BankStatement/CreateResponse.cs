using Newtonsoft.Json;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement
{
    public class CreateResponse
    {
        [JsonProperty("createdBankStatementItems")]
        public List<long> CreatedBankStatementItems { get; } = new List<long>();
    }
}
