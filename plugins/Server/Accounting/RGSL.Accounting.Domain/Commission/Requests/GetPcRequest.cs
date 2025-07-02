using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Requests
{
    public class GetPcRequest
    {
        public string DocumentNo { get; set; }
        public DateTime? DueDate { get; set; }
        public bool FetchCancelled { get; set; }
    }
}
