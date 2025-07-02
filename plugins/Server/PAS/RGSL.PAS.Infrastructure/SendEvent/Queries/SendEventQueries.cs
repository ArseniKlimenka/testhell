namespace Adacta.AdInsure.RGSL.PAS.Infrastructure.SendEvent.Queries
{
    static class SendEventQueries
    {
		public static string SetEventStatus()
		{
			return @"
update 
	BFX_IMPL.SEND_EVENT
set
	NEED_TO_SEND = @NeedToSend,
	RESPONSE = @Response,
	STATUS = @Status,
	UPDATED_DATE = getDate()
where SEND_EVENT_ID = @SendEventId
";
		}
	}
}
