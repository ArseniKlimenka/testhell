using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.DigitalSignature.Responses
{
    public class SignPdfAttachmentsResponse
    {
        public bool HasErrors { get; set; } = false;
        public List<string> ErrorMessages { get; set; } = new List<string>();
    }
}
