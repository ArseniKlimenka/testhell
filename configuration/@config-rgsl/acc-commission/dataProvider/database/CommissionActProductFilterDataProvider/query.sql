select
	CODE,
	EXCLUSIVE
from
	acc_impl.CA_ACT_PRODUCT_FILTER
where 1=1
	and ACT_ID = @actId
