using System;
using Newtonsoft.Json;

namespace Adacta.AdInsure.RGSL.Framework.Domain.Activities.Responses
{
    public class ExtraVerificationDataResponse
    {
        [JsonProperty("verificationState")]
        public string VerificationState { get; set; }
        [JsonProperty("partnerCode")]
        public string PartnerCode { get; set; }
        [JsonProperty("partnerName")]
        public string PartnerName { get; set; }
        [JsonProperty("issueDate")]
        public DateTime? IssueDate { get; set; }
        [JsonProperty("startDate")]
        public DateTime? StartDate { get; set; }
        [JsonProperty("endDate")]
        public DateTime? EndDate { get; set; }
        [JsonProperty("paymentFrequencyCode")]
        public string PaymentFrequencyCode { get; set; }
        [JsonProperty("paymentFrequencyName")]
        public string PaymentFrequencyName { get; set; }
        [JsonProperty("productCode")]
        public string ProductCode { get; set; }
        [JsonProperty("productName")]
        public string ProductName { get; set; }
        [JsonProperty("productGroupCode")]
        public string ProductGroupCode { get; set; }
        [JsonProperty("contractState")]
        public string ContractState { get; set; }
        [JsonProperty("holderName")]
        public string HolderName { get; set; }
        [JsonProperty("holderAge")]
        public int? HolderAge { get; set; }
        [JsonProperty("holderBirthDate")]
        public DateTime? HolderBirthDate { get; set; }
    }
}
