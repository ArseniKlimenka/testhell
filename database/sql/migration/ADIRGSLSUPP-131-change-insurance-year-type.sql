BEGIN TRY
BEGIN TRAN

DECLARE @CurrentAttrValues TABLE
(
   AGENT_AGREEMENT_NUMBER NVARCHAR(50),
   RULE_INDEX NVARCHAR(50)
);

INSERT INTO @CurrentAttrValues
SELECT 
	i.AGENT_AGREEMENT_NUMBER, 
	i.RULE_INDEX
	 FROM
		(SELECT aa.AGENT_AGREEMENT_NUMBER, 
				j.[key] AS RULE_INDEX, j.value AS RULE_BODY
		 FROM pas.AGENT_AGREEMENT aa
		 CROSS APPLY OPENJSON(aa.BODY,'$.commissionRules') j) i

DECLARE @AaNumber NVARCHAR(50), @RuleIndex NVARCHAR(50)

DECLARE AA_CURSOR CURSOR LOCAL READ_ONLY FORWARD_ONLY
FOR 

SELECT AGENT_AGREEMENT_NUMBER,
	   RULE_INDEX
FROM @CurrentAttrValues

OPEN AA_CURSOR
FETCH NEXT FROM AA_CURSOR INTO @AaNumber, @RuleIndex
WHILE @@FETCH_STATUS = 0

BEGIN 
	UPDATE pas.AGENT_AGREEMENT set BODY = 
		JSON_MODIFY(BODY, '$.commissionRules['+@RuleIndex+'].insuranceYear', 
		JSON_QUERY('{"isInverted": false,"value": {"fromIncluded": true,"toIncluded": true,"from": ' + JSON_VALUE(BODY, '$.commissionRules['+@RuleIndex+'].insuranceYear.value') + ',"to": '+JSON_VALUE(BODY, '$.commissionRules['+@RuleIndex+'].insuranceYear.value')+'}}')) WHERE AGENT_AGREEMENT_NUMBER = @AaNumber
	UPDATE pas.AGENT_AGREEMENT set COMMON_BODY = 
		JSON_MODIFY(COMMON_BODY, '$.rules['+@RuleIndex+'].attributes.insuranceYear',
		JSON_QUERY('{"isInverted": false,"value": {"fromIncluded": true,"toIncluded": true,"from": ' + JSON_VALUE(COMMON_BODY, '$.rules['+@RuleIndex+'].attributes.insuranceYear.value') + ',"to": '+JSON_VALUE(COMMON_BODY, '$.rules['+@RuleIndex+'].insuranceYear.value')+'}}')) WHERE AGENT_AGREEMENT_NUMBER = @AaNumber
	UPDATE pas.AGENT_AGREEMENT set SNAPSHOT_BODY = 
		JSON_MODIFY(SNAPSHOT_BODY, '$.commissionRules['+@RuleIndex+'].insuranceYear',
		JSON_QUERY('{"isInverted": false,"value": {"fromIncluded": true,"toIncluded": true,"from": ' + JSON_VALUE(SNAPSHOT_BODY, '$.commissionRules['+@RuleIndex+'].insuranceYear.value') + ',"to": '+JSON_VALUE(SNAPSHOT_BODY, '$.commissionRules['+@RuleIndex+'].insuranceYear.value')+'}}')) WHERE AGENT_AGREEMENT_NUMBER = @AaNumber

	FETCH NEXT FROM AA_CURSOR INTO @AaNumber, @RuleIndex
END

CLOSE AA_CURSOR
DEALLOCATE AA_CURSOR

COMMIT TRAN

END TRY

BEGIN CATCH

    ROLLBACK TRAN
    DECLARE @ErrorMessage NVARCHAR(4000); DECLARE @ErrorSeverity INT; DECLARE @ErrorState INT;
    SELECT @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = 1;
    RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);

END CATCH