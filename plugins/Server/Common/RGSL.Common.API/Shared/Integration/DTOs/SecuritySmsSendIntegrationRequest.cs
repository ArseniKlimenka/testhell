namespace Adacta.AdInsure.RGSL.Common.API.Shared.Integration.DTOs
{
    public class SecuritySmsSendIntegrationRequest
    {
        public string Message { get; set; }
        public string PhoneNumber { get; set; }
        public string SecurityCode { get; set; }
        public string ProductCode { get; set; }
        public string SourceType { get; set; }
    }
}
