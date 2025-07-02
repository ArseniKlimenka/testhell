using Adacta.AdInsure.Framework.Core.Domain.Security.Queries;

namespace Adacta.AdInsure.RGSL.Framework.Infrastructure.Security
{
    internal class OAuthQueriesRgsl : IOAuthQueries
    {
        public string Select_LoginData()
        {
            return @"
select 
    APPLICATION_USER_ID,
    USERNAME
from
    ORG.APPLICATION_USER
where
    USERNAME = @username";
        }
    }
}
