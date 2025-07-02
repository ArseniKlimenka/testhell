using Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.DTO;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.Interfaces
{
    public interface IGLDimensionsService
    {
        public string GetPersonalAccountNumber(GLAdditionalAttrsRgsl glAttrs, SapGlAccountDTO sapGlAccount, string glAccountNo, string currencyCode, string ofrCode);
    }
}
