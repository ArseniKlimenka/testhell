using Adacta.AdInsure.RGSL.Accounting.API.Shared.Subledger.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Subledger.Services;
using Adacta.AdInsure.RGSL.Accounting.Domain.Journal.Interfaces;

namespace Adacta.AdInsure.RGSL.Accounting.ApplicationServices.Shared.Subledger.Services
{
    /// <summary>
    /// Wrapper for a domain posting service
    /// </summary>
    public class PostingServiceRgsl : IPostingServiceRgsl
    {
        private readonly IJournalServiceRgsl _journalServiceRgsl;

        public PostingServiceRgsl(IJournalServiceRgsl journalServiceRgsl)
        {
            _journalServiceRgsl = journalServiceRgsl;
        }
        
        public void PostTransaction(PostTransactionRequest request)
        {
            _journalServiceRgsl.PostTransaction(request);
        }
    }
}

