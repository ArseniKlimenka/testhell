using Newtonsoft.Json;

namespace Adacta.AdInsure.RGSL.PAS.API.Integration.SendEvent.DTO
{
    public class SendEventResponse
    {
        [JsonProperty("requestId")]
        public string RequestId { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }

        [JsonProperty("error")]
        public SendEventErrorResponse Error { get; set; }

        [JsonProperty("response")]
        public string Response { get; set; }
    }

    public class SendEventErrorResponse
    {
        [JsonProperty("errorType")]
        public string ErrorType { get; set; }

        [JsonProperty("errorCode")]
        public string ErrorCode { get; set; }

        [JsonProperty("errorText")]
        public string ErrorText { get; set; }
    }
}
