using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.Policy.Request
{
    public class GetInstallmentsDetailsRequest
    {
        public string DocumentNo { get; set; }
        public DateTime? DueDate { get; set; }
        public IList<DateTime> DueDates { get; set; }
    }
}
