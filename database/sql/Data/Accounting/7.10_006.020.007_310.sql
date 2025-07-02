insert into acc_impl.OFR_RULE (GL_ACCOUNT_ID, PREVIOUS_PERIOD, DOCUMENT_TYPE_ID, CURRENCY_CODE, OFR_ID)
values
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72511'), null, null, 'USD', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37201')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72511'), null, null, 'EUR', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37202')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72511'), null, null, 'GBP', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37203')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72511'), null, null, 'CHF', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37204')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72511'), null, null, 'JPY', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37205')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72511'), null, null,  null, (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37206')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), null, null, 'USD', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37201')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), null, null, 'EUR', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37202')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), null, null, 'GBP', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37203')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), null, null, 'CHF', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37204')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), null, null, 'JPY', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37205')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), null, null,  null, (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37206'))
go
