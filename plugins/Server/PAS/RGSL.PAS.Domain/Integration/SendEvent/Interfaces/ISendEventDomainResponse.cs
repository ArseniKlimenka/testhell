namespace Adacta.AdInsure.RGSL.PAS.Domain.Integration.SendEvent.Interfaces
{
	public interface ISendEventDomainResponse
	{
		public string Status { get; set; }

		public string Response { get; set; }
	}
}
