using System;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests
{
    public class PayableCommissionRepostRequest
    {
        public string DocumentNo { get; set; }
        public DateTime DueDate { get; set; }
    }
}
