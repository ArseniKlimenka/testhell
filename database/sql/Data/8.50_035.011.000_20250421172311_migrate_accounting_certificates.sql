update cfx.PUBLISHED_ARTIFACT
set ENTITY_TYPE_ID = (select ENTITY_TYPE_ID from cfg.ENTITY_TYPE where CODE_NAME = 'UniversalVersionedDocument')
where 1=1
	and CODE_NAME = 'AccountingCertificate'
	and ENTITY_TYPE_ID = (select ENTITY_TYPE_ID from cfg.ENTITY_TYPE where CODE_NAME = 'UniversalDocument')
go

update bfx.ENTITY_REF
set ENTITY_TYPE_ID = (select ENTITY_TYPE_ID from cfg.ENTITY_TYPE where CODE_NAME = 'UniversalVersionedDocument')
where 1=1
	and PUBLISHED_ARTIFACT_ID = (select PUBLISHED_ARTIFACT_ID from cfx.PUBLISHED_ARTIFACT where CODE_NAME = 'AccountingCertificate')
	and ENTITY_TYPE_ID = (select ENTITY_TYPE_ID from cfg.ENTITY_TYPE where CODE_NAME = 'UniversalDocument')
go

delete from bfx.RECENT_DOCUMENT
where RECENT_DOCUMENT_ID in (
	select RECENT_DOCUMENT_ID from
		bfx.RECENT_DOCUMENT rd
		inner join bfx.ENTITY_REF er on er.ENTITY_REF_ID = rd.ENTITY_REF_ID
		inner join cfx.PUBLISHED_ARTIFACT pa on pa.PUBLISHED_ARTIFACT_ID = er.PUBLISHED_ARTIFACT_ID
	where pa.CODE_NAME = 'AccountingCertificate'
)
go

update cfx.PUBLISHED_ARTIFACT
set ENTITY_TYPE_ID = (select ENTITY_TYPE_ID from cfg.ENTITY_TYPE where CODE_NAME = 'UniversalVersionedDocument')
where CODE_NAME = 'AccountingCertificateUpdatedAllStates'
go

