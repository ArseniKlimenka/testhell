using Adacta.AdInsure.Framework.Core.ApplicationContext;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Domain.Entities.IntegrationService.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Entities.IntegrationService.Models;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;
using Adacta.AdInsure.RGSL.Claims.API.Internal.Requests;
using Adacta.AdInsure.RGSL.Claims.API.Internal.Services;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Claims.ApplicationServices.Internal.Services
{
    public class CollectiveClaimPOServiceExecutor : ICollectiveClaimPOServiceExecutor
    {
        private readonly IIntegrationServiceExecutor _integrationServiceExecutor;

        public CollectiveClaimPOServiceExecutor(IIntegrationServiceExecutor integrationServiceExecutor)
        {
            _integrationServiceExecutor = integrationServiceExecutor;
        }

        public async Task<JsonObject> ExecutePoCreation(CreateCollectibeClaimPoRequest request)
        {
            IntegrationServiceResponse response = null;

            using (new ApplicationContextImpersonation(new ImpersonationOptions(Guid.Empty, "System")))
            {
                var requestObject = JsonConvert.SerializeObject(new { paymentOrderType = "Claim", paymentOrderSubtype = "Collective", referenceNumber = request.ClaimNumber, shoudlUpdateRefDoc = true });
                var serviceRequest = new JsonObject(requestObject);
                response = await _integrationServiceExecutor.Execute("CreatePaymentOrder", "1", serviceRequest);
            }

            if (response.Code == (int) IntegrationServiceResponseConst.Error)
            {
                var errorMessage = response.Content.ParsedJson["errorResponse"]["message"].ToString();
                throw new BusinessException(errorMessage);
            }
            if (response.Code != (int) IntegrationServiceResponseConst.Success)
            {
                string errorMessage = response.Content.ParsedJson.ToString();
                throw new InvalidOperationException(errorMessage);
            }

            return response.Content;
        }
    }
}