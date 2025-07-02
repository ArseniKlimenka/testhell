using Adacta.AdInsure.RGSL.PAS.API.Shared.InvestmentProfit.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.InvestmentProfit.Responses;
using Adacta.AdInsure.RGSL.PAS.API.Shared.InvestmentProfit.Services;
using Adacta.AdInsure.RGSL.PAS.ApplicationServices.Shared.InvestmentProfit.Converters;
using Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit.Interfaces;

namespace Adacta.AdInsure.RGSL.PAS.ApplicationServices.Shared.InvestmentProfit.Services
{
    public class InvestmentProfitApplicationService : IInvestmentProfitApplicationService
    {
        private readonly IInvestmentProfitDomanService _domanService;

        public InvestmentProfitApplicationService(IInvestmentProfitDomanService domanService)
        {
            _domanService = domanService;
        }

        public void UpsertInvestmentProfitRecord(UpsertImvestmentProfitRecordRequest request)
        {
            var convertedRequest = InvestmentProfitConverter.Convert(request);
            _domanService.UpsertInvestmentProfitRecord(convertedRequest);
        }

        public AllocationResponse AllocateInvestmentProfit(AllocationRequest request)
        {
            var convertedRequest = InvestmentProfitConverter.Convert(request);
            var result = _domanService.AllocateInvestmentProfit(convertedRequest);
            var convertedResult = InvestmentProfitConverter.Convert(result);
            return new AllocationResponse()
            {
                AllocatedItems = convertedResult
            };
        }

        public AllocationResponse AllocateClaimInvestmentProfit(AllocationRequest request)
        {
            var convertedRequest = InvestmentProfitConverter.Convert(request);
            var result = _domanService.AllocateClaimInvestmentProfit(convertedRequest);
            var convertedResult = InvestmentProfitConverter.Convert(result);
            return new AllocationResponse()
            {
                AllocatedItems = convertedResult
            };
        }

        public void CancellAllDocumentAllocations(CancelAllocationRequest request)
        {
            var convertedRequest = InvestmentProfitConverter.Convert(request);
            _domanService.CancellAllDocumentAllocations(convertedRequest);
        }

        public void SetAllDocumentAllocationsToPaid(SetAllocationToPaidRequest request)
        {
            var convertedRequest = InvestmentProfitConverter.Convert(request);
            _domanService.SetAllDocumentAllocationsToPaid(convertedRequest);
        }
    }
}
