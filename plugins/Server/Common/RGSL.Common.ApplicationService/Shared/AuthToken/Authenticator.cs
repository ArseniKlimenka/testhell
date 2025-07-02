using Adacta.AdInsure.RGSL.Common.API.Shared.Cache;
using Adacta.AdInsure.RGSL.Common.API.Shared.AuthToken;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Common.ApplicationServices.Shared.AuthToken
{
    public class Authenticator : IAuthenticator
    {
        private readonly IMemoryCacheProvider _provider;
        private readonly IAuthGateway _client;
        private readonly string tokenCacheKey = "ServerAuthToken";

        public Authenticator(IMemoryCacheProvider provider, IAuthGateway client)
        {
            _provider = provider;
            _client = client;
        }

        public async Task<string> GetToken()
        {
            var cache = _provider.GetInMemoryCache();
            var token = cache.Get(tokenCacheKey)?.ToString();

            if (token == null)
                token = await GetTokenForce().ConfigureAwait(false);

            return token;
        }

        public async Task<string> GetTokenForce()
        {
            var (token, expire) = await _client.AuthenticateAsync().ConfigureAwait(false);

            var cache = _provider.GetInMemoryCache();
            cache.Set(tokenCacheKey, token, DateTimeOffset.Now.AddSeconds(expire));

            return token;
        }
    }
}
