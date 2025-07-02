using Adacta.AdInsure.Framework.Core.AutoMapperConfiguration;
using Adacta.AdInsure.RGSL.PAS.API.Shared.InvestmentProfit;
using Adacta.AdInsure.RGSL.PAS.API.Shared.InvestmentProfit.Requests;
using Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit;
using Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit.DTO;
using AutoMapper;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.PAS.ApplicationServices.Shared.InvestmentProfit.Converters
{
    public class InvestmentProfitConverter
    {
        public static InvestmentProfitRecordDomainDTO Convert(UpsertImvestmentProfitRecordRequest request)
        {
            return AutoMapperAccessor.Mapper.Map<InvestmentProfitRecordDomainDTO>(request);
        }

        public static AllocationRequestDomain Convert(AllocationRequest request)
        {
            return AutoMapperAccessor.Mapper.Map<AllocationRequestDomain>(request);
        }

        public static CancelAllocationRequestDomain Convert(CancelAllocationRequest request)
        {
            return AutoMapperAccessor.Mapper.Map<CancelAllocationRequestDomain>(request);
        }

        public static IEnumerable<AllocatedRecord> Convert(IEnumerable<AllocatedRecordDomainDTO> allocations)
        {
            return AutoMapperAccessor.Mapper.Map<IEnumerable<AllocatedRecord>>(allocations);
        }

        public static SetAllocationToPaidRequestDomain Convert(SetAllocationToPaidRequest request)
        {
            return AutoMapperAccessor.Mapper.Map<SetAllocationToPaidRequestDomain>(request);
        }
    }
}
