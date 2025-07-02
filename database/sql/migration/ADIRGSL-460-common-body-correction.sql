update pas.contract
   set common_body = json_modify(common_body, '$.attributes.initiatorName', json_value(body, '$.initiator.partyFullName'))
go
update pas.contract
   set common_body = json_modify(common_body, '$.attributes.initiatorOrganisationUnitName', json_value(body, '$.initiator.organisationUnitName'))
go