using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.Common.API.Shared.Integration.DTOs;
using Adacta.AdInsure.RGSL.Common.API.Shared.Integration.Services;
using Microsoft.AspNetCore.Mvc;

namespace Adacta.AdInsure.RGSL.Common.WebAPI.Integration
{
    [Route("api/rgsl/common/shared/cbr-integration")]
    public class CbrIntegrationController : AIApiController
    {
        private readonly ICbrCurrencyService _currencyService;
        private readonly ICbrKeyRateService _keyRateService;
        private readonly ICbrCurrencyDynamicService _currencyDynamicService;

        public CbrIntegrationController(
            ICbrCurrencyService currencyService,
            ICbrKeyRateService keyRateService,
            ICbrCurrencyDynamicService currencyDynamicService)
        {
            _currencyService = currencyService;
            _keyRateService = keyRateService;
            _currencyDynamicService = currencyDynamicService;
        }

        [HttpPost, Route("load-currency-rates")]
        public LoadCurrencyRatesResponse LoadCurrencyRates(LoadCurrencyRatesRequest request)
        {
            return _currencyService.LoadCurrencyRates(request);
        }

        [HttpPost, Route("load-key-rate")]
        public LoadKeyRateResponse LoadKeyRate(LoadKeyRateRequest request)
        {
            return _keyRateService.LoadKeyRate(request);
        }

        [HttpPost, Route("load-currency-dynamic")]
        public LoadCurrencyDynamicResponse LoadCurrencyDynamic(LoadCurrencyDynamicRequest request)
        {
            return _currencyDynamicService.LoadCurrencyDynamic(request);
        }

    }
}