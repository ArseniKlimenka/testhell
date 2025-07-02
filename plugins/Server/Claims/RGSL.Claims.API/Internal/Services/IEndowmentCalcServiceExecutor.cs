using System.Threading.Tasks;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.RGSL.Claims.API.Internal.Requests;

namespace Adacta.AdInsure.RGSL.Claims.API.Internal.Services
{
    public interface IEndowmentCalcServiceExecutor
    {
        Task<JsonObject> ExecuteCalculation(EndowmentCalculationRequest request);
    }
}
