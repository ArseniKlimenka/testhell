using Adacta.AdInsure.RGSL.Accounting.API.Shared.Subledger.Requests;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Journal.Interfaces
{
    public interface IJournalServiceRgsl
    {
        void PostTransaction(PostTransactionRequest request);
    }
}
