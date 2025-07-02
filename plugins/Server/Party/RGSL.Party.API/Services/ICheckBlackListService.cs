using Adacta.AdInsure.RGSL.Party.API.DTO;

namespace Adacta.AdInsure.RGSL.Party.API.Services
{
    public interface ICheckBlackListService
    {
        string CheckBlackListAgreement(string request);
    }
}
