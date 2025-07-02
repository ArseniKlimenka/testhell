using Adacta.AdInsure.Framework.Core.Data.Orm;
using Adacta.AdInsure.RGSL.Common.API.Shared.Constants;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.SmsSecurity;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.SmsSecurity.Queries;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.SmsSecurity.Repositories;
using System;
using System.Linq;

namespace Adacta.AdInsure.RGSL.Common.Infrastructure.Integration.SmsSecurity.Repositories
{
    public class SecuritySmsNotificationRepository : ISecuritySmsNotificationRepository
    {
        private readonly ISecuritySmsNotificationQueries _queries;
        private readonly DatabaseFactory _databaseFactory;

        public SecuritySmsNotificationRepository(ISecuritySmsNotificationQueries queries, DatabaseFactory databaseFactory)
        {
            _queries = queries;
            _databaseFactory = databaseFactory;
        }

        public void StoreNotificationData(SecuritySmsNotificationData data)
        {
            using var db = _databaseFactory.CreateDatabase();
            db.Insert(_queries.InsertSmsSecurityData(), data);
        }

        public SecuritySmsNotificationData GetLastNotificationData(string referenceNumber, string partyCode, SecuritySmsTypeCode typeCode)
        {
            using var db = _databaseFactory.CreateDatabase();
            var result = db.Fetch<SecuritySmsNotificationData>(_queries.SelectSmsSecurityData(), new { referenceNumber, partyCode, typeCode });
            return result.FirstOrDefault();
        }

        public void SetCodeAsVerified(Guid notificationId)
        {
            using var db = _databaseFactory.CreateDatabase();
            db.Execute("UPDATE BFX_IMPL.SMS_SECURITY_NOTIFICATION SET IS_VERIFIED = 1 WHERE NOTIFICATION_ID = @id", new { id = notificationId });
        }
    }
}
