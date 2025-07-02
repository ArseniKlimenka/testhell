using System;

namespace Adacta.AdInsure.RGSL.Common.Domain.Integration.SmsSecurity
{
    public class SecuritySmsNotificationData
    {
        public Guid NotificationId { get; set; }
        public string ReferenceNumber { get; set; }
        public string PartyCode { get; set; }
        public string PhoneNumber { get; set; }
        public string SecurityCode { get; set; }
        public string SmsId { get; set; }
        public int SmsTypeCode { get; set; }
        public DateTime NotificationDate { get; set; }
        public bool IsVerified { get; set; }
    }
}
