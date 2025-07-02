update cer
set EXCHANGE_RATE_DATE = cast(cer.EXCHANGE_RATE_DATE as date)
from
	bfx.CURRENCY_EXCHANGE_RATE cer
where 1=1
	and cer.EXCHANGE_RATE_DATE != cast(cer.EXCHANGE_RATE_DATE as date)
	and not exists (select * from bfx.CURRENCY_EXCHANGE_RATE cer2 where cer2.CURRENCY_CODE = cer.CURRENCY_CODE and cast(cer2.EXCHANGE_RATE_DATE as date) = cast(cer.EXCHANGE_RATE_DATE as date) and cer2.EXCHANGE_RATE_DATE != cer.EXCHANGE_RATE_DATE)
