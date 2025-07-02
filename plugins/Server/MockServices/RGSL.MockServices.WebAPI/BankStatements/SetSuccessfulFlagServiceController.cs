using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Net;
using System.Text.RegularExpressions;
using RoutePrefix = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Adacta.AdInsure.RGSL.MockServices.WebAPI
{
    /// <summary>
    /// Controller that simulates RGSL service implementation
    /// </summary>
    [RoutePrefix("api/rgsl/mock-services/bank-statements/set-successful-flag")]
    public class SetSuccessfulFlagServiceController : AIApiController
    {
		[AllowAnonymous]
		[Route("simulate")]
        [HttpPost]
        public IActionResult Simulate()
        {
            var body = Request.Body;
            using var sr = new StreamReader(body);
            var requestXmlText = sr.ReadToEnd();
            string xDigit = "[A-F0-9]";
            string guid = Regex.Match(requestXmlText.ToUpperInvariant(), $"{xDigit}{{8}}-{xDigit}{{4}}-{xDigit}{{4}}-{xDigit}{{4}}-{xDigit}{{12}}").Value;

            string responseXmlText = @"
<soap:Envelope xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"">
   <soap:Body>
      <m:SetSuccessfulFlagResponse xmlns:m=""http://www.BankStatements.life/"">
         <m:return xmlns:xs=""http://www.w3.org/2001/XMLSchema"" xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"">True</m:return>
      </m:SetSuccessfulFlagResponse>
   </soap:Body>
</soap:Envelope>";

            return new ContentResult
            {
                Content = responseXmlText,
                ContentType = "application/xml",
                StatusCode = (int) HttpStatusCode.OK,
            };
        }
    }
}
