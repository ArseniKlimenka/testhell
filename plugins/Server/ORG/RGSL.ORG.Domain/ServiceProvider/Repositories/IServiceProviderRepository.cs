using Adacta.AdInsure.RGSL.ORG.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.ORG.API.Shared.ServiceProvider;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.ORG.Domain.ServiceProvider.Repositories
{
    public interface IServiceProviderRepository
    {
        IList<ServiceProviderData> Search(ServiceProviderSearchRequest request);
    }
}
