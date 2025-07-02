using System.Threading.Tasks;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.RGSL.PAS.API.Internal.Contracts.Requests;

namespace Adacta.AdInsure.RGSL.PAS.API.Internal.Contracts
{
    public interface ICancellationCalcServiceExecutor
    {
        Task<JsonObject> ExecuteCalculation(CancellationCalculationRequest request);
    }
}
