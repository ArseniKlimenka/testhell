namespace Adacta.AdInsure.RGSL.PAS.Domain.Integration.SendEvent.DTO
{
    public class EventDomainRequest
    {
        public string SendEventId { get; set; }

        public string Response { get; set; }

        public string Status { get; set; }

        public bool NeedToSend { get; set; }
    }
}
