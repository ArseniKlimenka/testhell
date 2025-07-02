using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.DTO
{
    public class RiskDTO
    {
        public string Code { get; set; }
        
        public string BusinessLine { get; set; }
        
        public bool IsLife { get; set; }

    }
}
