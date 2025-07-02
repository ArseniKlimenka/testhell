using System;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests
{
    public class InstallmentAmountsRequest
    {
        public string ReferenceNo { get; set; }
        public DateTime DueDate { get; set; }
    }
}
