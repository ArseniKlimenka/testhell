namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement
{
    public class RosfinmonitoringXMLResponseData
    {
        public long? BankStatementItemId { get; set; }
        public string EnvironmentHeadUnitCode { get; set; }
        public string HeadOrganizationCode { get; set; }
        public string AuthorizedPersonTabNumber { get; set; }
        public string EnvironmentAuthorizedPersonTabNumber { get; set; }
        public string BankAccount { get; set; }
        public string EnvironmentDefaultCountryCode { get; set; }
        public string IdentificationDocument { get; set; }
        public string PartyAddress { get; set; }
    }
}
