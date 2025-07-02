-- ############### Backup universal document common body
SELECT UNIVERSAL_DOCUMENT_NUMBER, COMMON_BODY
INTO BFX.UNIVERSAL_DOCUMENT_COMMON_BODY_BACKUP
FROM BFX.UNIVERSAL_DOCUMENT;

-- ############### Some declarations
DECLARE @universalDocumentNumber NVARCHAR(max);
DECLARE @requestConfName NVARCHAR(max);
DECLARE @typeOfRequest NVARCHAR(max);
DECLARE @amendmentReason NVARCHAR(max);
DECLARE @contractNumber NVARCHAR(max);
DECLARE @phPartyCode NVARCHAR(max);
DECLARE @phFullName NVARCHAR(max);
DECLARE @applicantPartyCode NVARCHAR(max);
DECLARE @applicantFullName NVARCHAR(max);
DECLARE @productCode NVARCHAR(max);
DECLARE @productGroup NVARCHAR(max);
DECLARE @contractConfName NVARCHAR(max);
DECLARE @partnerBusinessCode NVARCHAR(max);
DECLARE @percentRateImpact NVARCHAR(max);
DECLARE @contractIssueDate NVARCHAR(max);
DECLARE @contractStartDate NVARCHAR(max);
DECLARE @contractEndDate NVARCHAR(max);
DECLARE @requestIssueDate NVARCHAR(max);
DECLARE @bankId NVARCHAR(max);
DECLARE @bankName NVARCHAR(max);
DECLARE @bankBic NVARCHAR(max);
DECLARE @bankCorrespondentAccount NVARCHAR(max);
DECLARE @bankCurrencyCode NVARCHAR(max);
DECLARE @bankCurrencyDesc NVARCHAR(max);
DECLARE @bankCurrencyNumericCode NVARCHAR(max);
DECLARE @bankNumber NVARCHAR(max);
DECLARE @bankOpeningDate NVARCHAR(max);
DECLARE @bankClosingDate NVARCHAR(max);
DECLARE @bankInn NVARCHAR(max);
DECLARE @bankDisplayName NVARCHAR(max);

DECLARE cur_request CURSOR LOCAL for
	SELECT 
		UNIVERSAL_DOCUMENT_NUMBER,
		pa.CODE_NAME REQUEST_CONF_NAME,
		JSON_VALUE(ud.BODY, '$.typeOfRequest') TYPE_OF_REQUEST,
		JSON_VALUE(ud.BODY, '$.amendmentReason') AMENDMENT_REASON,
		JSON_VALUE(ud.BODY, '$.contract.number') CONTRACT_NUMBER,
		JSON_VALUE(ud.BODY, '$.holder.partyCode') PH_PARTY_CODE,
		JSON_VALUE(ud.BODY, '$.holder.fullName') PH_FULL_NAME,
		JSON_VALUE(ud.BODY, '$.applicant.partyData.partyCode') APPLICANT_PARTY_CODE,
		JSON_VALUE(ud.BODY, '$.applicant.partyData.partyFullName') APPLICANT_FULL_NAME,
		JSON_VALUE(ud.BODY, '$.contract.productCode') PRODUCT_CODE,
		JSON_VALUE(ud.BODY, '$.contract.productGroup') PRODUCT_GROUP,
		JSON_VALUE(ud.BODY, '$.contract.configurationName') CONTRACT_CONF_NAME,
		JSON_VALUE(ud.BODY, '$.contract.partnerBusinessCode') PARTNER_B_CODE,
		CASE WHEN JSON_VALUE(ud.BODY, '$.contract.percentRateImpact') IN (NULL, 'false', 'FALSE', '0') THEN 0 ELSE 1 END PERCENT_RATE_IMPACT,
		JSON_VALUE(ud.BODY, '$.contract.issueDate') CONTRACT_ISSUE_DATE,
		JSON_VALUE(ud.BODY, '$.contract.startDate') CONTRACT_START_DATE,
		JSON_VALUE(ud.BODY, '$.contract.endDate') CONTRACT_END_DATE,
		JSON_VALUE(ud.BODY, '$.issueDate') REQUEST_ISSUE_DATE,
		JSON_VALUE(ud.BODY, '$.bankAccountsArray[0].bankId') BANK_ID,
		JSON_VALUE(ud.BODY, '$.bankAccountsArray[0].bankName') BANK_NAME,
		JSON_VALUE(ud.BODY, '$.bankAccountsArray[0].bankBic') BANK_BIK,
		JSON_VALUE(ud.BODY, '$.bankAccountsArray[0].bankCorrespondentAccount') BANK_CORR_ACC,
		JSON_VALUE(ud.BODY, '$.bankAccountsArray[0].currencyCode') BANK_CUR_CODE,
		JSON_VALUE(ud.BODY, '$.bankAccountsArray[0].currencyDesc') BANK_CUR_DESC,
		JSON_VALUE(ud.BODY, '$.bankAccountsArray[0].currencyNumericCode') BANK_CUR_NUM_CODE,
		JSON_VALUE(ud.BODY, '$.bankAccountsArray[0].number') BANK_NUMBER,
		JSON_VALUE(ud.BODY, '$.bankAccountsArray[0].openingDate') BANK_OPENING_DATE,
		JSON_VALUE(ud.BODY, '$.bankAccountsArray[0].closingDate') BANK_CLOSING_DATE,
		JSON_VALUE(ud.BODY, '$.bankAccountsArray[0].bankInn') BANK_INN,
		JSON_VALUE(ud.BODY, '$.bankAccountsArray[0].displayName') BANK_DISPLAY_NAME
	FROM BFX.UNIVERSAL_DOCUMENT ud
		LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = ud.PUBLISHED_ARTIFACT_ID
	WHERE pa.CODE_NAME = 'LifeInsuranceRequest';
open cur_request;

-- ############### Update universal document common body 
fetch next from cur_request into 
	@universalDocumentNumber,
	@requestConfName,
	@typeOfRequest,
	@amendmentReason,
	@contractNumber,
	@phPartyCode,
	@phFullName,
	@applicantPartyCode,
	@applicantFullName,
	@productCode,
	@productGroup,
	@contractConfName,
	@partnerBusinessCode,
	@percentRateImpact,
	@contractIssueDate,
	@contractStartDate,
	@contractEndDate,
	@requestIssueDate,
	@bankId,
	@bankName,
	@bankBic,
	@bankCorrespondentAccount,
	@bankCurrencyCode,
	@bankCurrencyDesc,
	@bankCurrencyNumericCode,
	@bankNumber,
	@bankOpeningDate,
	@bankClosingDate,
	@bankInn,
	@bankDisplayName;
while @@FETCH_STATUS = 0 
BEGIN
	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.request', JSON_QUERY(N'{}')) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER and JSON_VALUE(COMMON_BODY, '$.request.typeOfRequest') IS NULL;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.contract', JSON_QUERY(N'{}')) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER and JSON_VALUE(COMMON_BODY, '$.contract.number') IS NULL;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.holder', JSON_QUERY(N'{}')) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER and JSON_VALUE(COMMON_BODY, '$.holder.partyCode') IS NULL;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.applicant', JSON_QUERY(N'{}')) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER and JSON_VALUE(COMMON_BODY, '$.applicant.partyCode') IS NULL;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.bankAccount', JSON_QUERY(N'{}')) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER and JSON_VALUE(COMMON_BODY, '$.bankAccount.bankId') IS NULL;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.request.configurationCodeName', @requestConfName) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.request.typeOfRequest', @typeOfRequest) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.request.amendmentReason', @amendmentReason) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.contract.number', @contractNumber) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.holder.partyCode', @phPartyCode) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.holder.fullName', @phFullName) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.applicant.partyCode', @applicantPartyCode) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.applicant.fullName', @applicantFullName) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.contract.productCode', @productCode) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;
		
	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.contract.productGroup', @productGroup) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.contract.configurationName', @contractConfName) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.contract.partnerBusinessCode', @partnerBusinessCode) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.contract.percentRateImpact', CAST(@percentRateImpact as BIT))
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.contract.issueDate', @contractIssueDate) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.contract.startDate', @contractStartDate) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.contract.endDate', @contractEndDate) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.request.issueDate', @requestIssueDate) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.bankAccount.bankId', @bankId) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.bankAccount.bankName', @bankName) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.bankAccount.bankBic', @bankBic) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.bankAccount.bankCorrespondentAccount', @bankCorrespondentAccount) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.bankAccount.currencyCode', @bankCurrencyCode) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.bankAccount.currencyDesc', @bankCurrencyDesc) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.bankAccount.number', @bankNumber) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.bankAccount.displayName', @bankDisplayName) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.bankAccount.currencyNumericCode', @bankCurrencyNumericCode) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.bankAccount.openingDate', @bankOpeningDate) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.bankAccount.closingDate', @bankClosingDate) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	update BFX.UNIVERSAL_DOCUMENT set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.bankAccount.bankInn', @bankInn) 
	where @universalDocumentNumber = UNIVERSAL_DOCUMENT_NUMBER;

	fetch next from cur_request into 
		@universalDocumentNumber,
		@requestConfName,
		@typeOfRequest,
		@amendmentReason,
		@contractNumber,
		@phPartyCode,
		@phFullName,
		@applicantPartyCode,
		@applicantFullName,
		@productCode,
		@productGroup,
		@contractConfName,
		@partnerBusinessCode,
		@percentRateImpact,
		@contractIssueDate,
		@contractStartDate,
		@contractEndDate,
		@requestIssueDate,
		@bankId,
		@bankName,
		@bankBic,
		@bankCorrespondentAccount,
		@bankCurrencyCode,
		@bankCurrencyDesc,
		@bankCurrencyNumericCode,
		@bankNumber,
		@bankOpeningDate,
		@bankClosingDate,
		@bankInn,
		@bankDisplayName;
END;
close cur_request;
deallocate cur_request;
GO
