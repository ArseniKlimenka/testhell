using System.Threading.Tasks;
using Adacta.AdInsure.RGSL.PAS.API.Integration.Contracts.DTO;

namespace Adacta.AdInsure.RGSL.PAS.API.Integration.Contracts.Services
{
    public interface IGetContractDataCustomService
    {
        //List<ContractDataCustomResponse> GetContractData(ContractDataCustomRequest request);

        Task<object> GetContractData(ContractDataCustomRequest request);
    }
}
