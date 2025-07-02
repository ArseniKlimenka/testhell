using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Party.API.DTO
{
    public class GetMultipleContractorsRequest
    {
        public JArray RequestData { get; set; }
    }
}
