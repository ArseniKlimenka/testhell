alter table acc_impl.CA_ACT
add VAT_RATE decimal(15, 2)
go

update acc_impl.CA_ACT set VAT_RATE = (case when ISSUE_DATE >= '2019-01-01' then 20 else 18 end);
go

if exists (select * from sys.objects where object_id = object_id(N'[PAS_IMPL].[AA_HUB]') and type in (N'U'))
begin
	update acc_impl.CA_ACT set VAT_RATE = 0
	where ACT_ID in
	(
		select act.ACT_ID
		from
			acc_impl.CA_ACT act
			inner join pas_impl.AA_HUB aah on aah.AA_NUMBER = act.AGENT_AGREEMENT_NUMBER
			inner join pas_impl.AA_SAT_LATEST aas on aas.AA_HKEY = aah.AA_HKEY
		where coalesce(aas.USE_NDS, 0) = 0
	)
end
go

alter table acc_impl.CA_ACT
alter column VAT_RATE decimal(15, 2) not null
go
