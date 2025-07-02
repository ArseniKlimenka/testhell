using System.Threading.Tasks;
using Adacta.AdInsure.Framework.Core.Common;

namespace Adacta.AdInsure.RGSL.Party.API.Services
{
    public interface IDadataService
    {
        /// <summary>
        /// get address suggestion
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        Task<JsonObject> GetAddress(string query);
    }
}
