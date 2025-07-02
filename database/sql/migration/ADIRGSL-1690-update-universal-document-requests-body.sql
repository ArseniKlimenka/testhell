-- ############### Backup universal document body
SELECT UNIVERSAL_DOCUMENT_NUMBER, BODY
INTO BFX.UNIVERSAL_DOCUMENT_BODY_BACKUP
FROM BFX.UNIVERSAL_DOCUMENT;

-- ############### Some declarations
DECLARE @contractNumber NVARCHAR(max);
DECLARE @productCode NVARCHAR(max);
DECLARE @productGroup NVARCHAR(max);
DECLARE @percentRateImpact NVARCHAR(max);

DECLARE cur_request CURSOR LOCAL for
    SELECT 
		con.CONTRACT_NUMBER, 
		JSON_VALUE(con.BODY, '$.mainInsuranceConditions.insuranceProduct.productCode') PRODUCT_CODE,
		JSON_VALUE(con.BODY, '$.mainInsuranceConditions.insuranceProduct.productGroup') PRODUCT_GROUP,
		CASE WHEN JSON_VALUE(con.BODY, '$.creditProgram.percentRateImpact') IN (NULL, 'false', 'FALSE', '0') THEN 0 ELSE 1 END PERCENT_RATE_IMPACT 
    FROM BFX.UNIVERSAL_DOCUMENT ud
		LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = ud.PUBLISHED_ARTIFACT_ID
        LEFT JOIN pas.CONTRACT con ON con.CONTRACT_NUMBER = JSON_VALUE(ud.BODY, '$.contract.number')
    WHERE pa.CODE_NAME = 'LifeInsuranceRequest';
open cur_request;

-- ############### Update universal document body 
fetch next from cur_request into @contractNumber, @productCode, @productGroup, @percentRateImpact;
while @@FETCH_STATUS = 0 
BEGIN
	update BFX.UNIVERSAL_DOCUMENT set BODY = JSON_MODIFY(BODY, '$.contract.productCode', @productCode) 
	where @contractNumber = JSON_VALUE(BODY, '$.contract.number');

	update BFX.UNIVERSAL_DOCUMENT set BODY = JSON_MODIFY(BODY, '$.contract.productGroup', @productGroup) 
	where @contractNumber = JSON_VALUE(BODY, '$.contract.number');

	update BFX.UNIVERSAL_DOCUMENT set BODY = JSON_MODIFY(BODY, '$.contract.percentRateImpact', CAST(@percentRateImpact as BIT)) 
	where @contractNumber = JSON_VALUE(BODY, '$.contract.number');

	fetch next from cur_request into @contractNumber, @productCode, @productGroup, @percentRateImpact;
END;
close cur_request;
deallocate cur_request;
GO
