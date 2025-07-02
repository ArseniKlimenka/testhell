using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.PaymentOrder.Incoming.DTO;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.PaymentOrder.Incoming
{
    public interface IPaymentOrderIncomingAllocationStrategyRepository
    {
        IList<PaymentOrderIncomingInstallmentDetailsDto> GetInstallmentsDetails(string referenceNo);
    }
}
