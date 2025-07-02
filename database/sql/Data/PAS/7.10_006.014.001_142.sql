update pas.contract set body = json_modify(body, '$.issueForm', JSON_Query(
'{
	"code": {
		"issueFormCode": "' + JSON_VALUE(body, '$.issueForm.issueFormCode') + '",
		"issueFormDescription": "' + JSON_VALUE(body, '$.issueForm.issueFormDescription') + '"
	}
}'))
where JSON_VALUE(body, '$.issueForm.issueFormCode') is not null
go
