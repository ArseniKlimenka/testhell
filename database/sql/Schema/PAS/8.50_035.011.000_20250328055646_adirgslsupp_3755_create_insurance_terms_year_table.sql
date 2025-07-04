IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[BFX_IMPL].[INSURANCE_TERMS_YEAR]') AND TYPE IN (N'U'))
BEGIN
DROP TABLE [BFX_IMPL].[INSURANCE_TERMS_YEAR]
END
GO

CREATE TABLE [BFX_IMPL].[INSURANCE_TERMS_YEAR] (
[ID] INT IDENTITY(1,1) PRIMARY KEY,
[NAME] NVARCHAR(255) NOT NULL,
[CODE] NVARCHAR(255) NOT NULL,
[DESCRIPTION] NVARCHAR(255) NOT NULL
)
GO