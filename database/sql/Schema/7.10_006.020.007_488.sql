alter table acc_impl.ALLOCATION add PAY_RATE decimal(15,6) null
go
alter table acc_impl.ALLOCATION add DOC_RATE decimal(15,6) null
go

update alc
set
	PAY_RATE = payCur.EXCHANGE_RATE,
	DOC_RATE = docCur.EXCHANGE_RATE
/*
select
	alc.ALLOCATION_ID,
	alc.PAY_AMOUNT,
	alc.DOC_AMOUNT,
	payCur.EXCHANGE_RATE as PAY_EXCHANGE_RATE,
	docCur.EXCHANGE_RATE as DOC_EXCHANGE_RATE,
	alc.PAY_AMOUNT * payCur.EXCHANGE_RATE / docCur.EXCHANGE_RATE
*/
from
	acc_impl.ALLOCATION alc
	inner join acc_impl.BANK_STATEMENT_ITEM bsi on bsi.BANK_STATEMENT_ITEM_ID = alc.BANK_STATEMENT_ITEM_ID
	cross apply (select top 1 cer.EXCHANGE_RATE * cer.UNIT as EXCHANGE_RATE from bfx.CURRENCY_EXCHANGE_RATE cer where cer.CURRENCY_CODE = alc.PAY_CURRENCY_CODE and cer.EXCHANGE_RATE_DATE <= bsi.TRANSACTION_DATE order by cer.EXCHANGE_RATE_DATE desc) payCur
	cross apply (select top 1 cer.EXCHANGE_RATE * cer.UNIT as EXCHANGE_RATE from bfx.CURRENCY_EXCHANGE_RATE cer where cer.CURRENCY_CODE = alc.DOC_CURRENCY_CODE and cer.EXCHANGE_RATE_DATE <= bsi.TRANSACTION_DATE order by cer.EXCHANGE_RATE_DATE desc) docCur
where 1=1
	and alc.PAY_RATE is null
	and abs(alc.PAY_AMOUNT * payCur.EXCHANGE_RATE / docCur.EXCHANGE_RATE - alc.DOC_AMOUNT) < 0.01
go

update alc
set
	PAY_RATE = payCur.EXCHANGE_RATE,
	DOC_RATE = docCur.EXCHANGE_RATE
from
	acc_impl.ALLOCATION alc
	inner join acc_impl.BANK_STATEMENT_ITEM bsi on bsi.BANK_STATEMENT_ITEM_ID = alc.BANK_STATEMENT_ITEM_ID
	cross apply (select top 1 cer.EXCHANGE_RATE * cer.UNIT as EXCHANGE_RATE from bfx.CURRENCY_EXCHANGE_RATE cer where cer.CURRENCY_CODE = alc.PAY_CURRENCY_CODE and cer.EXCHANGE_RATE_DATE <= bsi.PAYMENT_DATE order by cer.EXCHANGE_RATE_DATE desc) payCur
	cross apply (select top 1 cer.EXCHANGE_RATE * cer.UNIT as EXCHANGE_RATE from bfx.CURRENCY_EXCHANGE_RATE cer where cer.CURRENCY_CODE = alc.DOC_CURRENCY_CODE and cer.EXCHANGE_RATE_DATE <= bsi.PAYMENT_DATE order by cer.EXCHANGE_RATE_DATE desc) docCur
where 1=1
	and alc.PAY_RATE is null

alter table acc_impl.ALLOCATION alter column PAY_RATE decimal(15,6) not null
go
alter table acc_impl.ALLOCATION alter column DOC_RATE decimal(15,6) not null
go
