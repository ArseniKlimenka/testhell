using System.Xml.Serialization;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.AccountingCertificate
{
	[XmlRoot("Файл")]
	public class FnsXMLFileData
	{
		[XmlAttribute("ИдФайл")]
		public string FileId { get; set; }

		[XmlAttribute("ВерсПрог")]
		public string SoftwareVersion { get; set; }

		[XmlAttribute("ВерсФорм")]
		public string FormatVersion { get; set; }

		[XmlElement(ElementName = "Документ")]
		public FnsXMLDocumentData DocumentData { get; set; }
	}

	#region DocumentData

	public class FnsXMLDocumentData
	{
		[XmlAttribute("КНД")]
		public string ReportFormCode { get; set; }

		[XmlAttribute("ДатаДок")]
		public string DocFormDate { get; set; }

		[XmlAttribute("КодНО")]
		public string TaxAuthorityCode { get; set; }

		[XmlAttribute("ОтчГод")]
		public string ReporttingYear { get; set; }

		[XmlElement(ElementName = "СвНП")]
		public FnsXMLInsureOrganisation InsureOrganisation { get; set; }

		[XmlElement(ElementName = "Подписант")]
		public FnsXMLSignatoryData Signatory { get; set; }

		[XmlElement(ElementName = "СведОплСтрВзн")]
		public FnsXMLTaxpayerExpensesData TaxpayerExpenses { get; set; }
	}

	#region OrganisationData

	public class FnsXMLInsureOrganisation
	{
		[XmlElement(ElementName = "НПЮЛ")]
		public FnsXMLInsureOrganisationData InsureOrganisationData { get; set; }
	}

	public class FnsXMLInsureOrganisationData
	{
		[XmlAttribute("НаимОрг")]
		public string OrganisationName { get; set; }

		[XmlAttribute("ИННЮЛ")]
		public string OrganisationInn { get; set; }

		[XmlAttribute("КПП")]
		public string OrganisationKpp { get; set; }
	}

	#endregion

	public class FnsXMLSignatoryData
	{
		[XmlAttribute("ПрПодп")]
		public string PersonSign { get; set; }

		[XmlElement(ElementName = "ФИО")]
		public FnsXMLFullNameData SignatoryFullName { get; set; }

		[XmlElement(ElementName = "СвПред")]
		public FnsXMLSignatoryAboutData SignatoryAbout { get; set; }
	}

	public class FnsXMLFullNameData
	{
		[XmlAttribute("Фамилия")]
		public string LastName { get; set; }

		[XmlAttribute("Имя")]
		public string FirstName { get; set; }

		[XmlAttribute("Отчество")]
		public string MiddleName { get; set; }
	}

	public class FnsXMLSignatoryAboutData
	{
		[XmlAttribute("НаимДок")]
		public string ConfirmatingDocName { get; set; }
	}

	public class FnsXMLTaxpayerExpensesData
	{
		[XmlAttribute("НомерСвед")]
		public string InfoNumber { get; set; }

		[XmlAttribute("НомКорр")]
		public string CorrectionNumber { get; set; }

		[XmlAttribute("ПрЗастрах")]
		public string IsTaxPayerInsuredPerson { get; set; }

		[XmlAttribute("ТипДоговор")]
		public string ContractType { get; set; }

		[XmlAttribute("ДатаДоговор")]
		public string PolicyDate { get; set; }

		[XmlAttribute("НомерДоговор")]
		public string PolicyNumber { get; set; }

		[XmlAttribute("СуммаРасх")]
		public string PremiumsPaidAmount { get; set; }

		[XmlElement(ElementName = "НППлатСтрахВзн")]
		public FnsXMLPersonData TaxPayerData { get; set; }

		[XmlElement(ElementName = "ЗастрЛицо")]
		public FnsXMLPersonData InsuredPersonData { get; set; }
	}

	public class FnsXMLPersonData
	{
		[XmlAttribute("ИНН")]
		public string Inn { get; set; }

		[XmlAttribute("ДатаРожд")]
		public string Birthday { get; set; }

		[XmlElement(ElementName = "ФИО")]
		public FnsXMLFullNameData PersonFullNameData { get; set; }

		[XmlElement(ElementName = "СведДок")]
		public FnsXMLIdentifyDocData PersonIdentifyDoc { get; set; }
	}

	public class FnsXMLIdentifyDocData
	{
		[XmlAttribute("КодВидДок")]
		public string TypeCode { get; set; }

		[XmlAttribute("СерНомДок")]
		public string SeriesNumber { get; set; }

		[XmlAttribute("ДатаДок")]
		public string IssueDate { get; set; }
	}

	#endregion
}
