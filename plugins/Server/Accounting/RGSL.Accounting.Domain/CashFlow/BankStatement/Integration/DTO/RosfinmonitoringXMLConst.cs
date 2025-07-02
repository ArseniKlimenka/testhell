using System.Xml.Serialization;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration.DTO
{
    /// <summary>
    /// Application 3
    /// http://www.consultant.ru/document/cons_doc_LAW_180447/63e58ff9f406868d0d453efb4a9355d3fadffbda/
    /// </summary>
    public static class OrganizationTypeOfficialCodeConst
    {
        public const string InsuranceCompany = "030";
    }

    /// <summary>
    /// Application 4
    /// http://www.consultant.ru/document/cons_doc_LAW_180447/1eff1ac9f5bbf84f4e49bbfefe8fadbe53983000/
    /// </summary>
    public static class OperationCodeOfficialCodeConst
    {
        public const string InsurancePremium = "5008";
    }

    /// <summary>
    /// Application 7
    /// http://www.consultant.ru/document/cons_doc_LAW_323378/57d141b24540650560df22d8886daf7768ceb462/
    /// </summary>
    public static class OperationParticipantOfficialCodeConst
    {
        public const string Insurer = "45";
        public const string PolicyHolder = "46";
    }

    /// <summary>
    /// Application 11
    /// http://www.consultant.ru/document/cons_doc_LAW_180447/ca6a1d91ccf8b7bb1a7357ee51f0c1cb3851d23e/
    /// </summary>
    public static class DocumentTypeOfficialCodeConst
    {
        public const string Policy = "56";
        public const string BankStatementItem = "13";
        public const string Other = "83";
        public const string OtherPaymentOrderRefund = "99";
    }

    public static class AccountDefaultDataConst
    {
        public const string BIC = "044525745";
        public const string BankName = "ФИЛИАЛ № 7701 Банка ВТБ (ПАО) г МОСКВА";
    }

    public static class AccountDefaultIncomingDataConst
    {
        public const string BIC = "044525411";
        public const string BankName = "ФИЛИАЛ \"ЦЕНТРАЛЬНЫЙ\" БАНКА ВТБ (ПАО) г МОСКВА";
    }

    public static class AccountDefaultOutgoingEndowmentDataConst
    {
        public const string BIC = "044525545";
        public const string BankName = "АО ЮНИКРЕДИТ БАНК";
    }

    public static class AccountDefaultRiskDeathDataConst
    {
        public const string BIC = "044525985";
        public const string BankName = "ПАО БАНК \"ФК ОТКРЫТИЕ\" г Москва";
    }

    public static class AccountDirectionDataConst
    {
        public const string Incoming = "Incoming";
        public const string Outgoing = "Outgoing";
    }

    public static class PaymentOrderConst
    {
        public const string Endowment = "Endowment";
    }

    public static class RiskGroupConst
    {
        public const string Death = "Death";
    }

    public enum RosfinmonitoringXMLInfoType
    {
        [XmlEnum("1")] Control = 1,
        [XmlEnum("2")] Suspect = 2,
        [XmlEnum("3")] BlockMoney = 3,
        [XmlEnum("4")] CheckResult = 4,
        [XmlEnum("6")] Suspend = 6,
        [XmlEnum("8")] Rejected = 8,
    }

    public enum RosfinmonitoringXMLBranch
    {
        [XmlEnum("0")] Other = 0,
        [XmlEnum("1")] Branch = 1,
    }

    public enum RosfinmonitoringXMLPartyType
    {
        [XmlEnum("1")] LegalEntity = 1,
        [XmlEnum("2")] SoleProprietor = 2,
    }

    public enum RosfinmonitoringXMLOperationType
    {
        [XmlEnum("1")] First = 1,
        [XmlEnum("2")] FixRejected = 2,
        [XmlEnum("3")] FixAccepted = 3,
        [XmlEnum("4")] Delete = 4,
    }

    public enum RosfinmonitoringXMLOperationCriminal
    {
        [XmlEnum("0")] Other = 0,
        [XmlEnum("1")] Terrorist = 1,
        [XmlEnum("2")] BlockedMoneyAffiliated = 2,
        [XmlEnum("3")] BlockedMoneyExceed = 3,
        [XmlEnum("4")] MassDestruction = 4,
        [XmlEnum("5")] MassDestructionAffiliated = 5,
    }

    public enum RosfinmonitoringXMLOperationPropertyTypeCode
    {
        [XmlEnum("0")] Cash = 0,
        [XmlEnum("1")] Other = 1,
        [XmlEnum("2")] Securities = 2,
        [XmlEnum("3")] PreciousMetals = 3,
        [XmlEnum("4")] RealEstate = 4,
    }

    public enum RosfinmonitoringXMLOperationMoneyTypeCode
    {
        [XmlEnum("1")] Cash = 1,
        [XmlEnum("2")] Cashless = 2,
        [XmlEnum("3")] EMoney = 3,
    }

    public enum RosfinmonitoringXMLPensionFund
    {
        [XmlEnum("0")] Other = 0,
        [XmlEnum("1")] PensionFund = 1,
    }

    public enum RosfinmonitoringXMLOperationParticipantStatus
    {
        [XmlEnum("1")] Payer = 1,
        [XmlEnum("2")] Recipient = 2,
        [XmlEnum("3")] PayerRepresentative = 3,
        [XmlEnum("4")] RecipientRepresentative = 4,
        [XmlEnum("5")] GuarantorPayer = 5,
        [XmlEnum("6")] Beneficiary = 6,
        [XmlEnum("7")] GuarantorRecipient = 7,
    }

    public enum RosfinmonitoringXMLOperationParticipantType
    {
        [XmlEnum("0")] Other = 0,
        [XmlEnum("1")] LegalEntity = 1,
        [XmlEnum("2")] NaturalPerson = 2,
        [XmlEnum("3")] SoleProprietor = 3,
        [XmlEnum("4")] PrivatePractice = 4,
        [XmlEnum("5")] Foreign = 5,
    }

    public enum RosfinmonitoringXMLOperationParticipantResident
    {
        [XmlEnum("0")] NonResident = 0,
        [XmlEnum("1")] Resident = 1,
        [XmlEnum("9")] Unknown = 9,
    }

    public enum RosfinmonitoringXMLOperationParticipantClient
    {
        [XmlEnum("0")] Other = 0,
        [XmlEnum("1")] Client = 1,
        [XmlEnum("2")] Organization = 2,
    }

    public enum RosfinmonitoringXMLOperationNaturalPersonIdentification
    {
        [XmlEnum("1")] Basic = 1,
        [XmlEnum("2")] Simple = 2,
    }

    public enum RosfinmonitoringXMLNaturalPersonIdentificationType
    {
        [XmlEnum("1")] Citizen = 1,
        [XmlEnum("2")] ForeignerByVisa = 2,
        [XmlEnum("3")] Stateless = 3,
        [XmlEnum("6")] ForeignerVisaFree = 6,
    }
}