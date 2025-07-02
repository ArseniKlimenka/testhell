-- Котировка, договор, ДС.
UPDATE c
SET BODY = JSON_MODIFY(BODY, '$.cumulation', JSON_QUERY(N'{}'))
FROM PAS.CONTRACT c
JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = c.PUBLISHED_ARTIFACT_ID
WHERE c.SYS_CREATED_ON >= '2024-03-04 00:00:00' AND (pa.CODE_NAME like '%Quote%' OR pa.CODE_NAME like '%Policy%' OR pa.CODE_NAME like '%FinChange%' OR pa.CODE_NAME like '%NonFinChange%' OR pa.CODE_NAME like '%NonFinChange%' OR pa.CODE_NAME like '%TechnicalAmendment%')

-- ДС на отмену и восстановление.
UPDATE c
SET BODY = JSON_MODIFY(BODY, '$.cumulation', null)
FROM PAS.CONTRACT c
JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = c.PUBLISHED_ARTIFACT_ID
WHERE c.SYS_CREATED_ON >= '2024-03-04 00:00:00' AND (pa.CODE_NAME like '%Cancellation%' OR pa.CODE_NAME like '%Reactivation%')