using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Subledger.Requests
{
    public class PostingServiceCheckJournalRequest
    {
        public IList<long> JournalIds { get; set; }
    }
}
