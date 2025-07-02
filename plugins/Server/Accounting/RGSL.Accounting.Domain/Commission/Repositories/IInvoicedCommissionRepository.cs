using System.Collections.Generic;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Responses;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Repositories
{
    public interface IInvoicedCommissionRepository
    {
        InvoicedCommissionResponse GetInvoicedCommission(List<InvoicedCommissionRequest> invoicedCommissionRequest);
    }
}
