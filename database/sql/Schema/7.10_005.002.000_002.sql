IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[BFX_IMPL].[FATCA_CLASS]') AND TYPE IN (N'U'))
BEGIN
DROP TABLE [BFX_IMPL].[FATCA_CLASS] 
END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[BFX_IMPL].[EXECUTIVE_PERSON]') AND TYPE IN (N'U'))
BEGIN
DROP TABLE [BFX_IMPL].[EXECUTIVE_PERSON]
END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[BFX_IMPL].[GOAL_ACTIVITY]') AND TYPE IN (N'U'))
BEGIN
DROP TABLE [BFX_IMPL].[GOAL_ACTIVITY]
END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[BFX_IMPL].[INCOME_SOURCE]') AND TYPE IN (N'U'))
BEGIN
DROP TABLE [BFX_IMPL].[INCOME_SOURCE]
END
GO

CREATE TABLE [BFX_IMPL].[FATCA_CLASS] (
[CODE] NVARCHAR(255) NOT NULL,
[DESCRIPTION] NVARCHAR(255) NOT NULL,
CONSTRAINT [PK_FATCA_CLASS]
PRIMARY KEY CLUSTERED ([CODE] ASC)
)
GO

CREATE TABLE [BFX_IMPL].[EXECUTIVE_PERSON] (
[CODE] NVARCHAR(255) NOT NULL,
[DESCRIPTION] NVARCHAR(255) NOT NULL,
CONSTRAINT [PK_EXECUTIVE_PERSON]
PRIMARY KEY CLUSTERED ([CODE] ASC)
)
GO

CREATE TABLE [BFX_IMPL].[GOAL_ACTIVITY] (
[CODE] NVARCHAR(255) NOT NULL,
[DESCRIPTION] NVARCHAR(255) NOT NULL,
CONSTRAINT [PK_GOAL_OF_FINANCIAL_ACTIVITY]
PRIMARY KEY CLUSTERED ([CODE] ASC)
)
GO

CREATE TABLE [BFX_IMPL].[INCOME_SOURCE] (
[CODE] NVARCHAR(255) NOT NULL,
[DESCRIPTION] NVARCHAR(255) NOT NULL,
CONSTRAINT [PK_INCOME_SOURCE]
PRIMARY KEY CLUSTERED ([CODE] ASC)
)
GO