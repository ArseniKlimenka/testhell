IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PTY_IMPL].[PARTY_PHONES_SAT]') AND TYPE IN (N'U'))
BEGIN
DROP TABLE PTY_IMPL.PARTY_PHONES_SAT
END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PTY_IMPL].[PARTY_EMAILS_SAT]') AND TYPE IN (N'U'))
BEGIN
DROP TABLE PTY_IMPL.PARTY_EMAILS_SAT
END
GO