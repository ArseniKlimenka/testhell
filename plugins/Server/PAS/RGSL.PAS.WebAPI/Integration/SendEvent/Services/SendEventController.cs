using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.PAS.API.Integration.SendEvent.DTO;
using Adacta.AdInsure.RGSL.PAS.API.Integration.SendEvent.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text.Json;

namespace Adacta.AdInsure.RGSL.WebAPI.Integration.SendEvent.Services
{
    [Route("api/rgsl/integration")]
    public class SendEventController : AIApiController
    {
        private readonly ISendEventService _sendEventService;

        public SendEventController(ISendEventService sendEventService)
        {
            _sendEventService = sendEventService;
        }

        [HttpPost, Route("send-event")]
        public void SendEvent([FromBody] JObject request)
        {
            var applicationRequest = JsonConvert.DeserializeObject<SendEventRequest>(request.ToString());

            _sendEventService.SendEvent(applicationRequest);
        }

        [HttpPost, Route("send-event-status-change")]
        public void SendEventStatusChange([FromBody] JObject request)
        {
            var applicationRequest = JsonConvert.DeserializeObject<SendEventStatusChangeRequest>(request.ToString());

            _sendEventService.SendEventStatusChange(applicationRequest);
        }

        [HttpPost, Route("send-event-write-error")]
        public void SendEventWriteError([FromBody] JObject request)
        {
            var applicationRequest = JsonConvert.DeserializeObject<SendEventStatusChangeRequest>(request.ToString());

            _sendEventService.SendEventWriteError(applicationRequest);
        }
    }
}
