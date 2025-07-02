using System.Threading.Tasks;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Requests;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Services
{
    public interface IAaCommissionServiceExecutor
    {
        Task<JsonObject> ExecuteCommissionCalculation(CommCalcRequest request);
    }
}
