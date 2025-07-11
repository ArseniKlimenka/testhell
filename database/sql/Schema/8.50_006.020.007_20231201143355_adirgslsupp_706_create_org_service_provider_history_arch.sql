IF OBJECT_ID(N'ORG_IMPL.SERVICE_PROVIDER_HISTORY_ARCH', N'U') IS NOT NULL
	DROP TABLE ORG_IMPL.SERVICE_PROVIDER_HISTORY_ARCH;
GO

CREATE TABLE [ORG_IMPL].[SERVICE_PROVIDER_HISTORY_ARCH](
	[SERVICE_PROVIDER_HISTORY_ID] [uniqueidentifier] NOT NULL,
	[SERVICE_PROVIDER_ID] [uniqueidentifier] NOT NULL,
	[SERVICE_PROVIDER_CODE] [nvarchar](64) NOT NULL,
	[PARTY_CODE] [nvarchar](64) NOT NULL,
	[BODY] [nvarchar](max) NOT NULL,
	[COMMON_BODY] [nvarchar](max) NULL,
	[PUBLISHED_ARTIFACT_ID] [uniqueidentifier] NOT NULL,
	[SYS_CREATED_ON] [datetime] NOT NULL,
	[SYS_CREATED_BY_ID] [uniqueidentifier] NOT NULL,
	[SYS_UPDATED_ON] [datetime] NOT NULL,
	[SYS_UPDATED_BY_ID] [uniqueidentifier] NOT NULL,
	[SYS_CLIENT_ID] [nvarchar](64) NOT NULL,
	[SYS_VERSION] [bigint] NOT NULL,
    CONSTRAINT [PK_ORG_IMPL_SERVICE_PROVIDER_HISTORY_ARCH] PRIMARY KEY NONCLUSTERED 
	(
		[SERVICE_PROVIDER_HISTORY_ID] ASC
	)
)
GO

ALTER TABLE [ORG_IMPL].[SERVICE_PROVIDER_HISTORY_ARCH]  WITH CHECK ADD  CONSTRAINT [FK_CREATED_ORG_IMPL_SERVICE_PROVIDER_HIST_ARCH] FOREIGN KEY([SYS_CREATED_BY_ID])
REFERENCES [ORG].[APPLICATION_USER] ([APPLICATION_USER_ID])
GO

ALTER TABLE [ORG_IMPL].[SERVICE_PROVIDER_HISTORY_ARCH] CHECK CONSTRAINT [FK_CREATED_ORG_IMPL_SERVICE_PROVIDER_HIST_ARCH]
GO

ALTER TABLE [ORG_IMPL].[SERVICE_PROVIDER_HISTORY_ARCH]  WITH CHECK ADD  CONSTRAINT [FK_ORG_IMPL_SERVICE_PROVIDER_HIST_ARCH_PARTY] FOREIGN KEY([PARTY_CODE])
REFERENCES [PTY].[PARTY] ([PARTY_CODE])
GO

ALTER TABLE [ORG_IMPL].[SERVICE_PROVIDER_HISTORY_ARCH] CHECK CONSTRAINT [FK_ORG_IMPL_SERVICE_PROVIDER_HIST_ARCH_PARTY]
GO

ALTER TABLE [ORG_IMPL].[SERVICE_PROVIDER_HISTORY_ARCH]  WITH CHECK ADD  CONSTRAINT [FK_ORG_IMPL_SERVICE_PROVIDER_HIST_ARCH_SERVICE_PROVIDER] FOREIGN KEY([SERVICE_PROVIDER_ID])
REFERENCES [ORG].[SERVICE_PROVIDER] ([SERVICE_PROVIDER_ID])
GO

ALTER TABLE [ORG_IMPL].[SERVICE_PROVIDER_HISTORY_ARCH] CHECK CONSTRAINT [FK_ORG_IMPL_SERVICE_PROVIDER_HIST_ARCH_SERVICE_PROVIDER]
GO

ALTER TABLE [ORG_IMPL].[SERVICE_PROVIDER_HISTORY_ARCH]  WITH CHECK ADD  CONSTRAINT [FK_UPDATED_ORG_IMPL_SERVICE_PROVIDER_HIST_ARCH] FOREIGN KEY([SYS_UPDATED_BY_ID])
REFERENCES [ORG].[APPLICATION_USER] ([APPLICATION_USER_ID])
GO

ALTER TABLE [ORG_IMPL].[SERVICE_PROVIDER_HISTORY_ARCH] CHECK CONSTRAINT [FK_UPDATED_ORG_IMPL_SERVICE_PROVIDER_HIST_ARCH]
GO
