using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Net;
using System.Xml.Linq;
using RoutePrefix = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Adacta.AdInsure.RGSL.MockServices.WebAPI
{
    /// <summary>
    /// Controller that simulates RGSL service implementation
    /// </summary>
    [RoutePrefix("api/rgsl/mock-services/payment-order/send-request")]
    public class PaymentOrderRequestServiceController : AIApiController
    {
        static JObject _savedRequest;

		[AllowAnonymous]
		[Route("simulate")]
        [HttpPost]
        public IActionResult Simulate()
        {
            var body = Request.Body;
            using var sr = new StreamReader(body);
            var doc = XDocument.Load(sr);
            string json = JsonConvert.SerializeXNode(doc);
            _savedRequest = JObject.Parse(json);

            string responseText = "True";
            string responseXmlText = @"
<soap:Envelope xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"">
   <soap:Body>
      <m:SetSuccessfulFlagResponse xmlns:m=""http://www.BankStatements.life/"">
         <m:return xmlns:xs=""http://www.w3.org/2001/XMLSchema"" xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"">" + responseText + @"</m:return>
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

        [Route("get-last-request")]
        [HttpPost]
#pragma warning disable CA1822 // Mark members as static
        public JObject GetLastRequest()
#pragma warning restore CA1822 // Mark members as static
        {
            return _savedRequest;
        }
    }
}
