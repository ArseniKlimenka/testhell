IF NOT EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[CONTRACT_BODY_STRATEGY_INSTR_UPDATE_INFO]') AND TYPE IN (N'U'))
BEGIN
	CREATE TABLE PAS_IMPL.CONTRACT_BODY_STRATEGY_INSTR_UPDATE_INFO
	(
		[ID] [int] IDENTITY(1,1) PRIMARY KEY,
		[CONTRACT_NUMBER] [nvarchar](64) NOT NULL,
		[PRODUCT_CODE] [nvarchar](255) NULL,
		[ISSUE_DATE] [nvarchar](255) NULL,
		[STRATEGY_CODE] [nvarchar](255) NULL,
		[IS_UPDATED] [bit] NOT NULL,
		[INFO] [nvarchar](MAX) NULL,
		[DATE] datetime NOT NULL
	)

	CREATE INDEX IX_CONTRACT_BODY_STRATEGY_INSTR_UPDATE_INFO_CONTRACT_NUMBER
	ON PAS_IMPL.CONTRACT_BODY_STRATEGY_INSTR_UPDATE_INFO
	(CONTRACT_NUMBER)
END

DROP INDEX IF EXISTS IX_CSITU_CONTRACT_NUMBER ON #CONTRACT_STRATEGY_INSTR_TO_UPDATE;
DROP TABLE IF EXISTS #CONTRACT_STRATEGY_INSTR_TO_UPDATE

SELECT
	c.CONTRACT_NUMBER,
	c.BODY,
	CASE
        WHEN ps.PRODUCT_CODE IS NOT NULL
            THEN ps.PRODUCT_CODE
            ELSE qs.PRODUCT_CODE
    END as PRODUCT_CODE,
	CASE
        WHEN ps.ISSUE_DATE IS NOT NULL
            THEN ps.ISSUE_DATE
            ELSE qs.ISSUE_DATE
    END as ISSUE_DATE,
	JSON_VALUE(c.BODY, '$.basicInvestmentParameters.investmentStrategy.investmentStrategyCode') as STRATEGY_CODE
INTO #CONTRACT_STRATEGY_INSTR_TO_UPDATE
FROM PAS.CONTRACT c
LEFT JOIN PAS_IMPL.CONTRACT_BODY_STRATEGY_INSTR_UPDATE_INFO cbui ON cbui.CONTRACT_NUMBER = c.CONTRACT_NUMBER
LEFT JOIN PAS_IMPL.QUOTE_HUB qh ON qh.CONTRACT_NUMBER = c.CONTRACT_NUMBER
LEFT JOIN PAS_IMPL.QUOTE_SAT_LATEST qs ON qs.QUOTE_HKEY = qh.QUOTE_HKEY
LEFT JOIN PAS_IMPL.POLICY_HUB ph ON ph.CONTRACT_NUMBER = c.CONTRACT_NUMBER
LEFT JOIN PAS_IMPL.POLICY_SAT_LATEST ps ON ps.POLICY_HKEY = ph.POLICY_HKEY
LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = c.PUBLISHED_ARTIFACT_ID
WHERE cbui.IS_UPDATED IS NULL
AND (pa.CODE_NAME NOT LIKE N'%Cancellation' AND pa.CODE_NAME NOT LIKE N'%PortfolioMovement%' AND pa.CODE_NAME NOT LIKE N'%Reactivation%')
AND (
qs.PRODUCT_CODE IN ('IDC3', 'IDC5', 'IDC', 'IDCP3', 'IDCP5', 'IDCP', 'IDC3', 'ISO', 'IBI3', 'IBIP3', 'IBI5', 'IBIP5', 'IBI3OAS',
'IBI5OAS', 'IBI10', 'IBIP10', 'DEMOINV', 'IBI3AKCEPT', 'IBI5AKCEPT', 'IBI3BFKO', 'IBI5BFKO', 'IBI2ZENIT', 'IBI3ZENIT', 'IBI5ZENIT',
'IBA3', 'IBA5', 'IBA3BFKO', 'IBA5BFKO', 'IBAP3', 'IBAP5', 'EBMIBFKO', 'IBA3SMP', 'IBA3REINVEST', 'IBA5SMP', 'IBA5REINVEST',
'NOTEV3BFKO', 'NOTE3BFKO', 'NOTE1BFKO', 'NOTE1BFKO3', 'IBI3BFKO17', 'IBI3ZENIT17', 'IBI5BFKO17', 'IBI5ZENIT17',
'NOTE1BFKO4', 'NOTEV1BFKO', 'IBAP3VTB', 'IBAV3VTB', 'IBA2P3', 'IBAP5VTB', 'IBAV5VTB', 'IBAKVP5VTB',
'IBAKVV5VTB', 'IBA2P3VTB', 'IBA2V3VTB', 'IBA2P5VTB', 'IBA2V5VTB')
OR ps.PRODUCT_CODE IN ('IDC3', 'IDC5', 'IDC', 'IDCP3', 'IDCP5', 'IDCP', 'IDC3', 'ISO', 'IBI3', 'IBIP3', 'IBI5', 'IBIP5', 'IBI3OAS',
'IBI5OAS', 'IBI10', 'IBIP10', 'DEMOINV', 'IBI3AKCEPT', 'IBI5AKCEPT', 'IBI3BFKO', 'IBI5BFKO', 'IBI2ZENIT', 'IBI3ZENIT', 'IBI5ZENIT',
'IBA3', 'IBA5', 'IBA3BFKO', 'IBA5BFKO', 'IBAP3', 'IBAP5', 'EBMIBFKO', 'IBA3SMP', 'IBA3REINVEST', 'IBA5SMP', 'IBA5REINVEST',
'NOTEV3BFKO', 'NOTE3BFKO', 'NOTE1BFKO', 'NOTE1BFKO3', 'IBI3BFKO17', 'IBI3ZENIT17', 'IBI5BFKO17', 'IBI5ZENIT17',
'NOTE1BFKO4', 'NOTEV1BFKO', 'IBAP3VTB', 'IBAV3VTB', 'IBA2P3', 'IBAP5VTB', 'IBAV5VTB', 'IBAKVP5VTB',
'IBAKVV5VTB', 'IBA2P3VTB', 'IBA2V3VTB', 'IBA2P5VTB', 'IBA2V5VTB')
)
--AND c.CONTRACT_NUMBER = N'CONTRACT_NUMBER'

CREATE INDEX IX_CSITU_CONTRACT_NUMBER ON #CONTRACT_STRATEGY_INSTR_TO_UPDATE(CONTRACT_NUMBER);

DECLARE @strategyInstruments NVARCHAR(MAX)
DECLARE @contractNumber NVARCHAR(255)
DECLARE @productCode NVARCHAR(255)
DECLARE @issueDate NVARCHAR(255)
DECLARE @strategyCode NVARCHAR(255)
DECLARE @dontNeedUpdate int;

DECLARE cur CURSOR FORWARD_ONLY FOR
SELECT csitu.CONTRACT_NUMBER, csitu.PRODUCT_CODE, csitu.ISSUE_DATE, csitu.STRATEGY_CODE
FROM #CONTRACT_STRATEGY_INSTR_TO_UPDATE csitu

OPEN cur
FETCH NEXT FROM cur INTO @contractNumber, @productCode, @issueDate, @strategyCode
WHILE @@fetch_status = 0

BEGIN

	SET @dontNeedUpdate = (
			SELECT CASE WHEN JSON_QUERY(c.body, '$.strategyInstruments') IS NOT NULL THEN 0 ELSE 1 END PRODUCT_CONF_EXIST FROM #CONTRACT_STRATEGY_INSTR_TO_UPDATE c
			WHERE c.contract_number = @contractNumber)

	IF (@dontNeedUpdate = 0)

	BEGIN
		INSERT INTO PAS_IMPL.CONTRACT_BODY_STRATEGY_INSTR_UPDATE_INFO (CONTRACT_NUMBER, PRODUCT_CODE, ISSUE_DATE, STRATEGY_CODE, IS_UPDATED, INFO, DATE)
			SELECT
				@contractNumber,
				@productCode,
				@issueDate,
				@strategyCode,
				0,
				'DONT_NEED_UPDATE',
				GETDATE()

	END

	ELSE

	BEGIN
		BEGIN TRY
			BEGIN TRAN

				SET @strategyInstruments = (
					SELECT
						EXCEL_ROW_NUMBER AS excelRowNumber,
						PRODUCT_CODE AS productCode,
						ISSUE_DATE_FROM AS issueDateFrom,
						ISSUE_DATE_TO AS issueDateTo,
						ISSUE_DATE_STR AS issueDateStr,
						STRATEGY_CODE AS strategyCode,
						PRODUCT_DESCRIPTION AS productDescription,
						STRATEGY_DESCRIPTION_FULL AS strategyDescriptionFull,
						PURCHASE_DATE AS purchaseDate,
						DISCHARGE_DATE AS dischargeDate,
						DID_BEGIN_DATE AS didBeginDate,
						DID_END_DATE AS didEndDate,
						JSON_QUERY(COUPON_PERIODS) AS couponPeriods,
						WINDOW_START_DATE AS windowStartDate,
						WINDOW_END_DATE AS windowEndDate,
						IMPORT_DOCUMENT_ID AS importDocumentId,
						CONF_VERSION AS version,
						LOADED_BY AS loadedBy,
						LOAD_DATE AS loadDate
					FROM BFX_IMPL.STRATEGY_INSTRUMENTS
					WHERE PRODUCT_CODE = @productCode AND (@issueDate >= ISSUE_DATE_FROM AND @issueDate <= ISSUE_DATE_TO) AND STRATEGY_CODE = @strategyCode
					AND CONF_VERSION = (SELECT MAX(CONF_VERSION) MAX_VERSION FROM BFX_IMPL.STRATEGY_INSTRUMENTS)
					FOR JSON AUTO, WITHOUT_ARRAY_WRAPPER
				);

				UPDATE PAS.CONTRACT
				SET BODY = JSON_MODIFY(
								JSON_MODIFY(
									JSON_MODIFY(
										JSON_MODIFY(
											JSON_MODIFY(
												JSON_MODIFY(
													JSON_MODIFY(body, '$.basicInvestmentParameters.windowEndDate', JSON_VALUE(@strategyInstruments, '$.windowEndDate')),
													'$.basicInvestmentParameters.windowStartDate',
													JSON_VALUE(@strategyInstruments, '$.windowStartDate')),
												'$.basicInvestmentParameters.couponPeriods',
												JSON_QUERY(@strategyInstruments, '$.couponPeriods')),
											'$.basicInvestmentParameters.didEndDate',
											JSON_VALUE(@strategyInstruments, '$.didEndDate')),
										'$.basicInvestmentParameters.didBeginDate',
										JSON_VALUE(@strategyInstruments, '$.didBeginDate')),
									'$.basicInvestmentParameters.dischargeDate',
									JSON_VALUE(@strategyInstruments, '$.dischargeDate')),
								'$.basicInvestmentParameters.purchaseDate',
								JSON_VALUE(@strategyInstruments, '$.purchaseDate')
							),
						SNAPSHOT_BODY = JSON_MODIFY(
								JSON_MODIFY(
									JSON_MODIFY(
										JSON_MODIFY(
											JSON_MODIFY(
												JSON_MODIFY(
													JSON_MODIFY(SNAPSHOT_BODY, '$.basicInvestmentParameters.windowEndDate', JSON_VALUE(@strategyInstruments, '$.windowEndDate')),
													'$.basicInvestmentParameters.windowStartDate',
													JSON_VALUE(@strategyInstruments, '$.windowStartDate')),
												'$.basicInvestmentParameters.couponPeriods',
												JSON_QUERY(@strategyInstruments, '$.couponPeriods')),
											'$.basicInvestmentParameters.didEndDate',
											JSON_VALUE(@strategyInstruments, '$.didEndDate')),
										'$.basicInvestmentParameters.didBeginDate',
										JSON_VALUE(@strategyInstruments, '$.didBeginDate')),
									'$.basicInvestmentParameters.dischargeDate',
									JSON_VALUE(@strategyInstruments, '$.dischargeDate')),
								'$.basicInvestmentParameters.purchaseDate',
								JSON_VALUE(@strategyInstruments, '$.purchaseDate')
							)
				WHERE CONTRACT_NUMBER = @contractNumber

				INSERT INTO PAS_IMPL.CONTRACT_BODY_STRATEGY_INSTR_UPDATE_INFO (CONTRACT_NUMBER, PRODUCT_CODE, ISSUE_DATE, STRATEGY_CODE, IS_UPDATED, INFO, DATE)
					SELECT
						@contractNumber,
						@productCode,
						@issueDate,
						@strategyCode,
						1,
						NULL,
						GETDATE()

			COMMIT TRAN
		END TRY

		BEGIN CATCH
        ROLLBACK TRAN
        PRINT @contractNumber
        DECLARE @ErrorMessage NVARCHAR(4000); DECLARE @ErrorSeverity INT; DECLARE @ErrorState INT;
        SELECT @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = 1;

        UPDATE PAS_IMPL.CONTRACT_BODY_STRATEGY_INSTR_UPDATE_INFO
        SET INFO = CONCAT('ErrorMessage:',@ErrorMessage, ' ErrorSeverity:', @ErrorSeverity, '. ErrorState:', @ErrorState, '.'),
			IS_UPDATED = NULL
        WHERE CONTRACT_NUMBER = @contractNumber

        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
		END CATCH;
	END

	FETCH NEXT FROM cur INTO @contractNumber, @productCode, @issueDate, @strategyCode

END
CLOSE cur
DEALLOCATE cur

DROP INDEX IF EXISTS IX_CSITU_CONTRACT_NUMBER ON #CONTRACT_STRATEGY_INSTR_TO_UPDATE;
DROP TABLE IF EXISTS #CONTRACT_STRATEGY_INSTR_TO_UPDATE