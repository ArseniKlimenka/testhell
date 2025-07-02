INSERT INTO PTY_IMPL.PARTY_PHONES_SAT
(PARTY_PHONES_HKEY, LOAD_DATE, RECORD_SOURCE, HASH_DIFF, PHONE_ID, PHONE_TYPE_CODE, PHONE_TYPE_DESC, ALFA2, COUNTRY_SHORT_NAME, COUNTRY_PHONE_CODE, FULL_NUMBER, FULL_NUMBER_FORMATTED, IS_PREFERABLE, IS_ADDITIONAL, IS_NON_ACTUAL, IS_FOR_NEWSLETTERS, COMMENTS, IS_DELETED)
SELECT DISTINCT partyHub.PARTY_HKEY AS PARTY_PHONES_HKEY,
       GETDATE() AS LOAD_DATE,
       N'ADINSURE' AS RECORD_SOURCE,
       CONVERT(CHAR(32), HAShBytes('MD5', CAST(newid() AS varbinary(max))), 2) AS HASH_DIFF,
       ROW_NUMBER() OVER (PARTITION BY partyHub.PARTY_HKEY ORDER BY partyHub.LOAD_DATE DESC) PHONE_ID,
	   JSON_VALUE(partyPhones.value, '$.phoneType.phoneTypeCode') PHONE_TYPE_CODE,
	   JSON_VALUE(partyPhones.value, '$.phoneType.phoneTypeDesc') PHONE_TYPE_DESC,
	   JSON_VALUE(partyPhones.value, '$.countryCode.alfa2') ALFA2,
	   JSON_VALUE(partyPhones.value, '$.countryCode.countryShortName') COUNTRY_SHORT_NAME,
	   JSON_VALUE(partyPhones.value, '$.countryCode.countryPhoneCode') COUNTRY_PHONE_CODE,
	   JSON_VALUE(partyPhones.value, '$.fullNumber') FULL_NUMBER,
	   JSON_VALUE(partyPhones.value, '$.fullNumberFormatted') FULL_NUMBER_FORMATTED,
	   CASE WHEN JSON_VALUE(partyPhones.value, '$.isPreferable') IN (NULL, 'false', 'FALSE', '0') THEN 0 ELSE 1 END IS_PREFERABLE,
	   CASE WHEN JSON_VALUE(partyPhones.value, '$.isAdditional') IN (NULL, 'false', 'FALSE', '0') THEN 0 ELSE 1 END IS_ADDITIONAL,
	   CASE WHEN JSON_VALUE(partyPhones.value, '$.isNonActual') IN (NULL, 'false', 'FALSE', '0') THEN 0 ELSE 1 END IS_NON_ACTUAL,
	   CASE WHEN JSON_VALUE(partyPhones.value, '$.isForNewsletters') IN (NULL, 'false', 'FALSE', '0') THEN 0 ELSE 1 END IS_FOR_NEWSLETTERS,
	   JSON_VALUE(partyPhones.value, '$.comments') COMMENTS,
       0 AS IS_DELETED
FROM PTY_IMPL.PARTY_HUB partyHub,
       PTY.PARTY party
CROSS APPLY OPENJSON(JSON_QUERY(party.body, '$.partyPhones')) partyPhones 
WHERE party.PARTY_CODE = partyHub.PARTY_CODE