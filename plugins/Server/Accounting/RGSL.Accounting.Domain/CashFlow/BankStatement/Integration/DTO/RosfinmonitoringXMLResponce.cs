using System.Collections.Generic;
using System.Xml.Serialization;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration.DTO
{
    [XmlRoot("СообщОпер")]
    public class RosfinmonitoringXMLResponce
    {
        [XmlElement(ElementName = "СлужЧасть")]
        public RosfinmonitoringXMLServiceData ServiceData { get; set; }

        [XmlElement(ElementName = "ИнформЧасть")]
        public RosfinmonitoringXMLInformationData InformationData { get; set; }
    }

    public class RosfinmonitoringXMLServiceData
    {
        [XmlElement(ElementName = "ВерсияФормата")]
        public string FormatVersion { get; set; }

        [XmlElement(ElementName = "ВерсПрог")]
        public string SoftwareVersion { get; set; }

        [XmlElement(ElementName = "ИДКорр")]
        public string CorrespondentId { get; set; }

        [XmlElement(ElementName = "ТипИнф")]
        public RosfinmonitoringXMLInfoType InfoType { get; set; }

        [XmlElement(ElementName = "ДатаСообщения")]
        public string CurrentDate { get; set; }

        [XmlElement(ElementName = "УполнСотрудн")]
        public string AuthorizedPersonPosition { get; set; }

        [XmlElement(ElementName = "ФИОУполнСотрудн")]
        public RosfinmonitoringXMLNaturalPersonName AuthorizedPerson { get; set; }

        [XmlElement(ElementName = "ТелУполнСотрудн")]
        public string AuthorizedPersonPhone { get; set; }

        [XmlElement(ElementName = "ЭлектроннаяПочта")]
        public string AuthorizedPersonEmail { get; set; }
    }

    public class RosfinmonitoringXMLInformationData
    {
        [XmlElement(ElementName = "ИнфНФОП")]
        public RosfinmonitoringXMLOrganizationShort Transmitter { get; set; }

        [XmlElement(ElementName = "СведНФО")]
        public RosfinmonitoringXMLMainData MainData { get; set; }
    }

    public class RosfinmonitoringXMLMainData
    {
        [XmlElement(ElementName = "ИнфНФО")]
        public RosfinmonitoringXMLOrganization Sender { get; set; }

        [XmlElement(ElementName = "Операция")]
        public RosfinmonitoringXMLOperation Operation { get; set; }
    }

    public class RosfinmonitoringXMLOperation
    {
        [XmlElement(ElementName = "НомерЗаписи")]
        public string Number { get; set; }

        [XmlElement(ElementName = "ТипЗаписи")]
        public RosfinmonitoringXMLOperationType Type { get; set; }

        [XmlElement(ElementName = "ПризнФТр")]
        public RosfinmonitoringXMLOperationCriminal Criminal { get; set; }

        [XmlElement(ElementName = "ДатаОперации")]
        public string Date { get; set; }

        [XmlElement(ElementName = "КодОперации")]
        public string Code { get; set; }

        [XmlElement(ElementName = "КодВал")]
        public string CurrencyIsoCode { get; set; }

        [XmlElement(ElementName = "СумОперации")]
        public string Amount { get; set; }

        [XmlElement(ElementName = "СумРуб")]
        public string AmountLc { get; set; }

        [XmlElement(ElementName = "ОснованиеОп")]
        public List<RosfinmonitoringXMLOperationReason> Reasons { get; set; }

        [XmlElement(ElementName = "КодПризнОперации")]
        public RosfinmonitoringXMLOperationPropertyTypeCode PropertyTypeCode { get; set; }

        [XmlElement(ElementName = "КодДенежСредств")]
        public RosfinmonitoringXMLOperationMoneyTypeCode MoneyTypeCode { get; set; }

        [XmlElement(ElementName = "ХарактерОп")]
        public string Pattern { get; set; }

        [XmlElement(ElementName = "ПризнакНПФ")]
        public RosfinmonitoringXMLPensionFund PensionFund { get; set; }

        [XmlElement(ElementName = "УчастникОп")]
        public List<RosfinmonitoringXMLOperationParticipant> Participants { get; set; }

        [XmlElement(ElementName = "Коммент")]
        public string Comment { get; set; }
    }

    public class RosfinmonitoringXMLOperationReason
    {
        [XmlElement(ElementName = "КодДок")]
        public string Code { get; set; }

        [XmlElement(ElementName = "ИноеНаимДок")]
        public string CodeName { get; set; }
        private bool ShouldSerializeCodeName()
        {
            return Code == DocumentTypeOfficialCodeConst.Other;
        }

        [XmlElement(ElementName = "ДатаДок")]
        public string Date { get; set; }

        [XmlElement(ElementName = "НомДок")]
        public string Number { get; set; }

        [XmlElement(ElementName = "СодДок")]
        public string Content { get; set; }
    }

    public class RosfinmonitoringXMLOperationParticipant
    {
        [XmlElement(ElementName = "СтатусУчастника")]
        public RosfinmonitoringXMLOperationParticipantStatus Status { get; set; }

        [XmlElement(ElementName = "КодУчастника")]
        public string Code { get; set; }

        [XmlElement(ElementName = "ТипУчастника")]
        public RosfinmonitoringXMLOperationParticipantType Type { get; set; }

        [XmlElement(ElementName = "ПризнУчастника")]
        public RosfinmonitoringXMLOperationParticipantResident Resident { get; set; }

        [XmlElement(ElementName = "ПризнКлиент")]
        public RosfinmonitoringXMLOperationParticipantClient Client { get; set; }

        [XmlElement(ElementName = "УчастникЮЛ")]
        public RosfinmonitoringXMLOperationLegalEntity LegalEntity { get; set; }
        private bool ShouldSerializeLegalEntity()
        {
            return Type == RosfinmonitoringXMLOperationParticipantType.LegalEntity;
        }

        [XmlElement(ElementName = "УчастникФЛИП")]
        public RosfinmonitoringXMLOperationNaturalPerson NaturalPerson { get; set; }
        private bool ShouldSerializeNaturalPerson()
        {
            return Type != RosfinmonitoringXMLOperationParticipantType.LegalEntity;
        }

        [XmlElement(ElementName = "СведенияКО")]
        public RosfinmonitoringXMLAccountData AccountData { get; set; }
    }

    public class RosfinmonitoringXMLOrganization
    {
        [XmlElement(ElementName = "КодНФО")]
        public string Code { get; set; }

        [XmlElement(ElementName = "ТипНФО")]
        public RosfinmonitoringXMLPartyType Type { get; set; }

        [XmlElement(ElementName = "ПризнакФлНФО")]
        public RosfinmonitoringXMLBranch BranchType { get; set; }

        [XmlElement(ElementName = "НаимНФО")]
        public RosfinmonitoringXMLLegalEntityName Name { get; set; }

        [XmlElement(ElementName = "ИНННФО")]
        public string INN { get; set; }

        [XmlElement(ElementName = "КППНФО")]
        public string KPP { get; set; }

        [XmlElement(ElementName = "ОГРННФО")]
        public string OGRN { get; set; }
    }

    public class RosfinmonitoringXMLOrganizationShort
    {
        [XmlElement(ElementName = "НаимНФО")]
        public string Name { get; set; }

        [XmlElement(ElementName = "ПризнакФлНФО")]
        public RosfinmonitoringXMLBranch BranchType { get; set; }

        [XmlElement(ElementName = "ИНННФО")]
        public string INN { get; set; }

        [XmlElement(ElementName = "КППНФО")]
        public string KPP { get; set; }

        [XmlElement(ElementName = "ОГРННФО")]
        public string OGRN { get; set; }
    }

    public class RosfinmonitoringXMLOperationLegalEntity
    {
        [XmlElement(ElementName = "СведЮЛ")]
        public RosfinmonitoringXMLLegalEntity Data { get; set; }
    }

    public class RosfinmonitoringXMLLegalEntity
    {
        [XmlElement(ElementName = "НаимЮЛ")]
        public string Name { get; set; }

        [XmlElement(ElementName = "ПризнакФлЮЛ")]
        public RosfinmonitoringXMLBranch BranchType { get; set; }

        [XmlElement(ElementName = "ИННЮЛ")]
        public string INN { get; set; }

        [XmlElement(ElementName = "КППЮЛ")]
        public string KPP { get; set; }

        [XmlElement(ElementName = "ОГРНЮЛ")]
        public string OGRN { get; set; }
    }

    public class RosfinmonitoringXMLLegalEntityName
    {
        [XmlElement(ElementName = "ЮрЛицо")]
        public string FullName { get; set; }
    }

    public class RosfinmonitoringXMLOperationNaturalPerson
    {
        [XmlElement(ElementName = "ИдентификацияФЛ")]
        public RosfinmonitoringXMLOperationNaturalPersonIdentification Identification { get; set; }
        private bool ShouldSerializeIdentification()
        {
            return _operationType == RosfinmonitoringXMLOperationParticipantType.NaturalPerson && _operationClient == RosfinmonitoringXMLOperationParticipantClient.Client;
        }

        [XmlElement(ElementName = "СведФЛИП")]
        public RosfinmonitoringXMLNaturalPerson Data { get; set; }

        [XmlIgnore]
        private RosfinmonitoringXMLOperationParticipantType _operationType;

        [XmlIgnore]
        private RosfinmonitoringXMLOperationParticipantClient _operationClient;

        private RosfinmonitoringXMLOperationNaturalPerson() { }

        public RosfinmonitoringXMLOperationNaturalPerson(
            RosfinmonitoringXMLOperationParticipantType operationType,
            RosfinmonitoringXMLOperationParticipantClient operationClient)
        {
            _operationType = operationType;
            _operationClient = operationClient;
        }
    }

    public class RosfinmonitoringXMLNaturalPerson
    {
        [XmlElement(ElementName = "ФИОФЛИП")]
        public RosfinmonitoringXMLNaturalPersonName FullName { get; set; }

        [XmlElement(ElementName = "ИННФЛИП")]
        public string INN { get; set; }

        [XmlElement(ElementName = "ДокУдЛичн")]
        public RosfinmonitoringXMLNaturalPersonIdentificationType IdentificationType { get; set; }

        [XmlElement(ElementName = "СведДокУдЛичн")]
        public RosfinmonitoringXMLNaturalPersonIdentificationDocument IdentificationDocument { get; set; }

        [XmlElement(ElementName = "ДатаРождения")]
        public string Birthday { get; set; }

        [XmlElement(ElementName = "КодОКСМ")]
        public string CitizenshipCountryCode { get; set; }

        /// <summary>
        /// select OFFICIAL_CODE from BFX_IMPL.EXECUTIVE_PERSON
        /// </summary>
        [XmlElement(ElementName = "ПризнакПубЛицо")]
        public string OfficialType { get; set; }

        [XmlElement(ElementName = "АдрРег")]
        public RosfinmonitoringXMLNaturalPersonAddress Address { get; set; }
    }

    public class RosfinmonitoringXMLNaturalPersonName
    {
        [XmlElement(ElementName = "Фам")]
        public string Surname { get; set; }

        [XmlElement(ElementName = "Имя")]
        public string FirstName { get; set; }

        [XmlElement(ElementName = "Отч")]
        public string MiddleName { get; set; }
    }

    public class RosfinmonitoringXMLNaturalPersonIdentificationDocument
    {
        /// <summary>
        /// select OFFICIAL_CODE from BFX_IMPL.DOCUMENT_TYPE
        /// </summary>
        [XmlElement(ElementName = "ВидДокКод")]
        public string TypeCode { get; set; }

        [XmlElement(ElementName = "ИноеНаименованиеДок")]
        public string TypeName { get; set; }
        private bool ShouldSerializeTypeName()
        {
            return _isOtherTypeCode;
        }

        [XmlElement(ElementName = "СерияДок")]
        public string Series { get; set; }

        [XmlElement(ElementName = "НомДок")]
        public string Number { get; set; }

        [XmlElement(ElementName = "ДатВыдачиДок")]
        public string IssueDate { get; set; }

        [XmlElement(ElementName = "КемВыданДок")]
        public string IssuerName { get; set; }

        [XmlElement(ElementName = "КодПодр")]
        public string IssuerCode { get; set; }

        [XmlIgnore]
        private bool _isOtherTypeCode;

        private RosfinmonitoringXMLNaturalPersonIdentificationDocument() { }

        public RosfinmonitoringXMLNaturalPersonIdentificationDocument(
            string typeCode,
            bool isOtherTypeCode)
        {
            TypeCode = typeCode;
            _isOtherTypeCode = isOtherTypeCode;
        }
    }

    public class RosfinmonitoringXMLNaturalPersonAddress
    {
        [XmlElement(ElementName = "КодОКСМ")]
        public string CountryCode { get; set; }

        [XmlElement(ElementName = "КодСубъектаПоОКАТО")]
        public string RegionCode { get; set; }

        [XmlElement(ElementName = "Район")]
        public string Area { get; set; }

        [XmlElement(ElementName = "Пункт")]
        public string Point { get; set; }

        [XmlElement(ElementName = "Улица")]
        public string Street { get; set; }

        [XmlElement(ElementName = "Дом")]
        public string House { get; set; }

        [XmlElement(ElementName = "Корп")]
        public string Building { get; set; }

        [XmlElement(ElementName = "Оф")]
        public string Office { get; set; }
    }

    public class RosfinmonitoringXMLAccountData
    {
        [XmlElement(ElementName = "БИККО")]
        public string BIC { get; set; }

        [XmlElement(ElementName = "НомерСчета")]
        public string AccountNumber { get; set; }

        [XmlElement(ElementName = "НаимКО")]
        public string BankName { get; set; }
    }
}