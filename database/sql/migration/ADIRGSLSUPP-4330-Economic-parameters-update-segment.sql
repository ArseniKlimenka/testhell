DECLARE @ruleNum int = 1;
DECLARE @ruleIndex nvarchar(255) = CAST(@ruleNum - 1 as nvarchar(255));
DECLARE @segment nvarchar(255) = 'Privilege'; -- Privilege (Привилегия), Prime (Прайм), Retail (Розница)

UPDATE BFX.UNIVERSAL_VERSIONED_DOCUMENT
SET BODY = JSON_MODIFY(BODY, '$.economicParameters[' + @ruleIndex + '].segment', @segment),
	SNAPSHOT_BODY = JSON_MODIFY(SNAPSHOT_BODY, '$.economicParameters[' + @ruleIndex + '].segment', @segment),
	COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.body.economicParameters[' + @ruleIndex + '].segment', @segment)
WHERE UNIVERSAL_VERSIONED_DOCUMENT_NUMBER = N'НОМЕР_ДОКУМЕНТА_КП'