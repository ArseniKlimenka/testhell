using Adacta.AdInsure.RGSL.Common.API.Shared.Constants;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Integration.DTOs
{
    public class SecuritySmsSendRequest
    {
        public SecuritySmsTypeCode SmsTypeCode { get; set; }

        public string ReferenceNumber { get; set; }

        public string PartyCode { get; set; }

        public string PhoneNumber { get; set; }

        public string Message { get; set; }

        public string SecurityCodeMessageTag { get; set; }

        public int SecurityCodeDigitsCount { get; set; }

        public bool ThrowOnIntegrationError { get; set; } = true;

        public string ProductCode { get; set; }

        public string SourceType { get; set; }
    }
}
