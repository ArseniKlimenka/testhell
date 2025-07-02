using Newtonsoft.Json;

namespace Adacta.AdInsure.RGSL.Claims.API.Internal.DTO
{
    public class CollectiveClaimRecipientDto
    {
        [JsonProperty("claimNumber")]
        public string ClaimNumber { get; set; }

        [JsonProperty("partyCode")]
        public string PartyCode { get; set; }

        [JsonProperty("fullName")]
        public string FullName { get; set; }

        [JsonProperty("birthDate")]
        public string BirthDate { get; set; }

        [JsonProperty("amount")]
        public string Amount { get; set; }

        [JsonProperty("franchise")]
        public string Franchise { get; set; }

        [JsonProperty("totalAmount")]
        public string TotalAmount { get; set; }

        [JsonProperty("serviceDescription")]
        public string ServiceDescription { get; set; }

        [JsonProperty("serviceProviderName")]
        public string ServiceProviderName { get; set; }
    }
}