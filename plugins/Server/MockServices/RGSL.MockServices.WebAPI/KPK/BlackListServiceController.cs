using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Net;
using RoutePrefix = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Adacta.AdInsure.RGSL.MockServices.WebAPI
{
    /// <summary>
    /// Controller that simulates RGSL service implementation
    /// </summary>
    [RoutePrefix("api/rgsl/mock-services/check-black-list")]
    public class BlackListServiceController : AIApiController
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
      <m:CheckBlackListAgreementResponse xmlns:m=""http://www.ads-soft.ru/ws_kpk/BlackListAgreement"">
         <m:return xmlns:xs=""http://www.w3.org/2001/XMLSchema"" xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"">
            <m:ContractorsResult>
               <m:Role>Клиент</m:Role>
               <m:OuterID>2727727272111</m:OuterID>
               <m:Find>true</m:Find>
            </m:ContractorsResult>
            <m:Agreement>Контрагент входит в ЧС. Действие запрещено.</m:Agreement>
            <m:Reason/>
         </m:return>
      </m:CheckBlackListAgreementResponse>
   </soap:Body>
</soap:Envelope>";
            }
            else if (body.Contains("Ошибочный", StringComparison.InvariantCulture))
            {
                responseXmlText = @"<soap:Envelope xmlns:soap=""http://www.w3.org/2003/05/soap-envelope"">
   <soap:Body>
      <m:CheckBlackListAgreementResponse xmlns:m=""http://www.ads-soft.ru/ws_kpk/BlackListAgreement"">
         <m:return xmlns:xs=""http://www.w3.org/2001/XMLSchema"" xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"">
            <m:ContractorsResult>
               <m:PhysicalSection xmlns:d6p1=""http://www.ads-soft.ru/ws_kpk/BlackList"">
               </m:PhysicalSection>
               <m:Role>Клиент</m:Role>
               <m:OuterID>2727727272111</m:OuterID>
               <m:Find>false</m:Find>
            </m:ContractorsResult>
            <m:Agreement>Ошибка</m:Agreement>
            <Error xmlns=""http://www.ads-soft.ru/ws_kpk/Standart"">true</Error>
            <ErrorsList xmlns=""http://www.ads-soft.ru/ws_kpk/Standart"">
                <ErrorText>В базе КПК не назначено соотвествие идентификатору данной базы в справочнике ""Базы обмена"".</ErrorText>
            </ErrorsList>
            <m:Reason/>
         </m:return>
      </m:CheckBlackListAgreementResponse>
   </soap:Body>
</soap:Envelope>";
            }
            else
            {
                responseXmlText = @"<soap:Envelope xmlns:soap=""http://www.w3.org/2003/05/soap-envelope"">
   <soap:Body>
      <m:CheckBlackListAgreementResponse xmlns:m=""http://www.ads-soft.ru/ws_kpk/BlackListAgreement"">
         <m:return xmlns:xs=""http://www.w3.org/2001/XMLSchema"" xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"">
            <m:ContractorsResult>
            </m:ContractorsResult>
            <m:Agreement>Контрагент не входит в ЧС.</m:Agreement>
            <m:Reason/>
         </m:return>
      </m:CheckBlackListAgreementResponse>
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
    }
}
