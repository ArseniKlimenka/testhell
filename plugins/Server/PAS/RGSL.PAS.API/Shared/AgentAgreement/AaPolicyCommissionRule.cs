using System;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement
{
    public class AaPolicyCommissionRule
    {
        public string ContractNumber { get; set; }
        public int InsuranceYear { get; set; }
        public DateTime DueDate { get; set; }
        public decimal? CommRate { get; set; }
        public decimal ExpensesRate { get; set; }
        public decimal NaturalPersonRate { get; set; }
        public decimal SolePropriatorRate { get; set; }
    }
}
