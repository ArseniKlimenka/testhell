using Adacta.AdInsure.Framework.Messaging.TransactionalOutbox.Database.Queries.SQL;

namespace Adacta.AdInsure.RGSL.Framework.Infrastructure.Messaging
{
    class TransactionalOutboxManagerQueriesRGSL : MssqlTransactionalOutboxManagerQueries
    {
        public override string Select_ArePreviousMessagesInSameGroupAndDestinationPendingDelivery =>
@"
select
	case when exists
	(
	    select 1
	    from
	        BFX.MESSAGE_OUTBOX a
	        join BFX.MESSAGE_OUTBOX b with (nolock) on a.GROUP_ID = b.GROUP_ID and a.DESTINATION = b.DESTINATION
	    where 1=1
	        and b.STATUS_ID = 0
	        and a.TIMESTAMP_UTC > b.TIMESTAMP_UTC
	        and a.MESSAGE_OUTBOX_ITEM_ID = @itemId
	)
	then 1 else 0 end as Q
";

        public override string Update_MessagesDeque(int maxItems)
        {
            return
$@"
update BFX.MESSAGE_OUTBOX 
set 
    RETRY_AFTER_TIMESTAMP_UTC = @nextRetryTimestampUtc, 
    DEQUEUE_ID = @dequeueId,
    RETRY_COUNT = RETRY_COUNT + 1
where 
    MESSAGE_ID IN 
    (
        select top {maxItems}
            a.MESSAGE_ID
        from 
        (
            select 
                MESSAGE_ID, 
                RETRY_AFTER_TIMESTAMP_UTC,
                row_number() over(partition by GROUP_ID, DESTINATION order by TIMESTAMP_UTC) as QUEUE_INDEX
            from BFX.MESSAGE_OUTBOX WITH (READPAST)
            where
                STATUS_ID = 0
        ) as a
        where 
            a.QUEUE_INDEX = 1
            and a.RETRY_AFTER_TIMESTAMP_UTC <= @currentTimestampUtc
        order by a.RETRY_AFTER_TIMESTAMP_UTC
    )
";
        }
    }
}
