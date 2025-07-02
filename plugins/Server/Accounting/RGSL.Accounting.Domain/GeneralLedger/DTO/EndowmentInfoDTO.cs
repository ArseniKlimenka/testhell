using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.DTO
{
    public class EndowmentInfoDTO
    {
        public string EndowmentNumber { get; set; }
        public string ContractNumber { get; set; }
        public string SelectedRiskCode { get; set; }
        public DateTime StatementApplicationDate { get; set; }
    }
}
