using Adacta.AdInsure.RGSL.PAS.Domain.Integration.SendEvent.Interfaces;
using Newtonsoft.Json;

namespace Adacta.AdInsure.RGSL.PAS.Domain.Integration.SendEvent.DTO
{
	public class SendEventJsonDomainResponse : ISendEventDomainResponse
	{
		[JsonProperty("success")]
		public bool Success { get; set; }

		public string Status { get; set; }

		[JsonProperty("error")]
		public string Error { get; set; }

		public string Response { get; set; }
	}
}
