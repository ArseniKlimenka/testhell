using Adacta.AdInsure.Framework.Core.Domain.Common;
using Adacta.AdInsure.RGSL.Framework.API.EntitySearch.Dto;

namespace Adacta.AdInsure.RGSL.Framework.API.EntitySearch.Services
{
    public interface IElasticSearchIndexerServiceRGSL
    {
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        void IndexDocument(ProcessEntityEsRequest request);
        void DeleteDocument(ProcessEntityEsRequest request);
        void EraseDocument(ProcessEntityEsRequest request);
    }
}
