using System.Collections.Generic;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Responses;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Interfaces
{
    public interface IInvoicedCommissionService
    {
        InvoicedCommissionResponse GetInvoicedCommission(List<InvoicedCommissionRequest> invoicedCommissionRequest);
    }
}
