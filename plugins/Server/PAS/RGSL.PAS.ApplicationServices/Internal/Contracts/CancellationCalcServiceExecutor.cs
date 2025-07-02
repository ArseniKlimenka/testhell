using Adacta.AdInsure.Framework.Core.ApplicationContext;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Domain.Entities.IntegrationService.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Entities.IntegrationService.Models;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;
using Adacta.AdInsure.RGSL.PAS.API.Internal.Contracts;
using Adacta.AdInsure.RGSL.PAS.API.Internal.Contracts.Requests;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.PAS.ApplicationServices.Internal.Contracts
{
    public class CancellationCalcServiceExecutor : ICancellationCalcServiceExecutor
    {
        private readonly IIntegrationServiceExecutor _integrationServiceExecutor;

        public CancellationCalcServiceExecutor(IIntegrationServiceExecutor integrationServiceExecutor)
        {
            _integrationServiceExecutor = integrationServiceExecutor;
        }

        public async Task<JsonObject> ExecuteCalculation(CancellationCalculationRequest request)
        {
            IntegrationServiceResponse response = null;

            using (new ApplicationContextImpersonation(new ImpersonationOptions(Guid.Empty, "System")))
            {
                var requestObject = JsonConvert.SerializeObject(request);
                var serviceRequest = new JsonObject(requestObject);
                response = await _integrationServiceExecutor.Execute("CalculateCancellationAmounts", "1", serviceRequest);
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
