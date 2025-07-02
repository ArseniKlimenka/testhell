using Adacta.AdInsure.RGSL.PAS.API.Integration.SendEvent.DTO;

namespace Adacta.AdInsure.RGSL.PAS.API.Integration.SendEvent.Services
{
    public interface ISendEventService
    {
        void SendEvent(SendEventRequest request);

        void SendEventStatusChange(SendEventStatusChangeRequest request);

        void SendEventWriteError(SendEventStatusChangeRequest request);
    }
}
