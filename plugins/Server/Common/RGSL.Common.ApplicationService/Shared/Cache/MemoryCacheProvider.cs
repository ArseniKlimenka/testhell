using Adacta.AdInsure.RGSL.Common.API.Shared.Cache;
using System.Runtime.Caching;

namespace Adacta.AdInsure.RGSL.Common.ApplicationServices.Shared.Cache
{
    public class MemoryCacheProvider : IMemoryCacheProvider
    {
        public MemoryCache GetInMemoryCache() => MemoryCache.Default;
    }
}
