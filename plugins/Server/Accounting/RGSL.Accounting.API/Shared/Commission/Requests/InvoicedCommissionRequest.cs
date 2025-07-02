using System;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests
{
    public class InvoicedCommissionRequest
    {
        public string ContractNumber { get; set; }
        public DateTime DueDate { get; set; }
    }
}
