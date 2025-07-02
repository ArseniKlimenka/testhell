using Adacta.AdInsure.RGSL.Common.API.Shared.Integration.DTOs;
using Adacta.AdInsure.RGSL.Common.API.Shared.Integration.Services;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Interfaces;
using System;

namespace Adacta.AdInsure.RGSL.Common.ApplicationServices.Shared.Integration
{
    public class CbrKeyRateService : ICbrKeyRateService
    {
        #region private fields

        private readonly ICbrKeyRateDomainService _domainService;

        #endregion

        #region .ctor

        public CbrKeyRateService(ICbrKeyRateDomainService domainService )
        {
            _domainService = domainService;
        }

        #endregion

        #region ICbrKeyRateService

        public LoadKeyRateResponse LoadKeyRate(LoadKeyRateRequest request)
        {
            
            _domainService.KeyRateImport();

            return new LoadKeyRateResponse() { LoadedOnDate = new DateTime() };
        }

        #endregion
    }
}