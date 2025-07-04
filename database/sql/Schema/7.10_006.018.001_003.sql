IF
	exists (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'PTY_IMPL.PARTY_INFO_SAT') AND TYPE IN (N'U'))
BEGIN
	EXEC(N'
	UPDATE PTY_IMPL.PARTY_INFO_SAT
	SET
		SHORT_NAME = JSON_VALUE(p.COMMON_BODY, ''$.shortOrgName'')
	FROM
		PTY_IMPL.PARTY_INFO_SAT pis
		join PTY_IMPL.PARTY_HUB ph on ph.PARTY_HKEY = pis.PARTY_INFO_HKEY
		join PTY.PARTY p on p.PARTY_CODE = ph.PARTY_CODE
	WHERE 1=1
		and PARTY_INFO_HKEY = pis.PARTY_INFO_HKEY
		and CONFIGURATION_CODE_NAME = ''LegalEntity''
		and SHORT_NAME is null');
END
GO
