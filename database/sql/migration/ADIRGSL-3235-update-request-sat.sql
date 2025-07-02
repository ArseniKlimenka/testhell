BEGIN TRY
BEGIN TRAN

INSERT INTO UNI_IMPL.RQT_SAT (
	RQT_HKEY,
	LOAD_DATE,
	RECORD_SOURCE,
	HASH_DIFF,
	CONTRACT_NUMBER,
	REQUEST_STATE,
	TYPE_OF_REQUEST,
	AMENDMENT_REASON,
	RECIEVE_METHOD,
	COOL_OFF_PERIOD_END,
	ISSUE_DATE,
	RECIEVE_DATE,
	REGISTRATION_DATE,
	INITIATOR,
	APPLICANT_CODE,
	APPLICANT_FULL_NAME,
	HOLDER_CODE,
	HOLDER_FULL_NAME,
	RETURN_REASON,
	SELLER_USERNAME,
	BANK_BIC,
	BANK_CORR_ACC,
	BANK_ID,
	BANK_INN,
	BANK_NAME, 
	BANK_CURR_CODE,
	BANK_CURR_DESC,
	BANK_CURR_NUM_CODE,
	BANK_DISPLAY_NAME,
	BANK_NUMBER
)
SELECT DISTINCT 
	requestHub.RQT_HKEY AS RQT_HKEY,
	GETDATE() AS LOAD_DATE,
	N'ADINSURE' AS RECORD_SOURCE,
	CONVERT(
		CHAR(32),
		HashBytes('MD5', CAST(newid() AS varbinary(max))),
		2
	) AS HASH_DIFF,
	JSON_VALUE(ud.body, '$.contract.number') contractNumber,
	ps.CODE_NAME requestState,
	JSON_VALUE(ud.body, '$.typeOfRequest') typeOfRequest,
    JSON_VALUE(ud.body, '$.amendmentReason') amendmentReason,
	JSON_VALUE(ud.body, '$.receiveMethod') receiveMethod,
    JSON_VALUE(ud.body, '$.coolOffPeriodEndSyncWithCalendar') coolOffPeriodEndSyncWithCalendar,
	JSON_VALUE(ud.body, '$.issueDate') issueDate,
    JSON_VALUE(ud.body, '$.receivedDate') receivedDate,
    JSON_VALUE(ud.body, '$.registrationDate') registrationDate,
	JSON_VALUE(ud.body, '$.initiator') initiator,
    JSON_VALUE(ud.body, '$.applicant.partyData.partyCode') applicantCode,
    JSON_VALUE(ud.body, '$.applicant.partyData.partyFullName') applicantFullName,
    JSON_VALUE(ud.body, '$.holder.partyCode') holderCode,
    JSON_VALUE(ud.body, '$.holder.fullName') holderFullName,   
	JSON_VALUE(ud.body, '$.returnForRevisionReason') returnReason,
    JSON_VALUE(ud.body, '$.sellerUsername') sellerUsername,
    JSON_VALUE(ud.body, '$.bankAccount.bankBic') bankBic,
    JSON_VALUE(ud.body, '$.bankAccount.bankCorrespondentAccount') bankCorrespondentAccount,
    JSON_VALUE(ud.body, '$.bankAccount.bankId') bankId,
    JSON_VALUE(ud.body, '$.bankAccount.bankInn') bankInn,
    JSON_VALUE(ud.body, '$.bankAccount.bankName') bankName,
    JSON_VALUE(ud.body, '$.bankAccount.currencyCode') bankCurrencyCode,
    JSON_VALUE(ud.body, '$.bankAccount.currencyDesc') bankCurrencyDesc,
    JSON_VALUE(ud.body, '$.bankAccount.currencyNumericCode') bankCurrencyNumericCode,
    JSON_VALUE(ud.body, '$.bankAccount.displayName') bankDisplayName,
    JSON_VALUE(ud.body, '$.bankAccount.number') bankNumber
FROM 
	UNI_IMPL.RQT_HUB requestHub,
	bfx.UNIVERSAL_DOCUMENT ud
LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = ud.PUBLISHED_ARTIFACT_ID
LEFT JOIN CFG.PROCESS_STATE ps ON ps.PROCESS_STATE_ID = ud.STATE_ID
WHERE ud.UNIVERSAL_DOCUMENT_NUMBER = requestHub.REQUEST_NUMBER
AND pa.CODE_NAME = 'LifeInsuranceRequest'

COMMIT TRAN
END TRY

BEGIN CATCH

    ROLLBACK TRAN
    DECLARE @ErrorMessage NVARCHAR(4000); DECLARE @ErrorSeverity INT; DECLARE @ErrorState INT;
    SELECT @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = 1;
    RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);

END CATCH
