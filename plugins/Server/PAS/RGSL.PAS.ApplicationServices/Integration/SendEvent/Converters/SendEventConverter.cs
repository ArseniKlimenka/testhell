using Adacta.AdInsure.Framework.Core.AutoMapperConfiguration;
using Adacta.AdInsure.RGSL.PAS.API.Integration.SendEvent.DTO;
using Adacta.AdInsure.RGSL.PAS.Domain.Integration.SendEvent.DTO;
using AutoMapper;

namespace Adacta.AdInsure.RGSL.PAS.ApplicationServices.Integration.SendEvent.Converters
{
    public static class SendEventConverter
    {
        public static SendEventDomainRequest Convert(SendEventRequest request)
        {
            return AutoMapperAccessor.Mapper.Map<SendEventDomainRequest>(request);
        }

        public static SendEventResponse Convert(SendEventDomainResponse response)
        {
            return AutoMapperAccessor.Mapper.Map<SendEventResponse>(response);
        }
    }
}
