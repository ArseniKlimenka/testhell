using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration.DTO;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.DTO;
using Adacta.AdInsure.RGSL.Party.API.DTO;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration.Interfaces
{
    public interface IRosfinmonitoringXMLOperation
    {
        RosfinmonitoringXMLOperationReasonsHelper GetDocuments(long bankStatementItemId);
        List<RosfinmonitoringXMLOperationParticipant> GetParticipants(
            long bankStatementItemId,
            BankStatementItemDirectionRGSL bankStatementDirection,
            PartyCommonDataRGSL headOrganization,
            RosfinmonitoringXMLResponseData responseItem,
            RosfinmonitoringXMLRequest request,
            IList<PaymentOrderRiskDto> paymentOrderRiskInfo);
    }
}
