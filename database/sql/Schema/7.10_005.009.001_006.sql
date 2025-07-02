alter table acc_impl.MATCHING_POLICY add POSTED_AMOUNT decimal(15,2) null
go

with
cte as (
	select mp.matching_id, mp.POSTED_AMOUNT, m.DOC_AMOUNT
	from acc_impl.MATCHING m
	inner join acc_impl.MATCHING_POLICY mp on mp.MATCHING_ID = m.MATCHING_ID
	where mp.POSTED_AMOUNT is null
)
update cte
set POSTED_AMOUNT = DOC_AMOUNT
go

alter table acc_impl.MATCHING_POLICY alter column POSTED_AMOUNT decimal(15,2) not null
go
