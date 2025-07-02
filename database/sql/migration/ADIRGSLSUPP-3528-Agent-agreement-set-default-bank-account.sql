UPDATE PAS.AGENT_AGREEMENT
SET BODY = JSON_MODIFY(BODY, '$.participants.agent.bankAccount', JSON_QUERY(BODY, '$.participants.agent.partyBody.partyBankAccounts[0]')),
	COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.attributes.participants.agent.bankAccount', JSON_QUERY(BODY, '$.participants.agent.partyBody.partyBankAccounts[0]')),
	SNAPSHOT_BODY = JSON_MODIFY(SNAPSHOT_BODY, '$.participants.agent.bankAccount', JSON_QUERY(BODY, '$.participants.agent.partyBody.partyBankAccounts[0]'))
WHERE JSON_VALUE(BODY, '$.participants.agent.bankAccount.number') IS NULL
AND (SELECT COUNT(*) FROM OPENJSON(JSON_QUERY(BODY, '$.participants.agent.partyBody.partyBankAccounts'))) = 1