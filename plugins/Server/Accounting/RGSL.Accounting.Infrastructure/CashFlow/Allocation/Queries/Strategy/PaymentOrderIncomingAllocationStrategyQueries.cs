namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Queries.Strategy
{
    static class PaymentOrderIncomingAllocationStrategyQueries
    {
        public static string Select_InstallmentDetails()
        {
            return @"
create table #INSTALLMENT_DETAILS(
	CURRENCY_CODE nvarchar(3),
	AMOUNT decimal(15, 2),
	OPEN_AMOUNT decimal(15, 2)
);

insert into #INSTALLMENT_DETAILS(CURRENCY_CODE, AMOUNT, OPEN_AMOUNT)
select
	pos.PO_CURRENCY_CODE as CURRENCY_CODE,
	poi.PO_CURRENCY_AMOUNT as AMOUNT,
	poi.PO_CURRENCY_AMOUNT as OPEN_AMOUNT
from
	acc_impl.PAYMENT_ORDER_HUB poh
	inner join acc_impl.PAYMENT_ORDER_SAT pos on pos.PAYMENT_ORDER_HKEY = poh.PAYMENT_ORDER_HKEY
	left join acc_impl.PAYMENT_ORDER_ITEM_SAT_LATEST poi on poi.PAYMENT_ORDER_ITEM_HKEY = poh.PAYMENT_ORDER_HKEY and poi.ITEM_TYPE in ('paymentRefund', 'creditRefund')
where 1=1
	and poh.PAYMENT_ORDER_NUMBER = @0
;

insert into #INSTALLMENT_DETAILS(CURRENCY_CODE, AMOUNT, OPEN_AMOUNT)
select
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
	CURRENCY_CODE,
	sum(AMOUNT) as AMOUNT,
	sum(OPEN_AMOUNT) as OPEN_AMOUNT
from #INSTALLMENT_DETAILS
group by CURRENCY_CODE;

drop table #INSTALLMENT_DETAILS;
";
        }
    }
}
