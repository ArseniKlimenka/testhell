using System;
using DatabaseFactory = Adacta.AdInsure.Framework.Core.Data.Orm.DatabaseFactory;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Repositories;
using Adacta.AdInsure.RGSL.Common.Infrastructure.Integration.Cbr.Queries;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Queries;

namespace Adacta.AdInsure.RGSL.Common.Infrastructure.Integration.Cbr.Repositories
{
    public class CbrKeyRateRepository : ICbrKeyRateRepository
    {
        private readonly DatabaseFactory _databaseFactory;
        private readonly ICbrKeyRateQueries _queries;

        public CbrKeyRateRepository(DatabaseFactory databaseFactory, ICbrKeyRateQueries queries)
        {
            _databaseFactory = databaseFactory;
            _queries = queries;
        }

        public CbrKeyRate GetLastKeyRate()
        {
            using (var db = _databaseFactory.CreateDatabase())
            {
                return db.SingleOrDefault<CbrKeyRate>(_queries.SelectRateByDate(),
                    new { date = DateTime.MaxValue });
            }
        }

        public CbrKeyRate GetKeyRateByDate(DateTime date)
        {
            using (var db = _databaseFactory.CreateDatabase())
            {
                return db.Single<CbrKeyRate>(_queries.SelectRateByDate(),
                    new { date });
            }
        }

        public void AddKeyRate(float rate, DateTime date)
        {
            using (var db = _databaseFactory.CreateDatabase())
            {
                db.Insert(new CbrKeyRate
                {
                    Rate = rate,
                    RateDate = date
                });
            }
        }
    }
}
