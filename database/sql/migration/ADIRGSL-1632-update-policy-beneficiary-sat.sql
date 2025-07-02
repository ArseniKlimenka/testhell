INSERT INTO PAS_IMPL.POLICY_BENEFICIARY_SAT (
		POLICY_BENEFICIARY_HKEY,
		LOAD_DATE,
		RECORD_SOURCE,
		HASH_DIFF,
		BENEFICIARY_ID,
		FULL_NAME,
		DATE_OF_BIRTH,
		PERSON_GENDER,
		RELATION_TYPE,
		SHARE,
		IS_DELETED
	)
select DISTINCT policyHub.POLICY_HKEY AS POLICY_BENEFICIARY_HKEY,
	GETDATE() AS LOAD_DATE,
	N'ADINSURE' AS RECORD_SOURCE,
	CONVERT(
		CHAR(32),
		HashBytes('MD5', CAST(newid() AS varbinary(max))),
		2
	) AS HASH_DIFF,
	JSON_VALUE(beneficiaries.value, '$.beneficiaryId') AS BENEFICIARY_ID,
	JSON_VALUE(beneficiaries.value, '$.partyFullName') AS FULL_NAME,
	JSON_VALUE(beneficiaries.value, '$.dateOfBirth') AS DATE_OF_BIRTH,
	JSON_VALUE(beneficiaries.value, '$.personGender') AS PERSON_GENDER,
	JSON_VALUE(beneficiaries.value, '$.relationType') AS REALATION_TYPE,
	JSON_VALUE(beneficiaries.value, '$.share') AS SHARE,
	0 AS IS_DELETED
FROM PAS_IMPL.POLICY_HUB policyHub,
	PAS.CONTRACT contract
	CROSS APPLY OPENJSON(
		JSON_QUERY(contract.body, '$.beneficiaries.beneficiaries')
	) beneficiaries
WHERE contract.CONTRACT_NUMBER = policyHub.CONTRACT_NUMBER