BEGIN TRY
BEGIN TRAN

DECLARE @CurrentAttrValues TABLE
(
   AGENT_AGREEMENT_NUMBER NVARCHAR(50),
   RULE_INDEX NVARCHAR(50),
   CODE NVARCHAR(50),
   DESCRIPTION NVARCHAR(300)
);

INSERT INTO @CurrentAttrValues

SELECT h.AGENT_AGREEMENT_NUMBER,
	   h.RULE_INDEX,
	   h.CODE,
	   h.DESCRIPTION
FROM
	(SELECT i.AGENT_AGREEMENT_NUMBER, 
			i.RULE_INDEX,
			JSON_VALUE(i.RULE_BODY, N'lax $.premiumPeriodType.value.code') AS CODE,
			JSON_VALUE(i.RULE_BODY, N'lax $.premiumPeriodType.value.description') AS DESCRIPTION
	 FROM
		(SELECT aa.AGENT_AGREEMENT_NUMBER, 
				j.[key] AS RULE_INDEX, j.value AS RULE_BODY
		 FROM pas.AGENT_AGREEMENT aa
		 CROSS APPLY OPENJSON(aa.BODY,'$.commissionRules') j) i) h
	 WHERE h.CODE IS NOT NULL

DECLARE @AaNumber NVARCHAR(50), @RuleIndex NVARCHAR(50), @Code NVARCHAR(50), @Description NVARCHAR(300)

DECLARE AA_CURSOR CURSOR LOCAL READ_ONLY FORWARD_ONLY
FOR 

SELECT AGENT_AGREEMENT_NUMBER,
	   RULE_INDEX,
	   CODE,
	   DESCRIPTION
FROM @CurrentAttrValues

OPEN AA_CURSOR
FETCH NEXT FROM AA_CURSOR INTO @AaNumber, @RuleIndex, @Code, @Description
WHILE @@FETCH_STATUS = 0

BEGIN 

	UPDATE pas.AGENT_AGREEMENT set BODY = JSON_MODIFY(BODY, '$.commissionRules['+@RuleIndex+'].premiumPeriodType', JSON_QUERY('{ "isInverted": false, "values":[ { "description":"'+@Description+'", "code":"'+@Code+'" } ] }')) WHERE AGENT_AGREEMENT_NUMBER = @AaNumber
	UPDATE pas.AGENT_AGREEMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.rules['+@RuleIndex+'].attributes.premiumPeriodType', JSON_QUERY('{ "isInverted": false, "values":[ { "description":"'+@Description+'", "code":"'+@Code+'" } ] }')) WHERE AGENT_AGREEMENT_NUMBER = @AaNumber
	UPDATE pas.AGENT_AGREEMENT set SNAPSHOT_BODY = JSON_MODIFY(SNAPSHOT_BODY, '$.commissionRules['+@RuleIndex+'].premiumPeriodType', JSON_QUERY('{ "isInverted": false, "values":[ { "description":"'+@Description+'", "code":"'+@Code+'" } ] }')) WHERE AGENT_AGREEMENT_NUMBER = @AaNumber

	FETCH NEXT FROM AA_CURSOR INTO @AaNumber, @RuleIndex, @Code, @Description

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