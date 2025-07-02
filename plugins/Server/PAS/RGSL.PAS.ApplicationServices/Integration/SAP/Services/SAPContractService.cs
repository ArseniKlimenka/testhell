
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Settings;
using Adacta.AdInsure.RGSL.PAS.API.Integration.SAP.DTO;
using Adacta.AdInsure.RGSL.PAS.API.Integration.SAP.Services;
using Adacta.AdInsure.RGSL.PAS.Domain.Integration.SAP.Interfaces;
using System;

namespace Adacta.AdInsure.RGSL.PAS.ApplicationServices.Integration.SAP.Services
{
    public class SAPContractService : ISAPContractService
    {
        #region private
        private readonly ICommonIntegrationSettings _settings;
        private readonly ISAPProxyDomainService _domainProxyService;
        #endregion

        private readonly string _createContractMethodId;

        #region .ctor
        public SAPContractService(ICommonIntegrationSettings settings, ISAPProxyDomainService domainProxyService)
        {
            _settings = settings;
            _domainProxyService = domainProxyService;
            _createContractMethodId = "Zerluapi000000000101";
        }
        #endregion

        public SAPIntegrationResponse CreateContract(string request)
        {
            var result = new SAPIntegrationResponse
            {
                LoadedOnDate = DateTime.Now
            };

            var createContractResponse = _domainProxyService.CallSAPService(
                        request,
                        _createContractMethodId,
                        _settings.SAPCreatePartyUrl,
                        _settings.SAPLogin,
                        _settings.SAPPassword
                    );

            // parse server response

            result.MethodName = _createContractMethodId;

            return result;
        }
    }
}