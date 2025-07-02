using Adacta.AdInsure.RGSL.Common.API.Shared.Constants;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Integration.DTOs
{
    public class SecurityCodeVerificationRequest
    {
        public string ReferenceNumber { get; set; }
        public string PartyCode { get; set; }
        public SecuritySmsTypeCode TypeCode { get; set; }
        public string SecurityCode { get; set; }
    }
}
