IF EXISTS (select * from sys.objects where object_id = object_id(N'[BFX].[UNIVERSAL_DOCUMENT]') and type in (N'U'))
BEGIN
    UPDATE BFX.UNIVERSAL_DOCUMENT
    SET BODY = JSON_MODIFY(BODY, '$.accountingCertificateEnrichments', JSON_QUERY('{}'))
    FROM BFX.UNIVERSAL_DOCUMENT ud
    INNER JOIN ACC_IMPL.CRT_HUB hub
        ON ud.UNIVERSAL_DOCUMENT_NUMBER = hub.CERTIFICATE_NUMBER
    INNER JOIN ACC_IMPL.CRT_SAT sat
        ON hub.CRT_HKEY = sat.CRT_HKEY
    WHERE ud.PUBLISHED_ARTIFACT_ID =
    (
        SELECT PUBLISHED_ARTIFACT_ID
        FROM CFX.PUBLISHED_ARTIFACT
        WHERE CODE_NAME = N'AccountingCertificate'
    )
    AND JSON_VALUE(ud.BODY, '$.accountingCertificateEnrichments.enrichFields[0]') IS NULL
END

IF EXISTS (select * from sys.objects where object_id = object_id(N'[BFX].[UNIVERSAL_DOCUMENT]') and type in (N'U'))
BEGIN
    UPDATE BFX.UNIVERSAL_DOCUMENT
    SET BODY = JSON_MODIFY(BODY, '$.accountingCertificateEnrichments.enrichFields', JSON_QUERY('["**/**"]'))
    FROM BFX.UNIVERSAL_DOCUMENT ud
    INNER JOIN ACC_IMPL.CRT_HUB hub
        ON ud.UNIVERSAL_DOCUMENT_NUMBER = hub.CERTIFICATE_NUMBER
    INNER JOIN ACC_IMPL.CRT_SAT sat
        ON hub.CRT_HKEY = sat.CRT_HKEY
    WHERE ud.PUBLISHED_ARTIFACT_ID =
    (
        SELECT PUBLISHED_ARTIFACT_ID
        FROM CFX.PUBLISHED_ARTIFACT
        WHERE CODE_NAME = N'AccountingCertificate'
    )
    AND JSON_VALUE(ud.BODY, '$.accountingCertificateEnrichments.enrichFields[0]') IS NULL
END