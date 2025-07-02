using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Services
{
    public interface IPayableCommissionServiceApp
    {
        void Repost(PayableCommissionRepostRequest request);
    }
}
