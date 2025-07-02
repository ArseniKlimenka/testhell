using Adacta.AdInsure.RGSL.Framework.API.EntitySearch.Dto;
using Adacta.AdInsure.RGSL.Framework.API.EntitySearch.Services;
using Adacta.AdInsure.RGSL.Framework.Domain.EntitySearch;

namespace Adacta.AdInsure.RGSL.Framework.ApplicationServices.EntitySearch
{
    public class ElasticSearchIndexerServiceRGSL : IElasticSearchIndexerServiceRGSL
    {
        private readonly IElasticSearchIndexerRGSL _esIndexer;

        public ElasticSearchIndexerServiceRGSL(IElasticSearchIndexerRGSL esIndexer)
        {
            _esIndexer = esIndexer;
        }
        public void DeleteDocument(ProcessEntityEsRequest request)
        {
            _esIndexer.DeleteDocument(request);
        }

        public void EraseDocument(ProcessEntityEsRequest request)
        {
            _esIndexer.EraseDocument(request);
        }

        public void IndexDocument(ProcessEntityEsRequest request)
        {
            _esIndexer.IndexDocument(request);
        }
    }
}
