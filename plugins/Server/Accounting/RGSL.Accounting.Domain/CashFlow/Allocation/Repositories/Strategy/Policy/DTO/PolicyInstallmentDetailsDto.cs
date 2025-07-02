using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.Policy.DTO
{
    public class PolicyInstallmentDetailsDto
    {
        public DateTime DueDate { get; set; }
        public DateTime PostingDate { get; set; }
        public string ObjectCode { get; set; }
        public string CurrencyCode { get; set; }
        public string SourceLineId { get; set; }
        public bool IsLife { get; set; }
        public bool IsFirstInstallment { get; set; }
        public decimal Amount { get; set; }
        public decimal OpenAmount { get; set; }
    }
}
