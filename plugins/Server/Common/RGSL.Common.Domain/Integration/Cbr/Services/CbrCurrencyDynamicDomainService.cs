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
    public class CbrCurrencyDynamicDomainService : ICbrCurrencyDynamicDomainService
    {
        private readonly ICbrCurrencyRepository _repository;
        private readonly ICommonIntegrationSettings _settings;
        private readonly ICacheProvider _cacheProvider;
        private RestClient _client;
        private readonly Lazy<ILogger> _logger;

        public CbrCurrencyDynamicDomainService(ICbrCurrencyRepository cbrIntegrationRepository, ICommonIntegrationSettings settings, ICacheProvider cacheProvider)
        {
            _repository = cbrIntegrationRepository;
            _settings = settings;
            _cacheProvider = cacheProvider;
            _client = new RestClient(_settings.WebServiceDailyInfoCbrUrl);
            _logger = new Lazy<ILogger>(() => LogManagerAccessor.GetLogger(LogConstants.CbrIntegration));
        }


        public DateTime LoadCurrencyDynamic(DateTime fromDate, DateTime toDate, string currencyCode)
        {
            return ProcessCurrencyRates(fromDate, toDate, currencyCode);
        }

        private DateTime ProcessCurrencyRates(DateTime? fromDate, DateTime? toDate, string currencyCode)
        {
            DateTime dynamicLoadDate = DateTime.Now;
            DateTime BeginDynamicPeriodDate = fromDate.HasValue ? fromDate.Value : DateTime.Now;
            DateTime EndDynamicPeriodDate = toDate.HasValue ? toDate.Value : DateTime.Now;

            var cbrInternalCurrencyCode = GetCbrInternalCurrencyCode(currencyCode); //"R01235";

            try
            {
                RestRequest request = new(string.Empty, Method.Post);
                request.AddHeader("SOAPAction", "http://web.cbr.ru/GetCursDynamic");
                request.AddHeader("Content-Type", "text/xml; charset=utf-8");

                request.AddParameter("text/xml",
                    $@"<?xml version=""1.0"" encoding=""utf-8""?>
                <soap:Envelope xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" xmlns:xsd=""http://www.w3.org/2001/XMLSchema"" xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"">
                <soap:Body>
                <GetCursDynamic xmlns=""http://web.cbr.ru/"">
                <FromDate>{BeginDynamicPeriodDate.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture)}</FromDate>
                <ToDate>{EndDynamicPeriodDate.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture)}</ToDate>
                <ValutaCode>{cbrInternalCurrencyCode}</ValutaCode>
                </GetCursDynamic>
                </soap:Body>
                </soap:Envelope>",
                    ParameterType.RequestBody);

                var response = _client.Execute(request);

                var xDoc = XDocument.Parse(response.Content);


                var rates = xDoc.Descendants("ValuteCursDynamic")
                    .Select(e => new CurrencyExchangeRate
                    {
                        CurrencyNumericCode = e.Element("Vcode").Value,
                        CurrencyCode = currencyCode,
                        ExchangeRateType = 1,
                        ExchangeRateDate = DateTime.ParseExact(e.Element("CursDate").Value, "yyyy-MM-ddTHH:mm:sszzz", CultureInfo.InvariantCulture).Date,
                        ExchangeRate = decimal.Parse(e.Element("Vcurs").Value, NumberStyles.Float, CultureInfo.InvariantCulture),
                        ModifiedAt = DateTime.Now,
                        Unit = int.Parse(e.Element("Vnom").Value, NumberStyles.Integer, CultureInfo.InvariantCulture)
                    })
                    .OrderBy(e => e.ExchangeRateDate);

                _repository.SaveCurrencyRates(rates);

            }
            catch (Exception e)
            {
                _logger.Value.LogError("GetCursDynamic request was unsuccessfull. : {0}", e.Message);
                throw new Exception(e.Message);
            }

            _cacheProvider.GetCache("Core:ExchangeRate")?.Clear();
            return dynamicLoadDate;
        }

        private string GetCbrInternalCurrencyCode(string currencyCode)
        {
            var cbrInternalCurrencyCode = string.Empty;
            var seld = 0; // 0 - monthly loaded currencies (check service description on https://www.cbr.ru/development/dws/)

            try
            {
                RestRequest request = new(string.Empty, Method.Post);
                request.AddHeader("SOAPAction", "http://web.cbr.ru/EnumValutes");
                request.AddHeader("Content-Type", "text/xml; charset=utf-8");

                request.AddParameter("text/xml",
                    $@"<?xml version=""1.0"" encoding=""utf-8""?>
                <soap:Envelope xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" xmlns:xsd=""http://www.w3.org/2001/XMLSchema"" xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"">
                    <soap:Body>
                        <EnumValutes xmlns=""http://web.cbr.ru/"">
                            <Seld>{seld}</Seld>
                        </EnumValutes>
                    </soap:Body>
                </soap:Envelope>",
                    ParameterType.RequestBody);

                var response = _client.Execute(request);

                var xDoc = XDocument.Parse(response.Content);

                cbrInternalCurrencyCode = (string) xDoc.Descendants("EnumValutes")
                     .First(_ => _.Element("VcharCode").Value == currencyCode);
            }
            catch (Exception e)
            {
                _logger.Value.LogError("EnumValutes was unsuccessfull : {0}", e.Message);
                throw new Exception(e.Message);
            }

            return cbrInternalCurrencyCode;

        }
    }
}