-- CREATE TABLE UL_HISTORICAL_PROFITABILITY
CREATE TABLE [PAS_IMPL].[UL_HISTORICAL_PROFITABILITY]
(
	[HISTORICAL_PROFITABILITY_ID] [UNIQUEIDENTIFIER],
	[PERIOD_BEGIN_DATE] [DATE],
	[PERIOD_END_DATE] [DATE],
	[PRODUCT_TYPE] [NVARCHAR](255),
	[TERM] [INT],
	[CURRENCY] [NVARCHAR](255),
	[INSTALLMENT_TYPE] [NVARCHAR](255),
	[PAYMENT_TYPE] [NVARCHAR](255),
	[PROFITABILITY] [DECIMAL](15,6),
	[PROFITABILITY_TEXT] [NVARCHAR](MAX),
	[UPDATED_DATE] [DATE],
	[ASSET_TYPE] [NVARCHAR](255),
	CONSTRAINT [PK_HISTORICAL_PROFITABILIT]
PRIMARY KEY CLUSTERED ([HISTORICAL_PROFITABILITY_ID] ASC)
)
GO

-- CREATE HISTORY TABLE
CREATE TABLE [PAS_IMPL].[UL_HISTORICAL_PROFITABILITY_HISTORY]
(
	[HISTORICAL_PROFITABILITY_HISTORY_ID] [UNIQUEIDENTIFIER],
	[HISTORICAL_PROFITABILITY_ID] [UNIQUEIDENTIFIER],
	[PERIOD_BEGIN_DATE] [DATE],
	[PERIOD_END_DATE] [DATE],
	[PRODUCT_TYPE] [NVARCHAR](255),
	[TERM] [INT],
	[CURRENCY] [NVARCHAR](255),
	[INSTALLMENT_TYPE] [NVARCHAR](255),
	[PAYMENT_TYPE] [NVARCHAR](255),
	[PROFITABILITY] [DECIMAL](15,6),
	[PROFITABILITY_TEXT] [NVARCHAR](MAX),
	[UPDATED_DATE] [DATE],
	[ASSET_TYPE] [NVARCHAR](255),
	[OPERATION] [NVARCHAR](1),
	CONSTRAINT [PK_HISTORICAL_PROFITABILIT_HISTORY]
PRIMARY KEY CLUSTERED ([HISTORICAL_PROFITABILITY_HISTORY_ID] ASC)
)
GO

-- CREATE TRIGGER
CREATE TRIGGER [PAS_IMPL].[UL_HISTORICAL_PROFITABILITY_HISTORY_TRIGGER]
ON [PAS_IMPL].[UL_HISTORICAL_PROFITABILITY]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
	DECLARE @operation NVARCHAR(1)
	IF EXISTS(SELECT *
	FROM inserted)
	  IF EXISTS(SELECT *
	FROM deleted)
	    SELECT @operation = 'U'
	ELSE
	    SELECT @operation = 'I'
	ELSE
		IF EXISTS(SELECT *
	FROM deleted)
    SELECT @operation = 'D'

	DECLARE @historicalProfitabilityId UNIQUEIDENTIFIER;
	DECLARE @code NVARCHAR(255);
	DECLARE @periodBeginDate DATE;
	DECLARE @periodEndDate DATE;
	DECLARE @productType NVARCHAR(255);
	DECLARE @term NVARCHAR(255);
	DECLARE @currency NVARCHAR(255);
	DECLARE @installmentType NVARCHAR(255);
	DECLARE @paymentType NVARCHAR(255);
	DECLARE @profitability NVARCHAR(255);
	DECLARE @profitabilityText NVARCHAR(MAX);
	DECLARE @updatedDate DATE;
	DECLARE @assetType NVARCHAR(255);

	IF @operation != 'D'

	SELECT @historicalProfitabilityId = HISTORICAL_PROFITABILITY_ID, @periodBeginDate = PERIOD_BEGIN_DATE, @periodEndDate = PERIOD_END_DATE, @productType = PRODUCT_TYPE, @term = TERM,
		 @currency = CURRENCY, @installmentType = INSTALLMENT_TYPE, @paymentType = PAYMENT_TYPE, @profitability = PROFITABILITY, @profitabilityText = PROFITABILITY_TEXT, @updatedDate = UPDATED_DATE, @assetType = ASSET_TYPE
	FROM inserted
	ELSE
	SELECT @historicalProfitabilityId = HISTORICAL_PROFITABILITY_ID, @periodBeginDate = PERIOD_BEGIN_DATE, @periodEndDate = PERIOD_END_DATE, @productType = PRODUCT_TYPE, @term = TERM,
		 @currency = CURRENCY, @installmentType = INSTALLMENT_TYPE, @paymentType = PAYMENT_TYPE, @profitability = PROFITABILITY, @profitabilityText = PROFITABILITY_TEXT, @updatedDate = UPDATED_DATE, @assetType = ASSET_TYPE
	FROM deleted

	INSERT INTO PAS_IMPL.UL_HISTORICAL_PROFITABILITY_HISTORY
		(HISTORICAL_PROFITABILITY_HISTORY_ID, HISTORICAL_PROFITABILITY_ID, PERIOD_BEGIN_DATE, PERIOD_END_DATE, PRODUCT_TYPE, TERM, CURRENCY, INSTALLMENT_TYPE, PAYMENT_TYPE, PROFITABILITY, PROFITABILITY_TEXT, UPDATED_DATE, ASSET_TYPE, OPERATION)
	VALUES
		(NEWID(), @historicalProfitabilityId, @periodBeginDate, @periodEndDate, @productType, @term, @currency, @installmentType, @paymentType, @profitability, @profitabilityText, @updatedDate, @assetType, @operation)
END

SET QUOTED_IDENTIFIER ON
GO

-- CREATE VIEW
CREATE VIEW [PAS_IMPL].[UL_HISTORICAL_PROFITABILITY_VIEW]
AS
	SELECT
		[HISTORICAL_PROFITABILITY_ID] AS HISTORICAL_PROFITABILITY_ID,
		[PERIOD_BEGIN_DATE] AS PERIOD_BEGIN_DATE,
		[PERIOD_END_DATE] AS PERIOD_END_DATE,
		[PRODUCT_TYPE] AS PRODUCT_TYPE,
		[TERM] AS TERM,
		[CURRENCY] AS CURRENCY,
		[INSTALLMENT_TYPE] AS INSTALLMENT_TYPE,
		[PAYMENT_TYPE] AS PAYMENT_TYPE,
		[PROFITABILITY] AS PROFITABILITY,
		[PROFITABILITY_TEXT] AS PROFITABILITY_TEXT,
		[UPDATED_DATE] AS UPDATED_DATE,
		[ASSET_TYPE] AS ASSET_TYPE
	FROM [PAS_IMPL].[UL_HISTORICAL_PROFITABILITY]
GO