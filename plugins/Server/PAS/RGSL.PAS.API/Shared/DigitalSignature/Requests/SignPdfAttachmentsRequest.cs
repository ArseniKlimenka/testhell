using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.DigitalSignature.Requests
{
    public  class SignPdfAttachmentsRequest
    {
        public List<SignPdfAttachmentsRequestItem> Items { get; set; }
    }
}
