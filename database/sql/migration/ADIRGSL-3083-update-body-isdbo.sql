update pas.contract
	set body = json_modify(body, '$.initiator.isDBO', CAST(0 as BIT)),
		common_body = json_modify(common_body, '$.attributes.initiatorIsDBO', CAST(0 as BIT))
go