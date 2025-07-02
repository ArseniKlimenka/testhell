update org.SERVICE_PROVIDER
set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.ownership', JSON_QUERY('{}'))
where 1=1
	--and SERVICE_PROVIDER_CODE in ('1')
	and JSON_QUERY(COMMON_BODY, '$.ownership') is null
go

update org.SERVICE_PROVIDER
set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.ownership.owner', 'Administrator')
where 1=1
	--and SERVICE_PROVIDER_CODE in ('1')
	and JSON_VALUE(COMMON_BODY, '$.ownership.owner') is null
go

update org.SERVICE_PROVIDER
set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.ownership.partyCode', JSON_VALUE(COMMON_BODY, '$.partyCode'))
where 1=1
	--and SERVICE_PROVIDER_CODE in ('1')
	and JSON_VALUE(COMMON_BODY, '$.partyCode') is not null
	and JSON_VALUE(COMMON_BODY, '$.ownership.partyCode') is null
go

update org.SERVICE_PROVIDER
set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.ownership.organisationUnit', JSON_VALUE(COMMON_BODY, '$.attributes.orgUnitCode'))
where 1=1
	--and SERVICE_PROVIDER_CODE in ('1')
	and JSON_VALUE(COMMON_BODY, '$.attributes.orgUnitCode') is not null
	and JSON_VALUE(COMMON_BODY, '$.ownership.organisationUnit') is null
go
