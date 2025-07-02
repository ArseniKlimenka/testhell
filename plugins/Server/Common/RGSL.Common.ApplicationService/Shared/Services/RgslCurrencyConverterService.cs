using Adacta.AdInsure.Core.API.Shared.DTO;
using Adacta.AdInsure.Core.API.Shared.Services;
using Adacta.AdInsure.Framework.Core.Ioc.Ninject;
using Adacta.AdInsure.RGSL.Common.API.Shared.Requests;
using Adacta.AdInsure.RGSL.Common.API.Shared.Services;

namespace Adacta.AdInsure.RGSL.Common.ApplicationServices.Shared.Services
{
    public class RgslCurrencyConverterService : IRgslCurrencyConverterService
    {
        private ICurrencyConverterService _coreService;
        public RgslCurrencyConverterService()
        {
            _coreService = NinjectKernel.Instance.Get<ICurrencyConverterService>();
        }

        public ConversionResponse Convert(CurrencyConversionRequest request)
        {
            return _coreService.Convert(request.Amount, request.FromCurrencyCode, request.ToCurrencyCode, request.AtDate);
        }
    }
}
