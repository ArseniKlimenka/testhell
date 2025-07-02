alter table pas_impl.P_PAYMENT_PLAN_SAT drop constraint PK_PAS_IMPL_P_PAYMENT_PLAN_SAT
go

alter table pas_impl.P_PAYMENT_PLAN_SAT add constraint PK_PAS_IMPL_P_PAYMENT_PLAN_SAT primary key nonclustered
(
	P_PAYMENT_PLAN_HKEY,
	LOAD_DATE,
	ITEM_NO,
	OBJECT_CODE,
	CURRENCY_CODE
)
go
