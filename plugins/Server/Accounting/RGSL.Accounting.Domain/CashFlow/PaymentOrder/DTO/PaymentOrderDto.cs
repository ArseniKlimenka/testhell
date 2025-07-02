using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.DTO
{
    public class PaymentOrderDto
    {
        public string PaymentOrderNumber { get; set; }
        public string PaymentOrderType { get; set; }
        public string PaymentOrderSubType { get; set; }
        public string ReferenceNumber { get; set; }
        public string ContractNumber { get; set; }
        public string ContractAmendmentNumber { get; set; }
        public string InsuranceActNumber { get; set; }
        public string RecipientPartyCode { get; set; }
        public string PaymentOrderCurrencyCode { get; set; }
        public string AmendmentType { get; set; }
        public string AmendmentReason { get; set; }
        public DateTime PaymentOrderDate { get; set; }
        public DateTime? AmendmentIssueDate { get; set; }
        public string MainRiskCode { get; set; }
    }
}
