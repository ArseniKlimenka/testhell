using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Responses;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Services;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces;
using System;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Accounting.ApplicationServices.Shared.CashFlow.Allocation.Services
{
    public class PendingPaymentAppService : IPendingPaymentAppService
    {
        private readonly IPendingPaymentService _pendingPaymentService;

        public PendingPaymentAppService(IPendingPaymentService pendingPaymentService)
        {
            _pendingPaymentService = pendingPaymentService;
        }

        public async Task<PendingPaymentCheckAndPostResponse> CheckAndPost(PendingPaymentCheckAndPostRequest request)
        {
            var result = new PendingPaymentCheckAndPostResponse();

            try
            {
                result.PostedIds = await _pendingPaymentService.CheckAndPost(request.DocumentNo);
            }
            catch (Exception e)
            {
                result.ErrorMessage = e.ToString();
            }

            return result;
        }
    }
}
