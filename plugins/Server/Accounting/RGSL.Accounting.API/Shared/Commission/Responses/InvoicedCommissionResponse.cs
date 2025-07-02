using System;
using System.Collections.Generic;
using Adacta.AdInsure.Framework.Core.Common;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Responses
{
    [JsonObject(NamingStrategyType = typeof(CamelCaseNamingStrategy))]
    public class InvoicedCommissionResponse
    {
        public IList<InvoicedCommissionItem> Items { get; set; }
    }

    [JsonObject(NamingStrategyType = typeof(CamelCaseNamingStrategy))]
    public class InvoicedCommissionItem
    {
        public string ContractNumber { get; set; }
        [JsonConverter(typeof(DateOnlyDateTimeConverter))]
        public DateTime DueDate { get; set; }
        [JsonConverter(typeof(DateOnlyDateTimeConverter))]
        public DateTime PostingDate { get; set; }
        public string ObjectCode { get; set; }
        public string ItemNo { get; set; }
        public decimal? AaCommRate { get; set; }
        public decimal? DocCommRate { get; set; }
        public decimal CalcCommAmount { get; set; }
    }
}
