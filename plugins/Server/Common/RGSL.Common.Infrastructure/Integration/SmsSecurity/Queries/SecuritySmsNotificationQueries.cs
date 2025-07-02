using Adacta.AdInsure.RGSL.Common.Domain.Integration.SmsSecurity.Queries;

namespace Adacta.AdInsure.RGSL.Common.Infrastructure.Integration.SmsSecurity.Queries
{
    public class SecuritySmsNotificationQueries : ISecuritySmsNotificationQueries
    {
        public string InsertSmsSecurityData()
        {
            return @"
INSERT INTO
BFX_IMPL.SMS_SECURITY_NOTIFICATION
      (NOTIFICATION_ID
      ,REFERENCE_NUMBER
      ,PARTY_CODE
      ,PHONE_NUMBER
      ,SECURITY_CODE
      ,SMS_ID
      ,SMS_TYPE_CODE
      ,NOTIFICATION_DATE)
VALUES
      (@NotificationId
      ,@ReferenceNumber
      ,@PartyCode
      ,@PhoneNumber
      ,@SecurityCode
      ,@SmsId
      ,@SmsTypeCode
      ,@NotificationDate
      )
";
        }

        public string SelectSmsSecurityData()
        {
            return @"
SELECT sq.NOTIFICATION_ID,
	   sq.REFERENCE_NUMBER,
	   sq.PARTY_CODE,
	   sq.PHONE_NUMBER,
	   sq.SECURITY_CODE,
	   sq.SMS_ID,
	   sq.SMS_TYPE_CODE,
	   sq.NOTIFICATION_DATE,
       sq.IS_VERIFIED
FROM
(SELECT nt.NOTIFICATION_ID,
	    nt.REFERENCE_NUMBER,
	    nt.PARTY_CODE,
	    nt.PHONE_NUMBER,
	    nt.SECURITY_CODE,
	    nt.SMS_ID,
	    nt.SMS_TYPE_CODE,
	    nt.NOTIFICATION_DATE,
        nt.IS_VERIFIED,
	    RANK() OVER (PARTITION BY REFERENCE_NUMBER, PARTY_CODE ORDER BY NOTIFICATION_DATE DESC) AS RANK
FROM BFX_IMPL.SMS_SECURITY_NOTIFICATION nt
WHERE 1 = 1
AND nt.REFERENCE_NUMBER = @referenceNumber
AND nt.PARTY_CODE = @partyCode
AND nt.SMS_TYPE_CODE = @typeCode) sq
WHERE sq.RANK = 1
";
        }
    }
}
