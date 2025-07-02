using Adacta.AdInsure.RGSL.ORG.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.ORG.API.Shared.ServiceProvider;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.ORG.API.Shared.Commission.Services
{
    public interface IServiceProviderServiceApp
    {
        IList<ServiceProviderData> Search(ServiceProviderSearchRequest request);
    }
}
