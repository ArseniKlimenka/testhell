using Adacta.AdInsure.RGSL.Framework.API.EntitySearch.Dto;

namespace Adacta.AdInsure.RGSL.Framework.Domain.EntitySearch
{
    public interface IElasticSearchIndexerRGSL
    {
        void IndexDocument(ProcessEntityEsRequest request);
        void DeleteDocument(ProcessEntityEsRequest request);

        void EraseDocument(ProcessEntityEsRequest request);
    }
}
