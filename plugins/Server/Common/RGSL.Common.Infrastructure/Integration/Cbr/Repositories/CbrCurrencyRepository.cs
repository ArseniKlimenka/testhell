using Adacta.AdInsure.Framework.Core.Data.Orm;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Queries;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Repositories;
using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Common.Infrastructure.Integration.Cbr.Repositories
{
    public class CbrCurrencyRepository : ICbrCurrencyRepository
    {

        private readonly ICbrCurrencyQueries _queries;
        private readonly DatabaseFactory _databaseFactory;

        public CbrCurrencyRepository(DatabaseFactory databaseFactory, ICbrCurrencyQueries queries)
        {
            _queries = queries;
            _databaseFactory = databaseFactory;
        }

        public void SaveCurrencyRates(IEnumerable<CurrencyExchangeRate> currencyExchangeRates)
        {
            using (var db = _databaseFactory.CreateDatabase())
            {
                db.InsertBulk(_queries.InsertCurrencyRate(), currencyExchangeRates);
            }
        }

        public void DeleteCurrencyRates(DateTime exchangeRateDate)
        {
            object input = new { exchangeRateDate };

            using (var db = _databaseFactory.CreateDatabase())
            {
                db.Execute(_queries.DeleteRatesOnDate(), input);
            }
        }

        public void SaveCurrencies(IEnumerable<Currency> currencies)
        {
            using (var db = _databaseFactory.CreateDatabase())
            {
                db.InsertBulk(_queries.InsertCurrency(), currencies);
            }
        }

        public List<Currency> GetCurrencies()
        {
            using (var db = _databaseFactory.CreateDatabase())
            {
                return db.Fetch<Currency>(_queries.SelectCurrencies());
            }
        }
    }
}
