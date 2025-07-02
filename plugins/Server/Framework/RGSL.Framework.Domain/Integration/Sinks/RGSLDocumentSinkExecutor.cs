using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adacta.AdInsure.Framework.Core.ApplicationContext;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Domain.ConceptPermissions.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Providers;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Services;
using Adacta.AdInsure.Framework.Core.Domain.Integration;
using Adacta.AdInsure.Framework.Core.Domain.Integration.Sinks;
using Adacta.AdInsure.RGSL.PAS.API.Consts;
using Newtonsoft.Json.Linq;

namespace Adacta.AdInsure.RGSL.Framework.Domain.Integration.Sinks
{
    public class RGSLDocumentSinkExecutor : DocumentSinkExecutor
    {
        private const string SYSTEM_ACTOR_CODE = "System";

        public RGSLDocumentSinkExecutor(
            IDocumentConfigurationProvider documentConfigurationProvider,
            IDocumentErrors documentErrors,
            IConceptPermissionDomainService conceptPermissionDomainService
        ) : base(
            documentConfigurationProvider,
            documentErrors,
            conceptPermissionDomainService)
        {
        }

        protected override async Task<JsonObject> ProcessMappingResultAsync(SinkExecutionRequest request, JsonObject mappingResult, ExecutionContext context)
        {   
            var useOverride = mappingResult.ParsedJson["useSinkConfOverride"]?.Value<bool>() ?? false;
            var allowActiveDocumentsUpdate = mappingResult.ParsedJson["allowActiveDocumentsUpdate"]?.Value<bool>() ?? false;

            if (allowActiveDocumentsUpdate)
            {
                ApplicationContext.Properties.Add(CommonConsts.AllowActiveDocumentsUpdate, "true");
            }

            if (useOverride)
            {
                var ignorableErrorsToken = mappingResult.ParsedJson["allowOnValidationErrors"];

                if (ignorableErrorsToken != null)
                {
                    var areAllErrorsIgnorable = new JsonObject((JObject) ignorableErrorsToken).ParsedJson["all"]?.Value<bool>() ?? false;
                    request.SinkConfiguration.Document.AllowOnValidationErrors.All = areAllErrorsIgnorable;
                }

                var allowUpdatingToken = mappingResult.ParsedJson["allowUpdatingInStates"];

                if (allowUpdatingToken != null)
                {
                    var statesArray = new JsonObject((JArray) allowUpdatingToken).ParsedJArray?.ToObject<List<string>>();
                    request.SinkConfiguration.Document.AllowUpdating.InStates = statesArray ?? new List<string>();
                }

            }

            var executeAsSystem = request.SinkConfiguration.ExecuteAs == SYSTEM_ACTOR_CODE;
            JsonObject result = null;

            if (executeAsSystem)
            {
                using (new ApplicationContextImpersonation(new ImpersonationOptions(Guid.Empty, request.SinkConfiguration.ExecuteAs)))
                {
                    result = await base.ProcessMappingResultAsync(request, mappingResult, context);
                }
            }
            else
            {
                result = await base.ProcessMappingResultAsync(request, mappingResult, context);
            }

            if (allowActiveDocumentsUpdate)
            {
                ApplicationContext.Properties.Remove(CommonConsts.AllowActiveDocumentsUpdate);
            }

            return result;
        }
    }
}
