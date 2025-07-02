namespace Adacta.AdInsure.RGSL.PAS.Domain.Contract.DTO
{
    public class ClearRiskListDomainRequest
    {
        public string ContractNumber { get; set; }

        public bool IsNeedClearSummaryRiskData { get; set; }
    }
}
