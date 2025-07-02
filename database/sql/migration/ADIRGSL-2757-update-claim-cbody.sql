UPDATE clm SET COMMON_BODY = 
JSON_MODIFY(
	JSON_MODIFY(
		JSON_MODIFY(
			JSON_MODIFY(
				JSON_MODIFY(clm.COMMON_BODY, '$.attributes.mainAttributes.contract.stateCode', ps.CODE_NAME), 
				'$.attributes.mainAttributes.contract.stateDescription', 
				case ps.CODE_NAME								
					when 'Draft' then N'Проект'								
					when 'Active' then N'Подписан'								
					when 'Activated' then N'Действует'								
					when 'Cancelled' then N'Отменен'								
					when 'CancelledByAmendment' then N'Расторгнут'
					when 'Completed' then N'Завершён'
				end
			), 
			'$.attributes.mainAttributes.contract.configurationVersion', 
			'1'
		),
		'$.attributes.mainAttributes.policyHolderInfo', 
		JSON_QUERY(CONCAT('{
		"policyHolder": {
			"partyCode": "', JSON_VALUE(c.body, '$.policyHolder.partyData.partyCode'),'",
			"partyType": "', JSON_VALUE(c.body, '$.policyHolder.partyData.partyType'),'",
			"fullName": "', JSON_VALUE(c.body, '$.policyHolder.partyData.partyFullName'),'"
			}
		}'))
	),
	'$.attributes.mainAttributes.insuredPersonInfo', 
	JSON_QUERY(CONCAT('{
	"insuredPerson": {
		"partyCode": "', JSON_VALUE(c.body, '$.insuredPerson.partyData.partyCode'),'",
		"partyType": "', JSON_VALUE(c.body, '$.insuredPerson.partyData.partyType'),'",
		"fullName": "', JSON_VALUE(c.body, '$.insuredPerson.partyData.partyFullName'),'"
		}
	}'))
)
FROM CLM.CLAIM clm
LEFT JOIN PAS.CONTRACT c ON c.CONTRACT_NUMBER = JSON_VALUE(clm.COMMON_BODY, '$.attributes.mainAttributes.contract.number')
LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = clm.PUBLISHED_ARTIFACT_ID
LEFT JOIN CFG.PROCESS_STATE ps ON ps.PROCESS_STATE_ID = c.STATE_ID
WHERE pa.CODE_NAME = 'Claim';
