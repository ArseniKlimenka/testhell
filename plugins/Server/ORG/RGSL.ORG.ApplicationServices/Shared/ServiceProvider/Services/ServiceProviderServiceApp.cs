using Adacta.AdInsure.RGSL.ORG.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.ORG.API.Shared.Commission.Services;
using Adacta.AdInsure.RGSL.ORG.API.Shared.ServiceProvider;
using Adacta.AdInsure.RGSL.ORG.Domain.ServiceProvider.Interfaces;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.ORG.ApplicationServices.Shared.ServiceProvider.Services
{
    public class ServiceProviderServiceApp : IServiceProviderServiceApp
    {
        private readonly IServiceProviderService _service;

        public ServiceProviderServiceApp(
            IServiceProviderService serviceProviderService)
        {
            _service = serviceProviderService;
        }

        public IList<ServiceProviderData> Search(ServiceProviderSearchRequest request)
        {
            return _service.Search(request);
        }
    }
}
