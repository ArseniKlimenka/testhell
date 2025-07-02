update uvd
set BODY = JSON_MODIFY(uvd.BODY, '$.contract.isInsurerSendDataToFns', cast(case when JSON_VALUE(uvd.BODY, '$.contract.isInsurerSendDataToFns') = 'true' then 1 else 0 end as bit))
from
	BFX.UNIVERSAL_VERSIONED_DOCUMENT uvd
	outer apply openjson(uvd.BODY, '$.contract') oj
where 1=1
	and oj.[key] = 'isInsurerSendDataToFns'
	and oj.[type] = 1
	and uvd.PUBLISHED_ARTIFACT_ID in (select PUBLISHED_ARTIFACT_ID from cfx.PUBLISHED_ARTIFACT where CODE_NAME in ('AccountingCertificate', 'AccountingCertificateCorrection'))
go

update uvd
set BODY = JSON_MODIFY(uvd.BODY, '$.contract.consentToDataTransferingFNS', cast(case when JSON_VALUE(uvd.BODY, '$.contract.consentToDataTransferingFNS') = 'true' then 1 else 0 end as bit))
from
	BFX.UNIVERSAL_VERSIONED_DOCUMENT uvd
	outer apply openjson(uvd.BODY, '$.contract') oj
where 1=1
	and oj.[key] = 'consentToDataTransferingFNS'
	and oj.[type] = 1
	and uvd.PUBLISHED_ARTIFACT_ID in (select PUBLISHED_ARTIFACT_ID from cfx.PUBLISHED_ARTIFACT where CODE_NAME in ('AccountingCertificate', 'AccountingCertificateCorrection'))
go
