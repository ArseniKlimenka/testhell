using Newtonsoft.Json;
using System;

namespace Adacta.AdInsure.RGSL.PAS.API.Integration.SendEvent.DTO
{
    public class SendEventRequest
    {
        [JsonProperty("sendEventId")]
        public string SendEventId { get; set; }

        [JsonProperty("subscriber")]
        public string Subscriber { get; set; }

        [JsonProperty("uri")]
        public Uri Uri { get; set; }

        [JsonProperty("login")]
        public string Login { get; set; }

        [JsonProperty("password")]
        public string Password { get; set; }

        [JsonProperty("request")]
        public string Request { get; set; }

        [JsonProperty("curlPath")]
        public string CurlPath { get; set; }

        [JsonProperty("certPath")]
        public string CertPath { get; set; }

        [JsonProperty("keyPath")]
        public string KeyPath { get; set; }

        [JsonProperty("passPhrase")]
        public string PassPhrase { get; set; }

        [JsonProperty("token")]
        public string Token { get; set; }
    }
}
