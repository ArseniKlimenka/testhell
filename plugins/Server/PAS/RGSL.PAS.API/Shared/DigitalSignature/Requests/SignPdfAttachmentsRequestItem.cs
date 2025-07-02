using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.DigitalSignature.Requests
{
    public class SignPdfAttachmentsRequestItem
    {
        public string Number { get; set; }
        public bool RegenerateBaseAttachment { get; set; }
    }
}
