namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Queries.Strategy
{
    static class PaymentOrderOutgoingAllocationStrategyQueries
    {
        public static string Select_InstallmentDetails()
        {
            return @"
create table #INSTALLMENT_DETAILS(
	DOCUMENT_NO nvarchar(MAX),
	CURRENCY_CODE nvarchar(3),
	AMOUNT decimal(15, 2),
	OPEN_AMOUNT decimal(15, 2)
);

insert into #INSTALLMENT_DETAILS(DOCUMENT_NO, CURRENCY_CODE, AMOUNT, OPEN_AMOUNT)
select
	poh.PAYMENT_ORDER_NUMBER as DOCUMENT_NO,
	pos.PAYMENT_CURRENCY_CODE as CURRENCY_CODE,
	pos.PO_CURRENCY_AMOUNT as AMOUNT,
	pos.PO_CURRENCY_AMOUNT as OPEN_AMOUNT
from
	acc_impl.PAYMENT_ORDER_HUB poh
	inner join acc_impl.PAYMENT_ORDER_SAT_LATEST pos on pos.PAYMENT_ORDER_HKEY = poh.PAYMENT_ORDER_HKEY
where 1=1
	and poh.PAYMENT_ORDER_NUMBER = @0
;

insert into #INSTALLMENT_DETAILS(DOCUMENT_NO, CURRENCY_CODE, AMOUNT, OPEN_AMOUNT)
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
	d.DOCUMENT_NO,
	ps.CODE_NAME as STATE_CODE,
	d.CURRENCY_CODE,
	d.AMOUNT,
	d.OPEN_AMOUNT,
	pos.NON_ACCEPTANCE
from
	(
		select
			DOCUMENT_NO,
			CURRENCY_CODE,
			sum(AMOUNT) as AMOUNT,
			sum(OPEN_AMOUNT) as OPEN_AMOUNT
		from #INSTALLMENT_DETAILS
		group by DOCUMENT_NO, CURRENCY_CODE
	) d
	inner join acc.PAYMENT_ORDER po on po.PAYMENT_ORDER_NUMBER = d.DOCUMENT_NO
	inner join acc_impl.PAYMENT_ORDER_HUB poh on poh.PAYMENT_ORDER_NUMBER = po.PAYMENT_ORDER_NUMBER
	inner join acc_impl.PAYMENT_ORDER_SAT_LATEST pos on pos.PAYMENT_ORDER_HKEY = poh.PAYMENT_ORDER_HKEY
	inner join cfg.PROCESS_STATE ps on ps.PROCESS_STATE_ID = po.STATE_ID
;

drop table #INSTALLMENT_DETAILS;
";
        }
    }
}
