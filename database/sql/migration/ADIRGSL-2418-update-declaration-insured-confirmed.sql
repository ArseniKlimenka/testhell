-- ДЕКЛАРАЦИЯ СТРАХОВАТЕЛЯ И ЗАСТРАХОВАННОГО - ЗАСТРАХОВАННЫЙ - Подтверждаю
UPDATE pas.CONTRACT 
SET BODY = JSON_MODIFY(JSON_MODIFY(BODY, '$.declarationMainConfirmation.isConfirmedInsuredPerson', CAST(1 as BIT)), '$.declarationMainConfirmation.isNotConfirmedInsuredPerson', CAST(0 as BIT))
where CONTRACT_NUMBER IN (SELECT CONTRACT_NUMBER FROM pas.CONTRACT c
LEFT JOIN CFX.PUBLISHED_ARTIFACT pa on pa.PUBLISHED_ARTIFACT_ID = c.PUBLISHED_ARTIFACT_ID
WHERE pa.CODE_NAME = 'AccumulatedLifeInsurancePolicy' AND 
JSON_VALUE(c.BODY, '$.mainInsuranceConditions.insuranceProduct.productCode') IN ('CAPCLCHILDOAS', 'CAPCLCHILDBOXOAS') AND 
JSON_VALUE(c.BODY, '$.declarationMainConfirmation.isConfirmedInsuredPerson') IS NULL AND  
JSON_VALUE(c.BODY, '$.declarationMainConfirmation.isNotConfirmedInsuredPerson') IS NULL);