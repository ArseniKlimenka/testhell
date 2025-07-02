using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Responses;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Services;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Accounting.ApplicationServices.Shared.CashFlow.Allocation.Services
{
    public class AutoAllocationServiceAppRGSL : IAutoAllocationServiceAppRGSL
    {
        private readonly IAutoAllocationServiceRGSL _autoAllocationServiceRGSL;

        public AutoAllocationServiceAppRGSL(
            IAutoAllocationServiceRGSL autoAllocationServiceRGSL)
        {
            _autoAllocationServiceRGSL = autoAllocationServiceRGSL;
        }

        public async Task<AutoAllocateResponse> AutoAllocate(AutoAllocateRequest request)
        {
            return await _autoAllocationServiceRGSL.AutoAllocate(request);
        }
    }
}