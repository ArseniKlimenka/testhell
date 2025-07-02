using System.Collections.Generic;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Responses;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Repositories;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Services
{
    public class InvoicedCommissionService : IInvoicedCommissionService
    {
        private readonly IInvoicedCommissionRepository _invoicedCommissionRepository;

        public InvoicedCommissionService(
            IInvoicedCommissionRepository invoicedCommissionRepository
            )
        {
            _invoicedCommissionRepository = invoicedCommissionRepository;
        }

        public InvoicedCommissionResponse GetInvoicedCommission(List<InvoicedCommissionRequest> invoicedCommissionRequest)
        {
            return _invoicedCommissionRepository.GetInvoicedCommission(invoicedCommissionRequest);
        }
    }
}
