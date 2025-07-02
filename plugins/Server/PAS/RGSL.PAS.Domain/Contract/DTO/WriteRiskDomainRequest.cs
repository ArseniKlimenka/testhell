using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.PAS.Domain.Contract.DTO
{
    public class WriteRiskDomainRequest
    {
        public List<RiskDataDomain> Risks { get; set; }
    }

    public class RiskDataDomain
    {
        public int InsuredId { get; set; }

        public string ContractNumber { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string RiskCode { get; set; }

        public Decimal Amount { get; set; }

        public Decimal Premium { get; set; }
    }
}
