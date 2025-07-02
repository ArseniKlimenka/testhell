BEGIN

DECLARE @CurrentAmendments TABLE
(
   AMENDMENT_NUMBER NVARCHAR(150),
   AMENDMENT_REASON NVARCHAR(150),
   RECIPIENT_BANK_ACCOUNT NVARCHAR(max),
   RECIPIENT_CODE NVARCHAR(150),
   RECIPIENT_TYPE NVARCHAR(150),
   RECIPIENT_NAME NVARCHAR(150),
   HOLDER_CODE NVARCHAR(150),
   HOLDER_TYPE NVARCHAR(150),
   HOLDER_NAME NVARCHAR(150),
   AMENDMENT_BODY NVARCHAR(max)
);

DECLARE @PaymentLines TABLE
(
   LINE_TYPE NVARCHAR(150),
   AMOUNT_TO_PAY DECIMAL(15, 2),
   LINE_INDEX NVARCHAR(50)
);

INSERT INTO @CurrentAmendments

SELECT 
ctr.CONTRACT_NUMBER AS AMENDMENT_NUMBER,
JSON_VALUE(ctr.BODY, '$.basicAmendmentConditions.amendmentReason') AS AMENDMENT_REASON,
JSON_QUERY(ctr.BODY, '$.paymentAmendmentConditions.recepient.bankAccount') AS RECIPIENT_BANK_ACCOUNT,
JSON_VALUE(ctr.BODY, '$.paymentAmendmentConditions.recepient.partyData.partyCode') AS RECIPIENT_CODE,
JSON_VALUE(ctr.BODY, '$.paymentAmendmentConditions.recepient.partyData.partyType') AS RECIPIENT_TYPE,
JSON_VALUE(ctr.BODY, '$.paymentAmendmentConditions.recepient.partyData.partyFullName') AS RECIPIENT_NAME,
JSON_VALUE(ctr.SNAPSHOT_BODY, '$.policyHolder.partyData.partyCode') AS HOLDER_CODE,
JSON_VALUE(ctr.SNAPSHOT_BODY, '$.policyHolder.partyData.partyType') AS HOLDER_TYPE,
JSON_VALUE(ctr.SNAPSHOT_BODY, '$.policyHolder.partyData.partyFullName') AS HOLDER_NAME,
ctr.BODY AS AMENDMENT_BODY
FROM PAS.CONTRACT ctr
JOIN CFX.PUBLISHED_ARTIFACT art on ctr.PUBLISHED_ARTIFACT_ID = art.PUBLISHED_ARTIFACT_ID
WHERE art.CODE_NAME IN ('AccumulatedLifeInsuranceCancellation', 'InvestmentLifeInsuranceCancellation', 'CreditLifeInsuranceCancellation',
'RiskLifeInsuranceCancellation', 'MedLifeInsuranceCancellation')

DECLARE @AmendmentNumber NVARCHAR(150), 
		@AmendmentReason NVARCHAR(150), 
		@BankAccount NVARCHAR(max), 
		@PartyCode NVARCHAR(150), 
		@PartyType NVARCHAR(150), 
		@PartyName NVARCHAR(150),
		@AmndBody NVARCHAR(max),
		@SVAmount DECIMAL(15, 2),
		@SVIndex NVARCHAR(50),
		@InvAmount DECIMAL(15, 2),
		@InvIndex NVARCHAR(50),
		@PitAmount DECIMAL(15, 2),
		@PitIndex NVARCHAR(50),
		@PaymentRefundAmount DECIMAL(15, 2),
		@PaymentRefundIndex NVARCHAR(50),
		@CreditRefundAmount DECIMAL(15, 2),
		@CreditRefundIndex NVARCHAR(50),
		@TotalAmount DECIMAL(15, 2),
		@HolderPartyCode NVARCHAR(150), 
		@HolderPartyType NVARCHAR(150), 
		@HolderPartyName NVARCHAR(150)

DECLARE CTR_CURSOR CURSOR LOCAL READ_ONLY FORWARD_ONLY
FOR 

SELECT AMENDMENT_NUMBER,
	   AMENDMENT_REASON,
	   RECIPIENT_BANK_ACCOUNT,
	   RECIPIENT_CODE,
	   RECIPIENT_TYPE,
	   RECIPIENT_NAME,
	   HOLDER_CODE,
	   HOLDER_TYPE,
	   HOLDER_NAME,
	   AMENDMENT_BODY
FROM @CurrentAmendments

OPEN CTR_CURSOR
FETCH NEXT FROM CTR_CURSOR INTO @AmendmentNumber, @AmendmentReason, @BankAccount, @PartyCode, @PartyType, @PartyName, @HolderPartyCode, @HolderPartyType, @HolderPartyName,  @AmndBody
WHILE @@FETCH_STATUS = 0

BEGIN 

	BEGIN TRY
	BEGIN TRAN

		
		INSERT INTO @PaymentLines

		SELECT 
		ln.LINE_TYPE,
		ln.AMOUNT_TO_PAY,
		l.[key] AS LINE_INDEX
		FROM PAS_IMPL.ADIRGSL_3043_CL_BACKUP ctr
		CROSS APPLY OPENJSON(ctr.BODY, '$.paymentAmendmentConditions.paymentLines') l
		CROSS APPLY OPENJSON(l.[value])
		WITH (
		LINE_TYPE nvarchar(50) '$.paymentLineType',
		AMOUNT_TO_PAY DECIMAL(15, 2) '$.paymentLineSum'
		) ln
		WHERE CONTRACT_NUMBER = @AmendmentNumber

		SELECT @SVAmount = AMOUNT_TO_PAY, @SVIndex = LINE_INDEX FROM @PaymentLines WHERE LINE_TYPE = 'surrenderValue';
		SELECT @InvAmount = AMOUNT_TO_PAY, @InvIndex = LINE_INDEX FROM @PaymentLines WHERE LINE_TYPE = 'investProfit';
		SELECT @CreditRefundAmount = AMOUNT_TO_PAY, @CreditRefundIndex = LINE_INDEX FROM @PaymentLines WHERE LINE_TYPE = 'creditRefund';
		SELECT @PaymentRefundAmount = AMOUNT_TO_PAY, @PaymentRefundIndex = LINE_INDEX FROM @PaymentLines WHERE LINE_TYPE = 'paymentRefund';
		SELECT @PitAmount = AMOUNT_TO_PAY, @PitIndex = LINE_INDEX FROM @PaymentLines WHERE LINE_TYPE = 'PIT';

		--update lines
		IF @SVIndex IS NOT NULL
		BEGIN
		SET @AmndBody = JSON_MODIFY(@AmndBody, '$.paymentAmendmentConditions.paymentLines[' + @SVIndex + '].paymentLineSumInRub',  COALESCE(@SVAmount, 0))
		END

		IF @InvIndex IS NOT NULL
		BEGIN
		SET @AmndBody = JSON_MODIFY(@AmndBody, '$.paymentAmendmentConditions.paymentLines[' + @InvIndex + '].paymentLineSumInRub',  COALESCE(@InvAmount, 0))
		END

		IF @CreditRefundIndex IS NOT NULL
		BEGIN
		SET @AmndBody = JSON_MODIFY(@AmndBody, '$.paymentAmendmentConditions.paymentLines[' + @CreditRefundIndex + '].paymentLineSumInRub',  COALESCE(@CreditRefundAmount, 0))
		END

		IF @PaymentRefundIndex IS NOT NULL
		BEGIN
		SET @AmndBody = JSON_MODIFY(@AmndBody, '$.paymentAmendmentConditions.paymentLines[' + @PaymentRefundIndex + '].paymentLineSumInRub',  COALESCE(@PaymentRefundAmount, 0))
		END

		IF @PitIndex IS NOT NULL
		BEGIN
		SET @AmndBody = JSON_MODIFY(@AmndBody, '$.paymentAmendmentConditions.paymentLines[' + @PitIndex + '].paymentLineSumInRub',  COALESCE(@PitAmount, 0))
		END

		--set exchange rate
		SET @AmndBody = JSON_MODIFY(@AmndBody, '$.paymentAmendmentConditions.exchangeRate', 1)

		--set total amount
		SET @TotalAmount = (COALESCE(@SVAmount, 0) + COALESCE(@InvAmount, 0) + COALESCE(@CreditRefundAmount, 0) + COALESCE(@PaymentRefundAmount, 0)) - COALESCE(@PitAmount, 0)

		--clear obsolete data
		SET @AmndBody = JSON_MODIFY(@AmndBody, '$.paymentAmendmentConditions.recepient', null)

		--set amnd subtype
		IF @AmendmentReason = 'byClientNonCoolOff' OR @AmendmentReason = 'byClientCoolOff' OR @AmendmentReason = 'creditRepayment'
		BEGIN
		SET @AmndBody = JSON_MODIFY(@AmndBody, '$.basicAmendmentConditions.amendmentSubType', 'byClientDecision')
		END

		ELSE IF @AmendmentReason = 'byCompany'
		BEGIN
		SET @AmndBody = JSON_MODIFY(@AmndBody, '$.basicAmendmentConditions.amendmentSubType', 'byCompanyDecision')
		END

		ELSE IF @AmendmentReason = 'byCourt'
		BEGIN
		SET @AmndBody = JSON_MODIFY(@AmndBody, '$.basicAmendmentConditions.amendmentSubType', 'byCourtDecision')
		END

		ELSE IF @AmendmentReason = 'individualCommission'
		BEGIN
		SET @AmndBody = JSON_MODIFY(@AmndBody, '$.basicAmendmentConditions.amendmentSubType', 'byCommissionDecision')
		END

		--set applicant
		SET @AmndBody = JSON_MODIFY(@AmndBody, '$.basicAmendmentConditions.applicant', JSON_QUERY('{"partyCode":"' + @HolderPartyCode +'", "partyType":"' 
												+ @HolderPartyType +'", "fullName":"' 
												+ @HolderPartyName +'"}'))

		--set recipient
		IF @PartyCode IS NOT NULL AND @TotalAmount > 0
		BEGIN



		SET @AmndBody = JSON_MODIFY(@AmndBody, '$.paymentAmendmentConditions.canellationRecipients', JSON_QUERY('[]'))
													
	
		SET @AmndBody = JSON_MODIFY(@AmndBody, 'append $.paymentAmendmentConditions.canellationRecipients', 
												JSON_QUERY('{"partyCode":"' + @PartyCode +'", "partyType":"' 
												+ @PartyType +'", "fullName":"' 
												+ @PartyName +'", ' + N' "recipientReason": {"code": "006", "description": "Страхователь"}, ' 
												+ N' "recipientPaymentType": {"code": "005", "description": "На расчетный счет"}, ' 
												+ ' "amountToPayPercetage": 1, ' 
												+ ' "amountToPay": ' + CONVERT(nvarchar, @TotalAmount) + ', ' 
												+ ' "amountToPayInRubCurrency": ' + CONVERT(nvarchar, @TotalAmount) + ', '
												+ ' "pitAmount": ' + COALESCE(CONVERT(nvarchar, @PitAmount), '0') + ', '
												+ ' "pitAmountInRubCurrency": ' + COALESCE(CONVERT(nvarchar, @PitAmount), '0') + '}'))
		IF @BankAccount IS NOT NULL
		BEGIN
		SET @AmndBody = JSON_MODIFY(@AmndBody, '$.paymentAmendmentConditions.canellationRecipients[0].bankAccount', JSON_QUERY(@BankAccount))
		END

		END

		UPDATE PAS.CONTRACT SET BODY = @AmndBody WHERE CONTRACT_NUMBER = @AmendmentNumber

		DELETE FROM @PaymentLines

		--select body as [processing-instruction(x)] from pas.contract where CONTRACT_NUMBER = '89600-99000001/1' for xml path
		--ROLLBACK TRAN
		COMMIT TRAN

	END TRY

	BEGIN CATCH

    ROLLBACK TRAN
    DECLARE @ErrorMessage NVARCHAR(4000); DECLARE @ErrorSeverity INT; DECLARE @ErrorState INT;
    SELECT @ErrorMessage = ERROR_MESSAGE() + CHAR(13) + ' Amendment not updated: ' + @AmendmentNumber, @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = 1;
    RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);

	END CATCH
	
	--reset variables
	SET @SVAmount = NULL
	SET @SVIndex = NULL
	SET @InvIndex = NULL
	SET @CreditRefundIndex = NULL
	SET @PaymentRefundIndex = NULL
	SET @PitIndex = NULL
	SET @InvAmount = NULL
	SET @CreditRefundAmount = NULL
	SET @PaymentRefundAmount = NULL
	SET @PitAmount = NULL

	SET @AmendmentNumber = NULL
	SET @AmendmentReason = NULL
	SET @BankAccount = NULL
	SET @PartyCode = NULL
	SET @PartyType = NULL
	SET @PartyName = NULL
	SET @HolderPartyCode = NULL
	SET @HolderPartyType = NULL
	SET @HolderPartyName = NULL
	SET @AmndBody = NULL

	--move next
	FETCH NEXT FROM CTR_CURSOR INTO @AmendmentNumber, @AmendmentReason, @BankAccount, @PartyCode, @PartyType, @PartyName, @HolderPartyCode, @HolderPartyType, @HolderPartyName,  @AmndBody

END

CLOSE CTR_CURSOR
DEALLOCATE CTR_CURSOR

END
