using Adacta.AdInsure.Framework.Core.ApplicationContext;
using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation
{
    public class BankStatementXMLMessageItemHistory
    {
        public long BankStatementItemId { get; set; }
        public string BankStatementItemNo { get; set; }
        public string AuthorizedPersonTabNumber { get; set; }
        public IList<AllocationRGSL> Allocations { get; set; }
        public DateTime CreateDate { get; set; }
        public Guid UserId { get; set; }

        public BankStatementXMLMessageItemHistory()
        {
            CreateDate = DateTime.UtcNow;
            UserId = ApplicationContext.OriginatingUser.Id;
        }
    }
}