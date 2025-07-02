using Adacta.AdInsure.Framework.Core.AutoMapperConfiguration;
using Adacta.AdInsure.RGSL.PAS.API.Integration.SendEvent.DTO;
using Adacta.AdInsure.RGSL.PAS.Domain.Integration.SendEvent.DTO;
using AutoMapper;

namespace Adacta.AdInsure.RGSL.PAS.ApplicationServices.Integration.SendEvent.Converters
{
    public class SendEventMapping : IAutoMapperConfiguration
    {
        public void Configure(IMapperConfigurationExpression cfg)
        {
            cfg.CreateMap<SendEventRequest, SendEventDomainRequest>();

            cfg.CreateMap<SendEventErrortDomainResponse, SendEventErrorResponse>();
            cfg.CreateMap<SendEventDomainResponse, SendEventResponse>();
        }
    }
}
