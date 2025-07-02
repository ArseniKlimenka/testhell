using Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Queries;

namespace Adacta.AdInsure.RGSL.Common.Infrastructure.Integration.Cbr.Queries
{
    public class CbrCurrencyQueries : ICbrCurrencyQueries
    {
        public string InsertCurrencyRate()
        {
            return @"
INSERT INTO BFX.CURRENCY_EXCHANGE_RATE
      (EXCHANGE_RATE_TYPE
      ,EXCHANGE_RATE_DATE
      ,CURRENCY_CODE
      ,EXCHANGE_RATE
      ,MODIFY_DATE
      ,UNIT)
VALUES
      (@ExchangeRateType
      ,@ExchangeRateDate
      ,@CurrencyCode
      ,@ExchangeRate
      ,@ModifiedAt
      ,@Unit
      )
";
        }

        public string DeleteRatesOnDate()
        {
            return @"
delete from BFX.CURRENCY_EXCHANGE_RATE
where EXCHANGE_RATE_DATE = @exchangeRateDate
";
        }

        public string InsertCurrency()
        {
            return @"
INSERT INTO BFX.CURRENCY_REF
       (CURRENCY_CODE
       ,ISO_NUMERIC_CODE)
 VALUES
       (@CurrencyCode
       ,@IsoNumericCode
        )
";
        }

        public string SelectCurrencies()
        {
            return @"select CURRENCY_CODE, ISO_NUMERIC_CODE from BFX.CURRENCY_REF";
        }

    }
}
