namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Queries.Strategy
{
	static class RegistryAllocationStrategyQueries
	{
		public static string Select_RegistryDetails()
		{
			return @"
create table #REGISTRY_DETAILS(
	DOCUMENT_NO nvarchar(MAX),
	CURRENCY_CODE nvarchar(3),
	AMOUNT decimal(15, 2),
	OPEN_AMOUNT decimal(15, 2)
);

insert into #REGISTRY_DETAILS(DOCUMENT_NO, CURRENCY_CODE, AMOUNT, OPEN_AMOUNT)
select
	agg.AGGREGATED_PAYMENT_NUMBER as DOCUMENT_NO,
	agg.CURRENCY_CODE,
	sum(agg.PAYMENT_AMOUNT) as AMOUNT,
	sum(agg.PAYMENT_AMOUNT) as OPEN_AMOUNT
from
	ACC_IMPL.AGGREGATED_PAYMENT_REGISTER agg
where 1=1
	and agg.AGGREGATED_PAYMENT_NUMBER = @0
group by agg.AGGREGATED_PAYMENT_NUMBER, agg.CURRENCY_CODE;

insert into #REGISTRY_DETAILS(DOCUMENT_NO, CURRENCY_CODE, AMOUNT, OPEN_AMOUNT)
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
		from #REGISTRY_DETAILS
		group by DOCUMENT_NO, CURRENCY_CODE
	) d
	inner join bfx.IMPORT_DOCUMENT idoc on idoc.IMPORT_DOCUMENT_NUMBER = d.DOCUMENT_NO
	inner join cfg.PROCESS_STATE ps on ps.PROCESS_STATE_ID = idoc.STATE_ID
;

drop table #REGISTRY_DETAILS;
";
		}
	}
}
