using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Repositories
{
    public interface ICbrCurrencyRepository
    {
        void SaveCurrencyRates(IEnumerable<CurrencyExchangeRate> currencyExchangeRates);
        void DeleteCurrencyRates(DateTime exchangeRateDate);

        List<Currency> GetCurrencies();
        void SaveCurrencies(IEnumerable<Currency> currencies);
    }
}
