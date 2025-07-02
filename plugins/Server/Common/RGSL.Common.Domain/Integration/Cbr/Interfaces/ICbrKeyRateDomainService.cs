using Adacta.AdInsure.RGSL.Common.API.Shared.Integration.DTOs;

namespace Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Interfaces
{
    public interface ICbrKeyRateDomainService
    {        
        void KeyRateImport();

        float KeyRateByDate(LoadCbrKeyRateRequest request);
    }
}
