using Adacta.AdInsure.EntityInfrastructure.Domain.SearchDocuments;
using Adacta.AdInsure.EntityInfrastructure.Domain.SearchDocuments.Errors;
using Adacta.AdInsure.EntityInfrastructure.Domain.SearchDocuments.Interfaces;
using Adacta.AdInsure.Framework.Core.API.Shared.Common.DomainEvents;
using Adacta.AdInsure.Framework.Core.Core;
using Adacta.AdInsure.Framework.Core.Domain.SearchDocuments.DTO;
using Adacta.AdInsure.Framework.Core.Domain.SearchDocuments.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.SearchDocuments.Model;
using Adacta.AdInsure.Framework.Core.ElasticSearch;
using Adacta.AdInsure.Framework.Core.Ioc.Ninject;
using Adacta.AdInsure.Framework.Core.Logging;
using Adacta.AdInsure.Framework.Core.SearchEngine;
using Adacta.AdInsure.Framework.Core.Settings.SearchEngineSettings;
using Adacta.AdInsure.RGSL.Framework.API.EntitySearch.Dto;
using Adacta.AdInsure.RGSL.Framework.Domain.EntitySearch;
using Microsoft.Extensions.Logging;
using Nest;
using System;
using System.Collections.Generic;
using System.Linq;
using ISearchDocumentIndexer = Adacta.AdInsure.EntityInfrastructure.Domain.SearchDocuments.Interfaces.ISearchDocumentIndexer;

namespace Adacta.AdInsure.RGSL.Framework.Infrastructure.EntitySearch
{
    public class ElasticSearchIndexerRGSL : IElasticSearchIndexerRGSL
    {
        private readonly IndexerDataProviderRegistry _indexerDataProviderRegistry;
        private readonly ISearchDocumentProvider _searchDocumentProvider;
        private readonly ISearchDocumentMetadataProvider _searchDocumentMetadataProvider;
        private readonly ISearchDocumentConverter _searchDocumentConverter;
        private readonly ISearchDocumentIndexer _searchDocumentIndexer;
        private IElasticClient _elasticClient;
        private readonly ISearchEngineClientResponseHandler _elasticClientResponseHandler;
        private readonly ILogger _logger;
        private readonly ISearchEngineSettings _elasticSearchSettings;

        public ElasticSearchIndexerRGSL(ISearchDocumentProvider searchDocumentProvider,
            IndexerDataProviderRegistry indexerDataProviderRegistry,
            ISearchDocumentMetadataProvider searchDocumentMetadataProvider,
            ISearchDocumentConverter searchDocumentConverter,
            ISearchDocumentIndexer searchDocumentIndexer,
            IElasticClientFactory elasticClientFactory,
            ISearchEngineClientResponseHandler elasticClientResponseHandler,
            ISearchEngineSettings elasticSearchSettings)
        {
            _searchDocumentProvider = searchDocumentProvider;
            _indexerDataProviderRegistry = indexerDataProviderRegistry;
            _searchDocumentMetadataProvider = searchDocumentMetadataProvider;
            _searchDocumentConverter = searchDocumentConverter;
            _searchDocumentIndexer = searchDocumentIndexer;
            _elasticClient = elasticClientFactory.CreateHighLevelClient();
            _elasticClientResponseHandler = elasticClientResponseHandler;
            _logger = LogManagerAccessor.GetLogger<ElasticSearchIndexerRGSL>();
            _elasticSearchSettings = elasticSearchSettings;
        }

        public void IndexDocument(ProcessEntityEsRequest request)
        {
            var documents = GetDocuments(request.EntityType, request.ConfigurationName, request.EntityId);
            _searchDocumentIndexer.IndexBatch(documents, throwsError: true);
        }

        public void DeleteDocument(ProcessEntityEsRequest request)
        {
            var document = GetDocuments(request.EntityType, request.ConfigurationName, request.EntityId).First();

            var fullIndexName = SearchEngineIndexNameGenerator.Generate(_elasticSearchSettings.IndexPrefix, document.IndexName);
            var result = _elasticClient.Delete(new DeleteRequest(fullIndexName, document.Id));
            _elasticClientResponseHandler.ValidateResponse(fullIndexName, new NestClientResponse(result), _logger, shouldThrowError: true);
        }

        public void EraseDocument(ProcessEntityEsRequest request)
        {
            var eraser = NinjectKernel.Instance.Get<ISearchDocumentEraser>();
            eraser.EraseDocuments(request.EntityType, request.EntityId);
        }

        private List<SearchDocument> GetDocuments(string entityType, string confName, Guid entityId)
        {
            var entityTypeInfo = EntityTypeRegistry.Instance.GetEntityTypeByCodeName(entityType);
            var dataProviderMetadatas = _searchDocumentMetadataProvider.GetSearchDocumentAllMetadata();

            List<SearchDocumentProviderMetadata> dataProviderMetadata = null;

            if (entityTypeInfo == null)
            {
                dataProviderMetadata = dataProviderMetadatas.Where(m => m.CodeName == confName).ToList();
            }
            else
            {
                dataProviderMetadata = dataProviderMetadatas.Where(m => m.EntityType == entityTypeInfo.CodeName).ToList();
            }

            if (!dataProviderMetadata.Any())
            {
                return new List<SearchDocument>();
            }

            var indexerDataProvider = _indexerDataProviderRegistry.ResolveIndexerDataProvider(entityTypeInfo, SynchronizationDocumentType.EntityType);

            if (indexerDataProvider == null)
            {
                throw SearchDocumentsErrors.NoDatabaseDataProvider(SynchronizationDocumentType.EntityType.ToString());
            }

            var data = indexerDataProvider.GetDataWithMetaData(entityId);

            if (data == null)
            {
                throw SearchDocumentsErrors.NoEntryFound(entityId);
            }

            if (data.Metadata == null)
            {
                throw SearchDocumentsErrors.NoMetadataFound(entityId);
            }

            if (data.Metadata.Configuration == null)
            {
                throw SearchDocumentsErrors.NoConfigurationFound(entityId);
            }

            var docs = _searchDocumentConverter.Convert(data, dataProviderMetadata);

            return docs;
        }
    }
}
