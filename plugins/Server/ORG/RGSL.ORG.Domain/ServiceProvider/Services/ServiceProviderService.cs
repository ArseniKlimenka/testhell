using Adacta.AdInsure.RGSL.ORG.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.ORG.API.Shared.ServiceProvider;
using Adacta.AdInsure.RGSL.ORG.Domain.ServiceProvider.Interfaces;
using Adacta.AdInsure.RGSL.ORG.Domain.ServiceProvider.Repositories;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.ORG.Domain.ServiceProvider.Services
{
    public class ServiceProviderService : IServiceProviderService
    {
        private readonly IServiceProviderRepository _repository;

        public ServiceProviderService(IServiceProviderRepository repository)
        {
            _repository = repository;
        }

        public IList<ServiceProviderData> Search(ServiceProviderSearchRequest request)
        {
            return _repository.Search(request);
        }
    }
}
