using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration.DTO;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.DTO;
using Adacta.AdInsure.RGSL.Party.API.DTO;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration
{
    public static class RosfinmonitoringXMLHelper
    {
        private static PartyCommonDataRGSL _party;
        private static PartyDocumentDataRGSL _document;
        private static PartyAddressDataRGSL _address;
        private static RosfinmonitoringXMLOperationParticipantClient _client;
        private static RosfinmonitoringXMLOperationParticipantType _type;
        private static string _defaultCountryCode;

        public static string DateToYMD(DateTime date)
        {
            return date.ToString("yyyyMMdd", CultureInfo.InvariantCulture);
        }
        public static string DateToYMDDot(DateTime date)
        {
            return date.ToString("yyyy.MM.dd", CultureInfo.InvariantCulture);
        }

        public static string DateToDMYDot(DateTime date)
        {
            return date.ToString("dd.MM.yyyy", CultureInfo.InvariantCulture);
        }

        public static string DateToDMYSlash(DateTime date)
        {
            return date.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture);
        }

        public static string AmountToMoney(decimal amount)
        {
            return amount.ToString("#.00", CultureInfo.InvariantCulture);
        }

        public static string PaymentOrderCodeName()
        {
            return "";
        }

        public static string BankStatementItemDescription(string policyNumber, DateTime policyDate)
        {
            var policyDateDMY = DateToDMYDot(policyDate);
            return $"Оплата страховой премии по договору №{policyNumber} от {policyDateDMY}";
        }

        public static string BankStatementItemPaymentOrderDescription(string poNumber, DateTime poDate)
        {
            var policyDateDMY = DateToDMYDot(poDate);
            return $"Страховая выплата по страховому акту №{poNumber} от {policyDateDMY}";
        }

        public static string PolicyDescription(string policyNumber, DateTime policyDate)
        {
            var policyDateDMY = DateToDMYDot(policyDate);
            return $"Договор страхования №{policyNumber} от {policyDateDMY}";
        }

        public static string PaymentOrderDescription(string policyNumber, DateTime policyDate)
        {
            var policyDateDMY = DateToDMYDot(policyDate);
            return $"Страховая выплата по договору страхования №{policyNumber} от {policyDateDMY}";
        }

        public static string CommentDescription(string premiumAmount)
        {
            return $"Страховая премия по договору страхования составляет {premiumAmount} рублей";
        }

        public static void CompletePartyData(
            ref RosfinmonitoringXMLOperationParticipant data,
            RosfinmonitoringXMLOperationParticipantClient client,
            PartyCommonDataRGSL party,
            RosfinmonitoringXMLResponseData responseItem,
            RosfinmonitoringXMLRequest request,
            PartyDocumentDataRGSL document = null,
            PartyAddressDataRGSL address = null,
            string defaultCountryCode = null)
        {
            _client = client;
            _party = party;
            _document = document;
            _address = address;
            _defaultCountryCode = defaultCountryCode;
            _type = GetOperationParticipantType(party.ConfigurationCodeName, party.NaturalPersonCategory);

            data.Type = _type;
            data.Resident = GetOperationParticipantResident(party.IsNonResident);

            switch (_type)
            {
                case RosfinmonitoringXMLOperationParticipantType.LegalEntity:
                    data.LegalEntity = CompleteLegalEntity();
                    break;
                case RosfinmonitoringXMLOperationParticipantType.NaturalPerson:
                    data.NaturalPerson = CompleteNaturalPerson(responseItem, request);
                    break;
            }
        }

        public static RosfinmonitoringXMLAccountData CompleteAccountData(PartyAccountDataRGSL account, BankStatementItemDirectionRGSL bankStatementDirection, RosfinmonitoringXMLOperationParticipantClient client, IList<PaymentOrderRiskDto> paymentOrderRiskInfo, IAccountNumberRepositoryRGSL _accountNumberService)
        {
            RosfinmonitoringXMLAccountData result = new RosfinmonitoringXMLAccountData();

            if (account == null)
            {
                result.BIC = string.Empty;
                result.AccountNumber = string.Empty;
                result.BankName = string.Empty;

                if (client == RosfinmonitoringXMLOperationParticipantClient.Organization)
                {
                    if (bankStatementDirection.ToString() == AccountDirectionDataConst.Incoming)
                    {
                        result.BIC = AccountDefaultIncomingDataConst.BIC;
                        result.AccountNumber = _accountNumberService.GetAccountDefaultIncomingDataAccountNumber();
                        result.BankName = AccountDefaultIncomingDataConst.BankName;
                    }
                    else if (bankStatementDirection.ToString() == AccountDirectionDataConst.Outgoing)
                    {
                        if (paymentOrderRiskInfo.Any(p => p.PaymentOrderSubType == PaymentOrderConst.Endowment))
                        {
                            result.BIC = AccountDefaultOutgoingEndowmentDataConst.BIC;
                            result.AccountNumber = _accountNumberService.GetAccountDefaultOutgoingEndowmentDataAccountNumber();
                            result.BankName = AccountDefaultOutgoingEndowmentDataConst.BankName;
                        }

                        if (paymentOrderRiskInfo.Any(p => p.RisksGroup == RiskGroupConst.Death))
                        {
                            result.BIC = AccountDefaultRiskDeathDataConst.BIC;
                            result.AccountNumber = _accountNumberService.GetAccountDefaultRiskDeathDataAccountNumber();
                            result.BankName = AccountDefaultRiskDeathDataConst.BankName;
                        }
                    }
                }
                else
                {
                    result.BIC = AccountDefaultDataConst.BIC;
                    result.AccountNumber = _accountNumberService.GetAccountDefaultDataAccountNumber();
                    result.BankName = AccountDefaultDataConst.BankName;
                }
            } else
            {
                result.BIC = account.BIC;
                result.AccountNumber = account.BankAccount;
                result.BankName = account.BankName;
            }

            return result;
        }

        private static RosfinmonitoringXMLOperationParticipantType GetOperationParticipantType(string configurationCodeName, string naturalPersonCategory)
        {
            var participantType = configurationCodeName;
            if (!string.IsNullOrWhiteSpace(naturalPersonCategory))
            {
                switch (naturalPersonCategory)
                {
                    case "soleProprietor":
                        participantType = "SoleProprietor";
                        break;
                }
            }
            return (RosfinmonitoringXMLOperationParticipantType) Enum.Parse(typeof(RosfinmonitoringXMLOperationParticipantType), participantType);
        }

        private static RosfinmonitoringXMLOperationParticipantResident GetOperationParticipantResident(bool isNonResident)
        {
            return isNonResident ? RosfinmonitoringXMLOperationParticipantResident.NonResident : RosfinmonitoringXMLOperationParticipantResident.Resident;
        }

        private static RosfinmonitoringXMLOperationLegalEntity CompleteLegalEntity()
        {
            RosfinmonitoringXMLOperationLegalEntity result = new RosfinmonitoringXMLOperationLegalEntity();
            result.Data = new RosfinmonitoringXMLLegalEntity();
            result.Data.Name = _party.FullName;
            result.Data.BranchType = RosfinmonitoringXMLBranch.Other;
            result.Data.INN = _party.INN;
            result.Data.KPP = _party.KPP;
            result.Data.OGRN = _party.OGRN;
            return result;
        }

        private static RosfinmonitoringXMLOperationNaturalPerson CompleteNaturalPerson(RosfinmonitoringXMLResponseData responseItem, RosfinmonitoringXMLRequest request)
        {
            RosfinmonitoringXMLOperationNaturalPerson result = new RosfinmonitoringXMLOperationNaturalPerson(_type, _client);
            result.Identification = RosfinmonitoringXMLOperationNaturalPersonIdentification.Basic;
            result.Data = new RosfinmonitoringXMLNaturalPerson();
            result.Data.FullName = new RosfinmonitoringXMLNaturalPersonName()
            {
                FirstName = _party.FirstName,
                Surname = _party.LastName,
                MiddleName = _party.MiddleName,
            };
            result.Data.INN = _party.INN ?? string.Empty;
            result.Data.IdentificationType = GetNaturalPersonIdentificationType(responseItem, request);
            result.Data.IdentificationDocument = CompleteNaturalPersonIdentificationDocument(responseItem, request);
            result.Data.Birthday = DateToDMYSlash(_party.DateOfBirth);
            result.Data.CitizenshipCountryCode = _party.CitizenshipCountryCode;
            result.Data.OfficialType = _party.PublicOfficialCode;
            result.Data.Address = CompleteNaturalPersonAddress(responseItem, request);

            return result;
        }

        private static RosfinmonitoringXMLNaturalPersonIdentificationType GetNaturalPersonIdentificationType(RosfinmonitoringXMLResponseData responseItem, RosfinmonitoringXMLRequest request)
        {
            if (string.IsNullOrWhiteSpace(_defaultCountryCode))
            {
                string environmentDefaultCountryCodeText = "Environment variable party.defaultCountryCode is not defined";

                if (request.SkipValidations)
                {
                    responseItem.EnvironmentDefaultCountryCode = environmentDefaultCountryCodeText;
                }
                else
                {
                    throw new ArgumentException(environmentDefaultCountryCodeText);
                }
            }

            if (_party.IsStatelessPerson)
            {
                return RosfinmonitoringXMLNaturalPersonIdentificationType.Stateless;
            }
            else if (_party.CitizenshipAlfa2Code == _defaultCountryCode)
            {
                return RosfinmonitoringXMLNaturalPersonIdentificationType.Citizen;
            }
            else
            {
                return RosfinmonitoringXMLNaturalPersonIdentificationType.ForeignerByVisa;
            }
        }

        private static RosfinmonitoringXMLNaturalPersonIdentificationDocument CompleteNaturalPersonIdentificationDocument(RosfinmonitoringXMLResponseData responseItem, RosfinmonitoringXMLRequest request)
        {
            if (_document == null)
            {
                string identificationDocumentText = $"Natural person Identification Document is not defined for party ID {_party.PartyCode}";

                if (request.SkipValidations)
                {
                    responseItem.IdentificationDocument = identificationDocumentText;
                }
                else
                {
                    throw new ArgumentException(identificationDocumentText);
                }
            }

            RosfinmonitoringXMLNaturalPersonIdentificationDocument result =
                new RosfinmonitoringXMLNaturalPersonIdentificationDocument(_document.OfficialCode, _document.IsOfficialOther);
            result.TypeName = _document?.OtherDocTypeDesc ?? string.Empty;
            result.Series = _document?.DocSeries ?? string.Empty;
            result.Number = _document?.DocNumber ?? string.Empty;
            if (_document != null)
            {
                result.IssueDate = DateToDMYSlash(_document.IssueDate);
            } else
            {
                result.IssueDate = string.Empty;
            }
            result.IssuerName = _document?.IssuerName ?? string.Empty;
            result.IssuerCode = _document?.IssuerCode ?? string.Empty;
            return result;
        }

        private static RosfinmonitoringXMLNaturalPersonAddress CompleteNaturalPersonAddress(RosfinmonitoringXMLResponseData responseItem, RosfinmonitoringXMLRequest request)
        {
            if (_address == null)
            {
                string addressText = $"Address is not defined for party ID {_party.PartyCode}";

                if (request.SkipValidations)
                {
                    responseItem.PartyAddress = addressText;
                }
                else
                {
                    throw new BusinessException(addressText);
                }
            }

            RosfinmonitoringXMLNaturalPersonAddress result = new RosfinmonitoringXMLNaturalPersonAddress();
            result.CountryCode = _address?.CountryCode ?? string.Empty;
            result.RegionCode = _address?.Okato?.Substring(0, 2) ?? string.Empty;
            result.Area = _address?.Area ?? string.Empty;
            result.Point = _address?.Point ?? string.Empty;
            result.House = _address?.House ?? string.Empty;
            result.Building = _address?.Building ?? string.Empty;
            result.Office = _address?.Flat ?? string.Empty;

            var street = $"{_address?.StreetName} {_address?.StreetType}";
            result.Street = string.IsNullOrWhiteSpace(street) ? string.Empty : street;

            return result;
        }
    }

    public class RosfinmonitoringXMLOperationReasonsHelper
    {
        public List<RosfinmonitoringXMLOperationReason> Reasons { get; set; }
        public string PolicyNumber { get; set; }
        public DateTime PolicyDate { get; set; }
        public string Pattern { get; set; }
        public IList<AllocationRGSL> Allocations { get; set; }
    }
}
