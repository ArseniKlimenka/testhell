using System;

namespace Adacta.AdInsure.RGSL.Party.API.DTO
{
    public class PartyDocumentDataRGSL
    {
        public string PartyCode { get; set; }
        public string OfficialCode { get; set; }
        public bool IsOfficialOther { get; set; }
        public string OtherDocTypeDesc { get; set; }
        public string DocSeries { get; set; }
        public string DocNumber { get; set; }
        public DateTime IssueDate { get; set; }
        public string IssuerName { get; set; }
        public string IssuerCode { get; set; }
    }
}