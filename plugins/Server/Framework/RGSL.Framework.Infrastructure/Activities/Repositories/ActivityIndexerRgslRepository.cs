using Adacta.AdInsure.RGSL.Framework.Domain.Activities.Repositories;
using Adacta.AdInsure.RGSL.Framework.Domain.Activities.Responses;
using Adacta.AdInsure.RGSL.Framework.Infrastructure.Activities.Queries;

namespace Adacta.AdInsure.RGSL.Framework.Infrastructure.Activities.Repositories
{
    public class ActivityIndexerRgslRepository : IActivityIndexerRgslRepository
    {
        private readonly AdInsure.Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public ActivityIndexerRgslRepository(AdInsure.Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public ExtraVerificationDataResponse GetExtraVerificationData(string verificationNumber, string contractNumber)
        {
            string sql = ActivityIndexerRgslQuery.SelectExtraVerificationData();

            using var db = _databaseFactory.CreateDatabase();

            return db.SingleOrDefault<ExtraVerificationDataResponse>(sql, verificationNumber, contractNumber);
        }
    }
}
