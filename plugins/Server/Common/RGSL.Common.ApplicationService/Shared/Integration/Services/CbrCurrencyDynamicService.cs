using Adacta.AdInsure.RGSL.Common.API.Shared.Integration.DTOs;
using Adacta.AdInsure.RGSL.Common.API.Shared.Integration.Services;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Interfaces;

using System;

namespace Adacta.AdInsure.RGSL.Common.ApplicationServices.Shared.Integration
{
    public class CbrCurrencyDynamicService : ICbrCurrencyDynamicService
    {
        #region private fields

        private readonly ICbrCurrencyDynamicDomainService _domainService;

        #endregion

        #region .ctor

        public CbrCurrencyDynamicService(ICbrCurrencyDynamicDomainService domainService)
        {
            _domainService = domainService;
        }

        #endregion

        #region ICbrIntegrationService

        public LoadCurrencyDynamicResponse LoadCurrencyDynamic(LoadCurrencyDynamicRequest request)
        {
            DateTime loadedOnDate = _domainService.LoadCurrencyDynamic(
                request.FromDate.Value,
                request.ToDate.Value,
                request.CurrencyCode);
            return new LoadCurrencyDynamicResponse() { LoadedOnDate = loadedOnDate };
        }

        #endregion
    }
}