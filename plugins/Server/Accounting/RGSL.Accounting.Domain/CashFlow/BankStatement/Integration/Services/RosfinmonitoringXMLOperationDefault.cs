using Adacta.AdInsure.Framework.Core.EnvironmentVariables;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration.DTO;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.DTO;
using Adacta.AdInsure.RGSL.Party.API.DTO;
using Adacta.AdInsure.RGSL.Party.API.Services;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.Services;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration.Services
{
    public class RosfinmonitoringXMLOperationDefault : RosfinmonitoringXMLOperationBase, IRosfinmonitoringXMLOperation
    {
        private readonly IContractServiceRGSL _contractService;
        private readonly IReferenceNumberServiceRGSL _referenceNumberService;
        private readonly IBankStatementRepositoryRGSL _bankStatementRepositoryRGSL;
        private readonly IPaymentReferencesService _paymentReferencesService;

        public RosfinmonitoringXMLOperationDefault(
            IEnvironmentVariablesSettingsProvider environmentVariables,
            IPartyCommonDataServiceRGSL partyService,
            IContractServiceRGSL contractService,
            IReferenceNumberServiceRGSL referenceNumberService,
            IBankStatementRepositoryRGSL bankStatementRepositoryRGSL,
            IPaymentReferencesService paymentReferencesService,
            IAccountNumberRepositoryRGSL accountNumberService) : base (
                environmentVariables,
                partyService,
                accountNumberService)
        {
            _contractService = contractService;
            _referenceNumberService = referenceNumberService;
            _bankStatementRepositoryRGSL = bankStatementRepositoryRGSL;
            _paymentReferencesService = paymentReferencesService;
        }

        public RosfinmonitoringXMLOperationReasonsHelper GetDocuments(long bankStatementItemId)
        {
            //TODO temporary solution with NA and DateTime.UtcNow
            var noPolicyDate = DateTime.UtcNow;
            var noPolicyNumber = "NA";

            var result = new RosfinmonitoringXMLOperationReasonsHelper();
            var bsi = _bankStatementRepositoryRGSL.GetBankStatementItems(new GetBankStatementItemRequest { BankStatementItemId = bankStatementItemId }).Single();
            var paymentReferences = _paymentReferencesService.GetPaymentReferences(bsi.BankStatementItemId.Value);
            ReferenceNumber referenceNumber = null;
            if (paymentReferences.Any())
            {
                referenceNumber = _referenceNumberService.GetRef(paymentReferences[0].ReferenceNo);
            }

            if (referenceNumber?.DocumentTypeId == DocumentTypeRGSL.Policy)
            {
                var policy = _contractService.GetContractsInfoByNumber(new ContractsInfoRequest { Numbers = new List<string>() { referenceNumber.DocumentNo } }).SingleOrDefault();
                if (policy != null)
                {
                    result.Reasons = new List<RosfinmonitoringXMLOperationReason>() { };

                    result.Reasons.Add(GetPolicyData(policy));

                    var bsiData = GetBankStatementItemData(bsi);
                    bsiData.Content = RosfinmonitoringXMLHelper.BankStatementItemDescription(policy.ContractNumber, policy.IssueDate);
                    result.Reasons.Add(bsiData);

                    result.PolicyNumber = policy.ContractNumber;
                    result.PolicyDate = policy.IssueDate;
                    result.Pattern = bsiData.Content;
                    return result;
                }
                else
                {
                    noPolicyNumber = referenceNumber.DocumentNo;
                }
            }
            //TODO reference fo another DocumentTypeId

            result.Reasons = new List<RosfinmonitoringXMLOperationReason>() { };
            var bsiDataNoPolicy = GetBankStatementItemData(bsi);
            bsiDataNoPolicy.Content = RosfinmonitoringXMLHelper.BankStatementItemDescription(noPolicyNumber, noPolicyDate);
            result.Reasons.Add(bsiDataNoPolicy);

            result.PolicyNumber = noPolicyNumber;
            result.PolicyDate = noPolicyDate;
            result.Pattern = bsiDataNoPolicy.Content;
            return result;
        }

        public List<RosfinmonitoringXMLOperationParticipant> GetParticipants(long bankStatementItemId, BankStatementItemDirectionRGSL bankStatementDirection, PartyCommonDataRGSL headOrganization, RosfinmonitoringXMLResponseData responseItem, RosfinmonitoringXMLRequest request, IList<PaymentOrderRiskDto> paymentOrderRiskInfo)
        {
            var result = new List<RosfinmonitoringXMLOperationParticipant>() { };
            var bsi = _bankStatementRepositoryRGSL.GetBankStatementItems(new GetBankStatementItemRequest { BankStatementItemId = bankStatementItemId }).Single();


            var paymentReferences = _paymentReferencesService.GetPaymentReferences(bsi.BankStatementItemId.Value);
            ReferenceNumber referenceNumber = null;
            if (paymentReferences.Any())
            {
                referenceNumber = _referenceNumberService.GetRef(paymentReferences[0].ReferenceNo);
            }

            var firstSide = GetInsurerOrganizationData(headOrganization, bankStatementDirection, responseItem, request, paymentOrderRiskInfo);
            firstSide.Status = RosfinmonitoringXMLOperationParticipantStatus.Recipient;
            result.Add(firstSide);

            RosfinmonitoringXMLOperationParticipant secondSide;

            if (referenceNumber?.DocumentTypeId == DocumentTypeRGSL.Policy)
            {
                var policy = _contractService.GetContractsInfoByNumber(new ContractsInfoRequest { Numbers = new List<string>() { referenceNumber.DocumentNo } }).SingleOrDefault();
                if (policy != null)
                {
                    secondSide = GetPolicyHolderClientData(policy.HolderCode, bankStatementDirection, responseItem, request, paymentOrderRiskInfo);
                    secondSide.Status = RosfinmonitoringXMLOperationParticipantStatus.Payer;
                    result.Add(secondSide);

                    return result;
                }
            }
            //TODO reference fo another DocumentTypeId

            secondSide = GetPolicyHolderClientDataFromAccount(bsi.DebtorBankAccountNo, bankStatementDirection, responseItem, request, paymentOrderRiskInfo);
            secondSide.Status = RosfinmonitoringXMLOperationParticipantStatus.Payer;
            result.Add(secondSide);

            return result;
        }
    }
}
