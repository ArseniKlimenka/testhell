using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using RoutePrefix = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Adacta.AdInsure.RGSL.MockServices.WebAPI
{
    /// <summary>
    /// Controller that simulates RGSL service implementation
    /// </summary>
    [RoutePrefix("api/rgsl/mock-services/send-event")]
    public class SendEventServiceController : AIApiController
    {
        [AllowAnonymous]
        [Route("success-response")]
        [HttpPost]
        public IActionResult SuccessResponse()
        {
            string responseXmlText = @"<?xml version=""1.0"" encoding=""utf-8""?>
                <response>
                    <status>success</status>
                    <request_id>005056B7-76F5-1EEC-8594-06736F1C</request_id>
                </response>
            ";

            return new ContentResult
            {
                Content = responseXmlText,
                ContentType = "application/xml",
                StatusCode = (int)HttpStatusCode.OK
            };
        }

        [AllowAnonymous]
        [Route("error-response")]
        [HttpPost]
        public IActionResult ErrorResponse()
        {
            string responseXmlText = @"<?xml version=""1.0"" encoding=""utf-8""?>
                <response>
                    <status>error</status>
                    <error>
                        <errorType>parse_error</errorType>
                        <errorText>Передано недопустимое значение для параметров: eventCode.</errorText>
                    </error>
                    <request_id>005056B7-76F5-1EEC-8594-06736F1C</request_id>
                </response>
            ";

            return new ContentResult
            {
                Content = responseXmlText,
                ContentType = "application/xml",
                StatusCode = (int)HttpStatusCode.OK
            };
        }

        [AllowAnonymous]
        [Route("error-call")]
        [HttpPost]
        public IActionResult ErrorCall()
        {
            string responseXmlText = @"<?xml version=""1.0"" encoding=""utf-8""?>
                <response>
                    <status>success</status>
                    <request_id>005056B7-76F5-1EEC-8594-06736F1C</request_id>
                </response>
            ";

            return new ContentResult
            {
                Content = responseXmlText,
                ContentType = "application/xml",
                StatusCode = (int)HttpStatusCode.Unauthorized
            };
        }

        [AllowAnonymous]
        [Route("elma365-success-response")]
        [HttpPost]
        public IActionResult SuccessJsonResponse()
        {
            string responseJsonText = @"{
                ""success"": true,
                ""error"": """",
                ""item"": {
                    ""Id_Contractor_AdInsure"": ""537"",
                    ""__createdAt"": ""2023-08-15T09:20:56Z"",
                    ""__createdBy"": ""b248c54c-455e-43f2-b156-a60f94f4db31"",
                    ""__debug"": false,
                    ""__id"": ""0189f87f-8f14-58aa-ab84-db6f06096186"",
                    ""__index"": 12,
                    ""__name"": ""UpdateContractor Id 537 15.08.2023 12:20:56"",
                    ""__status"": {
                        ""status"": 1,
                        ""order"": 0
                    },
                    ""__statusChangedAt"": ""2023-08-15T09:20:56.590683845Z"",
                    ""__subscribers"": [
                        ""b248c54c-455e-43f2-b156-a60f94f4db31""
                    ],
                    ""__updatedAt"": ""2023-08-15T09:20:56Z"",
                    ""__updatedBy"": ""b248c54c-455e-43f2-b156-a60f94f4db31"",
                    ""__version"": 1692091256,
                    ""eventcode"": ""006"",
                    ""eventid"": ""44f7360b-c31f-4a25-a2bd-6db0c5486ed5"",
                    ""requestid"": ""eeb329c6-395b-41e0-87f2-4dc78610fa7c""
                }
            }";

            return new ContentResult
            {
                Content = responseJsonText,
                ContentType = "application/json",
                StatusCode = (int) HttpStatusCode.OK
            };
        }

        [AllowAnonymous]
        [Route("sportsman-create-success-response")]
        [HttpPost]
        public IActionResult SportsmanCreateSuccessJsonResponse()
        {
            string responseJsonText = @"{
                    ""success"": true,
                    ""error"": """",
                    ""id"": 7,
                    ""bookNumber"": 777,
                    ""externalId"": ""47777-99000001"",
                    ""company"": ""Test company"",
                    ""beginAt"": ""2024-01-01"",
                    ""endAt"": ""2024-01-01"",
                    ""createdAt"": ""2024-01-13 12:00:00""
                }";

            return new ContentResult
            {
                Content = responseJsonText,
                ContentType = "application/json",
                StatusCode = (int) HttpStatusCode.OK
            };
        }

        [AllowAnonymous]
        [Route("sportsman-delete-success-response")]
        [HttpDelete]
        public IActionResult SportsmanDeleteSuccessJsonResponse()
        {
            string responseJsonText = @"{
                    ""success"": true,
                    ""error"": """"
                }";

            return new ContentResult
            {
                Content = responseJsonText,
                ContentType = "application/json",
                StatusCode = (int) HttpStatusCode.OK
            };
        }
    }
}
