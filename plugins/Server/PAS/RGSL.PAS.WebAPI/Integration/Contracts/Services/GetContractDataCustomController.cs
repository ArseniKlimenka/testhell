using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.PAS.API.Integration.Contracts.DTO;
using Adacta.AdInsure.RGSL.PAS.API.Integration.Contracts.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.WebAPI.Integration.Contracts.Services
{
    [Route("api/rgsl/integration")]
    public class GetContractDataCustomController : AIApiController
    {
        private readonly IGetContractDataCustomService _getContractDataCustomService;

        public GetContractDataCustomController(IGetContractDataCustomService getContractDataCustomService)
        {
            _getContractDataCustomService = getContractDataCustomService;
        }

        [HttpPost, Route("get-contract-custom-data")]
        public Task<object> GetContractData([FromBody] JObject request)
        {
            var applicationRequest = JsonConvert.DeserializeObject<ContractDataCustomRequest>(request.ToString());

            return _getContractDataCustomService.GetContractData(applicationRequest);
        }
    }
}
