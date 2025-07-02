if exists (select 1 from sys.objects where object_id = object_id(N'org_impl.SERVICE_PROVIDER_INFO_SAT'))
begin
	insert into org.APPLICATION_USER_CLAIM
	select
		newid(),
		au.APPLICATION_USER_ID,
		N'Email',
		min(coalesce(spis.ACTUAL_EMAIL, pes.EMAIL)),
		getdate(),
		getdate(),
		N'web-client-vnext',
		1,
		'00000000-0000-0000-0000-000000000000',
		'00000000-0000-0000-0000-000000000000'
	from
		org.APPLICATION_USER au
		left join org.APPLICATION_USER_CLAIM aucPartyCode on aucPartyCode.APPLICATION_USER_ID = au.APPLICATION_USER_ID and aucPartyCode.CLAIM_TYPE = 'PartyCode'
		left join pty_impl.PARTY_HUB ph on ph.PARTY_CODE = aucPartyCode.VALUE
		left join pty_impl.PARTY_EMAILS_SAT_LATEST pes on pes.PARTY_EMAILS_HKEY = ph.PARTY_HKEY
		left join org_impl.SERVICE_PROVIDER_INFO_SAT_LATEST spis on spis.PARTY_CODE = aucPartyCode.VALUE
	where 1=1
		and not exists(select * from org.APPLICATION_USER_CLAIM auc where auc.APPLICATION_USER_ID = au.APPLICATION_USER_ID and auc.CLAIM_TYPE = 'Email')
		and coalesce(spis.ACTUAL_EMAIL, pes.EMAIL) is not null
	group by au.APPLICATION_USER_ID
end
go
