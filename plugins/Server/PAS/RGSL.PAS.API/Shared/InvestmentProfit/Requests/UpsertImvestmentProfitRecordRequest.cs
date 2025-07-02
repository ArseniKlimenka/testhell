using System;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.InvestmentProfit.Requests
{
    public class UpsertImvestmentProfitRecordRequest
    {
        public Guid ImportDocumentId { get; set; }
        public string ContractNumber { get; set; }
        public DateTime CalculationDate { get; set; }
        public decimal Rate { get; set; }
        public int PaymentTypeCode { get; set; }
    }
}
