update pty.party
   set body = json_modify(body, '$.partyGeneralData.lastUpdateDate', convert(varchar, sys_updated_on, 23))