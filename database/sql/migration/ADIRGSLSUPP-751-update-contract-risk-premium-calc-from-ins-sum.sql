-- ############### Some declarations
DECLARE @contractNumber NVARCHAR(20);
DECLARE @risksJson NVARCHAR(MAX);
DECLARE @riskPremiumAll DECIMAL(18, 2);
DECLARE @riskPremiumMain DECIMAL(18, 2);

DECLARE cur_contract CURSOR LOCAL STATIC FORWARD_ONLY for
    SELECT 
		CONTRACT_NUMBER
    FROM PAS.CONTRACT
	WHERE JSON_VALUE(BODY, '$.basicConditions.calcFromInsuredSum') = 'true'
	--AND CONTRACT_NUMBER = N'CONTRACT_NUMBER'
open cur_contract;

-- ############### Update quote and policy sat, common body
fetch next from cur_contract into @contractNumber;
while @@FETCH_STATUS = 0 
BEGIN

	SET @risksJson = (
	SELECT JSON_QUERY(BODY, '$.risks')
	FROM PAS.CONTRACT
		WHERE CONTRACT_NUMBER = @contractNumber
	)

	SELECT *
	INTO TEMP_CONTRACT_RISK
	FROM OPENJSON(@risksJson) WITH (
		RISK_PROGRAM NVARCHAR(MAX) '$.risk.riskProgram',
		RISK_PREMIUM DECIMAL(18, 2) '$.riskPremium'
	);

	SET @riskPremiumAll = (SELECT SUM(RISK_PREMIUM) RISK_PREMIUM_ALL FROM TEMP_CONTRACT_RISK)

	SET @riskPremiumMain = (SELECT SUM(RISK_PREMIUM) RISK_PREMIUM_MAIN FROM TEMP_CONTRACT_RISK
	WHERE RISK_PROGRAM = 'main')

	UPDATE PAS_IMPL.QUOTE_SAT_LATEST
		SET RISK_PREMIUM = @riskPremiumMain,
			RISK_PREMIUM_ALL = @riskPremiumAll,
			LOAD_DATE = GETDATE()
	WHERE QUOTE_HKEY = (
		SELECT QUOTE_HKEY FROM PAS_IMPL.QUOTE_HUB WHERE CONTRACT_NUMBER = @contractNumber
	)

	UPDATE PAS_IMPL.POLICY_SAT_LATEST
		SET RISK_PREMIUM = @riskPremiumMain,
			RISK_PREMIUM_ALL = @riskPremiumAll,
			LOAD_DATE = GETDATE()
	WHERE POLICY_HKEY = (
		SELECT POLICY_HKEY FROM PAS_IMPL.POLICY_HUB WHERE CONTRACT_NUMBER = @contractNumber
	)

	UPDATE PAS.CONTRACT
		SET COMMON_BODY = JSON_MODIFY(JSON_MODIFY(COMMON_BODY, '$.attributes.riskPremiumAll', @riskPremiumAll), '$.attributes.riskPremium', @riskPremiumMain),
			SYS_UPDATED_ON = GETDATE()
	WHERE CONTRACT_NUMBER = @contractNumber

	DROP TABLE TEMP_CONTRACT_RISK

	fetch next from cur_contract into @contractNumber;
END;
close cur_contract;
deallocate cur_contract;
GO