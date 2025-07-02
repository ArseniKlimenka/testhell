using Adacta.AdInsure.Framework.Core.AutoMapperConfiguration;
using Adacta.AdInsure.RGSL.Claims.API.Internal.DTO;
using AutoMapper;
using RGSL.Claims.Domain.CollectiveClaim.DTO;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Claims.ApplicationServices.Internal.Converters
{
    public class CollectiveClaimMapping : IAutoMapperConfiguration
    {
        public void Configure(IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<CollectiveClaimRecipientDto, ColleciveClaimRecipientDomainDto>();
        }
    }
}
