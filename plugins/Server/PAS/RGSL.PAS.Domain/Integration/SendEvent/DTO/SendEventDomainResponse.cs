using Adacta.AdInsure.RGSL.PAS.Domain.Integration.SendEvent.Interfaces;
using System.Xml.Serialization;

namespace Adacta.AdInsure.RGSL.PAS.Domain.Integration.SendEvent.DTO
{
    [XmlRoot(ElementName = "response", IsNullable = true)]
    public class SendEventDomainResponse : ISendEventDomainResponse
    {
        [XmlElement(ElementName = "request_id")]
        public string RequestId { get; set; }

        [XmlElement(ElementName = "status")]
        public string Status { get; set; }

        [XmlElement(ElementName = "error")]
        public SendEventErrortDomainResponse Error { get; set; }

        public string Response { get; set; }
    }

    public class SendEventErrortDomainResponse
    {
        [XmlElement(ElementName = "errorType")]
        public string ErrorType { get; set; }

        [XmlElement(ElementName = "errorCode")]
        public string ErrorCode { get; set; }

        [XmlElement(ElementName = "errorText")]
        public string ErrorText { get; set; }
    }
}
