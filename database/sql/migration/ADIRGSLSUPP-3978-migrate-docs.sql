insert into bfx.UNIVERSAL_VERSIONED_DOCUMENT (
	UNIVERSAL_VERSIONED_DOCUMENT_ID,
	UNIVERSAL_VERSIONED_DOCUMENT_NUMBER,
	BODY,
	COMMON_BODY,
	SNAPSHOT_BODY,
	EXTERNAL_DATA,
	STATE_ID,
	VERSION_STATE,
	SEQ_NUMBER,
	ORIGINAL_DOCUMENT_ID,
	PREVIOUS_DOCUMENT_ID,
	VALID_FROM,
	VALID_TO,
	SOURCE_ENTITY_ID,
	SOURCE_ENTITY_TYPE_ID,
	PUBLISHED_ARTIFACT_ID,
	SYS_CREATED_ON,
	SYS_CREATED_BY_ID,
	SYS_UPDATED_ON,
	SYS_UPDATED_BY_ID,
	SYS_CLIENT_ID,
	SYS_VERSION,
	COMMENTS,
	SYS_SOURCE_SYSTEM
)
select
	ud.UNIVERSAL_DOCUMENT_ID,
	ud.UNIVERSAL_DOCUMENT_NUMBER,
	ud.BODY,
	ud.COMMON_BODY,
	ud.BODY as SNAPSHOT_BODY,
	ud.EXTERNAL_DATA,
	ud.STATE_ID,
	case
		when st.CODE_NAME  = 'Issued' then 'Applied'
		when st.CODE_NAME = 'Cancelled' then 'Discarded'
		else null
	end as VERSION_STATE,
	coalesce(JSON_VALUE(ud.BODY, '$.seqNumber'), 0) as SEQ_NUMBER,
	coalesce(udMain.UNIVERSAL_DOCUMENT_ID, ud.UNIVERSAL_DOCUMENT_ID) as ORIGINAL_DOCUMENT_ID,
	case
		when coalesce(JSON_VALUE(ud.BODY, '$.seqNumber'), 0) != 0 then udMain.UNIVERSAL_DOCUMENT_ID
	end as PREVIOUS_DOCUMENT_ID,
	null as VALID_FROM,
	null as VALID_TO,
	ud.SOURCE_ENTITY_ID,
	ud.SOURCE_ENTITY_TYPE_ID,
	case
		when coalesce(JSON_VALUE(ud.BODY, '$.seqNumber'), 0) = 0 then ud.PUBLISHED_ARTIFACT_ID
		else paCorr.PUBLISHED_ARTIFACT_ID
	end as PUBLISHED_ARTIFACT_ID,
	ud.SYS_CREATED_ON,
	ud.SYS_CREATED_BY_ID,
	ud.SYS_UPDATED_ON,
	ud.SYS_UPDATED_BY_ID,
	ud.SYS_CLIENT_ID,
	ud.SYS_VERSION,
	ud.COMMENTS,
	ud.SYS_SOURCE_SYSTEM
from
	bfx.UNIVERSAL_DOCUMENT ud
	join cfg.PROCESS_STATE st on ud.STATE_ID = st.PROCESS_STATE_ID
	inner join cfx.PUBLISHED_ARTIFACT paCorr on paCorr.CODE_NAME = 'AccountingCertificateCorrection'
	left join bfx.UNIVERSAL_DOCUMENT udMain on udMain.UNIVERSAL_DOCUMENT_NUMBER = JSON_VALUE(ud.BODY, '$.originalDocumentNumber')
where 1=1
	and ud.PUBLISHED_ARTIFACT_ID = (select PUBLISHED_ARTIFACT_ID from cfx.PUBLISHED_ARTIFACT where CODE_NAME = 'AccountingCertificate')
	and not exists (select * from bfx.UNIVERSAL_VERSIONED_DOCUMENT uvd where uvd.UNIVERSAL_VERSIONED_DOCUMENT_ID = ud.UNIVERSAL_DOCUMENT_ID)
go

update BFX.UNIVERSAL_VERSIONED_DOCUMENT
set BODY = JSON_MODIFY(BODY, '$.seqNumber', null)
where 1=1
	and PUBLISHED_ARTIFACT_ID in (select PUBLISHED_ARTIFACT_ID from cfx.PUBLISHED_ARTIFACT where CODE_NAME in ('AccountingCertificate', 'AccountingCertificateCorrection'))
	and JSON_VALUE(BODY, '$.seqNumber') is not null
go

update BFX.UNIVERSAL_VERSIONED_DOCUMENT
set BODY = JSON_MODIFY(BODY, '$.originalDocumentNumber', null)
where 1=1
	and PUBLISHED_ARTIFACT_ID in (select PUBLISHED_ARTIFACT_ID from cfx.PUBLISHED_ARTIFACT where CODE_NAME in ('AccountingCertificate', 'AccountingCertificateCorrection'))
	and JSON_VALUE(BODY, '$.originalDocumentNumber') is not null
go

update BFX.UNIVERSAL_VERSIONED_DOCUMENT
set BODY = JSON_MODIFY(BODY, '$.technicalInformation.availableInsuredPersons[0].personId', null)
where 1=1
	and PUBLISHED_ARTIFACT_ID in (select PUBLISHED_ARTIFACT_ID from cfx.PUBLISHED_ARTIFACT where CODE_NAME in ('AccountingCertificate', 'AccountingCertificateCorrection'))
	and JSON_VALUE(BODY, '$.technicalInformation.availableInsuredPersons[0].personId') is not null
go

update BFX.UNIVERSAL_VERSIONED_DOCUMENT
set BODY = JSON_MODIFY(BODY, '$.insuredPerson.personId', null)
where 1=1
	and PUBLISHED_ARTIFACT_ID in (select PUBLISHED_ARTIFACT_ID from cfx.PUBLISHED_ARTIFACT where CODE_NAME in ('AccountingCertificate', 'AccountingCertificateCorrection'))
	and JSON_VALUE(BODY, '$.insuredPerson.personId') is not null
go

update bfx.ENTITY_REF
set SUMMARY = JSON_MODIFY(SUMMARY, '$.entityType', 'UniversalVersionedDocument')
where 1=1
	and JSON_VALUE(SUMMARY, '$.entityType') = 'UniversalDocument'
	and PUBLISHED_ARTIFACT_ID in (select PUBLISHED_ARTIFACT_ID from cfx.PUBLISHED_ARTIFACT where CODE_NAME in ('AccountingCertificate', 'AccountingCertificateCorrection'))
go

update BFX.UNIVERSAL_VERSIONED_DOCUMENT
set BODY = JSON_MODIFY(BODY, '$.technicalInformation.isDirty', null)
where 1=1
	and PUBLISHED_ARTIFACT_ID in (select PUBLISHED_ARTIFACT_ID from cfx.PUBLISHED_ARTIFACT where CODE_NAME in ('AccountingCertificate', 'AccountingCertificateCorrection'))
	and JSON_VALUE(BODY, '$.technicalInformation.isDirty') is not null
go

update BFX.UNIVERSAL_VERSIONED_DOCUMENT
set BODY = JSON_MODIFY(BODY, '$.technicalInformation.duplicates', null)
where 1=1
	and PUBLISHED_ARTIFACT_ID in (select PUBLISHED_ARTIFACT_ID from cfx.PUBLISHED_ARTIFACT where CODE_NAME in ('AccountingCertificate', 'AccountingCertificateCorrection'))
	and JSON_QUERY(BODY, '$.technicalInformation.duplicates') is not null
go

update BFX.UNIVERSAL_VERSIONED_DOCUMENT
set BODY = JSON_MODIFY(BODY, '$.technicalInformation.duplicateLastCorrectionNumber', null)
where 1=1
	and PUBLISHED_ARTIFACT_ID in (select PUBLISHED_ARTIFACT_ID from cfx.PUBLISHED_ARTIFACT where CODE_NAME in ('AccountingCertificate', 'AccountingCertificateCorrection'))
	and JSON_VALUE(BODY, '$.technicalInformation.duplicateLastCorrectionNumber') is not null
go
