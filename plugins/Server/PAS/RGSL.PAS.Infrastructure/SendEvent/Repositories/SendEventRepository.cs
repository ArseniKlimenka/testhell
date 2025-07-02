using Adacta.AdInsure.RGSL.PAS.Domain.Integration.SendEvent.DTO;
using Adacta.AdInsure.RGSL.PAS.Domain.Integration.SendEvent.Repositories;
using Adacta.AdInsure.RGSL.PAS.Infrastructure.SendEvent.Queries;
using System;

namespace Adacta.AdInsure.RGSL.PAS.Infrastructure.SendEvent.Repositories
{
    public class SendEventRepository: ISendEventRepository
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public SendEventRepository(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public void SetEventStatus(EventDomainRequest request)
        {
            string sql = SendEventQueries.SetEventStatus();

            using var db = _databaseFactory.CreateDatabase();
            db.Execute(sql, request);
        }
    }
}
