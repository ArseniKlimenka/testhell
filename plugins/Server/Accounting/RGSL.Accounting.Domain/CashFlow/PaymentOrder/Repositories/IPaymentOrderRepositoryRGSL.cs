using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.DTO;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.Requests;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.Repositories
{
    public interface IPaymentOrderRepositoryRGSL
    {
        IList<DocumentForNetting> GetDocumentsForNetting(DocumentsForNettingRequest request);

        PaymentOrderDto GetPaymentOrder(string paymentOrderNumber);

        IList<PaymentOrderItemDto> GetPaymentOrderItems(string paymentOrderNumber);

        IList<PaymentOrderRiskDto> GetPaymentOrderAndRisksInfo(long? bankStatementItemId);

    }
}
