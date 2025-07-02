using Adacta.AdInsure.Accounting.API.Shared.Constants;

namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.Periods.Queries
{
    public static class AccountingPeriodQueriesRgsl
    {
        public static string SelectFirstOpen()
        {
            return @"
select top 1
	PERIOD_ID,
	PERIOD_TYPE_ID,
	PERIOD_STATUS_ID,
	DESCRIPTION,
	START_DATE,
	END_DATE
from
	ACC_IMPL.PERIOD
where /**where**/
order by START_DATE, period_id
";
        }

        public static string PeriodHasOpenedBefore()
        {
            return $@"
select top 1
	op.PERIOD_ID,
	op.PERIOD_TYPE_ID,
	op.PERIOD_STATUS_ID,
	op.DESCRIPTION,
	op.START_DATE,
	op.END_DATE
from acc_impl.PERIOD p
	join (
		select *
		from acc_impl.PERIOD
		where PERIOD_STATUS_ID = { PeriodStatusConsts.Open }
		  and /**where(inner)**/
	) op on op.PERIOD_TYPE_ID = p.PERIOD_TYPE_ID and op.END_DATE <= p.START_DATE	
where /**where(outer)**/
order by op.END_DATE desc
";
        }

        public static string PeriodHasClosedAfter()
        {
            return $@"
select top 1
	op.PERIOD_ID,
	op.PERIOD_TYPE_ID,
	op.PERIOD_STATUS_ID,
	op.DESCRIPTION,
	op.START_DATE,
	op.END_DATE
from acc_impl.PERIOD p
	join (
		select *
		from acc_impl.PERIOD
		where PERIOD_STATUS_ID = {PeriodStatusConsts.Closed }
		  and /**where(inner)**/
	) op on op.PERIOD_TYPE_ID = p.PERIOD_TYPE_ID and op.START_DATE >= p.END_DATE	
where /**where(outer)**/
order by op.START_DATE asc
";
        }

        public static string UpdateStatus()
        {
            return @"
update acc_impl.PERIOD
set PERIOD_STATUS_ID = @PeriodStatusId
where PERIOD_ID = @PeriodId
";
        }

        public static string InsertPeriodHistory()
        {
            return @"
insert into acc_impl.PERIOD_HISTORY
(
	period_id,
	period_status_id_to,
	create_date,
	user_id
)
values
(
	@PeriodId,
	@PeriodStatusIdTo,
	@CreateDate,
	@UserId
)";
        }

    }
}
