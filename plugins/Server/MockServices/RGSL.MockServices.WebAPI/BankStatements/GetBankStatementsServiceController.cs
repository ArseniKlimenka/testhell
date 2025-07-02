using Adacta.AdInsure.Framework.Core.Sequence;
using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Xml.Linq;
using RoutePrefix = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Adacta.AdInsure.RGSL.MockServices.WebAPI
{
    /// <summary>
    /// Controller that simulates RGSL service implementation
    /// </summary>
    [RoutePrefix("api/rgsl/mock-services/bank-statements/get-bank-statements")]
    public class GetBankStatementsServiceController : AIApiController
    {
        static SetDataRequest _request;

        private readonly ISequenceGenerator _service;

        public GetBankStatementsServiceController(ISequenceGenerator service)
        {
            _service = service;
        }

        [AllowAnonymous]
		[Route("simulate")]
        [HttpPost]
        public IActionResult Simulate()
        {
            var body = Request.Body;
            using var sr = new StreamReader(body);
            var requestXmlText = sr.ReadToEnd();
            var request = XDocument.Parse(requestXmlText);
            string requestedGuid = request.Root
                ?.Descendants().FirstOrDefault(e => e.Name.LocalName == "Body")
                ?.Descendants().FirstOrDefault(e => e.Name.LocalName == "GetBanksStatements")
                ?.Descendants().FirstOrDefault(e => e.Name.LocalName == "GUID")
                ?.Value;
            long documentNumber = 0;
            string rgslGuid = null;
            string paymentGuid = null;

            if (_request != null)
            {
                documentNumber = _request.Number;
                rgslGuid = _request.RgslGuid;
                paymentGuid = _request.PaymentGuid;
            }
            else if (requestedGuid != null)
            {
                documentNumber = _service.GetNextValuesOrInsertNew("UNIQUE_NUMBER", null);
                rgslGuid = requestedGuid;
                paymentGuid = null;
            }
            else
            {
                documentNumber = _service.GetNextValuesOrInsertNew("UNIQUE_NUMBER", null);
                rgslGuid = (new Guid()).ToString();
                paymentGuid = null;
            }

            string responseXmlText = @"
<soap:Envelope xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"">
	<soap:Body>
		<m:GetBanksStatementsResponse xmlns:m=""http://www.BankStatements.life/"">
			<m:return xsi:type=""m:ListBS"" xmlns:xs=""http://www.w3.org/2001/XMLSchema"" xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"">
				<m:BS>
					<m:Account>40701810700000001882</m:Account>
					<m:Payer>""Промсвязьбанк"" головной</m:Payer>
                    <m:PayerType>ЮЛ</m:PayerType>
					<m:PaymentPurpose>//реестр//кол-во: 33. Перевод средств на основании договора N 3-94831/625-05-21-10 от 31.05.2021. НДС не облагается</m:PaymentPurpose>
					<m:PostingDate>01092023</m:PostingDate>
					<m:Tolerance>1</m:Tolerance>
					<m:ExchangeRate>0</m:ExchangeRate>
					<m:ExchangeRateDate>0</m:ExchangeRateDate>
					<m:FileSource>93</m:FileSource>
					<m:PaymentType>1</m:PaymentType>
					<m:GUID>" + rgslGuid + @"</m:GUID>
					<m:DocumentType>Поступление на расчетный счет</m:DocumentType>
					<m:TotalSum>7191529</m:TotalSum>
					<m:FundReceptDate>01092023</m:FundReceptDate>
					<m:Currency>643</m:Currency>
					<m:DocumentNumber>" + documentNumber.ToString("D5", CultureInfo.InvariantCulture) + @"</m:DocumentNumber>
					<m:DocumentDate>01092023</m:DocumentDate>
					<m:PaymentGUID>" + paymentGuid + @"</m:PaymentGUID>
				</m:BS>
			</m:return>
		</m:GetBanksStatementsResponse>
	</soap:Body>
</soap:Envelope>";

            return new ContentResult
            {
                Content = responseXmlText,
                ContentType = "application/xml",
                StatusCode = (int) HttpStatusCode.OK,
            };
        }

        [Route("set-data")]
        [HttpPost]
#pragma warning disable CA1822 // Mark members as static
        public void SetData(SetDataRequest request)
#pragma warning restore CA1822 // Mark members as static
        {
            _request = request;
        }
    }

    public class SetDataRequest
    {
        public long Number { get; set; }
        public string RgslGuid { get; set; }
        public string PaymentGuid { get; set; }
    }
}
