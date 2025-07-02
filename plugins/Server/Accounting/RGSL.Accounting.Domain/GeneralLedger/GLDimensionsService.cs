using System.Globalization;
using Adacta.AdInsure.Core.API.Shared.Services;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.DTO;
using Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.Repositories;
using Adacta.AdInsure.RGSL.Common.API.Constants;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger
{
    public class GLDimensionsService : IGLDimensionsService
    {
        private readonly ICurrencyConverterService _currencyConverterService;
        private readonly IDimensionsRepository _dimensionsRepository;

        public GLDimensionsService(ICurrencyConverterService currencyConverterService, IDimensionsRepository dimensionsRepository)
        {
            _currencyConverterService = currencyConverterService;
            _dimensionsRepository = dimensionsRepository;
        }
        public string GetPersonalAccountNumber(GLAdditionalAttrsRgsl glAttrs, SapGlAccountDTO sapGlAccount, string glAccountNo, string currencyCode, string ofrCode)
        {
            string currencyIsoCode = _dimensionsRepository.GetCurrencyIsoCodeByCurrencyCode(currencyCode);
            string panCurrencyIsoId = currencyCode == _currencyConverterService.LocalCurrencyCode ? CurrencyIdConst.RubUSSR.ToString(CultureInfo.InvariantCulture) : currencyIsoCode;
            string companyCodeConst = "03";

            string PAN;

            if (ofrCode != null)
            {
                //Format1: AAAAABBBCCDDDDDFFFFF for transactions with OFR code information
                string businessLine = glAttrs.BusinessLine;
                PAN = $"{glAccountNo}{panCurrencyIsoId}{companyCodeConst}{ofrCode}{businessLine}";
            }
            else
            {
                //Format2: AAAAABBBCCNNNNNNNNNN for transactions without OFR code information. SAP GL account is used
                string sapGlAccountNo = sapGlAccount.SapGlAccountNo;
                PAN = $"{glAccountNo}{panCurrencyIsoId}{companyCodeConst}{sapGlAccountNo}";
            }

            ValidatePersonalAccountNumber(PAN);
            return PAN;
        }

        private static void ValidatePersonalAccountNumber(string PAN)
        {
            if(PAN.Length != 20)
            {
                throw new BusinessException($"PersonalAccountNumber {PAN} length should be 20.");
            }
        }
    }
}
