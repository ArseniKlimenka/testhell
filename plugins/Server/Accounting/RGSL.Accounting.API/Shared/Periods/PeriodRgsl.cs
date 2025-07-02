using System;
using Adacta.AdInsure.Framework.Core.Common;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Periods
{
    /// <summary>
    /// Accounting Period (ACC_IMPL.PERIOD)
    /// </summary>
    [JsonObject(NamingStrategyType = typeof(CamelCaseNamingStrategy))]
    public class PeriodRgsl
    {
        public long PeriodId { get; set; }
        [JsonConverter(typeof(StringEnumConverter), true)]
        public PeriodTypeIds PeriodTypeId { get; set; }
        public int StatusId { get; set; }
        public string Description { get; set; }
        [JsonConverter(typeof(DateOnlyDateTimeConverter))]
        public DateTime StartDate { get; set; }
        [JsonConverter(typeof(DateOnlyDateTimeConverter))]
        public DateTime EndDate { get; set; }
    }
}
