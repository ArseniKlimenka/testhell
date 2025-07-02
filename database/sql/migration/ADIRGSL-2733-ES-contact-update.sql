begin

update PAS.CONTRACT
set COMMON_BODY = json_modify(COMMON_BODY, '$.attributes.issueFormCode', json_value(PAS.CONTRACT.BODY, '$.issueForm.code.issueFormCode'))
where CONTRACT_NUMBER in (
'93200-77000007',
'95100-77000776',
'95100-77000787',
'95100-77000783',
'95100-77000799',
'88900-77000086',
'95100-77000774',
'91400-77000051');

end
go