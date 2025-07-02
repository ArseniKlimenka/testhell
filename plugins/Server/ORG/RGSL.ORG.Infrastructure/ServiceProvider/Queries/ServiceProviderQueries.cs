namespace Adacta.AdInsure.RGSL.ORG.Infrastructure.ServiceProvider.Queries
{
    static class ServiceProviderQueries
    {
        public static string SelectServiceProvider()
        {
            return @"
SELECT
	sph.SERVICE_PROVIDER_CODE as CODE,
	spis.PARTY_CODE,
	spis.PARTNER_TYPE
from ORG_IMPL.SERVICE_PROVIDER_HUB sph
	join ORG_IMPL.SERVICE_PROVIDER_INFO_SAT_LATEST spis on spis.SERVICE_PROVIDER_INFO_HKEY = sph.SERVICE_PROVIDER_HKEY
WHERE /**where**/";
        }
    }
}
