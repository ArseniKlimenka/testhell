using Adacta.AdInsure.Framework.Core.Data.Orm;
using RGSL.Claims.Domain.CollectiveClaim.DTO;
using RGSL.Claims.Domain.CollectiveClaim.Repositories;
using System.Collections.Generic;

namespace RGSL.Claims.Infrastructure.CollectiveClaim.Repositories
{
    public class CollectiveClaimRepository : ICollectiveClaimRepository
    {
        private readonly DatabaseFactory _databaseFactory;

        public CollectiveClaimRepository(DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public void SaveRecipientsToClaim(IEnumerable<ColleciveClaimRecipientDomainDto> recipients)
        {
            string sql = CollectiveClaimQueries.WriteRecipientQuery();

            using var db = _databaseFactory.CreateDatabase();
            db.InsertBulk(sql, recipients);
        }

        public void SaveSingleRecipientToClaim(ColleciveClaimRecipientDomainDto recipient)
        {
            string sql = CollectiveClaimQueries.WriteRecipientQuery();

            using var db = _databaseFactory.CreateDatabase();
            db.Insert(sql, recipient);
        }
    }
}
