using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.AccountingCertificate.Requests
{
	public class FnsXMLRequestDto
	{
		public string SoftwareVersion { get; set; }

		public string UniversalVersionedDocumentId { get; set; }

		public string UniversalVersionedDocumentNo { get; set; }

		public string InsurerINN { get; set; }

		public string InsurerKPP { get; set; }

		public DateTime CertificateIssueDate { get; set; }

		public string AccountingYear { get; set; }

		public string CorrectionNumber { get; set; }

		public bool IsTaxPayerInsuredPerson { get; set; }

		public string ContractTypeCode { get; set; }

		public DateTime ContractStartDate { get; set; }

		public string ContractNumber { get; set; }

		public double PaymentContractAmountOfPremiumsPaid { get; set; }

		#region TaxPayerData

		public string TaxPayerINNKIO { get; set; }

		public DateTime TaxPayerDataDateOfBirth { get; set; }

		public string TaxPayerDocumentCodeView { get; set; }

		public string TaxPayerDocSeriesNumber { get; set; }

		public DateTime TaxPayerIssueDate { get; set; }

		public string TaxPayerLastName { get; set; }

		public string TaxPayerFirstName { get; set; }

		public string TaxPayerMiddleName { get; set; }

		#endregion

		#region InsuredPersonData

		public string InsuredPersonINNKIO { get; set; }

		public DateTime InsuredPersonDataDateOfBirth { get; set; }

		public string InsuredPersonDocumentCodeView { get; set; }

		public string InsuredPersonDocSeriesNumber { get; set; }

		public DateTime InsuredPersonIssueDate { get; set; }

		public string InsuredPersonLastName { get; set; }

		public string InsuredPersonFirstName { get; set; }

		public string InsuredPersonMiddleName { get; set; }

		#endregion
	}
}
