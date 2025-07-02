using System.Threading.Tasks;
using Adacta.AdInsure.Framework.Core.Domain.Common;

namespace Adacta.AdInsure.RGSL.PAS.API.Internal.Contracts
{
    public interface IContractTransitionService
    {
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        Task MakeTransition(string contractNo, string transitionName);
    }
}
