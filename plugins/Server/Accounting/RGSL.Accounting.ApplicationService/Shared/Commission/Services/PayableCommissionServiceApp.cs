using Adacta.AdInsure.Framework.Core.Transactions;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Services;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Interfaces;

namespace Adacta.AdInsure.RGSL.Accounting.ApplicationServices.Shared.Commission.Services
{
    public class PayableCommissionServiceApp : IPayableCommissionServiceApp
    {
        private readonly IPayableCommissionService _service;

        public PayableCommissionServiceApp(IPayableCommissionService service)
        {
            _service = service;
        }

        [Transaction]
        public void Repost(PayableCommissionRepostRequest request)
        {
            _service.Cancel(request.DocumentNo, request.DueDate);
            _service.Create(request.DocumentNo, request.DueDate);
        }
    }
}
