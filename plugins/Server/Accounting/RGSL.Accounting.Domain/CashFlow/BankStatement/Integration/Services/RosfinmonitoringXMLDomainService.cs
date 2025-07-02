using Adacta.AdInsure.Accounting.APIInternal.PaymentOrders.Services;
using Adacta.AdInsure.Accounting.Domain.BankStatements;
using Adacta.AdInsure.Framework.Core.EnvironmentVariables;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.Framework.Core.Ioc.Ninject;
using Adacta.AdInsure.Framework.Core.Sequence;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration.DTO;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.DTO;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.Repositories;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Settings;
using Adacta.AdInsure.RGSL.Party.API.DTO;
using Adacta.AdInsure.RGSL.Party.API.Services;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml.Serialization;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration.Services
{
    public class RosfinmonitoringXMLDomainService : IRosfinmonitoringXMLDomainService
    {
        private readonly IEnvironmentVariablesSettingsProvider _environmentVariables;
        private readonly ICommonIntegrationSettings _settings;
        private readonly ISequenceGenerator _sequenceGenerator;
        private readonly IPartyCommonDataServiceRGSL _partyService;
        private readonly IDimensionsRepository _dimensionsRepository;
        private readonly IAllocationRepositoryRGSL _allocationRepository;
        private readonly IBankStatementRepositoryRGSL _bankStatementRepository;
        private readonly IPaymentOrderRepositoryRGSL _paymentOrderRepository;

        private const string _sequenceGeneratorNamePrefix = "ACC.ROSFINMONITORING_XML.";
        private const string _sequenceGeneratorDescription = "Sequence for numbering Rosfinmonitoring allocated XML-files starting from the begin of the day";
        private const string _sequenceGeneratorNamePrefixNA = "ACC.ROSFINMONITORING_XML_NA.";
        private const string _sequenceGeneratorDescriptionNA = "Sequence for numbering Rosfinmonitoring not allocated XML-files starting from the begin of the day";
        private const int _idStringLength = 3;

        private const string SNFO3484 = "SNFO3484";
        private const string TI = "01";
        private const string INN = "7743504307";
        private const string KPP = "773001001";

        private string _formatVersion;
        private string _softwareVersion;
        private string _correspondentId;
        private string _outputFolder;

        public RosfinmonitoringXMLDomainService(
            IEnvironmentVariablesSettingsProvider environmentVariables,
            ICommonIntegrationSettings settings,
            ISequenceGenerator sequenceGenerator,
            IPartyCommonDataServiceRGSL partyService,
            IDimensionsRepository dimensionsRepository,
            IAllocationRepositoryRGSL allocationRepository,
            IBankStatementRepositoryRGSL bankStatementRepository,
            IPaymentOrderRepositoryRGSL paymentOrderRepository)
        {
            _environmentVariables = environmentVariables;
            _settings = settings;
            _sequenceGenerator = sequenceGenerator;
            _partyService = partyService;
            _dimensionsRepository = dimensionsRepository;
            _allocationRepository = allocationRepository;
            _bankStatementRepository = bankStatementRepository;
            _paymentOrderRepository = paymentOrderRepository;

            _formatVersion = _settings.RosfinmonitoringFormatVersion;
            _softwareVersion = _settings.RosfinmonitoringSoftwareVersion;
            _correspondentId = _settings.RosfinmonitoringCorrespondentId;
            _outputFolder = _settings.RosfinmonitoringOutputFolder;
        }

        public RosfinmonitoringXMLResponse CreateXml(RosfinmonitoringXMLRequest request)
        {
            var currDate = DateTime.UtcNow;
            var strDateYMD = RosfinmonitoringXMLHelper.DateToYMD(currDate);
            var strDateDMY = RosfinmonitoringXMLHelper.DateToDMYSlash(currDate);
            var strYear = currDate.Year.ToString(CultureInfo.InvariantCulture);

            var response = new RosfinmonitoringXMLResponse
            {
                RosfinmonitoringErrorCodes = new List<RosfinmonitoringXMLResponseData>()
            };

            var bsiItems = _bankStatementRepository.GetBankStatementItems(new GetBankStatementItemRequest { BankStatementItemIds = request.BankStatementItemIds });
            var isAllocatedItems = request.IsAllocatedItems;
            
            foreach (var bsi in bsiItems)
            {
                var responseItem = new RosfinmonitoringXMLResponseData();

                long currId;
                string strId = "";
                long currIdNA;
                string strIdNA = "";

                if (isAllocatedItems)
                {
                    currId = _sequenceGenerator.GetNextValuesOrInsertNew($"{_sequenceGeneratorNamePrefix}{strDateYMD}", _sequenceGeneratorDescription, true, 1);
                    strId = currId.ToString(CultureInfo.InvariantCulture).PadLeft(_idStringLength, '0');
                } else
                {
                    currIdNA = _sequenceGenerator.GetNextValuesOrInsertNew($"{_sequenceGeneratorNamePrefixNA}{strDateYMD}", _sequenceGeneratorDescriptionNA, true, 1);
                    strIdNA = currIdNA.ToString(CultureInfo.InvariantCulture).PadLeft(_idStringLength, '0');
                }

                var headOrganizationUnitCode = _environmentVariables.GetEnvironmentVariable("rgsl.organisationUnit.headUnitCode");
                if (string.IsNullOrWhiteSpace(headOrganizationUnitCode))
                {
                    string headUnitCodeText = "Environment variable rgsl.organisationUnit.headUnitCode is not defined";

                    if (request.SkipValidations)
                    {
                        responseItem.EnvironmentHeadUnitCode = headUnitCodeText;
                    } else
                    {
                        throw new ArgumentException(headUnitCodeText);
                    }
                }

                var headOrganization = _partyService.GetPartyCommonData(new PartyCommonDataRequest { OrganisationUnitCode = headOrganizationUnitCode }).SingleOrDefault();
                if (headOrganization == null)
                {
                    string headOrganizationCodeText = $"Head Organization with code {headOrganizationUnitCode} is not defined";

                    if (request.SkipValidations)
                    {
                        responseItem.HeadOrganizationCode = headOrganizationCodeText;
                    }
                    else
                    {
                        throw new BusinessException(headOrganizationCodeText);
                    }
                }

                RosfinmonitoringXMLResponce xmlDoc = new RosfinmonitoringXMLResponce();

                xmlDoc.ServiceData = new RosfinmonitoringXMLServiceData();
                var serv = xmlDoc.ServiceData;

                serv.FormatVersion = _formatVersion;
                serv.SoftwareVersion = _softwareVersion;
                serv.CorrespondentId = _correspondentId;
                serv.InfoType = RosfinmonitoringXMLInfoType.Control;
                serv.CurrentDate = strDateDMY;

                var authorizedPersonTabNumber = _environmentVariables.GetEnvironmentVariable("rgsl.rosfinmonitoring.authorizedPersonTabNumber");
                if (string.IsNullOrWhiteSpace(authorizedPersonTabNumber))
                {
                    string authorizedPersonTabNumberText = "Environment variable rgsl.rosfinmonitoring.authorizedPersonTabNumber is not defined";

                    if (request.SkipValidations)
                    {
                        responseItem.EnvironmentAuthorizedPersonTabNumber = authorizedPersonTabNumberText;
                    }
                    else
                    {
                        throw new ArgumentException(authorizedPersonTabNumberText);
                    }
                }

                var authorizedPerson = _partyService.GetPartyEmployeeData(new PartyEmployeeDataRequest { EmployeeTabNumber = authorizedPersonTabNumber }).SingleOrDefault();
                if (authorizedPerson == null)
                {
                    string authorizedPersonText = $"Authorized Person with Tab Number {authorizedPersonTabNumber} is not defined";

                    if (request.SkipValidations)
                    {
                        responseItem.AuthorizedPersonTabNumber = authorizedPersonText;
                    }
                    else
                    {
                        throw new BusinessException(authorizedPersonText);
                    }
                }

                serv.AuthorizedPersonPosition = authorizedPerson?.Position ?? string.Empty;

                serv.AuthorizedPerson = new RosfinmonitoringXMLNaturalPersonName();
                serv.AuthorizedPerson.Surname = authorizedPerson?.LastName ?? string.Empty;
                serv.AuthorizedPerson.FirstName = authorizedPerson?.FirstName ?? string.Empty;
                serv.AuthorizedPerson.MiddleName = authorizedPerson?.MiddleName ?? string.Empty;

                var addPhone = string.IsNullOrWhiteSpace(authorizedPerson?.PhoneComments) ? string.Empty : $", {authorizedPerson?.PhoneComments}";
                serv.AuthorizedPersonPhone = $"{authorizedPerson?.CountryPhoneCode}{authorizedPerson?.PhoneFullNumber}{addPhone}";
                serv.AuthorizedPersonEmail = authorizedPerson?.ActualEmail ?? string.Empty;

                xmlDoc.InformationData = new RosfinmonitoringXMLInformationData();
                var info = xmlDoc.InformationData;

                info.Transmitter = new RosfinmonitoringXMLOrganizationShort();
                info.Transmitter.Name = headOrganization?.FullName ?? string.Empty;
                info.Transmitter.BranchType = RosfinmonitoringXMLBranch.Other;
                info.Transmitter.INN = headOrganization?.INN ?? string.Empty;
                info.Transmitter.KPP = headOrganization?.KPP ?? string.Empty;
                info.Transmitter.OGRN = headOrganization?.OGRN ?? string.Empty;

                info.MainData = new RosfinmonitoringXMLMainData();
                var main = info.MainData;

                main.Sender = new RosfinmonitoringXMLOrganization();
                main.Sender.Code = OrganizationTypeOfficialCodeConst.InsuranceCompany;
                main.Sender.Type = RosfinmonitoringXMLPartyType.LegalEntity;
                main.Sender.BranchType = RosfinmonitoringXMLBranch.Other;

                main.Sender.Name = new RosfinmonitoringXMLLegalEntityName();
                main.Sender.Name.FullName = headOrganization.FullName;
                main.Sender.INN = headOrganization.INN ?? string.Empty;
                main.Sender.KPP = headOrganization.KPP;
                main.Sender.OGRN = headOrganization.OGRN;

                main.Operation = new RosfinmonitoringXMLOperation();
                var oper = main.Operation;

                oper.Number = string.Join("_", strYear, main.Sender.INN, main.Sender.KPP, strId);
                oper.Type = RosfinmonitoringXMLOperationType.First;
                oper.Criminal = RosfinmonitoringXMLOperationCriminal.Other;
                oper.Date = RosfinmonitoringXMLHelper.DateToDMYSlash(bsi.TransactionDate);
                oper.Code = OperationCodeOfficialCodeConst.InsurancePremium;
                oper.CurrencyIsoCode = _dimensionsRepository.GetCurrencyIsoCodeByCurrencyCode(bsi.CurrencyCode);
                oper.Amount = RosfinmonitoringXMLHelper.AmountToMoney(bsi.Amount);
                oper.AmountLc = oper.Amount;

                var operation = GetOperation(bsi);
                var docs = operation.GetDocuments(bsi.BankStatementItemId.Value);
                oper.Reasons = docs.Reasons;

                oper.PropertyTypeCode = RosfinmonitoringXMLOperationPropertyTypeCode.Cash;
                oper.MoneyTypeCode = RosfinmonitoringXMLOperationMoneyTypeCode.Cashless;
                oper.Pattern = docs.Pattern;
                oper.PensionFund = RosfinmonitoringXMLPensionFund.Other;

                IList<PaymentOrderRiskDto> paymentOrderRiskInfo = new List<PaymentOrderRiskDto>();
                if (bsi.Direction.ToString() == AccountDirectionDataConst.Outgoing)
                {
                    paymentOrderRiskInfo = _paymentOrderRepository.GetPaymentOrderAndRisksInfo(bsi.BankStatementItemId);
                }

                oper.Participants = operation.GetParticipants(bsi.BankStatementItemId.Value, bsi.Direction, headOrganization, responseItem, request, paymentOrderRiskInfo);

                oper.Comment = RosfinmonitoringXMLHelper.CommentDescription(oper.AmountLc);

                var fileName = string.Join("_",
                    SNFO3484,
                    TI,
                    INN,
                    KPP,
                    strDateYMD,
                    isAllocatedItems ? strId : "NA_" + strIdNA
                    );
                SaveXML(xmlDoc, $"{_outputFolder}{fileName}.xml");

                _bankStatementRepository.InsertXMLMessageItemHistory(new BankStatementXMLMessageItemHistory
                    {
                        BankStatementItemId = bsi.BankStatementItemId.Value,
                        BankStatementItemNo = bsi.BankStatementItemNo,
                        AuthorizedPersonTabNumber = authorizedPersonTabNumber,
                        Allocations = docs.Allocations ?? [new(){BankStatementItemId = bsi.BankStatementItemId.Value}]
                    });

                bool isAllErrorCodesNull = responseItem.GetType().GetProperties().Where(p => p.GetValue(responseItem) is string).All(prop => prop == null);
                if (!isAllErrorCodesNull)
                {
                    responseItem.BankStatementItemId = bsi.BankStatementItemId;
                    response.RosfinmonitoringErrorCodes.Add(responseItem);
                }
            }

            return response;
        }

        private void SaveXML<T>(T xmlClassType, string path)
        {
            XmlSerializerNamespaces ns = new XmlSerializerNamespaces();
            ns.Add("", "");

            XmlSerializer serializer = new XmlSerializer(typeof(T));

            using (StreamWriter writer = new StreamWriter(path))
            {
                serializer.Serialize(writer, xmlClassType, ns);
            }
        }

        private DocumentTypeRGSL GetOperationDocumentType(BankStatementItemRGSL bsi)
        {
            switch (bsi.StatusId)
            {
                case BankStatementItemStatusRGSL.NotAllocated:
                    return DocumentTypeRGSL.Default;
                case BankStatementItemStatusRGSL.Allocated:
                case BankStatementItemStatusRGSL.PartiallyAllocated:
                    {
                        var allocations = _allocationRepository.GetAllocations(new GetAllocationsRequest { BankStatementItemId = bsi.BankStatementItemId });
                        var alloc = allocations.FirstOrDefault();//TODO just one?
                        if (alloc != null)
                        {
                            return alloc.DocumentTypeId;
                        }
                    }
                    break;
            }

            return DocumentTypeRGSL.Default;
        }

        private IRosfinmonitoringXMLOperation GetOperation(BankStatementItemRGSL bsi)
        {
            var operationDocumentType = GetOperationDocumentType(bsi);
            return NinjectKernel.Instance.Get<IRosfinmonitoringXMLOperation>(operationDocumentType.ToString());
        }
    }
}
