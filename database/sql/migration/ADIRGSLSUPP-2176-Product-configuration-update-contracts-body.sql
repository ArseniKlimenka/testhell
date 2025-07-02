-- DROP TABLE IF EXISTS PAS_IMPL.CONTRACT_BODY_PRODUCT_CONF_UPDATE_INFO

IF NOT EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[CONTRACT_BODY_PRODUCT_CONF_UPDATE_INFO]') AND TYPE IN (N'U'))
BEGIN
	CREATE TABLE PAS_IMPL.CONTRACT_BODY_PRODUCT_CONF_UPDATE_INFO
	(
		[ID] [int] IDENTITY(1,1) PRIMARY KEY,
		[CONTRACT_NUMBER] [nvarchar](64) NOT NULL,
		[CODE_NAME] [nvarchar](255) NULL,
		[PRODUCT_CODE] [nvarchar](255) NULL,
		[ISSUE_DATE] [nvarchar](255) NULL,
		[IS_UPDATED] [bit] NOT NULL,
		[INFO] [nvarchar](MAX) NULL,
		[DATE] datetime NOT NULL
	)

	CREATE INDEX IX_CONTRACT_BODY_PRODUCT_CONF_UPDATE_INFO_CONTRACT_NUMBER
	ON PAS_IMPL.CONTRACT_BODY_PRODUCT_CONF_UPDATE_INFO
	(CONTRACT_NUMBER)
END

DROP INDEX IF EXISTS IX_CPCTU_CONTRACT_NUMBER ON #CONTRACT_PRODUCT_CONF_TO_UPDATE;
DROP TABLE IF EXISTS #CONTRACT_PRODUCT_CONF_TO_UPDATE

SELECT
	c.CONTRACT_NUMBER,
	pa.CODE_NAME,
	c.BODY,
	c.COMMON_BODY,
	c.SNAPSHOT_BODY,
	CASE
        WHEN ps.PRODUCT_CODE IS NOT NULL
            THEN ps.PRODUCT_CODE
            ELSE qs.PRODUCT_CODE
    END as PRODUCT_CODE,
	CASE
        WHEN ps.ISSUE_DATE IS NOT NULL
            THEN ps.ISSUE_DATE
            ELSE qs.ISSUE_DATE
    END as ISSUE_DATE
INTO #CONTRACT_PRODUCT_CONF_TO_UPDATE
FROM PAS.CONTRACT c
LEFT JOIN PAS_IMPL.CONTRACT_BODY_PRODUCT_CONF_UPDATE_INFO cbui ON cbui.CONTRACT_NUMBER = c.CONTRACT_NUMBER
LEFT JOIN PAS_IMPL.QUOTE_HUB qh ON qh.CONTRACT_NUMBER = c.CONTRACT_NUMBER
LEFT JOIN PAS_IMPL.QUOTE_SAT_LATEST qs ON qs.QUOTE_HKEY = qh.QUOTE_HKEY
LEFT JOIN PAS_IMPL.POLICY_HUB ph ON ph.CONTRACT_NUMBER = c.CONTRACT_NUMBER
LEFT JOIN PAS_IMPL.POLICY_SAT_LATEST ps ON ps.POLICY_HKEY = ph.POLICY_HKEY
LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = c.PUBLISHED_ARTIFACT_ID
WHERE cbui.IS_UPDATED IS NULL
AND ((pa.CODE_NAME LIKE N'%Quote' OR pa.CODE_NAME LIKE N'%Policy') AND pa.CODE_NAME NOT LIKE N'%CollectiveLifeInsurancePolicy')
--AND c.CONTRACT_NUMBER = N'CONTRACT_NUMBER'

CREATE INDEX IX_CPCTU_CONTRACT_NUMBER ON #CONTRACT_PRODUCT_CONF_TO_UPDATE(CONTRACT_NUMBER);

DECLARE @productConfiguration NVARCHAR(MAX)
DECLARE @contractNumber NVARCHAR(255)
DECLARE @codeName NVARCHAR(255)
DECLARE @productCode NVARCHAR(255)
DECLARE @issueDate NVARCHAR(255)
DECLARE @dontNeedUpdate int;

DECLARE cur CURSOR FORWARD_ONLY FOR
SELECT cpctu.CONTRACT_NUMBER, cpctu.PRODUCT_CODE, cpctu.ISSUE_DATE, cpctu.CODE_NAME
FROM #CONTRACT_PRODUCT_CONF_TO_UPDATE cpctu

OPEN cur
FETCH NEXT FROM cur INTO @contractNumber, @productCode, @issueDate, @codeName
WHILE @@fetch_status = 0

BEGIN

	SET @dontNeedUpdate = (
			SELECT
				CASE
					WHEN JSON_QUERY(c.BODY, '$.productConfiguration') IS NOT NULL
					AND JSON_QUERY(c.COMMON_BODY, '$.attributes.productConfigurationData') IS NOT NULL
					AND JSON_QUERY(c.SNAPSHOT_BODY, '$.productConfiguration') IS NOT NULL
						THEN 0
						ELSE 1
					END PRODUCT_CONF_EXIST
			FROM #CONTRACT_PRODUCT_CONF_TO_UPDATE c
			WHERE c.contract_number = @contractNumber)

	IF (@dontNeedUpdate = 0)

	BEGIN
		INSERT INTO PAS_IMPL.CONTRACT_BODY_PRODUCT_CONF_UPDATE_INFO (CONTRACT_NUMBER, CODE_NAME, PRODUCT_CODE, ISSUE_DATE, IS_UPDATED, INFO, DATE)
			SELECT
				@contractNumber,
				@codeName,
				@productCode,
				@issueDate,
				0,
				'DONT_NEED_UPDATE',
				GETDATE()

	END

	ELSE

	BEGIN
		BEGIN TRY
			BEGIN TRAN

				SET @productConfiguration = (
					SELECT
						EXCEL_ROW_NUMBER AS excelRowNumber,
						PRODUCT_CODE AS productCode,
						ISSUE_DATE_FROM AS issueDateFrom,
						ISSUE_DATE_TO AS issueDateTo,
						ISSUE_DATE_STR AS issueDateStr,
						PRODUCT_DESCRIPTION AS productDescription,
						PRODUCT_GROUP_CODE AS productGroupCode,
						JSON_QUERY(PAYMENT_FREQUENCY) AS paymentFrequency,
						JSON_QUERY(INSURANCE_TERMS) AS insuranceTerms,
						JSON_QUERY(INSURANCE_TERMS_MONTHS) AS insuranceTermsMonths,
						IS_WHOLE_LIFE AS isWholeLife,
						INSURED_IS_POLICY_HOLDER AS insuredIsPolicyHolder,
						HOLDER_AGE_ON_START_DATE_MIN AS holderAgeOnStartDateMin,
						HOLDER_AGE_ON_START_DATE_MAX AS holderAgeOnStartDateMax,
						HOLDER_AGE_ON_START_DATE_MAX_MA AS holderAgeOnStartDateMaxMandatoryAgreement,
						HOLDER_AGE_ON_END_DATE_MAX AS holderAgeOnEndDateMax,
						INSURED_AGE_ON_START_DATE_MIN AS insuredAgeOnStartDateMin,
						JSON_QUERY(INSURED_AGE_ON_START_DATE_MAX) AS insuredAgeOnStartDateMax,
						INSURED_AGE_ON_START_DATE_MA AS insuredAgeOnStartDateMandatoryAgreement,
						JSON_QUERY(INSURED_AGE_ON_END_DATE_MAX) AS insuredAgeOnEndDateMax,
						JSON_QUERY(INSURED_AGE_ON_END_DATE_MAX_MA) AS insuredAgeOnEndDateMaxMandatoryAgreement,
						JSON_QUERY(STRATEGY) AS strategy,
						JSON_QUERY(ADDITIONAL_SERVICES) AS additionalServices,
						JSON_QUERY(GIFT_SERVICES) AS giftServices,
						GIFT_SERVICES_PREMIUM AS giftServicesPremium,
						PREFIX_OLD AS prefixOld,
						JSON_QUERY(PREFIX) AS prefix,
						JSON_QUERY(PREFIX_BY_STRATEGY_OLD) AS prefixByStrategyOld,
						JSON_QUERY(PREFIX_BY_STRATEGY) AS prefixByStrategy,
						JSON_QUERY(FIXED_PREMIUMS) AS fixedPremiums,
						JSON_QUERY(FIXED_INSURED_SUMS) AS fixedInsuredSums,
						SET_FIRST_FIXED_INSURED_SUM AS setFirstFixedInsuredSum,
						DISABLE_RISK_INSURED_SUM AS disableRiskInsuredSum,
						ALLOW_CALC_FROM_PREMIUM AS allowCalcFromPremium,
						ALLOW_CALC_FROM_INSURED_SUM AS allowCalcFromInsuredSum,
						CAN_HAVE_ADDITIONAL_RISKS AS canHaveAdditionalRisks,
						JSON_QUERY(MIN_RISK_INSURED_SUM) AS minRiskInsuredSum,
						JSON_QUERY(MAX_RISK_INSURED_SUM) AS maxRiskInsuredSum,
						JSON_QUERY(MIN_PREMIUM) AS minPremium,
						JSON_QUERY(MAX_PREMIUM) AS maxPremium,
						JSON_QUERY(MAX_PREMIUM_MA) AS maxPremiumMandatoryAgreement,
						MAX_INSURED_SUM_MAIN_RISK AS maxInsuredSumMainRisk,
						MAX_INSURED_SUM_MAIN_RISK_MA AS maxInsuredSumMainRiskMandatoryAgreement,
						IS_PAID_UP_AVAILABLE AS isPaidUpAvailable,
						RULE_CODE AS ruleCode,
						JSON_QUERY(DAYS_BETWEEN_ISSUE_AND_START) AS daysBetweenIssueAndStart,
						PAY_PERIOD_DAYS AS payPeriodDays,
						GRACE_PERIOD_DAYS AS gracePeriodDays,
						COOL_OFF_PERIOD_DAYS AS coolOffPeriodDays,
						PARTNER_BUSINESS_CODE AS partnerBusinessCode,
						JSON_QUERY(RISK_PACKAGES) AS riskPackages,
						USE_THREE_PAYMENTS AS useThreePayments,
						ACTIVE_FROM AS activeFrom,
						ACTIVE_TO AS activeTo,
						JSON_QUERY(PAPER_TYPES) AS paperTypes,
						APPLICATION_PRINTOUT AS applicationPrintout,
						POLICY_PRINTOUT AS policyPrintout,
						JSON_QUERY(CASH_BACK_COEFFICIENT) AS cashBackCoeff,
						SHOW_FIN_KNOW_QUEST AS showFinKnowledgeQuestionnaire,
						IS_REINVEST_AVAILABLE AS isReinvestAvailable,
						IS_REINVEST_FIELDS_AVAILABLE AS isReinvestFieldsAvailable,
						INVOICE_ON_ACTIVATION_IF_REINVEST AS invoiceOnActivationIfReinvest,
						JSON_QUERY(DAYS_BETWEEN_ISSUE_AND_START_REINVEST) AS daysBetweenIssueAndStartReinvest,
						PAY_PERIOD_DAYS_REINVEST AS payPeriodDaysReinvest,
						JSON_QUERY(CREDIT_PROGRAMS) AS creditPrograms,
						JSON_QUERY(AVAILABLE_CURRENCIES) AS availableCurrencies,
						IS_MIGRATED AS isMigrated,
						JSON_QUERY(GUARANTEED_INCOME) AS guaranteedIncome,
						JSON_QUERY(AVAILABLE_PAYMENT_FREQUENCY) AS availablePaymentFrequency,
						POLICY_HOLDER_TYPE AS policyHolderType,
						CARD_TYPE AS cardType,
						CUMULATION_PRODUCT_GROUP AS cumulationProductGroup,
						DID_TYPE AS didType,
						IS_PRODUCT_LINKED_TO_ASSET AS isProductLinkedToAsset,
						INSURANCE_TERMS_DAYS AS insuranceTermsDays,
                        NUM_OF_WORKING_DAYS_TO_INVEST AS numOfWorkDaysToInvest,
                        MF AS mf,
						IMPORT_DOCUMENT_ID AS importDocumentId,
						CONF_VERSION AS version,
						LOADED_BY AS loadedBy,
						LOAD_DATE AS loadDate
					FROM BFX_IMPL.PRODUCT_CONF
					WHERE PRODUCT_CODE = @productCode AND @issueDate >= ISSUE_DATE_FROM AND @issueDate <= ISSUE_DATE_TO
					AND CONF_VERSION = (SELECT MAX(CONF_VERSION) MAX_VERSION FROM BFX_IMPL.PRODUCT_CONF)
					FOR JSON AUTO, WITHOUT_ARRAY_WRAPPER
				);

				IF (@productConfiguration IS NULL)

				BEGIN
					INSERT INTO PAS_IMPL.CONTRACT_BODY_PRODUCT_CONF_UPDATE_INFO (CONTRACT_NUMBER, CODE_NAME, PRODUCT_CODE, ISSUE_DATE, IS_UPDATED, INFO, DATE)
						SELECT
							@contractNumber,
							@codeName,
							@productCode,
							@issueDate,
							0,
							'CONFIG_NOT_FOUND',
							GETDATE()

				END

				ELSE

				BEGIN
					UPDATE PAS.CONTRACT
					SET BODY = JSON_MODIFY(BODY, '$.productConfiguration', JSON_QUERY(@productConfiguration)),
						SNAPSHOT_BODY = JSON_MODIFY(SNAPSHOT_BODY, '$.productConfiguration', JSON_QUERY(@productConfiguration)),
						COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.attributes.productConfigurationData', JSON_QUERY(@productConfiguration))
					WHERE CONTRACT_NUMBER = @contractNumber

					INSERT INTO PAS_IMPL.CONTRACT_BODY_PRODUCT_CONF_UPDATE_INFO (CONTRACT_NUMBER, CODE_NAME, PRODUCT_CODE, ISSUE_DATE, IS_UPDATED, INFO, DATE)
						SELECT
							@contractNumber,
							@codeName,
							@productCode,
							@issueDate,
							1,
							NULL,
							GETDATE()
				END

			COMMIT TRAN
		END TRY

		BEGIN CATCH
        ROLLBACK TRAN
        PRINT @contractNumber
        DECLARE @ErrorMessage NVARCHAR(4000); DECLARE @ErrorSeverity INT; DECLARE @ErrorState INT;
        SELECT @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = 1;

        UPDATE PAS_IMPL.CONTRACT_BODY_PRODUCT_CONF_UPDATE_INFO
        SET INFO = CONCAT('ErrorMessage:',@ErrorMessage, ' ErrorSeverity:', @ErrorSeverity, '. ErrorState:', @ErrorState, '.'),
			IS_UPDATED = NULL
        WHERE CONTRACT_NUMBER = @contractNumber

        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
		END CATCH;
	END

	FETCH NEXT FROM cur INTO @contractNumber, @productCode, @issueDate, @codeName

END
CLOSE cur
DEALLOCATE cur

DROP INDEX IF EXISTS IX_CPCTU_CONTRACT_NUMBER ON #CONTRACT_PRODUCT_CONF_TO_UPDATE;
DROP TABLE IF EXISTS #CONTRACT_PRODUCT_CONF_TO_UPDATE