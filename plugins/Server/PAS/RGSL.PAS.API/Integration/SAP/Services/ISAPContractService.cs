using Adacta.AdInsure.RGSL.PAS.API.Integration.SAP.DTO;

namespace Adacta.AdInsure.RGSL.PAS.API.Integration.SAP.Services
{
    public interface ISAPContractService
    {
        SAPIntegrationResponse CreateContract(string request);
    }
}
