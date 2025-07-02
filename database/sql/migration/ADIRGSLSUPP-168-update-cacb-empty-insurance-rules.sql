UPDATE c
	SET c.BODY = JSON_MODIFY(
					JSON_MODIFY(
						JSON_MODIFY(
							JSON_MODIFY(c.BODY, '$.insuranceRules', JSON_QUERY('{}')),
						'$.insuranceRules.ruleDate', N'2023-04-01'), 
					'$.insuranceRules.ruleDescription', 
					N'Правила страхования жизни физических лиц №9 (в редакции от 01 апреля 2023 года)'), 
				'$.insuranceRules.ruleCode', 
				N'CL_9_20230401'),
		c.SNAPSHOT_BODY = JSON_MODIFY(
								JSON_MODIFY(
									JSON_MODIFY(
										JSON_MODIFY(c.SNAPSHOT_BODY, '$.insuranceRules', JSON_QUERY('{}')), 
									'$.insuranceRules.ruleDate', N'2023-04-01'), 
								'$.insuranceRules.ruleDescription', 
								N'Правила страхования жизни физических лиц №9 (в редакции от 01 апреля 2023 года)'), 
						'$.insuranceRules.ruleCode', 
						N'CL_9_20230401')
FROM PAS.CONTRACT c
LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = c.PUBLISHED_ARTIFACT_ID
LEFT JOIN PAS_IMPL.POLICY_HUB ph ON ph.CONTRACT_NUMBER = c.CONTRACT_NUMBER
LEFT JOIN PAS_IMPL.POLICY_SAT_LATEST ps ON ps.POLICY_HKEY = ph.POLICY_HKEY
WHERE 
	ps.PRODUCT_CODE = N'CACB' AND 
	ps.IS_MIGRATED != 1 AND
	JSON_VALUE(BODY, '$.insuranceRules.ruleCode') IS NULL AND
	(ps.CREDIT_PROGRAM_ID != N'РЖ08' OR ps.CREDIT_PROGRAM_ID != N'РЖ36') AND
	pa.CODE_NAME = N'CreditLifeInsurancePolicy'

UPDATE c
	SET c.BODY = JSON_MODIFY(
					JSON_MODIFY(
						JSON_MODIFY(
							JSON_MODIFY(c.BODY, '$.insuranceRules', JSON_QUERY('{}')),
						'$.insuranceRules.ruleDate', N'2023-04-01'), 
					'$.insuranceRules.ruleDescription', 
					N'Правила страхования жизни физических лиц №9 (в редакции от 01 апреля 2023 года)'), 
				'$.insuranceRules.ruleCode', 
				N'CL_9_20230401'),
		c.SNAPSHOT_BODY = JSON_MODIFY(
								JSON_MODIFY(
									JSON_MODIFY(
										JSON_MODIFY(c.SNAPSHOT_BODY, '$.insuranceRules', JSON_QUERY('{}')), 
									'$.insuranceRules.ruleDate', N'2023-04-01'), 
								'$.insuranceRules.ruleDescription', 
								N'Правила страхования жизни физических лиц №9 (в редакции от 01 апреля 2023 года)'), 
						'$.insuranceRules.ruleCode', 
						N'CL_9_20230401')
FROM PAS.CONTRACT c
LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = c.PUBLISHED_ARTIFACT_ID
LEFT JOIN PAS_IMPL.QUOTE_HUB qh ON qh.CONTRACT_NUMBER = c.CONTRACT_NUMBER
LEFT JOIN PAS_IMPL.QUOTE_SAT_LATEST qs ON qs.QUOTE_HKEY = qh.QUOTE_HKEY
WHERE 
	qs.PRODUCT_CODE = N'CACB' AND
	JSON_VALUE(BODY, '$.insuranceRules.ruleCode') IS NULL AND
	(qs.CREDIT_PROGRAM_ID != N'РЖ08' OR qs.CREDIT_PROGRAM_ID != N'РЖ36') AND
	pa.CODE_NAME = N'CreditLifeInsuranceQuote'