using System;
using System.Globalization;
using System.Linq;
using System.Xml.Linq;
using Adacta.AdInsure.Framework.Core.Cache;
using Adacta.AdInsure.Framework.Core.Logging;
using Adacta.AdInsure.RGSL.Common.API.Constants;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Interfaces;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Repositories;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Settings;
using Microsoft.Extensions.Logging;
using RestSharp;

namespace Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Services
{
    public class CbrCurrencyDomainService : ICbrCurrencyDomainService
    {
        private readonly ICbrCurrencyRepository _repository;
        private readonly ICommonIntegrationSettings _settings;
        private readonly ICacheProvider _cacheProvider;
        private RestClient _client;
        private readonly Lazy<ILogger> _logger;

        public CbrCurrencyDomainService(ICbrCurrencyRepository cbrIntegrationRepository, ICommonIntegrationSettings settings, ICacheProvider cacheProvider)
        {
            _repository = cbrIntegrationRepository;
            _settings = settings;
            _cacheProvider = cacheProvider;
            _client = new RestClient(_settings.WebServiceDailyInfoCbrUrl);
            _logger = new Lazy<ILogger>(() => LogManagerAccessor.GetLogger(LogConstants.CbrIntegration));
        }

        public DateTime LoadCurrentCurrencyRates()
        {
            return ProcessCurrencyRates(null);
        }

        public DateTime LoadCurrencyRates(DateTime onDate)
        {
            return ProcessCurrencyRates(onDate);
        }

        private DateTime ProcessCurrencyRates(DateTime? onDate)
        {
            DateTime exchangeRateDate = onDate.HasValue ? onDate.Value : DateTime.Now;
            exchangeRateDate = exchangeRateDate.Date;

            try
            {
                RestRequest request = new(string.Empty, Method.Post);
                request.AddHeader("SOAPAction", "http://web.cbr.ru/GetCursOnDate");
                request.AddHeader("Content-Type", "text/xml; charset=utf-8");

                request.AddParameter("text/xml",
                    $@"<?xml version=""1.0"" encoding=""utf-8""?>
                <soap:Envelope xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" xmlns:xsd=""http://www.w3.org/2001/XMLSchema"" xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"">
                <soap:Body>
                <GetCursOnDate xmlns=""http://web.cbr.ru/"">
                <On_date>{exchangeRateDate.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture)}</On_date>
                </GetCursOnDate>
                </soap:Body>
                </soap:Envelope>",
                    ParameterType.RequestBody);

                var response = _client.Execute(request);

                var xDoc = XDocument.Parse(response.Content);

                var rates = xDoc.Descendants("ValuteCursOnDate")
                    .Select(e => new CurrencyExchangeRate
                    {
                        CurrencyNumericCode = e.Element("Vcode").Value,
                        CurrencyCode = e.Element("VchCode").Value,
                        ExchangeRateType = 1,
                        ExchangeRateDate = exchangeRateDate,
                        ExchangeRate = decimal.Parse(e.Element("Vcurs").Value, NumberStyles.Float, CultureInfo.InvariantCulture),
                        ModifiedAt = DateTime.Now,
                        Unit = int.Parse(e.Element("Vnom").Value, NumberStyles.Integer, CultureInfo.InvariantCulture)
                    })
                    .OrderBy(e => e.CurrencyCode);

                _repository.DeleteCurrencyRates(exchangeRateDate);
                _repository.SaveCurrencyRates(rates);

                _cacheProvider.GetCache("Core:ExchangeRate")?.Clear();

                return exchangeRateDate;

            }
            catch (Exception e)
            {
                _logger.Value.LogError("GetCursOnDate request was unsuccessfull. : {0}", e.Message);
                throw new Exception(e.Message);
            }
        }
    }
}