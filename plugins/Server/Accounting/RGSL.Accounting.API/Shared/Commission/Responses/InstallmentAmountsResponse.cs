using System;
using System.Collections.Generic;
using Adacta.AdInsure.Framework.Core.Common;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Responses
{
    [JsonObject(NamingStrategyType = typeof(CamelCaseNamingStrategy))]
    public class InstallmentAmountsResponse
    {
        public IList<InstallmentAmountsResponseItem> Items { get; set; }
    }

    [JsonObject(NamingStrategyType = typeof(CamelCaseNamingStrategy))]
    public class InstallmentAmountsResponseItem
    {
        public string ReferenceNo { get; set; }
        [JsonConverter(typeof(DateOnlyDateTimeConverter))]
        public DateTime DueDate { get; set; }
        public string SourceLineId { get; set; }
        public decimal InstallmentAmount { get; set; }
    }
}
