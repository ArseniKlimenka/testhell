using System.Threading.Tasks;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Services;
using Microsoft.AspNetCore.Mvc;

namespace Adacta.AdInsure.RGSL.PAS.WebAPI.AgentAgreement
{
    [Route("api/rgsl/pas/agent-agreement")]
    public class AaCommissionController : AIApiController
    {
        private readonly IAaCommissionServiceExecutor _executor;

        public AaCommissionController(IAaCommissionServiceExecutor executor)
        {
            _executor = executor;
        }

        [HttpPost, Route("calculate-commission")]
        public Task<JsonObject> ExecuteCommissionCalculation([FromBody] CommCalcRequest request)
        {
            return _executor.ExecuteCommissionCalculation(request);
        }
    }
}
