UPDATE ud SET BODY = JSON_MODIFY(ud.BODY, '$.contract.configurationVersion', '1')
FROM bfx.UNIVERSAL_DOCUMENT ud
LEFT JOIN cfx.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = ud.PUBLISHED_ARTIFACT_ID
WHERE pa.CODE_NAME = 'InsuredEvent';