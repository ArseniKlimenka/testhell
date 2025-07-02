-- ############### Some declarations
DECLARE @contractNumber NVARCHAR(20);
DECLARE @holderCode NVARCHAR(10);
DECLARE @insuredCode NVARCHAR(10);
DECLARE @initiatorEmployeeCode NVARCHAR(10);

DECLARE cur_contract CURSOR LOCAL STATIC FORWARD_ONLY for
    SELECT 
		CONTRACT_NUMBER, 
		JSON_VALUE(BODY, '$.policyHolder.partyData.partyCode') HOLDER_CODE,
		JSON_VALUE(BODY, '$.insuredPerson.partyData.partyCode') INSURED_CODE,
		JSON_VALUE(BODY, '$.initiator.employeeCode') INITIATOR_EMPLOYEE_CODE
    FROM PAS.CONTRACT
open cur_contract;

-- ############### Update quote and policy sat
fetch next from cur_contract into @contractNumber, @holderCode, @insuredCode, @initiatorEmployeeCode;
while @@FETCH_STATUS = 0 
BEGIN

	UPDATE PAS_IMPL.QUOTE_SAT 
		SET HOLDER_CODE = @holderCode,
			INSURED_CODE = @insuredCode,
			INITIATOR_EMPLOYEE_CODE = @initiatorEmployeeCode
	WHERE QUOTE_HKEY = (
		SELECT QUOTE_HKEY FROM PAS_IMPL.QUOTE_HUB WHERE CONTRACT_NUMBER = @contractNumber
	)

	UPDATE PAS_IMPL.POLICY_SAT
		SET HOLDER_CODE = @holderCode,
			INSURED_CODE = @insuredCode,
			INITIATOR_EMPLOYEE_CODE = @initiatorEmployeeCode
	WHERE POLICY_HKEY = (
		SELECT POLICY_HKEY FROM PAS_IMPL.POLICY_HUB WHERE CONTRACT_NUMBER = @contractNumber
	)

	fetch next from cur_contract into @contractNumber, @holderCode, @insuredCode, @initiatorEmployeeCode;;
END;
close cur_contract;
deallocate cur_contract;
GO