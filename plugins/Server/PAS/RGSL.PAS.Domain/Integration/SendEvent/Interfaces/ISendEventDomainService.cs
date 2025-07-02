using Adacta.AdInsure.RGSL.PAS.API.Integration.SendEvent.DTO;
using Adacta.AdInsure.RGSL.PAS.Domain.Integration.SendEvent.DTO;

namespace Adacta.AdInsure.RGSL.PAS.Domain.Integration.SendEvent.Interfaces
{
    public interface ISendEventDomainService
    {
        void SendEvent(SendEventDomainRequest request);

		void SendEventStatusChange(SendEventStatusChangeRequest request);

		void SendEventWriteError(SendEventStatusChangeRequest request);
	}
}
