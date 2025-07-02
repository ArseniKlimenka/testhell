if not exists (select * from sys.objects where object_id = object_id(N'[EWT_IMPL].[EWT_HUB]') and type in (N'U'))
begin
	CREATE TABLE [EWT_IMPL].[EWT_HUB]
	(
		[EWT_HKEY] [char](32) NOT NULL,
		[LOAD_DATE] [datetime2](7) NOT NULL,
		[RECORD_SOURCE] [varchar](50) NOT NULL,
		[ENDOWMENT_NUMBER] [nvarchar](64) NULL,
		CONSTRAINT [PK_EWT_IMPL_EWT_HUB] PRIMARY KEY NONCLUSTERED ( [EWT_HKEY] ASC ),
		CONSTRAINT [UQ_EWT_HUB] UNIQUE CLUSTERED ( [ENDOWMENT_NUMBER] ASC )
	);
end
go

if not exists (select * from sys.objects where object_id = object_id(N'[EWT_IMPL].[EWT_SAT]') and type in (N'U'))
begin
	CREATE TABLE [EWT_IMPL].[EWT_SAT]
	(
		[EWT_HKEY] [char](32) NOT NULL,
		[LOAD_DATE] [datetime2](7) NOT NULL,
		[RECORD_SOURCE] [varchar](50) NOT NULL,
		[HASH_DIFF] [char](32) NOT NULL,
		[ENDOWMENT_STATE] [nvarchar](100) NULL,
		[EXCHANGE_RATE] [decimal](15, 7) NULL,
		[MANUAL_RZNU] [bit] NULL,
		[RZNU] [decimal](15, 7) NULL,
		[SHOULD_USE_NETTING] [bit] NULL,
		[NON_ACCEPTANCE] [bit] NULL,
		[NUM_OF_NON_ACCEPTANCE_PAYMENT] [nvarchar](max) NULL,
		[ACTUARY_REQUEST] [nvarchar](max) NULL,
		[COMPLIANCE_REQUEST] [nvarchar](max) NULL,
		[INS_METHODOLOGY_REQUEST] [nvarchar](max) NULL,
		[LEGAL_REQUEST] [nvarchar](max) NULL,
		[REQUEST_TO_CLIENT] [nvarchar](max) NULL,
		[SECURITY_REQUEST] [nvarchar](max) NULL,
		[ACTUARY_CONCLUSION] [nvarchar](max) NULL,
		[COMPLIANCE_CONCLUSION] [nvarchar](max) NULL,
		[INS_METHODOLOGY_CONCLUSION] [nvarchar](max) NULL,
		[LEGAL_CONCLUSION] [nvarchar](max) NULL,
		[RESPONSE_FROM_CLIENT] [nvarchar](max) NULL,
		[SECURITY_CONCLUSION] [nvarchar](max) NULL,
		[PAYMENT_FREQUENCY_CODE] [nvarchar](max) NULL,
		[PAYMENT_FREQUENCY_DESCRIPTION] [nvarchar](max) NULL,
		[PAYMENT_VARIANT_CODE] [nvarchar](max) NULL,
		[PAYMENT_VARIANT_DESCRIPTION] [nvarchar](max) NULL,
		[EVENT_REASON_CODE] [nvarchar](max) NULL,
		[EVENT_REASON_DESCRIPTION] [nvarchar](max) NULL,
		[EVENT_TYPE_CODE] [nvarchar](max) NULL,
		[EVENT_TYPE_DESCRIPTION] [nvarchar](max) NULL,
		[REJECTION_NOTE] [nvarchar](max) NULL,
		[REJECTION_REASON] [nvarchar](max) NULL,
		[CONTRACT_NUMBER] [nvarchar](100) NULL,
		[CONTRACT_HOLDER_NAME] [nvarchar](max) NULL,
		[CONTRACT_CONF_CODE_NAME] [nvarchar](100) NULL,
		[FIXED_EXCH_RATE] [decimal](15, 7) NULL,
		[USE_FIXED_EXCH_RATE] [bit] NULL,
		CONSTRAINT [PK_EWT_IMPL_EWT_SAT] PRIMARY KEY NONCLUSTERED
		(
			[EWT_HKEY] ASC,
			[LOAD_DATE] ASC
		)
	);
end
go

create nonclustered index IX_EWT_SAT_CONTRACT_NUMBER on ewt_impl.EWT_SAT (CONTRACT_NUMBER)
go
