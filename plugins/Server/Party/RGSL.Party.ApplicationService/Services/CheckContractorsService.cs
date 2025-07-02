using Adacta.AdInsure.RGSL.Party.Domain.Integration.Interfaces;
using Adacta.AdInsure.Framework.Core.Logging;
using Adacta.AdInsure.RGSL.Common.API.Constants;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Settings;
using Adacta.AdInsure.RGSL.Party.API.Services;
using Microsoft.Extensions.Logging;
using System;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Linq;
using Adacta.AdInsure.RGSL.Party.API.DTO;

namespace Adacta.AdInsure.RGSL.Party.ApplicationServices.Services
{
    public class CheckContractorsService : ICheckContractorsService
    {
        #region private
        private readonly ICheckContractorsDomainService _checkContractorsDomainService;
        #endregion

        #region .ctor
        public CheckContractorsService(ICheckContractorsDomainService checkContractorsDomainService)
        {
            _checkContractorsDomainService = checkContractorsDomainService;
        }
        #endregion

        public string CheckContractors(string request)
        {
            return _checkContractorsDomainService.CallCheckContractorsService(request);
        }

        public List<CheckContractorsResult> CheckMultipleContractors(GetMultipleContractorsRequest request)
        {
            var result = new List<CheckContractorsResult>();

            foreach (var item in request.RequestData.Children())
            {
                var itemProperties = item.Children<JProperty>();
                var partyCode = itemProperties.First(x => x.Name == "itemCode").Value.Value<int>();
                var partyData = itemProperties.First(x => x.Name == "itemData").Value.ToString();
                var serviceResponse = _checkContractorsDomainService.CallCheckContractorsService(partyData);
                result.Add(new CheckContractorsResult
                {
                    ContractorPartyCode = partyCode,
                    CheckResultData = JObject.Parse(serviceResponse)
                });
            }

            return result;
        }

    }
}