using System;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.DigitalSignature.Requests
{
    public class SignFileRequest
    {
        public Guid FileId { get; set; }
        public string NewFileName { get; set; }
    }
}
