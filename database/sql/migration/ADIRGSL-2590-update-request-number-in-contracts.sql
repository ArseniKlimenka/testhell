UPDATE c
SET c.BODY = JSON_MODIFY(c.BODY, '$.technicalInformation.requestNumber', ud.UNIVERSAL_DOCUMENT_NUMBER)
FROM pas.CONTRACT c 
LEFT JOIN BFX.UNIVERSAL_DOCUMENT ud ON ud.UNIVERSAL_DOCUMENT_ID = JSON_VALUE(c.BODY, '$.technicalInformation.requestId')
WHERE JSON_VALUE(c.BODY, '$.technicalInformation.requestId') IS NOT NULL