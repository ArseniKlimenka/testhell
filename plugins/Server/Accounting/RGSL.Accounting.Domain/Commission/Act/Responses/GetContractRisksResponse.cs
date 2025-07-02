using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Responses
{
    public class GetContractRisksResponse
    {
        public IList<GetContractRisksResponseItem> Items { get; set; }
    }

    public class GetContractRisksResponseItem
    {
        public string ContractNumber { get; set; }
        public string RiskCode { get; set; }
        public decimal Premium { get; set; }
    }
}
