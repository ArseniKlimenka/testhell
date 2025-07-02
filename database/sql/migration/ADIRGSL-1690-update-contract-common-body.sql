-- ############### Backup contracts common body
SELECT CONTRACT_NUMBER, COMMON_BODY
INTO PAS.CONTRACT_COMMON_BODY_BACKUP
FROM PAS.CONTRACT;

-- ############### Some declarations
DECLARE @contractNumber NVARCHAR(max);
DECLARE @percentRateImpact NVARCHAR(max);

DECLARE cur_contract CURSOR LOCAL for
    SELECT 
		CONTRACT_NUMBER, 
		CASE WHEN JSON_VALUE(BODY, '$.creditProgram.percentRateImpact') IN (NULL, 'false', 'FALSE', '0') THEN 0 ELSE 1 END PERCENT_RATE_IMPACT 
    FROM PAS.CONTRACT
	WHERE JSON_VALUE(BODY, '$.mainInsuranceConditions.insuranceProduct.productGroup') = 'credit';
open cur_contract;

-- ############### Update contracts common body 
fetch next from cur_contract into @contractNumber, @percentRateImpact;
while @@FETCH_STATUS = 0 
BEGIN
	update PAS.CONTRACT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.attributes.percentRateImpact', CAST(@percentRateImpact as BIT)) 
	where @contractNumber = CONTRACT_NUMBER;

	fetch next from cur_contract into @contractNumber, @percentRateImpact;
END;
close cur_contract;
deallocate cur_contract;
GO
