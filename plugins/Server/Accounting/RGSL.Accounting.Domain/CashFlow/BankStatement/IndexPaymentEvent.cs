using Adacta.AdInsure.Framework.Core.API.Shared.Common.Interfaces;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement
{
    public class IndexPaymentEvent : IDomainEvent
    {
        public IList<long> BankStatementItemIds { get; private set; }

        public IndexPaymentEvent(long bankStatementItemId)
        {
            BankStatementItemIds = new List<long> { bankStatementItemId };
        }

        public IndexPaymentEvent(IList<long> bankStatementItemIds)
        {
            BankStatementItemIds = bankStatementItemIds;
        }
    }

    public class IndexPaymentMessage : IMessageBody
    {
        [JsonProperty(PropertyName = "bankStatementItemIds")]
        public IList<long> BankStatementItemIds { get; set; }
    }
}
