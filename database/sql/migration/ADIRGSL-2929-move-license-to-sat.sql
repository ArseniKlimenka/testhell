INSERT INTO PTY_IMPL.PARTY_LICENSE_SAT (
	PARTY_LICENSE_HKEY,
	LOAD_DATE,
	RECORD_SOURCE,
	HASH_DIFF,
	LICENSE_ID,
	LICENSE_NUMBER,
	LICENSING_AUTHORITY,
	DATE_OF_ISSUE_OF_LICENSE,
	IS_DELETED)
SELECT
	lic.PARTY_LICENSE_HKEY,
	lic.LOAD_DATE,
	lic.RECORD_SOURCE,
	lic.HASH_DIFF,
	lic.LICENSE_ID,
	lic.LICENSE_NUMBER,
	lic.LICENSING_AUTHORITY,
	lic.DATE_OF_ISSUE_OF_LICENSE,
	lic.IS_DELETED
FROM (
SELECT DISTINCT 
	partyHub.PARTY_HKEY AS PARTY_LICENSE_HKEY,
	GETDATE() AS LOAD_DATE,
	N'ADINSURE' AS RECORD_SOURCE,
	CONVERT(CHAR(32), HAShBytes('MD5', CAST(newid() AS varbinary(max))), 2) AS HASH_DIFF,
	ROW_NUMBER() OVER (PARTITION BY partyHub.PARTY_HKEY ORDER BY partyHub.LOAD_DATE DESC) LICENSE_ID,
	JSON_VALUE(party.BODY, '$.partyOrganisationData.licenseNumber') LICENSE_NUMBER,
	JSON_VALUE(party.BODY, '$.partyOrganisationData.licensingAuthority') LICENSING_AUTHORITY,
	JSON_VALUE(party.BODY, '$.partyOrganisationData.dateOfIssueOfLicense') DATE_OF_ISSUE_OF_LICENSE,
	0 AS IS_DELETED
FROM PTY_IMPL.PARTY_HUB partyHub
JOIN PTY.PARTY party on party.PARTY_CODE = partyHub.PARTY_CODE) lic
WHERE 
	lic.LICENSE_NUMBER IS NOT NULL OR
	lic.LICENSING_AUTHORITY IS NOT NULL OR
	lic.DATE_OF_ISSUE_OF_LICENSE IS NOT NULL;

update p
set p.body = json_modify(p.body, '$.partyLicenses', 
(select
	JSON_VALUE(party.BODY, '$.partyOrganisationData.licenseNumber') [licenseNumber],
	JSON_VALUE(party.BODY, '$.partyOrganisationData.licensingAuthority') [licensingAuthority],
	JSON_VALUE(party.BODY, '$.partyOrganisationData.dateOfIssueOfLicense') [dateOfIssueOfLicense]
FROM PTY.PARTY party
WHERE party.PARTY_CODE = p.PARTY_CODE
FOR JSON PATH))
FROM PTY.PARTY p
WHERE
	JSON_VALUE(p.BODY, '$.partyOrganisationData.licenseNumber') IS NOT NULL OR
	JSON_VALUE(p.BODY, '$.partyOrganisationData.licensingAuthority') IS NOT NULL OR
	JSON_VALUE(p.BODY, '$.partyOrganisationData.dateOfIssueOfLicense') IS NOT NULL