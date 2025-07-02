using Newtonsoft.Json;

namespace Adacta.AdInsure.RGSL.PAS.API.Integration.Contracts.DTO
{
    public class ContractDataCustomAttachmentVerification
    {
        [JsonProperty("verificationDocumentNumber")]
        public string VerificationDocumentNumber { get; set; }

        [JsonProperty("verificationState")]
        public string VerificationState { get; set; }
    }
}
