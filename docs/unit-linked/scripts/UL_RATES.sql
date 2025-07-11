-- CREATE TABLE UL_RATES
CREATE TABLE [PAS_IMPL].[UL_RATES]
(
	[RATE_ID] [UNIQUEIDENTIFIER],
	[RATE_TYPE] [NVARCHAR](255),
	[BEGIN_DATE] [DATE],
	[END_DATE] [DATE],
	[CURRENCY] [NVARCHAR](255),
	[TERM] [INT],
	[RATE_VALUE] [DECIMAL](15,6)
		CONSTRAINT [PK_UL_RATES]
PRIMARY KEY CLUSTERED ([RATE_ID] ASC)
)
GO

-- CREATE HISTORY TABLE
CREATE TABLE [PAS_IMPL].[UL_RATES_HISTORY]
(
	[RATE_HISTORY_ID] [UNIQUEIDENTIFIER],
	[RATE_ID] [UNIQUEIDENTIFIER],
	[RATE_TYPE] [NVARCHAR](255),
	[BEGIN_DATE] [DATE],
	[END_DATE] [DATE],
	[CURRENCY] [NVARCHAR](255),
	[TERM] [INT],
	[RATE_VALUE] [DECIMAL](15,6),
	[OPERATION] [NVARCHAR](1),
	CONSTRAINT [PK_UL_RATES_HISTORY]
PRIMARY KEY CLUSTERED ([RATE_HISTORY_ID] ASC)
)
GO

-- CREATE TRIGGER
CREATE TRIGGER [PAS_IMPL].[UL_RATES_HISTORY_TRIGGER]
ON [PAS_IMPL].[UL_RATES]
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

	DECLARE @rateId UNIQUEIDENTIFIER;
	DECLARE @rateType NVARCHAR(255);
	DECLARE @beginDate DATE;
	DECLARE @endDate DATE;
	DECLARE @currency NVARCHAR(255);
	DECLARE @term INT;
	DECLARE @rate DECIMAL(15,6);

	IF @operation != 'D'
		SELECT @rateId = RATE_ID, @rateType = RATE_TYPE, @beginDate = BEGIN_DATE, @endDate = END_DATE, @currency = CURRENCY, @term = TERM, @rate = RATE_VALUE
	FROM inserted
	ELSE 
		SELECT @rateId = RATE_ID, @rateType = RATE_TYPE, @beginDate = BEGIN_DATE, @endDate = END_DATE, @currency = CURRENCY, @term = TERM, @rate = RATE_VALUE
	FROM deleted

	INSERT INTO PAS_IMPL.UL_RATES_HISTORY
		(RATE_HISTORY_ID, RATE_ID, RATE_TYPE, BEGIN_DATE, END_DATE, CURRENCY, TERM, RATE_VALUE, OPERATION)
	VALUES
		(NEWID(), @rateId, @rateType, @beginDate, @endDate, @currency, @term, @rate, @operation)
END

SET QUOTED_IDENTIFIER ON
GO

-- CREATE VIEW
CREATE VIEW [PAS_IMPL].[UL_RATES_VIEW]
AS
	SELECT
		[RATE_ID] AS ID,
		[RATE_TYPE] AS RATE_TYPE,
		[BEGIN_DATE] AS BEGIN_DATE,
		[END_DATE] AS END_DATE,
		[CURRENCY] AS CURRENCY,
		[TERM] AS TERM,
		[RATE_VALUE] AS RATE_VALUE
	FROM [PAS_IMPL].[UL_RATES]
GO