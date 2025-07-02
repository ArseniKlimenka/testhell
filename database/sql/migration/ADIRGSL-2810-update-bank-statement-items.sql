update bsi
set bsi.DEBTOR_NAME = JSON_VALUE(po.body, '$.recipientInformation.partyFullName')
FROM acc.PAYMENT_ORDER po
CROSS APPLY OPENJSON(JSON_QUERY(po.body, '$.paymentOrderNetting.nettedDocuments')) n
inner join acc_impl.bank_statement_item bsi on JSON_VALUE(n.value, '$.currentBankStatementId') = bsi.bank_statement_item_id
where (DEBTOR_NAME = '' OR DEBTOR_NAME IS NULL) AND FAKE = 1