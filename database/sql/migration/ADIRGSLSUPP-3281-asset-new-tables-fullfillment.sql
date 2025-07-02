INSERT INTO PAS_IMPL.QUOTE_ASSET_SAT (QUOTE_ASSET_HKEY, LOAD_DATE, RECORD_SOURCE, HASH_DIFF, ASSET_NUMBER, IS_DELETED, ASSET_UNITS_COUNT)
SELECT 
	qh.QUOTE_HKEY as QUOTE_ASSET_HKEY,
	GETDATE() as LOAD_DATE,
	'ADINSURE' as RECORD_SOURCE,
	CONVERT(CHAR(32), HAShBytes('MD5', CAST(newid() AS varbinary(max))), 2) AS HASH_DIFF,
	assetProperties.numbers as ASSET_NUMBER,
	0 as IS_DELETED,
	coalesce(try_convert(numeric(15,4), JSON_VALUE(contract.BODY, '$.basicAssetProperties.assetUnitsCountOnClient')), 0) as ASSET_UNITS_COUNT
FROM 
    PAS.CONTRACT contract
CROSS APPLY 
    OPENJSON(contract.BODY, '$.basicAssetProperties.assetProperties') 
    WITH (
        numbers nvarchar(100) '$.asset.assetNumber'
    ) AS assetProperties
JOIN 
     PAS_IMPL.ASSET_HUB ah ON ah.ASSET_NUMBER = assetProperties.numbers
JOIN
	 PAS_IMPL.QUOTE_HUB qh ON contract.CONTRACT_NUMBER = qh.CONTRACT_NUMBER


INSERT INTO PAS_IMPL.POLICY_ASSET_SAT (POLICY_ASSET_HKEY, LOAD_DATE, RECORD_SOURCE, HASH_DIFF, ASSET_NUMBER, IS_DELETED, ASSET_UNITS_COUNT)
SELECT 
	qh.POLICY_HKEY as POLICY_ASSET_HKEY,
	GETDATE() as LOAD_DATE,
	'ADINSURE' as RECORD_SOURCE,
	CONVERT(CHAR(32), HAShBytes('MD5', CAST(newid() AS varbinary(max))), 2) AS HASH_DIFF,
	extracted_numbers.numbers as ASSET_NUMBER,
	0 as IS_DELETED,
    coalesce(try_convert(numeric(15,4), JSON_VALUE(contract.BODY, '$.basicAssetProperties.assetUnitsCountOnClient')), 0) as ASSET_UNITS_COUNT
FROM 
    PAS.CONTRACT contract
CROSS APPLY 
    OPENJSON(contract.BODY, '$.basicAssetProperties.assetProperties') 
    WITH (
        numbers nvarchar(100) '$.asset.assetNumber' 
    ) AS extracted_numbers
JOIN 
     PAS_IMPL.ASSET_HUB ah ON ah.ASSET_NUMBER = extracted_numbers.numbers
JOIN
	 PAS_IMPL.POLICY_HUB qh ON contract.CONTRACT_NUMBER = qh.CONTRACT_NUMBER