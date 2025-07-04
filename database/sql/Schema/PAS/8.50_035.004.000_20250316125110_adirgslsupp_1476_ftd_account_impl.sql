IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PTY_IMPL].[party_bank_accounts_sat]') AND TYPE IN (N'U'))
BEGIN

IF COL_LENGTH('PTY_IMPL.party_bank_accounts_sat','FTD_NAME') IS NOT NULL
BEGIN
	ALTER TABLE PTY_IMPL.party_bank_accounts_sat DROP COLUMN FTD_NAME
END

END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[ORG_IMPL].[bank]') AND TYPE IN (N'U'))
BEGIN

IF COL_LENGTH('ORG_IMPL.bank','FTD_NAME') IS NULL
BEGIN
	ALTER TABLE org_impl.bank ADD FTD_NAME NVARCHAR(256) NULL
END

END
GO