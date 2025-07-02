using System;

namespace Adacta.AdInsure.RGSL.Framework.API.EntitySearch.Dto
{
    public class ProcessEntityEsRequest
    {
        public string EntityType { get; set; }
        public string ConfigurationName { get; set; }
        public Guid EntityId { get; set; }
    }
}