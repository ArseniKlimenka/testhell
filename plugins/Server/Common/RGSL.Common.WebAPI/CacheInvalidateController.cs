using Adacta.AdInsure.Framework.Core.Cache;
using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace Adacta.AdInsure.RGSL.Common.WebAPI.Integration
{
    [Route("api/rgsl/common/shared/cache")]
    public class CacheInvalidateController : AIApiController
    {
        private readonly ICacheProvider _service;

        public CacheInvalidateController(ICacheProvider service)
        {
            _service = service;
        }

        [HttpGet, Route("invalidate")]
        public void Invalidate(string name)
        {
            var cache = _service.GetCache(name);
            if (cache != null)
            {
                cache.Clear();
            }
        }
    }
}