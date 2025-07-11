IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PTY_IMPL].[PARTY_DEDUP_DELETED]') AND TYPE IN (N'U'))
BEGIN

DROP TABLE PTY_IMPL.PARTY_DEDUP_DELETED

END
GO

create table [PTY_IMPL].[PARTY_DEDUP_DELETED] 
(
	[PARTY_ID] UNIQUEIDENTIFIER NOT NULL,
	[BODY] [nvarchar](MAX) NOT NULL,
	[SYS_CREATED_ON] [datetime] NOT NULL,
	[SYS_UPDATED_ON] [datetime] NOT NULL,
	[SYS_CLIENT_ID] [nvarchar](64) NOT NULL,
	[SYS_VERSION] [bigint] NOT NULL,
	[PUBLISHED_ARTIFACT_ID] UNIQUEIDENTIFIER NOT NULL,
	[COMMON_BODY] [nvarchar](MAX) NOT NULL,
	[PARTY_CODE] [nvarchar](64) NOT NULL,
	[SYS_CREATED_BY_ID] UNIQUEIDENTIFIER NOT NULL,
	[SYS_UPDATED_BY_ID] UNIQUEIDENTIFIER NOT NULL,
	[DUPLICATE_MASTER_ID] UNIQUEIDENTIFIER NULL
)
go