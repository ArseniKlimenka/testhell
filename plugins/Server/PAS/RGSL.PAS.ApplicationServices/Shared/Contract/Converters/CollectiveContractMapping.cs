using Adacta.AdInsure.Framework.Core.AutoMapperConfiguration;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.DTO;
using Adacta.AdInsure.RGSL.PAS.Domain.Contract.DTO;
using AutoMapper;

namespace Adacta.AdInsure.RGSL.PAS.ApplicationServices.Shared.Contract.Converters
{
    public class CollectiveContractMapping : IAutoMapperConfiguration
    {
        public void Configure(IMapperConfigurationExpression cfg)
        {
            cfg.CreateMap<ClearInsuredListRequest, ClearInsuredListDomainRequest>();
            cfg.CreateMap<WriteInsuredRequest, WriteInsuredDomainRequest>();

            cfg.CreateMap<ClearRiskListRequest, ClearRiskListDomainRequest>();
            cfg.CreateMap<WriteRiskRequest, WriteRiskDomainRequest>();
            cfg.CreateMap<RiskData, RiskDataDomain>();

            cfg.CreateMap<ClearRiskExpListRequest, ClearRiskExpListDomainRequest>();
            cfg.CreateMap<WriteRiskExpRequest, WriteRiskExpDomainRequest>();
            cfg.CreateMap<RiskExpData, RiskExpDataDomain>();
        }
    }
}
