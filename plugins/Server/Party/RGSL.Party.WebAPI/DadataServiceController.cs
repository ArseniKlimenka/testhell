using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.Party.API.Services;
using Adacta.AdInsure.Framework.Core.Common;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Adacta.AdInsure.RGSL.Party.WebAPI
{
    [Route("api/rgsl/party/dadata")]
    public class DadataServiceController : AIApiController
    {
        private readonly IDadataService _dadataService;
        public DadataServiceController(IDadataService dadataService)
        {
            _dadataService = dadataService;
        }

        [HttpPost, Route("Dadata")]
        public ActionResult Dadata(string query)
        {
            var serviceResponse = _dadataService.GetAddress(query);
            var response = new ObjectResult(serviceResponse);

            response.StatusCode = (int)HttpStatusCode.OK;

            return response;
        }
    }
}
