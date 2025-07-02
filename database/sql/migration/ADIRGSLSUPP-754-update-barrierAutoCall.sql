IF NOT EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[CONTRACT_INVESTMENT_BACKUP]') AND TYPE IN (N'U'))
BEGIN
	CREATE TABLE PAS_IMPL.CONTRACT_INVESTMENT_BACKUP(
	CONTRACT_ID UNIQUEIDENTIFIER NOT NULL,
	BODY NVARCHAR(MAX) NOT NULL
	)
END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[CONTRACT_INVESTMENT_BACKUP]') AND TYPE IN (N'U'))
BEGIN
	INSERT INTO PAS_IMPL.CONTRACT_INVESTMENT_BACKUP (CONTRACT_ID, BODY)
	SELECT c.CONTRACT_ID, c.BODY
	FROM PAS.CONTRACT c
		INNER JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = c.PUBLISHED_ARTIFACT_ID
	WHERE pa.CODE_NAME LIKE '%investment%'
END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS].[CONTRACT]') AND TYPE IN (N'U'))
BEGIN
	UPDATE c
	SET c.BODY = JSON_MODIFY(c.BODY, '$.basicInvestmentParameters.barrierAutoCall',
		CASE
			WHEN JSON_VALUE(c.BODY, '$.mainInsuranceConditions.insuranceProduct.productCode') = 'IDC'
			THEN '110; 110; 110; 110; 110'
			WHEN JSON_VALUE(c.BODY, '$.mainInsuranceConditions.insuranceProduct.productCode') = 'IDCP'
			THEN '110; 110; 110; 110; 110'
			WHEN JSON_VALUE(c.BODY, '$.mainInsuranceConditions.insuranceProduct.productCode') = 'NOTEV2BFKO'
			THEN '110; 110; 110'
			WHEN JSON_VALUE(c.BODY, '$.mainInsuranceConditions.insuranceProduct.productCode') = 'NOTEV3BFKO'
			THEN '100; 100; 100; 100; 100'
			WHEN JSON_VALUE(c.BODY, '$.mainInsuranceConditions.insuranceProduct.productCode') = 'NOTE2BFKO'
			THEN '110; 110; 110'
			WHEN JSON_VALUE(c.BODY, '$.mainInsuranceConditions.insuranceProduct.productCode') = 'NOTE3BFKO'
			THEN '100'
			WHEN JSON_VALUE(c.BODY, '$.mainInsuranceConditions.insuranceProduct.productCode') = 'NOTE1BFKO'
			THEN '105'
			WHEN JSON_VALUE(c.BODY, '$.mainInsuranceConditions.insuranceProduct.productCode') = 'NOTE1BFKO3'
			THEN '100'
			WHEN JSON_VALUE(c.BODY, '$.mainInsuranceConditions.insuranceProduct.productCode') = 'NOTE1BFKO4'
				AND JSON_VALUE(c.BODY, '$.basicInvestmentParameters.investmentStrategy.investmentStrategyCode') = 'majorLeague 4.0'
			THEN '100'
			WHEN JSON_VALUE(c.BODY, '$.mainInsuranceConditions.insuranceProduct.productCode') = 'NOTE1BFKO4'
				AND JSON_VALUE(c.BODY, '$.basicInvestmentParameters.investmentStrategy.investmentStrategyCode') = 'majorLeague 5.0'
			THEN '100'
			WHEN JSON_VALUE(c.BODY, '$.mainInsuranceConditions.insuranceProduct.productCode') = 'NOTE1BFKO4'
				AND JSON_VALUE(c.BODY, '$.basicInvestmentParameters.investmentStrategy.investmentStrategyCode') = 'majorLeague 6.0'
			THEN '115'
			ELSE NULL
		END)
	FROM PAS.CONTRACT c
		INNER JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = c.PUBLISHED_ARTIFACT_ID
	 WHERE pa.CODE_NAME LIKE '%investment%'
END
GO