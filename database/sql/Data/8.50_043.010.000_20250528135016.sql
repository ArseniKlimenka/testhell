update ref
set PUBLISHED_ARTIFACT_ID = ud.PUBLISHED_ARTIFACT_ID
from bfx.ENTITY_REF ref
inner join bfx.UNIVERSAL_VERSIONED_DOCUMENT ud
	on ud.UNIVERSAL_VERSIONED_DOCUMENT_ID = ref.ENTITY_ID
where 1=1
	and JSON_VALUE(SUMMARY, '$.configuration.name') = 'AccountingCertificate'
	and ud.PUBLISHED_ARTIFACT_ID in (select PUBLISHED_ARTIFACT_ID from cfx.PUBLISHED_ARTIFACT where CODE_NAME in ('AccountingCertificateCorrection'))
	and ud.PUBLISHED_ARTIFACT_ID != ref.PUBLISHED_ARTIFACT_ID
go

update bfx.ENTITY_REF
set SUMMARY = JSON_MODIFY(SUMMARY, '$.configuration.name', 'AccountingCertificateCorrection')
where 1=1
	and JSON_VALUE(SUMMARY, '$.configuration.name') = 'AccountingCertificate'
	and PUBLISHED_ARTIFACT_ID in (select PUBLISHED_ARTIFACT_ID from cfx.PUBLISHED_ARTIFACT where CODE_NAME in ('AccountingCertificateCorrection'))
go