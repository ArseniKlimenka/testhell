using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.Party.API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Adacta.AdInsure.RGSL.Party.WebAPI
{
    [Route("api/rgsl/party/test")]
    public class TestServiceController : AIApiController
    {
        private readonly ITestService _testService;
        public TestServiceController(ITestService testService)
        {
            _testService = testService;
        }

        [HttpPost, Route("Test")]
        public ActionResult Test()
        {
            var serviceResponse = _testService.Test();
            var response = new ObjectResult("RGSL plugins loaded status: " + serviceResponse.Response);

            response.StatusCode = (int)HttpStatusCode.OK;

            return response;
        }
    }
}
