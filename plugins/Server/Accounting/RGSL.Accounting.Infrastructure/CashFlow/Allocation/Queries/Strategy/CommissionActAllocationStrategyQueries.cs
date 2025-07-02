namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Queries.Strategy
{
	static class CommissionActAllocationStrategyQueries
    {
		public static string Select_CommissionActDetails()
		{
			return @"
create table #DOCUMENT_DETAILS(
	DOCUMENT_NO nvarchar(MAX),
	CURRENCY_CODE nvarchar(3),
	AMOUNT decimal(15, 2),
	OPEN_AMOUNT decimal(15, 2)
);

insert into #DOCUMENT_DETAILS(DOCUMENT_NO, CURRENCY_CODE, AMOUNT, OPEN_AMOUNT)
select
	act.ACT_NO as DOCUMENT_NO,
	'RUB' as CURRENCY_CODE,
	-COMM_AMOUNT_LC as AMOUNT,
	-COMM_AMOUNT_LC as OPEN_AMOUNT
from
	acc_impl.CA_ACT act
where 1=1
	and act.ACT_NO = @0
;

insert into #DOCUMENT_DETAILS(DOCUMENT_NO, CURRENCY_CODE, AMOUNT, OPEN_AMOUNT)
select
	alc.DOCUMENT_NO,
	alc.DOC_CURRENCY_CODE as CURRENCY_CODE,
	0 as AMOUNT,
	-(mat.DOC_AMOUNT + mat.TOLERANCE_DOC_AMOUNT) as OPEN_AMOUNT
from
	acc_impl.ALLOCATION alc
	inner join acc_impl.MATCHING mat on mat.ALLOCATION_ID = alc.ALLOCATION_ID
where 1=1
	and alc.DOCUMENT_NO = @0
	and alc.DOCUMENT_TYPE_ID = @1
;

select
	ps.CODE_NAME as STATE_CODE,
	d.CURRENCY_CODE,
	d.AMOUNT,
	d.OPEN_AMOUNT
from
	(
		select
			DOCUMENT_NO,
			CURRENCY_CODE,
			sum(AMOUNT) as AMOUNT,
			sum(OPEN_AMOUNT) as OPEN_AMOUNT
		from #DOCUMENT_DETAILS
		group by DOCUMENT_NO, CURRENCY_CODE
	) d
	inner join bfx.UNIVERSAL_DOCUMENT ud on ud.UNIVERSAL_DOCUMENT_NUMBER = d.DOCUMENT_NO
	inner join cfg.PROCESS_STATE ps on ps.PROCESS_STATE_ID = ud.STATE_ID
;

drop table #DOCUMENT_DETAILS;
";
		}
	}
}
