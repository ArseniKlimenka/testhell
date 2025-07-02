using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.PAS.API.Integration.SAP.DTO;
using Adacta.AdInsure.RGSL.PAS.API.Integration.SAP.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace Adacta.AdInsure.RGSL.WebAPI.Integration.SAP.Services
{
    [Route("api/rgsl/sap-integration")]
    public class SAPIntegrationController : AIApiController
    {
        private readonly ISAPPartyService _sapCreatePartyService;
        private readonly ISAPContractService _sapCreateContractService;

        public SAPIntegrationController(
            ISAPPartyService sapCreatePartyService,
            ISAPContractService sapCreateContractService
            )
        {
            _sapCreatePartyService = sapCreatePartyService;
            _sapCreateContractService = sapCreateContractService;
        }

        [HttpPost, Route("create-party")]
        public SAPIntegrationResponse CreateParty([FromBody] JObject request)
        {
            return _sapCreatePartyService.CreateParty(request.ToString());
        }

        [HttpPost, Route("create-contract")]
        public SAPIntegrationResponse CreateContract([FromBody] JObject request)
        {
            return _sapCreateContractService.CreateContract(request.ToString());
        }
    }
}
