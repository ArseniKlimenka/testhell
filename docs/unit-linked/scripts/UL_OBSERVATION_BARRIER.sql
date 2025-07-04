-- CREATE TABLE UL_OBSERVATION_BARRIER
CREATE TABLE [PAS_IMPL].[UL_OBSERVATION_BARRIER]
(
	[OBSERVATION_BARRIER_ID] [UNIQUEIDENTIFIER],
	[CHECK_NUMBER] [INT],
	[BARRIER_NAME] [NVARCHAR](255),
	[BARRIER_VALUE_PERS] [DECIMAL](15,6),
	[PIP_COUPON] [NVARCHAR](255),
	CONSTRAINT [PK_UL_OBSERVATION_BARRIER]
PRIMARY KEY CLUSTERED ([OBSERVATION_BARRIER_ID] ASC)
)
GO

-- CREATE HISTORY TABLE
CREATE TABLE [PAS_IMPL].[UL_OBSERVATION_BARRIER_HISTORY]
(
	[OBSERVATION_BARRIER_HISTORY_ID] [UNIQUEIDENTIFIER],
	[OBSERVATION_BARRIER_ID] [UNIQUEIDENTIFIER],
	[CHECK_NUMBER] [INT],
	[BARRIER_NAME] [NVARCHAR](255),
	[BARRIER_VALUE_PERS] [DECIMAL](15,6),
	[PIP_COUPON] [NVARCHAR](255),
	[OPERATION] [NVARCHAR](1),
	CONSTRAINT [PK_UL_OBSERVATION_BARRIER_HISTORY]
PRIMARY KEY CLUSTERED ([OBSERVATION_BARRIER_HISTORY_ID] ASC)
)
GO

-- CREATE TRIGGER
CREATE TRIGGER [PAS_IMPL].[UL_OBSERVATION_BARRIER_HISTORY_TRIGGER]
ON [PAS_IMPL].[UL_OBSERVATION_BARRIER]
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

	DECLARE @observationBarrierId UNIQUEIDENTIFIER;
	DECLARE @checkNumber  INT;
	DECLARE @barrierName  NVARCHAR(255);
	DECLARE @barrierValuePers  DECIMAL(15,6);
	DECLARE @pipCoupon  NVARCHAR(255);
	
	IF @operation != 'D'
	
		SELECT @observationBarrierId = OBSERVATION_BARRIER_ID, @checkNumber = CHECK_NUMBER, @barrierName = BARRIER_NAME, @barrierValuePers = BARRIER_VALUE_PERS, @pipCoupon = PIP_COUPON
	FROM inserted
	ELSE 
		SELECT @observationBarrierId = OBSERVATION_BARRIER_ID, @checkNumber = CHECK_NUMBER, @barrierName = BARRIER_NAME, @barrierValuePers = BARRIER_VALUE_PERS, @pipCoupon = PIP_COUPON
	FROM deleted

	INSERT INTO PAS_IMPL.UL_OBSERVATION_BARRIER_HISTORY
		(OBSERVATION_BARRIER_HISTORY_ID, OBSERVATION_BARRIER_ID, CHECK_NUMBER, BARRIER_NAME, BARRIER_VALUE_PERS, PIP_COUPON, OPERATION)
	VALUES
		(NEWID(), @observationBarrierId, @checkNumber, @barrierName, @barrierValuePers, @pipCoupon, @operation)
END

SET QUOTED_IDENTIFIER ON
GO

-- CREATE VIEW
CREATE VIEW [PAS_IMPL].[UL_OBSERVATION_BARRIER_VIEW]
AS
	SELECT
		[OBSERVATION_BARRIER_ID] AS OBSERVATION_BARRIER_ID,
		[CHECK_NUMBER] AS CHECK_NUMBER,
		[BARRIER_NAME] AS BARRIER_NAME,
		[BARRIER_VALUE_PERS] AS BARRIER_VALUE_PERS,
		[PIP_COUPON] AS PIP_COUPON
	FROM [PAS_IMPL].[UL_OBSERVATION_BARRIER]
GO