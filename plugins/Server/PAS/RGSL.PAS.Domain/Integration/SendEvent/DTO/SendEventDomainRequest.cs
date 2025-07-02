using System;

namespace Adacta.AdInsure.RGSL.PAS.Domain.Integration.SendEvent.DTO
{
    public class SendEventDomainRequest
    {
        public string SendEventId { get; set; }

        public string Subscriber { get; set; }

        public Uri Uri { get; set; }

        public string Login { get; set; }

        public string Password { get; set; }

        public string Request { get; set; }

        public string CurlPath { get; set; }

        public string CertPath { get; set; }

        public string KeyPath { get; set; }

        public string PassPhrase { get; set; }

        public string Token { get; set; }
    }
}
