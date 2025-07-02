using Newtonsoft.Json;
using System;

namespace Adacta.AdInsure.RGSL.PAS.API.Integration.SendEvent.DTO
{
    public class SendEventStatusChangeRequest
    {
        [JsonProperty("sendEventId")]
        public string SendEventId { get; set; }

        [JsonProperty("response")]
        public string Response { get; set; }
    }
}
