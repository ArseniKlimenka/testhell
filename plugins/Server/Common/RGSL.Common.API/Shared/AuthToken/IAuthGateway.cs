using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.AuthToken
{
    public interface IAuthGateway
    {
        Task<(string, int)> AuthenticateAsync();
    }
}
