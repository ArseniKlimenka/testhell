using Adacta.AdInsure.Framework.Core.AutoMapperConfiguration;
using Adacta.AdInsure.RGSL.PAS.API.Shared.InvestmentProfit;
using Adacta.AdInsure.RGSL.PAS.API.Shared.InvestmentProfit.Requests;
using Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit;
using Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit.DTO;
using AutoMapper;

namespace Adacta.AdInsure.RGSL.PAS.ApplicationServices.Shared.InvestmentProfit.Converters
{
    public class InvestmentProfitMapping : IAutoMapperConfiguration
    {
        public void Configure(IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<UpsertImvestmentProfitRecordRequest, InvestmentProfitRecordDomainDTO>()
                .ForMember(_ => _.RecordId, _ => _.Ignore())
                .ForMember(_ => _.LoadDate, _ => _.Ignore());

            configuration.CreateMap<AllocatedRecordDomainDTO, AllocatedRecord>();
            configuration.CreateMap<AllocationRequest, AllocationRequestDomain>();
            configuration.CreateMap<CancelAllocationRequest, CancelAllocationRequestDomain>();
            configuration.CreateMap<SetAllocationToPaidRequest, SetAllocationToPaidRequestDomain>();
        }
    }
}