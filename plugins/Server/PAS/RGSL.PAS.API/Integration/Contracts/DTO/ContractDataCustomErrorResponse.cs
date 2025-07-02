using Newtonsoft.Json;

namespace Adacta.AdInsure.RGSL.PAS.API.Integration.Contracts.DTO
{
    public class ContractDataCustomErrorResponse
    {
        [JsonProperty("message")]
        public string Message { get; set; }

        public ContractDataCustomErrorResponse(string message)
        {
            Message = message;
        }
    }
}
