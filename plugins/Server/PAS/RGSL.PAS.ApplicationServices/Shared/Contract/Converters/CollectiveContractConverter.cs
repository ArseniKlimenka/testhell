using Adacta.AdInsure.Framework.Core.AutoMapperConfiguration;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.DTO;
using Adacta.AdInsure.RGSL.PAS.Domain.Contract.DTO;
using AutoMapper;

namespace Adacta.AdInsure.RGSL.PAS.ApplicationServices.Shared.Contract.Converters
{
    public static class CollectiveContractConverter
    {
        public static ClearInsuredListDomainRequest Convert(ClearInsuredListRequest request)
        {
            return AutoMapperAccessor.Mapper.Map<ClearInsuredListDomainRequest>(request);
        }

        public static WriteInsuredDomainRequest Convert(WriteInsuredRequest request)
        {
            return AutoMapperAccessor.Mapper.Map<WriteInsuredDomainRequest>(request);
        }

        public static ClearRiskListDomainRequest Convert(ClearRiskListRequest request)
        {
            return AutoMapperAccessor.Mapper.Map<ClearRiskListDomainRequest>(request);
        }

        public static RiskDataDomain Convert(RiskData request)
        {
            return AutoMapperAccessor.Mapper.Map<RiskDataDomain>(request);
        }

        public static WriteRiskDomainRequest Convert(WriteRiskRequest request)
        {
            return AutoMapperAccessor.Mapper.Map<WriteRiskDomainRequest>(request);
        }

        public static ClearRiskExpListDomainRequest Convert(ClearRiskExpListRequest request)
        {
            return AutoMapperAccessor.Mapper.Map<ClearRiskExpListDomainRequest>(request);
        }

        public static RiskExpDataDomain Convert(RiskDataDomain request)
        {
            return AutoMapperAccessor.Mapper.Map<RiskExpDataDomain>(request);
        }

        public static WriteRiskExpDomainRequest Convert(WriteRiskExpRequest request)
        {
            return AutoMapperAccessor.Mapper.Map<WriteRiskExpDomainRequest>(request);
        }
    }
}
