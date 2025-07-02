if not exists (select * from sys.objects where object_id = object_id(N'[PTY_IMPL].[PARTY_INFO_SAT]') and type in (N'U'))
begin
	create table [PTY_IMPL].[PARTY_INFO_SAT]
	(
		[PARTY_INFO_HKEY] [char](32) not null,
		[LOAD_DATE] [datetime2](7) not null,
		[RECORD_SOURCE] [varchar](50) not null,
		[HASH_DIFF] [char](32) not null,
		[FULL_NAME] [nvarchar](500) null,
		[LAST_NAME] [nvarchar](500) null,
		[FIRST_NAME] [nvarchar](500) null,
		[MIDDLE_NAME] [nvarchar](500) null,
		[DATE_OF_BIRTH] [date] null,
		[OGRNOGRNIP] [nvarchar](500) null,
		[SHORT_NAME] [nvarchar](500) null,
		[CONFIGURATION_CODE_NAME] [nvarchar](256) null,
		[NATURAL_PERSON_CATEGORY] [nvarchar](256) null,
		[IS_NON_RESIDENT] [bit] null,
		[INNKIO] [nvarchar](256) null,
		[REGISTRATION_COUNTRY_ALFA2] [nvarchar](256) null,
		[REGISTRATION_COUNTRY_CODE] [nvarchar](256) null,
		[SNILS] [nvarchar](256) null,
		[TIN] [nvarchar](256) null,
		[TRADING_PARTNER_CODE] [int] null,
		[BANKRUPTCY_PROCEDURE] [bit] null,
		[LICENSE_REVOKED] [bit] null,
		[UNFULFILLED_OBLIGATION_GU] [bit] null,
		[UNFULFILLED_OBLIGATION_CB] [bit] null,
		[IS_MIGRATED] [bit] null,
		[ADDRES_NUMBER_SAPALICE_R] [int] null,
		[ADDRES_NUMBER_SAPALICE_F] [int] null,
		[ADDRES_NUMBER_SAPALICE_P] [int] null,
		[PARTNER_NUMBER_SAPALICE] [int] null,
		[NON_RESIDENT_CODE] [nvarchar](256) null,
		constraint [PK_PTY_IMPL_PARTY_INFO_SAT] primary key nonclustered (PARTY_INFO_HKEY,LOAD_DATE)
	);
end
go

if not exists (select * from sys.objects where object_id = object_id(N'[PAS_IMPL].[P_PAYMENT_PLAN_SAT]') and type in (N'U'))
begin
	create table [PAS_IMPL].[P_PAYMENT_PLAN_SAT]
	(
		[P_PAYMENT_PLAN_HKEY] [char](32) not null,
		[LOAD_DATE] [datetime2](7) not null,
		[RECORD_SOURCE] [varchar](50) not null,
		[HASH_DIFF] [char](32) not null,
		[ITEM_NO] [varchar](250) not null,
		[POSTING_DATE] [date] null,
		[DEADLINE_DATE] [date] null,
		[OBJECT_CODE] [nvarchar](250) null,
		[TARIFF_CODE] [varchar](60) null,
		[TARIFF_UNIT_CODE] [nvarchar](32) null,
		[AMOUNT] [decimal](15, 2) null,
		[CURRENCY_CODE] [char](3) null,
		[AMENDMENT_NUMBER] [nvarchar](50) null,
		[IS_FIRST_INSTALLMENT] [bit] null,
		[INSURANCE_YEAR] [int] null,
		constraint [PK_PAS_IMPL_P_PAYMENT_PLAN_SAT] primary key nonclustered (P_PAYMENT_PLAN_HKEY,ITEM_NO,LOAD_DATE)
	);
end
go

if (not exists(select * from sys.indexes where name = 'IX_JR_GENERAL_LINE_JOURNAL_ID'))
begin
	create nonclustered index IX_JR_GENERAL_LINE_JOURNAL_ID on acc.JR_GENERAL_LINE (JOURNAL_ID);
end
go

if (not exists(select * from sys.indexes where name = 'IX_PARTY_INFO_SAT_FULL_NAME'))
begin
	create nonclustered index IX_PARTY_INFO_SAT_FULL_NAME on pty_impl.PARTY_INFO_SAT (FULL_NAME,INNKIO);
end
go

alter table pas_impl.P_PAYMENT_PLAN_SAT drop constraint PK_PAS_IMPL_P_PAYMENT_PLAN_SAT
go

alter table pas_impl.P_PAYMENT_PLAN_SAT add constraint PK_PAS_IMPL_P_PAYMENT_PLAN_SAT primary key nonclustered
(
	P_PAYMENT_PLAN_HKEY,
	ITEM_NO,
	LOAD_DATE
)
go
