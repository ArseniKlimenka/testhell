begin

update pas.contract
set common_body = json_modify(
                    json_modify(
                        COMMON_BODY, '$.attributes.issueFormCode', json_value(pas.contract.BODY, '$.issueForm.code.issueFormCode')),
                        '$.attributes.isReinvest', case json_value(pas.contract.BODY, '$.basicConditions.isReinvest') when 'true' then CAST(1 as BIT) else CAST(0 as BIT) end)

end
go
