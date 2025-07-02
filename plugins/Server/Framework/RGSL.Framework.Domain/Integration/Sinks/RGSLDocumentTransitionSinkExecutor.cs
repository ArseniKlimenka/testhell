using Adacta.AdInsure.Framework.Core.ApplicationContext;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Domain.ConceptPermissions.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Providers;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Services;
using Adacta.AdInsure.Framework.Core.Domain.Integration;
using Adacta.AdInsure.Framework.Core.Domain.Integration.Sinks;
using System;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Framework.Domain.Integration.Sinks
{
    public class RGSLDocumentTransitionSinkExecutor : DocumentTransitionSinkExecutor
    {
        private const string SYSTEM_ACTOR_CODE = "System";

        public RGSLDocumentTransitionSinkExecutor(
            IDocumentConfigurationProvider configurationProvider,
            IDocumentErrors documentErrors,
            IConceptPermissionDomainService conceptPermissionDomainService)
            : base(
                  configurationProvider,
                  documentErrors,
                  conceptPermissionDomainService)
        {
        }

        protected override async Task<JsonObject> ProcessMappingResultAsync(SinkExecutionRequest request, JsonObject mappingResult, ExecutionContext context)
        {
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

            return result;
        }
    }
}
