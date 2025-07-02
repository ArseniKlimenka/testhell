if not exists (select * from sys.objects where object_id = object_id(N'[PTY_IMPL].[PARTY_BANK_ACCOUNTS_SAT]') and type in (N'U'))
begin
	create table [PTY_IMPL].[PARTY_BANK_ACCOUNTS_SAT]
	(
		[PARTY_BANK_ACCOUNTS_HKEY] [char](32) not null,
		[LOAD_DATE] [datetime2](7) not null,
		[RECORD_SOURCE] [varchar](50) not null,
		[HASH_DIFF] [char](32) not null,
		[BANK_ACCOUNT] [nvarchar](256) not null,
		[CORRESPONDENT_ACCOUNT] [nvarchar](256) null,
		[BICSWIFT] [nvarchar](256) not null,
		[BIC] [nvarchar](256) null,
		[SWIFT] [nvarchar](256) null,
		[IBAN] [nvarchar](256) null,
		[CURRENCY_CODE] [nvarchar](256) null,
		[OPENING_DATE] [date] null,
		[CLOSING_DATE] [date] null,
		[IS_DELETED] [bit] null,
		constraint [PK_PTY_IMPL_PARTY_BANK_ACCOUNTS_SAT] primary key nonclustered (PARTY_BANK_ACCOUNTS_HKEY, LOAD_DATE, BANK_ACCOUNT, BICSWIFT)
	);
end
go

alter table pty_impl.PARTY_BANK_ACCOUNTS_SAT drop constraint PK_PTY_IMPL_PARTY_BANK_ACCOUNTS_SAT
go

alter table pty_impl.PARTY_BANK_ACCOUNTS_SAT add constraint PK_PTY_IMPL_PARTY_BANK_ACCOUNTS_SAT primary key nonclustered (PARTY_BANK_ACCOUNTS_HKEY, BANK_ACCOUNT, BICSWIFT, LOAD_DATE)
go

drop index IX_PARTY_INFO_SAT_FULL_NAME on pty_impl.PARTY_INFO_SAT
go
create nonclustered index IX_PARTY_INFO_SAT_FULL_NAME on pty_impl.PARTY_INFO_SAT (FULL_NAME)
go
if (not exists(select * from sys.indexes where name = 'IX_ORGANISATION_UNIT_PARENT_ID'))
begin
	create nonclustered index IX_ORGANISATION_UNIT_PARENT_ID on ORG.ORGANISATION_UNIT (PARENT_ID) include (organisation_unit_id, organisation_unit_code);
end
go
if (not exists(select * from sys.indexes where name = 'IX_PARTY_BANK_ACCOUNTS_SAT_BANK_ACCOUNT'))
begin
	create nonclustered index IX_PARTY_BANK_ACCOUNTS_SAT_BANK_ACCOUNT on pty_impl.PARTY_BANK_ACCOUNTS_SAT (BANK_ACCOUNT);
end
go
