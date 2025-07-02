using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.Party.API.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Net;
using System.Text.RegularExpressions;
using RoutePrefix = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Adacta.AdInsure.RGSL.MockServices.WebAPI
{
    /// <summary>
    /// Controller that simulates RGSL service implementation
    /// </summary>
    [RoutePrefix("api/rgsl/mock-services/check-contractors")]
    public class CheckContractorsServiceController : AIApiController
    {
		[AllowAnonymous]
		[Route("simulate")]
        [HttpPost]
        public IActionResult Simulate()
        {
            string body;

            using (var reader = new StreamReader(Request.Body))
            {
                body = reader.ReadToEnd();
            }

            string responseXmlText;

            if (body.Contains("Плохишов", StringComparison.CurrentCulture))
            {
                responseXmlText = @"<soap:Envelope xmlns:soap=""http://www.w3.org/2003/05/soap-envelope"">
   <soap:Body>
      <m:GetContractorsResponse xmlns:m=""http://www.ads-soft.ru/ws_kpk/CheckData"">
         <m:return xmlns:xs=""http://www.w3.org/2001/XMLSchema"" xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"">
            <ContractorsResult xmlns=""http://www.ads-soft.ru/ws_kpk/Contractors"">
               <OutterID>TST2_0000000001</OutterID>
               <ResultPassportCheck>true</ResultPassportCheck>
               <ResultCheckFT>Нет</ResultCheckFT>
               <ResultCheckFROM>Нет</ResultCheckFROM>
               <ResultCheckMVK>Нет</ResultCheckMVK>
               <ResultCheckCBRF>Нет</ResultCheckCBRF>
               <RiskLevelOfContractorType>Высокий</RiskLevelOfContractorType>
               <RiskLevelOfCountryType>Низкий</RiskLevelOfCountryType>
               <RiskLevelOfOperationType>Низкий</RiskLevelOfOperationType>
               <RiskLevelSummary>Высокий</RiskLevelSummary>
               <Reason>При проверке контрагента Плохишов Максим Аркадьевич были выявлены факторы повышенного уровня риска:
По типу контрагента:
У контрагента недействительный паспорт.</Reason>
            </ContractorsResult>
            <Agreement xmlns=""http://www.ads-soft.ru/ws_kpk/Contractors"">НеТребуется</Agreement>
            <Reject xmlns=""http://www.ads-soft.ru/ws_kpk/Contractors"">true</Reject>
            <Reason xmlns=""http://www.ads-soft.ru/ws_kpk/Contractors"">Недействительный паспорт. Просьба заполнить данные по действительному паспорту. В случае наличия у клиента справки формы 1-П, обратиться по почте aml@rgsl.ru</Reason>
            <RiskLevelSummary xmlns=""http://www.ads-soft.ru/ws_kpk/Contractors"">Высокий</RiskLevelSummary>
         </m:return>
      </m:GetContractorsResponse>
   </soap:Body>
</soap:Envelope>";
            }
            else if (body.Contains("Ошибочный", StringComparison.InvariantCulture))
            {
                responseXmlText = @"<soap:Envelope xmlns:soap=""http://www.w3.org/2003/05/soap-envelope"">
    <soap:Body>
        <m:GetContractorsResponse xmlns:m=""http://www.ads-soft.ru/ws_kpk/CheckData"">
            <m:return xmlns:xs=""http://www.w3.org/2001/XMLSchema""
					xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"">
                <Error xmlns=""http://www.ads-soft.ru/ws_kpk/Standart"">true</Error>
                <ErrorsList xmlns=""http://www.ads-soft.ru/ws_kpk/Standart"">
                    <ErrorText>В базе КПК не назначено соотвествие идентификатору данной базы в справочнике ""Базы обмена"".</ErrorText>
                </ErrorsList>
                <Agreement xmlns=""http://www.ads-soft.ru/ws_kpk/Contractors"">false</Agreement>
                <Reject xmlns=""http://www.ads-soft.ru/ws_kpk/Contractors"">false</Reject>
                <Reason xmlns=""http://www.ads-soft.ru/ws_kpk/Contractors"">Заключение договора по данному ФИО невозможно без согласования с СФМиК. Просьба срочно обратиться по почте aml@rgsl.ru</Reason>
                <RiskLevelSummary xmlns=""http://www.ads-soft.ru/ws_kpk/Contractors"">Низкий</RiskLevelSummary>
            </m:return>
        </m:GetContractorsResponse>
    </soap:Body>
</soap:Envelope>";
            }
            else
            {
                responseXmlText = @"<soap:Envelope xmlns:soap=""http://www.w3.org/2003/05/soap-envelope"">
   <soap:Body>
      <m:GetContractorsResponse xmlns:m=""http://www.ads-soft.ru/ws_kpk/CheckData"">
         <m:return xmlns:xs=""http://www.w3.org/2001/XMLSchema"" xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"">
            <Agreement xmlns=""http://www.ads-soft.ru/ws_kpk/Contractors"">НеТребуется</Agreement>
            <Reject xmlns=""http://www.ads-soft.ru/ws_kpk/Contractors"">false</Reject>
            <Reason xmlns=""http://www.ads-soft.ru/ws_kpk/Contractors""/>
            <RiskLevelSummary xmlns=""http://www.ads-soft.ru/ws_kpk/Contractors"">Низкий</RiskLevelSummary>
         </m:return>
      </m:GetContractorsResponse>
   </soap:Body>
</soap:Envelope>";
            }

            return new ContentResult
            {
                Content = responseXmlText,
                ContentType = "application/xml",
                StatusCode = (int) HttpStatusCode.OK,
            };
        }

        [AllowAnonymous]
        [Route("simulate-parsed")]
        [HttpPost]
        public IActionResult SimulateParsedResponse()
        {
            string responseXmlText;

            responseXmlText = @"<soap:Envelope xmlns:soap=""http://www.w3.org/2003/05/soap-envelope"">
                   <soap:Body>
                      <m:GetContractorsResponse xmlns:m=""http://www.ads-soft.ru/ws_kpk/CheckData"">
                         <m:return xmlns:xs=""http://www.w3.org/2001/XMLSchema"" xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"">
                            <ContractorsResult xmlns=""http://www.ads-soft.ru/ws_kpk/Contractors"">
                               <OutterID>TST2_0000000001</OutterID>
                               <ResultPassportCheck>true</ResultPassportCheck>
                               <ResultCheckFT>Нет</ResultCheckFT>
                               <ResultCheckFROM>Нет</ResultCheckFROM>
                               <ResultCheckMVK>Нет</ResultCheckMVK>
                               <ResultCheckCBRF>Нет</ResultCheckCBRF>
                               <RiskLevelOfContractorType>Высокий</RiskLevelOfContractorType>
                               <RiskLevelOfCountryType>Низкий</RiskLevelOfCountryType>
                               <RiskLevelOfOperationType>Низкий</RiskLevelOfOperationType>
                               <RiskLevelSummary>Высокий</RiskLevelSummary>
                               <Reason>При проверке контрагента Плохишов Максим Аркадьевич были выявлены факторы повышенного уровня риска:
                По типу контрагента:
                У контрагента недействительный паспорт.</Reason>
                            </ContractorsResult>
                            <Agreement xmlns=""http://www.ads-soft.ru/ws_kpk/Contractors"">НеТребуется</Agreement>
                            <Reject xmlns=""http://www.ads-soft.ru/ws_kpk/Contractors"">true</Reject>
                            <Reason xmlns=""http://www.ads-soft.ru/ws_kpk/Contractors"">Недействительный паспорт. Просьба заполнить данные по действительному паспорту. В случае наличия у клиента справки формы 1-П, обратиться по почте aml@rgsl.ru</Reason>
                            <RiskLevelSummary xmlns=""http://www.ads-soft.ru/ws_kpk/Contractors"">Высокий</RiskLevelSummary>
                         </m:return>
                      </m:GetContractorsResponse>
                   </soap:Body>
                </soap:Envelope>";

            var cleanSoap = SOAPTrim(responseXmlText);
            var response = ConvertSoapToJson(cleanSoap);
            var responseJsonString = JsonConvert.SerializeObject(response);

            return new ContentResult
            {
                Content = responseJsonString,
                ContentType = "application/xml",
                StatusCode = (int) HttpStatusCode.OK,
            };
        }

        private GetContractorsResponse ConvertSoapToJson(string cleanSoap)
        {
            var response = new GetContractorsResponse();

            response.Agreement = Regex.Match(cleanSoap, @"(?<=<Agreement>)(.*)(?=</Agreement>)", RegexOptions.CultureInvariant).ToString();
            response.Reason = Regex.Match(cleanSoap, @"(?<=<Reason>)(.*)(?=</Reason>)", RegexOptions.CultureInvariant).ToString();
            response.Reject = Regex.Match(cleanSoap, @"(?<=<Reject>)(.*)(?=</Reject>)", RegexOptions.CultureInvariant).ToString();
            response.Error = Regex.Match(cleanSoap, @"(?<=<Error>)(.*)(?=</Error>)", RegexOptions.CultureInvariant).ToString();

            return response;
        }

        private string SOAPTrim(string soap)
        {
            string cleanPattern = @"\sxmlns:soap=""(.*?)""|\sxmlns:m=""(.*?)""|\sxmlns:xs=""(.*?)""|\sxmlns:xsi=""(.*?)""|\sxmlns=""(.*?)""|soap:|m:";
            Regex regClean = new Regex(cleanPattern, RegexOptions.CultureInvariant);

            var clean = regClean.Replace(soap, "");

            return clean;
        }
    }
}
