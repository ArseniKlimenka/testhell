using Adacta.AdInsure.Framework.Core.EnvironmentVariables;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration.DTO;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.DTO;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.Repositories;
using Adacta.AdInsure.RGSL.Party.API.DTO;
using Adacta.AdInsure.RGSL.Party.API.Services;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.Services;
using MoreLinq.Extensions;
using System.Collections.Generic;
using System.Linq;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration.Services
{
    public class RosfinmonitoringXMLOperationPaymentOrderOutgoing : RosfinmonitoringXMLOperationBase, IRosfinmonitoringXMLOperation
    {
        private readonly IPaymentOrderRepositoryRGSL _paymentOrderRepositoryRGSL;
        private readonly IContractServiceRGSL _contractService;
        private readonly IAllocationRepositoryRGSL _allocationRepositoryRGSL;
        private readonly IBankStatementRepositoryRGSL _bankStatementRepositoryRGSL;

        public RosfinmonitoringXMLOperationPaymentOrderOutgoing(
            IPaymentOrderRepositoryRGSL paymentOrderRepositoryRGSL,
            IEnvironmentVariablesSettingsProvider environmentVariables,
            IPartyCommonDataServiceRGSL partyService,
            IContractServiceRGSL contractService,
            IAllocationRepositoryRGSL allocationRepositoryRGSL,
            IBankStatementRepositoryRGSL bankStatementRepositoryRGSL,
            IAccountNumberRepositoryRGSL accountNumberService) : base (
                environmentVariables,
                partyService,
                accountNumberService)
        {
            _paymentOrderRepositoryRGSL = paymentOrderRepositoryRGSL;
            _contractService = contractService;
            _allocationRepositoryRGSL = allocationRepositoryRGSL;
            _bankStatementRepositoryRGSL = bankStatementRepositoryRGSL;
        }

        public RosfinmonitoringXMLOperationReasonsHelper GetDocuments(long bankStatementItemId)
        {
            var result = new RosfinmonitoringXMLOperationReasonsHelper();
            var bsi = _bankStatementRepositoryRGSL.GetBankStatementItems(new GetBankStatementItemRequest { BankStatementItemId = bankStatementItemId }).Single();
            var allocations = _allocationRepositoryRGSL.GetAllocations(new GetAllocationsRequest { BankStatementItemId = bankStatementItemId });
            var alloc = allocations.FirstOrDefault();//TODO just one?
            var paymentOrder = _paymentOrderRepositoryRGSL.GetPaymentOrder(alloc.DocumentNo);
            var policy = _contractService.GetContractsInfoByNumber(new ContractsInfoRequest { Numbers = new List<string>() { paymentOrder.ContractNumber } }).Single();

            result.Reasons = new List<RosfinmonitoringXMLOperationReason>() { };

            result.Reasons.Add(GetPolicyData(policy));

            var poData = GetPaymentOrderData(paymentOrder);
            poData.Content = RosfinmonitoringXMLHelper.PaymentOrderDescription(policy.ContractNumber, policy.IssueDate);
            result.Reasons.Add(poData);

            var bsiData = GetBankStatementItemData(bsi);
            bsiData.Content = RosfinmonitoringXMLHelper.BankStatementItemPaymentOrderDescription(paymentOrder.PaymentOrderNumber, paymentOrder.PaymentOrderDate);
            result.Reasons.Add(bsiData);

            result.PolicyNumber = policy.ContractNumber;
            result.PolicyDate = policy.IssueDate;
            result.Pattern = poData.Content;

            return result;
        }

        public List<RosfinmonitoringXMLOperationParticipant> GetParticipants(long bankStatementItemId, BankStatementItemDirectionRGSL bankStatementDirection, PartyCommonDataRGSL headOrganization, RosfinmonitoringXMLResponseData responseItem, RosfinmonitoringXMLRequest request, IList<PaymentOrderRiskDto> paymentOrderRiskInfo)
        {
            var result = new List<RosfinmonitoringXMLOperationParticipant>() { };
            var allocations = _allocationRepositoryRGSL.GetAllocations(new GetAllocationsRequest { BankStatementItemId = bankStatementItemId });
            var alloc = allocations.FirstOrDefault();//TODO just one?
            var paymentOrder = _paymentOrderRepositoryRGSL.GetPaymentOrder(alloc.DocumentNo);
            var policy = _contractService.GetContractsInfoByNumber(new ContractsInfoRequest { Numbers = new List<string>() { paymentOrder.ContractNumber } }).Single();

            var firstSide = GetInsurerOrganizationData(headOrganization, bankStatementDirection, responseItem, request, paymentOrderRiskInfo);
            firstSide.Status = RosfinmonitoringXMLOperationParticipantStatus.Payer;
            result.Add(firstSide);

            var secondSide = GetPolicyHolderClientData(policy.HolderCode, bankStatementDirection, responseItem, request, paymentOrderRiskInfo);
            secondSide.Status = RosfinmonitoringXMLOperationParticipantStatus.Recipient;
            result.Add(secondSide);

            return result;
        }
    }
}
