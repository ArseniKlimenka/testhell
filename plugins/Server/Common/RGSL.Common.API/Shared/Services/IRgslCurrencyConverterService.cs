using Adacta.AdInsure.Core.API.Shared.DTO;
using Adacta.AdInsure.Framework.Core.Domain.Common;
using Adacta.AdInsure.RGSL.Common.API.Shared.Requests;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Services
{
    public interface IRgslCurrencyConverterService
    {
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        ConversionResponse Convert(CurrencyConversionRequest request);
    }
}
