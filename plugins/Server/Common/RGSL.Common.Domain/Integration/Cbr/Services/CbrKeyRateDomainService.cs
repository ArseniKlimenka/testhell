using Adacta.AdInsure.Framework.Core.Logging;
using Adacta.AdInsure.RGSL.Common.API.Constants;
using Adacta.AdInsure.RGSL.Common.API.Shared.Integration.DTOs;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Interfaces;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Repositories;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Settings;
using Microsoft.Extensions.Logging;
using RestSharp;
using System;
using System.Globalization;
using System.Linq;
using System.Xml.Linq;
using WebSocketSharp;

namespace Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Services
{
    public class CbrKeyRateDomainService : ICbrKeyRateDomainService
    {
        private readonly ICommonIntegrationSettings _settings;
        private readonly ICbrKeyRateRepository _repository;        
        private readonly RestClient _client;
        private readonly Lazy<ILogger> _logger;

        public CbrKeyRateDomainService(ICbrKeyRateRepository repository, ICommonIntegrationSettings settings)
        {
            _settings = settings;
            _repository = repository;
            _client = new RestClient(_settings.WebServiceDailyInfoCbrUrl);
            _logger = new Lazy<ILogger>(() => LogManagerAccessor.GetLogger(LogConstants.CbrIntegration));
        }

        public void KeyRateImport()
        {
            try
            {
                // Get last rate
                var lastRate = _repository.GetLastKeyRate();                

                // Get rates from CBRF
                // From 2008 year by default
                DateTime fromDate = new(2008, 1, 1);

                if (lastRate != null)
                {
                    fromDate = lastRate.RateDate;
                }
                else 
                {
                    lastRate = new CbrKeyRate { Rate = 0, RateDate = DateTime.Now };
                }

                RestRequest request = new(string.Empty, Method.Post);
                request.AddHeader("SOAPAction", "http://web.cbr.ru/KeyRate");
                request.AddHeader("Content-Type", "text/xml; charset=utf-8");

                request.AddParameter("text/xml",
                    $@"<?xml version=""1.0"" encoding=""utf-8""?>
                <soap:Envelope xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" xmlns:xsd=""http://www.w3.org/2001/XMLSchema"" xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"">
                <soap:Body>
                <KeyRate xmlns=""http://web.cbr.ru/"">
                <fromDate>{GetDateForRequest(fromDate)}</fromDate>
                <ToDate>{GetDateForRequest(DateTime.Now)}</ToDate>
                </KeyRate>
                </soap:Body>
                </soap:Envelope>",
                    ParameterType.RequestBody);

                var response = _client.Execute(request);

                var xDoc = XDocument.Parse(response.Content);

                var rates = xDoc.Descendants("KR")
                    .Select(e => new
                    {
                        Date = DateTime.ParseExact(e.Element("DT").Value,
                            "yyyy-MM-ddTHH:mm:sszzz", CultureInfo.InvariantCulture).Date,
                        Rate = float.Parse(e.Element("Rate").Value, NumberStyles.Float,
                            CultureInfo.InvariantCulture)
                    })
                    .OrderBy(e => e.Date);

                // Add new rate(s)
                foreach (var rate in rates)
                {
                    // Add if new rate
                    if (rate.Rate != lastRate.Rate)
                    {
                        _repository.AddKeyRate(rate.Rate, rate.Date);

                        lastRate = _repository.GetLastKeyRate();
                    }
                }

            }
            catch (Exception e)
            {
                _logger.Value.LogError("KeyRate request was unsuccessfull. : {0}", e.Message);
                throw new Exception(e.Message);
            }
        }

        public float KeyRateByDate(LoadCbrKeyRateRequest request)
        {
            float res = 0;
            var rate = _repository.GetKeyRateByDate(request.Date);
            
            if (rate != null)
            {
                res = rate.Rate;
            }

            return res;
        }

        private static string GetDateForRequest(DateTime date)
        {
            return date.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);
        }
    }
}