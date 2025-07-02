using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement
{
    public class RosfinmonitoringXMLRequest
    {
        public IList<long> BankStatementItemIds { get; set; }

        public Boolean SkipValidations { get; set; }

        public Boolean IsAllocatedItems { get; set; }
    }
}
