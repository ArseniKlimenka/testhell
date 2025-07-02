INSERT INTO PAS_IMPL.ADIRGSL_3043_CL_BACKUP (CONTRACT_ID, CONTRACT_NUMBER, BODY, COMMON_BODY, SNAPSHOT_BODY)
SELECT ctr.CONTRACT_ID, ctr.CONTRACT_NUMBER, ctr.BODY, ctr.COMMON_BODY, ctr.SNAPSHOT_BODY
FROM PAS.CONTRACT ctr
JOIN CFX.PUBLISHED_ARTIFACT art on ctr.PUBLISHED_ARTIFACT_ID = art.PUBLISHED_ARTIFACT_ID
WHERE art.CODE_NAME IN ('AccumulatedLifeInsuranceCancellation', 'InvestmentLifeInsuranceCancellation', 'CreditLifeInsuranceCancellation',
'RiskLifeInsuranceCancellation', 'MedLifeInsuranceCancellation')