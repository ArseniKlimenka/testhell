using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.InvestmentProfit.Requests
{
    public class AllocationRequest
    {
        public string ReferenceNumber { get; set; }
        public string ReferenceConfName { get; set; }
        public DateTime EventDate { get; set; }
        public string ContractNumber { get; set; }
        public IEnumerable<int> PaymentTypes { get; set; }
    }
}
