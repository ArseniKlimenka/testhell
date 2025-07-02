using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Party.API.DTO
{
    public class GetContractorsResponse
    {
        public string Agreement { get; set; }
        public string Reason { get; set; }
        public string Reject { get; set; }
        public string Error { get; set; }
    }
}
