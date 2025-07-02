using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.Framework.API.EntitySearch.Dto;
using Adacta.AdInsure.RGSL.Framework.API.EntitySearch.Services;
using Microsoft.AspNetCore.Mvc;
using RoutePrefix = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Adacta.AdInsure.RGSL.Framework.WebAPI.EntitySearch
{
    [RoutePrefix("api/entity-infrastructure-ext/shared/es-indexer")]
    public class ElasticSearchIndexerController : AIApiController, IElasticSearchIndexerServiceRGSL
    {
        private readonly IElasticSearchIndexerServiceRGSL _indexerService;

        public ElasticSearchIndexerController(IElasticSearchIndexerServiceRGSL indexerService)
        {
            _indexerService = indexerService;
        }

        [HttpPost, Route("delete-document")]
        public void DeleteDocument(ProcessEntityEsRequest request)
        {
            _indexerService.DeleteDocument(request);
        }

        [HttpPost, Route("index-document")]
        public void IndexDocument(ProcessEntityEsRequest request)
        {
            _indexerService.IndexDocument(request);
        }

        [HttpPost, Route("erase-document")]
        public void EraseDocument(ProcessEntityEsRequest request)
        {
            _indexerService.EraseDocument(request);
        }
    }
}
