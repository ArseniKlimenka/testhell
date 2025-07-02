using Adacta.AdInsure.Framework.Core.EnvironmentVariables;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration.DTO;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.DTO;
using Adacta.AdInsure.RGSL.Party.API.DTO;
using Adacta.AdInsure.RGSL.Party.API.Services;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.Services;
using MoreLinq.Extensions;
using System.Collections.Generic;
using System.Linq;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration.Services
{
    public class RosfinmonitoringXMLOperationPolicy : RosfinmonitoringXMLOperationBase, IRosfinmonitoringXMLOperation
    {
        private readonly IContractServiceRGSL _contractService;
        private readonly IAllocationRepositoryRGSL _allocationRepositoryRGSL;
        private readonly IBankStatementRepositoryRGSL _bankStatementRepositoryRGSL;

        public RosfinmonitoringXMLOperationPolicy(
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
            var policy = _contractService.GetContractsInfoByNumber(new ContractsInfoRequest { Numbers = new List<string>() { alloc.DocumentNo } }).Single();

            result.Reasons = new List<RosfinmonitoringXMLOperationReason>() { };

            result.Reasons.Add(GetPolicyData(policy));

            var bsiData = GetBankStatementItemData(bsi);
            bsiData.Content = RosfinmonitoringXMLHelper.BankStatementItemDescription(policy.ContractNumber, policy.IssueDate);
            result.Reasons.Add(bsiData);

            result.PolicyNumber = policy.ContractNumber;
            result.PolicyDate = policy.IssueDate;
            result.Pattern = bsiData.Content;
            result.Allocations = allocations;

            return result;
        }

        public List<RosfinmonitoringXMLOperationParticipant> GetParticipants(long bankStatementItemId, BankStatementItemDirectionRGSL bankStatementDirection, PartyCommonDataRGSL headOrganization, RosfinmonitoringXMLResponseData responseItem, RosfinmonitoringXMLRequest request, IList<PaymentOrderRiskDto> paymentOrderRiskInfo)
        {
            var result = new List<RosfinmonitoringXMLOperationParticipant>() { };
            var allocations = _allocationRepositoryRGSL.GetAllocations(new GetAllocationsRequest { BankStatementItemId = bankStatementItemId });
            var alloc = allocations.FirstOrDefault();//TODO just one?
            var policy = _contractService.GetContractsInfoByNumber(new ContractsInfoRequest { Numbers = new List<string>() { alloc.DocumentNo } }).Single();

            var firstSide = GetInsurerOrganizationData(headOrganization, bankStatementDirection, responseItem, request, paymentOrderRiskInfo);
            firstSide.Status = RosfinmonitoringXMLOperationParticipantStatus.Recipient;
            result.Add(firstSide);

            var secondSide = GetPolicyHolderClientData(policy.HolderCode, bankStatementDirection, responseItem, request, paymentOrderRiskInfo);
            secondSide.Status = RosfinmonitoringXMLOperationParticipantStatus.Payer;
            result.Add(secondSide);

            return result;
        }
    }
}
