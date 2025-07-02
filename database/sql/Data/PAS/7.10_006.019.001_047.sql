IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PTY_IMPL].[PARTY_INFO_SAT]') AND TYPE IN (N'U'))
BEGIN
update pty_impl.party_info_sat
   set IS_MIGRATED = CAST(0 as BIT)           
 
END
GO       