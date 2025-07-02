using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.DTO
{
    public class PaymentOrderRiskDto
    {
        public string PaymentOrderType { get; set; }
        public string PaymentOrderSubType { get; set; }
        public string RiskCode { get; set; }
        public string RisksGroup { get; set; }
    }
}
