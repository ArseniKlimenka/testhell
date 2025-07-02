using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.DTO
{
    public class PaymentDimensionsDTO
    {
        public long BankStatementItemId { get; set; }
        public DateTime? PaymentDate { get; set; }
    }
}
