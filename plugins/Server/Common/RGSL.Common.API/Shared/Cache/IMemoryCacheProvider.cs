using System.Runtime.Caching;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Cache
{
    public interface IMemoryCacheProvider
    {
        MemoryCache GetInMemoryCache();
    }
}
