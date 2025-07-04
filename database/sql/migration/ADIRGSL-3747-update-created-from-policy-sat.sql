INSERT INTO PAS_IMPL.CF_POLICY_SAT
SELECT 
	ph.POLICY_HKEY CF_POLICY_HKEY,
	ph.LOAD_DATE LOAD_DATE,
	'ADINSURE' RECORD_SOURCE,
	CONVERT(CHAR(32), HAShBytes('MD5', CAST(newid() AS varbinary(max))), 2) AS HASH_DIFF,
	JSON_VALUE(BODY, '$.mainInsuranceConditions.insuranceProduct.productDescription') PRODUCT_DESCRIPTION,
	JSON_VALUE(BODY, '$.technicalInformation.createdFromPolicy') CREATED_FROM_POLICY,
	CASE
		 WHEN JSON_VALUE(BODY, '$.technicalInformation.createdFromPolicyOriginal') IS NOT NULL 
		 THEN JSON_VALUE(BODY, '$.technicalInformation.createdFromPolicyOriginal')
		 ELSE JSON_VALUE(BODY, '$.technicalInformation.createdFromPolicy')
	END
	AS CREATED_FROM_POLICY_ORIGINAL
FROM pas.CONTRACT c
JOIN PAS_IMPL.POLICY_HUB ph ON ph.CONTRACT_NUMBER = c.CONTRACT_NUMBER
JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = c.PUBLISHED_ARTIFACT_ID
JOIN CFG.PROCESS_STATE ps ON ps.PROCESS_STATE_ID = c.STATE_ID
LEFT JOIN PAS_IMPL.CF_POLICY_SAT cfPs ON cfPs.CF_POLICY_HKEY = ph.POLICY_HKEY
WHERE
	ph.POLICY_HKEY IS NOT NULL AND
	cfPs.CF_POLICY_HKEY IS NULL AND
    (JSON_VALUE(BODY, '$.technicalInformation.createdFromPolicy') IS NOT NULL
	OR JSON_VALUE(BODY, '$.technicalInformation.createdFromPolicyOriginal') IS NOT NULL)
