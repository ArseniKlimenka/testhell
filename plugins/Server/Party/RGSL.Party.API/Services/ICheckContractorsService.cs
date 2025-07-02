using Adacta.AdInsure.RGSL.Party.API.DTO;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Party.API.Services
{
    public interface ICheckContractorsService
    {
        string CheckContractors(string request);
        List<CheckContractorsResult> CheckMultipleContractors(GetMultipleContractorsRequest request);
    }
}
