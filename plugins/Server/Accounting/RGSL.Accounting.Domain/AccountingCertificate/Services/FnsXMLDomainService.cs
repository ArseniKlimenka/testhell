using Adacta.AdInsure.Framework.Core.Logging;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.AccountingCertificate;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.AccountingCertificate.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.AccountingCertificate.Interface;
using Adacta.AdInsure.RGSL.Common.API.Constants;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Settings;
using Microsoft.Extensions.Logging;
using NPoco;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Xml.Serialization;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.AccountingCertificate.Services
{
	public class FnsXMLDomainService : IFnsXMLDomainService
	{
		#region Consts

		private const string R_T = "UT_SVOPLSTRVZN";
		private const string A_K = "7730_7730";
		private const string O = "7743504307773001001";
		private const string REPORT_FORM_CODE = "1184047";
		private const string TAX_AUTHORITY_CODE = "7730";
		private const string ORGANISATION_NAME = "ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ СТРАХОВАЯ КОМПАНИЯ \'РОСГОССТРАХ ЖИЗНЬ\'";
		private const string PERSON_SIGN = "1";
		private const string PERSON_CEO_SIGN = "1";
		private const string CONFIRMATING_DOC_NAME = "Доверенность №07 от 01.01.{0} г.";
		private const string CONTRACT_TYPE_LIFE = "life";

		private readonly FnsXMLFullNameData SIGNATORY_FULL_NAME = new FnsXMLFullNameData()
		{
			FirstName = "Валерий",
			LastName = "Смирнов",
			MiddleName = "Валерьевич"
		};

		#endregion

		private readonly ICommonIntegrationSettings _settings;
		private readonly string _formatVersion;
		private readonly string _outputFolder;
        private readonly Lazy<ILogger> _logger = new Lazy<ILogger>(() => LogManagerAccessor.GetLogger(LogConstants.XmlRequestService));
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public FnsXMLDomainService(ICommonIntegrationSettings settings, Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
		{
			_settings = settings;
			_formatVersion = _settings.FnsFormatVersion;
			_outputFolder = _settings.FnsOutputFolder;
            _databaseFactory = databaseFactory;
        }

		public FnsXMLResponse CreateXml(FnsXMLRequest request)
		{
			var result = new FnsXMLResponse();
			var resultsList = new List<string>();

			var currentDate = DateTime.Now;

			foreach (var item in request.Request)
			{
				try
				{
					var data = new FnsXMLFileData
					{
						FileId = @$"{R_T}_{A_K}_{O}_{currentDate:yyyyMMdd}_{item.UniversalVersionedDocumentId.ToUpper()}",
						SoftwareVersion = item.SoftwareVersion,
						FormatVersion = _formatVersion,

						DocumentData = new FnsXMLDocumentData
						{
							ReportFormCode = REPORT_FORM_CODE,
							DocFormDate = item.CertificateIssueDate.ToString("dd.MM.yyyy"),
							TaxAuthorityCode = TAX_AUTHORITY_CODE,
							ReporttingYear = item.AccountingYear,

							InsureOrganisation = new FnsXMLInsureOrganisation
							{
								InsureOrganisationData = new FnsXMLInsureOrganisationData
								{
									OrganisationName = ORGANISATION_NAME,
									OrganisationInn = item.InsurerINN,
									OrganisationKpp = item.InsurerKPP
								}
							},

							Signatory = new FnsXMLSignatoryData
							{
								PersonSign = PERSON_SIGN,
								SignatoryFullName = SIGNATORY_FULL_NAME
							}
						}
					};

					if (data.DocumentData.Signatory.PersonSign != PERSON_CEO_SIGN)
					{
						data.DocumentData.Signatory.SignatoryAbout = new FnsXMLSignatoryAboutData
						{
							ConfirmatingDocName = string.Format(CONFIRMATING_DOC_NAME, currentDate.Year)
						};
					}

					data.DocumentData.TaxpayerExpenses = new FnsXMLTaxpayerExpensesData
					{
						InfoNumber = GetInfoNumber(item.UniversalVersionedDocumentNo),
						CorrectionNumber = item.CorrectionNumber,
						IsTaxPayerInsuredPerson = item.IsTaxPayerInsuredPerson ? "1" : "0",
						ContractType = item.ContractTypeCode == CONTRACT_TYPE_LIFE ? "3" : "0",
						PolicyDate = item.ContractStartDate.ToString("dd.MM.yyyy"),
						PolicyNumber = item.ContractNumber,
						PremiumsPaidAmount = item.PaymentContractAmountOfPremiumsPaid.ToString("0.00"),

						TaxPayerData = new FnsXMLPersonData
						{
							Inn = item.TaxPayerINNKIO,
							Birthday = item.TaxPayerDataDateOfBirth.ToString("dd.MM.yyyy"),

							PersonFullNameData = new FnsXMLFullNameData
							{
								FirstName = item.TaxPayerFirstName,
								LastName = item.TaxPayerLastName,
								MiddleName = item.TaxPayerMiddleName
							},

							PersonIdentifyDoc = new FnsXMLIdentifyDocData
							{
								TypeCode = item.TaxPayerDocumentCodeView,
								SeriesNumber = item.TaxPayerDocSeriesNumber,
								IssueDate = item.TaxPayerIssueDate.ToString("dd.MM.yyyy")
							}
						}
					};

					if (!item.IsTaxPayerInsuredPerson)
					{
						data.DocumentData.TaxpayerExpenses.InsuredPersonData = new FnsXMLPersonData
						{
							Inn = item.InsuredPersonINNKIO,
							Birthday = item.InsuredPersonDataDateOfBirth.ToString("dd.MM.yyyy"),

							PersonFullNameData = new FnsXMLFullNameData
							{
								FirstName = item.InsuredPersonFirstName,
								LastName = item.InsuredPersonLastName,
								MiddleName = item.InsuredPersonMiddleName
							},

							PersonIdentifyDoc = new FnsXMLIdentifyDocData
							{
								TypeCode = item.InsuredPersonDocumentCodeView,
								SeriesNumber = item.InsuredPersonDocSeriesNumber,
								IssueDate = item.InsuredPersonIssueDate.ToString("dd.MM.yyyy")
							}
						};
					}

                    _logger.Value.LogDebug($"Directory exists: {Directory.Exists(_outputFolder)}");

					SaveXML(data, $"{_outputFolder}{data.FileId}.xml");

                    _logger.Value.LogDebug($"File was created in folder: {_outputFolder} with number {item.UniversalVersionedDocumentNo}");
                }
				catch (Exception)
				{
                    _logger.Value.LogTrace($"Number of document with error {item.UniversalVersionedDocumentNo}");

                    resultsList.Add(item.UniversalVersionedDocumentNo);
				}
			}

			result.FnsErrorDocuments = resultsList;

			return result;
		}

		private string GetInfoNumber(string fullNumber)
		{
			return fullNumber.Substring(fullNumber.IndexOf('-') + 1);
		}

		private void SaveXML<T>(T xmlClassType, string path)
		{
            XmlSerializerNamespaces ns = new XmlSerializerNamespaces();

			ns.Add("", "");

			var encoding = Encoding.GetEncoding(1251);
			XmlSerializer serializer = new XmlSerializer(typeof(T));

			using (StreamWriter writer = new StreamWriter(path, false, encoding))
			{
				serializer.Serialize(writer, xmlClassType, ns);
			}
		}
	}
}
