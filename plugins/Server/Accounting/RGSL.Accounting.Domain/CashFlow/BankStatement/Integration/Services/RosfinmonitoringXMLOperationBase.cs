using Adacta.AdInsure.Framework.ApplicationContextManager.Models;
using Adacta.AdInsure.Framework.Core.EnvironmentVariables;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration.DTO;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.DTO;
using Adacta.AdInsure.RGSL.Party.API.DTO;
using Adacta.AdInsure.RGSL.Party.API.Services;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract;
using Nest;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration.Services
{
    public abstract class RosfinmonitoringXMLOperationBase
    {
        private readonly IEnvironmentVariablesSettingsProvider _environmentVariables;
        private readonly IPartyCommonDataServiceRGSL _partyService;
        private readonly IAccountNumberRepositoryRGSL _accountNumberService;

        public RosfinmonitoringXMLOperationBase(
            IEnvironmentVariablesSettingsProvider environmentVariables,
            IPartyCommonDataServiceRGSL partyService,
            IAccountNumberRepositoryRGSL accountNumberService)
        {
            _environmentVariables = environmentVariables;
            _partyService = partyService;
            _accountNumberService = accountNumberService;
        }

        protected static RosfinmonitoringXMLOperationReason GetPolicyData(ContractInfoRGSL policy)
        {
            RosfinmonitoringXMLOperationReason result = new RosfinmonitoringXMLOperationReason();
            result.Code = DocumentTypeOfficialCodeConst.Policy;
            result.Date = RosfinmonitoringXMLHelper.DateToDMYSlash(policy.IssueDate);
            result.Number = policy.ContractNumber;
            result.Content = RosfinmonitoringXMLHelper.PolicyDescription(policy.ContractNumber, policy.IssueDate);
            return result;
        }

        protected static RosfinmonitoringXMLOperationReason GetPaymentOrderData(PaymentOrderDto paymentOrder)
        {
            RosfinmonitoringXMLOperationReason result = new RosfinmonitoringXMLOperationReason();
            result.Code = paymentOrder.PaymentOrderType == PaymentOrderTypeConst.PaymentRefund
                ? DocumentTypeOfficialCodeConst.OtherPaymentOrderRefund
                : DocumentTypeOfficialCodeConst.Other;
            result.CodeName = RosfinmonitoringXMLHelper.PaymentOrderCodeName();
            result.Date = RosfinmonitoringXMLHelper.DateToDMYSlash(paymentOrder.PaymentOrderDate);
            result.Number = paymentOrder.PaymentOrderNumber;
            result.Content = string.Empty;
            return result;
        }

        protected static RosfinmonitoringXMLOperationReason GetBankStatementItemData(BankStatementItemRGSL bsi)
        {
            RosfinmonitoringXMLOperationReason result = new RosfinmonitoringXMLOperationReason();
            result.Code = DocumentTypeOfficialCodeConst.BankStatementItem;
            result.Date = RosfinmonitoringXMLHelper.DateToDMYSlash(bsi.TransactionDate);
            result.Number = bsi.BankStatementItemNo;
            result.Content = string.Empty;
            return result;
        }

        protected RosfinmonitoringXMLOperationParticipant GetInsurerOrganizationData(PartyCommonDataRGSL party, BankStatementItemDirectionRGSL bankStatementDirection, RosfinmonitoringXMLResponseData responseItem, RosfinmonitoringXMLRequest request, IList<PaymentOrderRiskDto> paymentOrderRiskInfo)
        {
            RosfinmonitoringXMLOperationParticipant result = new RosfinmonitoringXMLOperationParticipant();
            result.Code = OperationParticipantOfficialCodeConst.Insurer;
            result.Client = RosfinmonitoringXMLOperationParticipantClient.Organization;

            RosfinmonitoringXMLHelper.CompletePartyData(ref result, result.Client, party, responseItem, request);

            result.AccountData = GetAccountData(party.PartyCode, bankStatementDirection, responseItem, request, result.Client, paymentOrderRiskInfo);

            return result;
        }

        protected RosfinmonitoringXMLOperationParticipant GetPolicyHolderClientData(string partyCode, BankStatementItemDirectionRGSL bankStatementDirection, RosfinmonitoringXMLResponseData responseItem, RosfinmonitoringXMLRequest request, IList<PaymentOrderRiskDto> paymentOrderRiskInfo)
        {
            RosfinmonitoringXMLOperationParticipant result = new RosfinmonitoringXMLOperationParticipant();
            result.Code = OperationParticipantOfficialCodeConst.PolicyHolder;
            result.Client = RosfinmonitoringXMLOperationParticipantClient.Client;

            var defaultCountryCode = _environmentVariables.GetEnvironmentVariable("party.defaultCountryCode");
            var party = _partyService.GetPartyCommonData(new PartyCommonDataRequest { PartyCode = partyCode }).Single();
            var documents = _partyService.GetPartyDocumentData(new PartyCommonDataRequest { PartyCode = partyCode });
            var doc = documents.FirstOrDefault();//TODO just one?
            var addresses = _partyService.GetPartyAddressData(new PartyCommonDataRequest { PartyCode = partyCode });
            var address = addresses.FirstOrDefault();//TODO just one?
            RosfinmonitoringXMLHelper.CompletePartyData(ref result, result.Client, party, responseItem, request, doc, address, defaultCountryCode);

            result.AccountData = GetAccountData(partyCode, bankStatementDirection, responseItem, request, result.Client, paymentOrderRiskInfo);

            return result;
        }

        private RosfinmonitoringXMLAccountData GetAccountData(string partyCode, BankStatementItemDirectionRGSL bankStatementDirection, RosfinmonitoringXMLResponseData responseItem, RosfinmonitoringXMLRequest request, RosfinmonitoringXMLOperationParticipantClient client, IList<PaymentOrderRiskDto> paymentOrderRiskInfo)
        {
            IList<PartyAccountDataRGSL> accounts = null;

			if (client != RosfinmonitoringXMLOperationParticipantClient.Organization)
			{
                accounts = _partyService.GetPartyAccountData(new PartyAccountDataRequest { PartyCode = partyCode });

                if (accounts == null || !accounts.Any())
                {
                    string bankAccountText = $"Bank account is not defined for party ID {partyCode}";

                    if (request.SkipValidations)
                    {
                        responseItem.BankAccount = bankAccountText;
                    }
                    else
                    {
                        throw new BusinessException(bankAccountText);
                    }
                }
            }
            
            var acc = accounts?.FirstOrDefault();//TODO just one?
            var completeAccountData = RosfinmonitoringXMLHelper.CompleteAccountData(acc, bankStatementDirection, client, paymentOrderRiskInfo, _accountNumberService);
            
            return RosfinmonitoringXMLHelper.CompleteAccountData(acc, bankStatementDirection, client, paymentOrderRiskInfo, _accountNumberService);
        }

        protected RosfinmonitoringXMLOperationParticipant GetPolicyHolderClientDataFromAccount(string accountNo, BankStatementItemDirectionRGSL bankStatementDirection, RosfinmonitoringXMLResponseData responseItem, RosfinmonitoringXMLRequest request, IList<PaymentOrderRiskDto> paymentOrderRiskInfo)
        {
            var accounts = _partyService.GetPartyAccountData(new PartyAccountDataRequest { AccountNo = accountNo });
            var acc = accounts.FirstOrDefault();//TODO just one?
            if (acc != null)
            {
                return GetPolicyHolderClientData(acc.PartyCode, bankStatementDirection, responseItem, request, paymentOrderRiskInfo);
            }
            else
            {
                return new RosfinmonitoringXMLOperationParticipant();//TODO temporary solution
            }
        }
    }
}
