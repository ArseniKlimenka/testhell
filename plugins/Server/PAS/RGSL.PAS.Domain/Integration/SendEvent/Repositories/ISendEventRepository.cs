using Adacta.AdInsure.RGSL.PAS.Domain.Integration.SendEvent.DTO;

namespace Adacta.AdInsure.RGSL.PAS.Domain.Integration.SendEvent.Repositories
{
    public interface ISendEventRepository
    {
        void SetEventStatus(EventDomainRequest request);
    }
}
