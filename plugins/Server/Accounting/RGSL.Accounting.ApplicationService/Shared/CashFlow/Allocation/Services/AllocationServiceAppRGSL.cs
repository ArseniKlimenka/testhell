using Adacta.AdInsure.Framework.Core.Transactions;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Responses;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Services;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Accounting.ApplicationServices.Shared.CashFlow.Allocation.Services
{
    public class AllocationServiceAppRGSL : IAllocationServiceAppRGSL
    {
        private readonly IAllocationServiceRGSL _allocationServiceRGSL;

        public AllocationServiceAppRGSL(
            IAllocationServiceRGSL allocationServiceRGSL)
        {
            _allocationServiceRGSL = allocationServiceRGSL;
        }

        public async Task<AllocateResponse> Allocate(AllocateRequest request)
        {
            return await _allocationServiceRGSL.Allocate(request);
        }

        [Transaction]
        public async Task<AllocateResponse> AllocateGroup(IList<AllocateRequest> request)
        {
            AllocateResponse result = new AllocateResponse()
            {
                AllocationIds = new List<long>(),
                AllocatedAmount = 0,
            };

            foreach (var requestItem in request)
            {
                var response = await _allocationServiceRGSL.Allocate(requestItem);
                result.AllocatedAmount += response.AllocatedAmount;
                result.AllocationIds.AddRange(response.AllocationIds);
            }

            return result;
        }

        public async Task Cancel(AllocationCancelAppRequest request)
        {
            Guid businessEventId = Guid.NewGuid();
            foreach (var allocationId in request.AllocationIds.OrderByDescending(_ => _))
            {
                await _allocationServiceRGSL.Cancel(new AllocationCancelRequest { AllocationId = allocationId, CancelOverpayments = request.CancelOverpayments, BusinessEventId = businessEventId });
            }
        }
    }
}