IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[BFX_IMPL].[REGISTRATION_AGENCY]') AND TYPE IN (N'U'))
BEGIN
DROP TABLE [BFX_IMPL].[REGISTRATION_AGENCY]
END
GO
CREATE TABLE [BFX_IMPL].[REGISTRATION_AGENCY] (
[CODE] NVARCHAR(16) NOT NULL,
[DESCRIPTION] NVARCHAR(max) NOT NULL,
[REGION_CODE] NVARCHAR(16) NOT NULL,
CONSTRAINT [PK_REGISTRATION_AGENCY]
PRIMARY KEY CLUSTERED ([CODE] ASC)
)
GO