using System;
using System.Globalization;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.RGSL.Common.API.JsonConverters;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Adacta.AdInsure.RGSL.PAS.API.Integration.Contracts.DTO
{
    [JsonObject(NamingStrategyType = typeof(CamelCaseNamingStrategy))]
    public class ContractDataCustomResponse
    {
        [JsonIgnore]
        public string PolicyHolderCode { get; set; }

        [JsonIgnore]
        public string InsuredPersonCode { get; set; }

        public string ProductGroupDescription { get; set; }

        public string ProductDescription { get; set; }

        public string ProductStrategyCode { get; set; }

        public string ProductStrategyDescription { get; set; }

        public int? InsuranceTerms { get; set; }

        public string Id { get; set; }

        public string Number { get; set; }

        [JsonConverter(typeof(StringConverter<string>))]
        public string StartDate { get; set; }

        [JsonConverter(typeof(StringConverter<string>))]
        public string EndDate { get; set; }

        public string CurrencyCode { get; set; }

        public string PaymentFrequency { get; set; }

        public string StateCode { get; set; }

        public string ProductCode { get; set; }

        public Decimal? PaidAmount { get; set; }

        [JsonConverter(typeof(DateOnlyDateTimeWithDotsConverter))]
        public DateTime? PaymentExpirationDate { get; set; }

        public Boolean IsLatePayment { get; set; }

        public Decimal? InstallmentAmount { get; set; }

        public Decimal? PaymentMandatoryAmount { get; set; }

        public string VerificationState { get; set; }

        public string AttachmentErrorComment { get; set; }

        public string CardType { get; set; }
    }

    public class StringConverter<T> : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            throw new NotImplementedException();
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var date = Convert.ToDateTime((string)reader.Value, CultureInfo.InvariantCulture);

            return date.ToString("dd.MM.yyyy", CultureInfo.InvariantCulture);
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            writer.WriteValue(value.ToString());
        }
    }
}
