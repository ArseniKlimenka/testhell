using System;

namespace Adacta.AdInsure.RGSL.Party.API.DTO
{
    public class PartyCommonDataRGSL
    {
        public string PartyCode { get; set; }
        public string ConfigurationCodeName { get; set; }
        public string NaturalPersonCategory { get; set; }
        public string FullName { get; set; }
        public string ShortName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string CitizenshipCountryCode { get; set; }
        public string CitizenshipAlfa2Code { get; set; }
        public bool IsStatelessPerson { get; set; }
        public bool IsNonResident { get; set; }
        public string INN { get; set; }
        public string OGRN { get; set; }
        public string KPP { get; set; }
        public string PublicOfficialCode { get; set; }
    }
}