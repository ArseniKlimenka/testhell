using Adacta.AdInsure.RGSL.Common.API.Shared.Constants;
using System;

namespace Adacta.AdInsure.RGSL.Common.Domain.Integration.SmsSecurity.Repositories
{
    public interface ISecuritySmsNotificationRepository
    {
        void StoreNotificationData(SecuritySmsNotificationData data);

        SecuritySmsNotificationData GetLastNotificationData(string referenceNimber, string partyCode, SecuritySmsTypeCode typeCode);

        void SetCodeAsVerified(Guid notificationId);
    }
}
