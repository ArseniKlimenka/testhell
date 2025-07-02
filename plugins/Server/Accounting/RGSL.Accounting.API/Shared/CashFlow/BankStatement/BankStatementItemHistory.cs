using Adacta.AdInsure.Framework.Core.ApplicationContext;
using System;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement
{
    public class BankStatementItemHistory
    {
        public long? BankStatementItemHistoryId { get; set; }
        public long BankStatementItemId { get; set; }
        public BankStatementItemStatusRGSL StatusIdFrom { get; set; }
        public BankStatementItemStatusRGSL StatusIdTo { get; set; }
        public string PaymentDescriptionFrom { get; set; }
        public string PaymentDescriptionTo { get; set; }
        public DateTime CreateDate { get; set; }
        public Guid UserId { get; set; }

        public BankStatementItemHistory()
        {
            CreateDate = DateTime.UtcNow;
            UserId = ApplicationContext.OriginatingUser.Id;
        }
    }
}