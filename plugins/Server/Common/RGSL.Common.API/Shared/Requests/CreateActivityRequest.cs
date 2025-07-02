using Adacta.AdInsure.Framework.Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Requests
{
    public class CreateActivityRequest
    {
        public DateTime MessageTimestampUtc { get; set;}
        public string MessageCorrelationId { get; set; }
        public JsonObject MessageBody { get; set; }
    }
}
