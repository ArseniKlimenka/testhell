using System.Collections.Generic;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces
{
    public interface IPendingPaymentService
    {
        /// <returns>Posted matching ids</returns>
        Task<IList<long>> CheckAndPost(string referenceNo);
    }
}
