using Adacta.AdInsure.Framework.Core.API.Shared.Common.Interfaces;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation
{
    public class AllocationFinishedEvent : IDomainEvent
    {
        public IList<long> AllocationIds { get; }
        public int DocumentTypeId { get; }
        public long BankStatementItemId { get; }
        public string DocumentNo { get; }

        public AllocationFinishedEvent(IList<long> allocationIds, DocumentTypeRGSL documentTypeId, long bankStatementItemId, string documentNo)
        {
            AllocationIds = allocationIds;
            DocumentTypeId = (int) documentTypeId;
            BankStatementItemId = bankStatementItemId;
            DocumentNo = documentNo;
        }
    }

    public class AllocationFinishedMessage : IMessageBody
    {
        [JsonProperty(PropertyName = "allocationIds")]
        public IList<long> AllocationIds { get; set; }

		[JsonProperty(PropertyName = "documentTypeId")]
		public int DocumentTypeId { get; set; }

        [JsonProperty(PropertyName = "bankStatementItemId")]
        public long BankStatementItemId { get; set; }

        [JsonProperty(PropertyName = "documentNo")]
        public string DocumentNo { get; set; }
    }
}
