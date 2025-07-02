using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.AuthToken
{
    public interface IAuthenticator
    {
        Task<string> GetToken();

        Task<string> GetTokenForce();
    }
}
