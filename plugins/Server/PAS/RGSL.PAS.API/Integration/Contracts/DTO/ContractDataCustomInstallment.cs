using System;
using Adacta.AdInsure.Framework.Core.Common;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;


namespace Adacta.AdInsure.RGSL.PAS.API.Integration.Contracts.DTO
{
    [JsonObject(NamingStrategyType = typeof(CamelCaseNamingStrategy))]
    public class ContractDataCustomInstallment
    {
        public int OrderNumber { get; set; }

        public bool IsFirstInstallment { get; set; }

        [JsonConverter(typeof(DateOnlyDateTimeConverter))]
        public DateTime DueDate { get; set; }

        public decimal Amount { get; set; }

        public decimal OpenAmount { get; set; }

        public bool IsPosted { get; set; }
    }
}
