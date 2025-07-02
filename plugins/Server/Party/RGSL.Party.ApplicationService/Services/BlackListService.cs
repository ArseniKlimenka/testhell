using Adacta.AdInsure.RGSL.Party.Domain.Integration.Interfaces;
using Adacta.AdInsure.Framework.Core.Logging;
using Adacta.AdInsure.RGSL.Common.API.Constants;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Settings;
using Adacta.AdInsure.RGSL.Party.API.Services;
using Microsoft.Extensions.Logging;
using System;

namespace Adacta.AdInsure.RGSL.Party.ApplicationServices.Services
{
    public class CheckBlackListService : ICheckBlackListService
    {
        #region private
        private readonly IBlackListDomainService _blackListDomainService;
        #endregion

        #region .ctor
        public CheckBlackListService(IBlackListDomainService blackListDomainService)
        {
            _blackListDomainService = blackListDomainService;
        }
        #endregion

        public string CheckBlackListAgreement(string request)
        {
            return _blackListDomainService.CallBlackListDomainService(request);
        }
        
    }
}