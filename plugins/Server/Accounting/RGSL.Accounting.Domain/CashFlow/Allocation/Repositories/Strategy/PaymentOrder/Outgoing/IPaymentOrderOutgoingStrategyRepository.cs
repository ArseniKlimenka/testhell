using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.PaymentOrder.Outgoing.DTO;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.PaymentOrder.Outgoing
{
    public interface IPaymentOrderOutgoingAllocationStrategyRepository
    {
        IList<PaymentOrderOutgoingInstallmentDetailsDto> GetInstallmentsDetails(string referenceNo);
    }
}
