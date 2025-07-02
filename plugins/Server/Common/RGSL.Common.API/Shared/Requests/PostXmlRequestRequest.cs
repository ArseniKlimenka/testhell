using System;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Requests
{
    public class PostXmlRequestRequest
    {
        public Uri BaseAddress { get; set; }
        public Uri RequestUri { get; set; }
        public string Content { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
        public bool Iterable { get; set; }
        public string QueryPath { get; set; }
    }
}