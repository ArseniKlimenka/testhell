update p
   set p.body = json_modify(p.body, '$.partyOrganisationData.site', json_query('{ "hasWebsite" : true, "websiteAddress" : "' + json_value(p.body, '$.partyOrganisationData.site') + '"}'))                       
from PTY.PARTY p
WHERE
	json_value(p.body, '$.partyOrganisationData.site') IS NOT NULL;