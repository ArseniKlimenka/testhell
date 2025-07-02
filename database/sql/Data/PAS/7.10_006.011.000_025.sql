update pty.party
   set body = replace(body, 'INN(KIO)', 'INNKIO')

update org.service_provider
   set body = replace(body, 'INN(KIO)', 'INNKIO')

update pas.contract
   set body = replace(body, 'INN(KIO)', 'INNKIO')