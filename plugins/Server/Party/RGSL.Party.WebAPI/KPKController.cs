using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.Party.API.DTO;
using Adacta.AdInsure.RGSL.Party.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace Adacta.AdInsure.RGSL.Party.WebAPI
{
    [Route("api/rgsl/party/KPK")]
    public class KPKController : AIApiController
    {
        private readonly ICheckContractorsService _checkContractorsService;
        private readonly ICheckBlackListService _checkBlackListService;
        public KPKController(ICheckContractorsService checkContractorsService, ICheckBlackListService checkBlackListService)
        {
            _checkContractorsService = checkContractorsService;
            _checkBlackListService = checkBlackListService;
        }

        [HttpPost, Route("GetContractors")]
        public ActionResult GetContractors([FromBody] JObject query)
        {
            var serviceResponse = _checkContractorsService.CheckContractors(query["data"].ToString());

            var response = new ObjectResult(serviceResponse)
            {
                StatusCode = (int) HttpStatusCode.OK
            };

            return response;
        }

        [HttpPost, Route("GetMultipleContractors")]
        public ActionResult GetMultipleContractors([FromBody] GetMultipleContractorsRequest request)
        {
            var serviceResponse = _checkContractorsService.CheckMultipleContractors(request);

            var response = new ObjectResult(serviceResponse)
            {
                StatusCode = (int) HttpStatusCode.OK
            };

            return response;
        }

        [HttpPost, Route("CheckBlackList")]
        public ActionResult CheckBlackList([FromBody] JObject query)
        {
            var serviceResponse = _checkBlackListService.CheckBlackListAgreement(query["data"].ToString());
            var response = new ObjectResult(serviceResponse);

            response.StatusCode = (int) HttpStatusCode.OK;

            return response;
        }

    }
}
