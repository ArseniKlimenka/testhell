IF
	exists (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'PTY_IMPL.PARTY_HUB') AND TYPE IN (N'U'))
	and
	exists (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'PTY_IMPL.PARTY_INFO_SAT') AND TYPE IN (N'U'))
BEGIN
	EXEC(N'
update sp
	set sp.common_body = json_modify(sp.common_body, ''$.attributes.partyShortName'', pis.SHORT_NAME)
from ORG.SERVICE_PROVIDER sp
	join PTY_IMPL.PARTY_HUB ph on ph.PARTY_CODE = sp.PARTY_CODE
	join PTY_IMPL.PARTY_INFO_SAT pis on pis.PARTY_INFO_HKEY = ph.PARTY_HKEY');
END
GO