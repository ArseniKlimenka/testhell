-- ############### Backup party common body
SELECT PARTY_CODE, COMMON_BODY
INTO PTY.PARTY_COMMON_BODY_UPD_BACKUP
FROM PTY.PARTY;

-- ############### Some declarations
DECLARE @partyCode NVARCHAR(max);
DECLARE @partyDocsJSON NVARCHAR(max);

DECLARE cur_party CURSOR LOCAL for
	SELECT PARTY_CODE, PARTY_DOCS_JSON FROM 
	(SELECT 
		PARTY_CODE,
		(SELECT DISTINCT 
			   JSON_VALUE(identityDocuments.value, '$.docType.docTypeCode') identityDocumentType,
			   JSON_VALUE(identityDocuments.value, '$.docSeries') documentSeries,
			   JSON_VALUE(identityDocuments.value, '$.docNumber') documentNumber
		FROM PTY_IMPL.PARTY_HUB partyHub,
			   PTY.PARTY party
		CROSS APPLY OPENJSON(JSON_QUERY(party.body, '$.partyDocuments')) identityDocuments 
		WHERE party.PARTY_CODE = pty.PARTY_CODE AND 
			(SELECT COUNT(*) FROM OPENJSON(pty.BODY, '$.partyDocuments')) != (SELECT COUNT(*) FROM OPENJSON(pty.COMMON_BODY, '$.identityDocuments'))
		FOR JSON AUTO) PARTY_DOCS_JSON
	FROM PTY.PARTY pty) rezult
	WHERE rezult.PARTY_DOCS_JSON IS NOT NULL
open cur_party;

-- ############### Update party common body 
fetch next from cur_party into @partyCode, @partyDocsJSON;
while @@FETCH_STATUS = 0 
BEGIN
	UPDATE PTY.PARTY SET COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.identityDocuments', JSON_QUERY(@partyDocsJSON)) 
	WHERE @partyCode = PARTY_CODE;

	fetch next from cur_party into @partyCode, @partyDocsJSON;
END;
close cur_party;
deallocate cur_party;
GO
