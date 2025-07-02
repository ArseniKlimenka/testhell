if exists (select * from sys.objects where object_id = object_id(N'[PAS_IMPL].[POLICY_SAT_LATEST]'))
begin

	update pps
	set OBJECT_CODE = pols.INSURED_CODE
	from
		pas_impl.POLICY_SAT_LATEST pols
		inner join pas_impl.P_PAYMENT_PLAN_LINK ppl on ppl.POLICY_HKEY = pols.POLICY_HKEY
		inner join pas_impl.P_PAYMENT_PLAN_SAT pps on pps.P_PAYMENT_PLAN_HKEY = ppl.P_PAYMENT_PLAN_HKEY
	where pps.OBJECT_CODE is null;

end
go

alter table pas_impl.P_PAYMENT_PLAN_SAT alter column OBJECT_CODE nvarchar(250) not null
go

alter table pas_impl.P_PAYMENT_PLAN_SAT alter column CURRENCY_CODE char(3) not null
go
