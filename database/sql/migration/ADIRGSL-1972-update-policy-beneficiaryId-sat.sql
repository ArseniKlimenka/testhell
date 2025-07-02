BEGIN TRY
BEGIN TRAN

DECLARE @contractBodyData TABLE(
    POLICY_BENEFICIARY_HKEY nvarchar(max) NOT NULL,
    BENEFICIARY_ID uniqueidentifier NULL,
	FULL_NAME nvarchar(max) NULL,
	DATE_OF_BIRTH date NULL,
	PERSON_GENDER nvarchar(max) NULL,
	RELATION_TYPE nvarchar(max) NULL,
	SHARE decimal(15, 2) NULL
);

INSERT INTO @contractBodyData (
		POLICY_BENEFICIARY_HKEY,
		BENEFICIARY_ID,
		FULL_NAME,
		DATE_OF_BIRTH,
		PERSON_GENDER,
		RELATION_TYPE,
		SHARE
)
select DISTINCT policyHub.POLICY_HKEY AS POLICY_BENEFICIARY_HKEY,
	JSON_VALUE(beneficiaries.value, '$.beneficiaryId') AS BENEFICIARY_ID,
	JSON_VALUE(beneficiaries.value, '$.partyFullName') AS FULL_NAME,
	JSON_VALUE(beneficiaries.value, '$.dateOfBirth') AS DATE_OF_BIRTH,
	JSON_VALUE(beneficiaries.value, '$.personGender') AS PERSON_GENDER,
	JSON_VALUE(beneficiaries.value, '$.relationType') AS REALATION_TYPE,
	JSON_VALUE(beneficiaries.value, '$.share') AS SHARE
FROM PAS_IMPL.POLICY_HUB policyHub,
	PAS.CONTRACT contract
	CROSS APPLY OPENJSON(
		JSON_QUERY(contract.body, '$.beneficiaries.beneficiaries')
	) beneficiaries
WHERE contract.CONTRACT_NUMBER = policyHub.CONTRACT_NUMBER

UPDATE PAS_IMPL.POLICY_BENEFICIARY_SAT
SET BENEFICIARY_ID = cbd.BENEFICIARY_ID
FROM PAS_IMPL.POLICY_BENEFICIARY_SAT sat, @contractBodyData cbd
WHERE cbd.POLICY_BENEFICIARY_HKEY = sat.POLICY_BENEFICIARY_HKEY
	and cbd.FULL_NAME = sat.FULL_NAME
	and cbd.DATE_OF_BIRTH = sat.DATE_OF_BIRTH
	and cbd.PERSON_GENDER = sat.PERSON_GENDER
	and cbd.RELATION_TYPE = sat.RELATION_TYPE
	and cbd.SHARE = sat.SHARE;

COMMIT TRAN
END TRY

BEGIN CATCH

    ROLLBACK TRAN
    DECLARE @ErrorMessage NVARCHAR(4000); DECLARE @ErrorSeverity INT; DECLARE @ErrorState INT;
    SELECT @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = 1;
    RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);

END CATCH