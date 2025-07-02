UPDATE PTY.PARTY 
SET BODY = JSON_MODIFY(JSON_MODIFY(BODY, '$.finKnowledgeQuestionnaire2023', JSON_QUERY('{}')), '$.finKnowledgeQuestionnaire2023.questionnaire', 
	JSON_QUERY(N'[
			{
				"itemNumber": 1,
				"itemText": "Совокупный объем моих активов в финансовых инструментах (включая депозиты, текущие счета, ценные бумаги, доверительное управление, ПИФ, ИИС, денежные средства и т.д.) превышает в сумме 6 000 000 (шесть миллионов) рублей."
			},
			{
				"itemNumber": 2,
				"itemText": "Я повторно заключаю договор с инвестиционной составляющей и имею завершивший свое действие договор:\n            •\tстрахования жизни с инвестиционной составляющей (ИСЖ, НСЖ);\n            •\tдоверительного управления, брокерского обслуживания;\n            •\tдополнительного негосударственного пенсионного обеспечения;\n            •\tдругих финансовых инструментов (акции, облигации, ПИФ, ИИС др.)."
			},
			{
				"itemNumber": 3,
				"itemText": "Имею опыт работы: не менее 2х лет в организации являющейся квалифицированным инвестором, не менее 3х лет в организации, которая осуществляла сделки с ценными бумагами и/или иными финансовыми инструментами (в т. ч. страховые компании, НПФ, Банки, УК)."
			},
			{
				"itemNumber": 4,
				"itemText": "Я имею аттестат/сертификат специалиста в области экономики или финансов и/или окончил(а) курсы повышения квалификации в сфере экономики или финансов, и/или мне присваивался ранее статус квалифицированного инвестора и/или получил(а) сертификат(ы);\n            •\tChartered Financial Analyst (CFA), Certified International Investment Analyst  (CIIA), Financial Risk Manager (FRM);\n            •\tквалификационный(ые) аттестат(ы): специалиста финансового рынка, аудитора, страхового актуария."
			}
		]')
)
FROM PTY.PARTY p 
LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = p.PUBLISHED_ARTIFACT_ID
WHERE CODE_NAME = 'NaturalPerson'
AND (JSON_QUERY(BODY, '$.finKnowledgeQuestionnaire2023.questionnaire') IS NULL OR JSON_QUERY(BODY, '$.finKnowledgeQuestionnaire2023.questionnaire') = '[]')
--AND PARTY_CODE = 'PARTY_CODE_NUMBER'