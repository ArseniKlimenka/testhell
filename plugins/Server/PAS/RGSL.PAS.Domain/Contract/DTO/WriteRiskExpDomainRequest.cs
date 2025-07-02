using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.PAS.Domain.Contract.DTO
{
    public class WriteRiskExpDomainRequest
    {
        public List<RiskExpDataDomain> Risks { get; set; }
    }

    public class RiskExpDataDomain
    {
        public int InsuredId { get; set; }

        public string ContractNumber { get; set; }

        public string RiskCode { get; set; }

        public Decimal ReinsRate { get; set; }

        public Decimal ReinsPremium { get; set; }
    }
}
