alter table acc_impl.MATCHING_POLICY
add IS_ADVANCE_PAYMENT bit null
go

update matp
set is_advance_payment = case when bsi.TRANSACTION_DATE < matp.POSTING_DATE then 1 else 0 end
from
	acc_impl.MATCHING_POLICY matp
	inner join acc_impl.MATCHING mat on mat.MATCHING_ID = matp.MATCHING_ID
	inner join acc_impl.ALLOCATION alc on alc.ALLOCATION_ID = mat.ALLOCATION_ID
	inner join acc_impl.BANK_STATEMENT_ITEM bsi on bsi.BANK_STATEMENT_ITEM_ID = alc.BANK_STATEMENT_ITEM_ID
go

alter table acc_impl.MATCHING_POLICY
alter column IS_ADVANCE_PAYMENT bit not null
go
