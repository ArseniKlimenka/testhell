using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit
{
    public class AllocationRequestDomain
    {
        public string ReferenceNumber { get; set; }
        public string ReferenceConfName { get; set; }
        public DateTime EventDate { get; set; }
        public string ContractNumber { get; set; }
        public IEnumerable<int> PaymentTypes { get; set; }
    }
}
