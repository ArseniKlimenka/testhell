-- ############### Some declarations
DECLARE @contractNumber NVARCHAR(max);
DECLARE @isHeritors BIT;
DECLARE @isNotHeritors BIT;
DECLARE @specialConditions NVARCHAR(max);

DECLARE cur_contract CURSOR LOCAL for
    SELECT 
		CONTRACT_NUMBER, 
		CASE WHEN JSON_VALUE(BODY, '$.beneficiaries.isHeritors') IN (NULL, 'false', 'FALSE', '0') THEN 0 ELSE 1 END IS_HERITORS,
		CASE WHEN JSON_VALUE(BODY, '$.beneficiaries.isNotHeritors') IN (NULL, 'false', 'FALSE', '0') THEN 0 ELSE 1 END IS_NOT_HERITORS,
		JSON_VALUE(BODY, '$.beneficiaries.specialConditions') SPECIAL_CONDITIONS
    FROM PAS.CONTRACT
open cur_contract;

-- ############### Update quote sat
fetch next from cur_contract into @contractNumber, @isHeritors, @isNotHeritors, @specialConditions;
while @@FETCH_STATUS = 0 
BEGIN
	UPDATE PAS_IMPL.QUOTE_SAT 
		SET IS_HERITORS = @isHeritors,
			IS_NOT_HERITORS = @isNotHeritors,
			BENEFICIARY_SPEC_CONDITIONS = @specialConditions
	WHERE QUOTE_HKEY = (
		SELECT QUOTE_HKEY FROM PAS_IMPL.QUOTE_HUB WHERE CONTRACT_NUMBER = @contractNumber
	)

	fetch next from cur_contract into @contractNumber, @isHeritors, @isNotHeritors, @specialConditions;
END;
close cur_contract;
deallocate cur_contract;
GO