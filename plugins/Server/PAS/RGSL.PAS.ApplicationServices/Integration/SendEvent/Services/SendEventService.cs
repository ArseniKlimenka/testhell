using Adacta.AdInsure.RGSL.PAS.API.Integration.SendEvent.DTO;
using Adacta.AdInsure.RGSL.PAS.API.Integration.SendEvent.Services;
using Adacta.AdInsure.RGSL.PAS.ApplicationServices.Integration.SendEvent.Converters;
using Adacta.AdInsure.RGSL.PAS.Domain.Integration.SendEvent.Interfaces;

namespace Adacta.AdInsure.RGSL.PAS.ApplicationServices.Integration.SendEvent.Services
{
    public class SendEventService : ISendEventService
    {
        private ISendEventDomainService _sendEventDomainService;

        public SendEventService(ISendEventDomainService sendEventDomainService)
        {
            _sendEventDomainService = sendEventDomainService;
        }

        public void SendEvent(SendEventRequest request)
        {
            var domainRequest = SendEventConverter.Convert(request);
            _sendEventDomainService.SendEvent(domainRequest);
        }

        public void SendEventStatusChange(SendEventStatusChangeRequest request)
        {
            _sendEventDomainService.SendEventStatusChange(request);
        }

        public void SendEventWriteError(SendEventStatusChangeRequest request)
        {
            _sendEventDomainService.SendEventWriteError(request);
        }
    }
}
