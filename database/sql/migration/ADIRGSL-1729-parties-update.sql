update pty.party
   set body = json_modify(body, '$.partyMigrationAttributes.addressNumberSAPAlice', null),
       common_body = json_modify(common_body, '$.attributes.addressNumberSAPAlice', null)