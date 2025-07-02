using Adacta.AdInsure.RGSL.Common.API.Shared.Integration.DTOs;
using Adacta.AdInsure.RGSL.Common.API.Shared.Integration.Services;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Interfaces;

using System;

namespace Adacta.AdInsure.RGSL.Common.ApplicationServices.Shared.Integration
{
    public class CbrCurrencyService : ICbrCurrencyService
    {
        #region private fields

        private readonly ICbrCurrencyDomainService _domainService;

        #endregion

        #region .ctor

        public CbrCurrencyService(ICbrCurrencyDomainService domainService)
        {
            _domainService = domainService;
        }

        #endregion

        #region ICbrIntegrationService

        public LoadCurrencyRatesResponse LoadCurrencyRates(LoadCurrencyRatesRequest request)
        {
            DateTime loadedOnDate;

            if (request?.OnDate.HasValue == true)
            {
                loadedOnDate = _domainService.LoadCurrencyRates(request.OnDate.Value);
            }
            else
            {
                loadedOnDate = _domainService.LoadCurrentCurrencyRates();
            }

            return new LoadCurrencyRatesResponse() { LoadedOnDate = loadedOnDate };
        }

        #endregion
    }
}