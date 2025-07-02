using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Integration.DTOs
{
    public class LoadCbrKeyRateRequest
    {
        /// <summary>
        /// date for which you want to receive the key rate
        /// </summary>
        public DateTime Date { get; set; }
    }
}
