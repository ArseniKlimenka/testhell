delete from acc_impl.OFR_RULE where GL_ACCOUNT_ID = (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72512')
go

insert into acc_impl.CT_OFR (OFR_ID, OFR_CODE, DESCRIPTION)
values
(40, N'47201', N'47201'),
(41, N'47202', N'47202'),
(42, N'47203', N'47203'),
(43, N'47204', N'47204'),
(44, N'47205', N'47205'),
(45, N'47206', N'47206')
go

insert into acc_impl.OFR_RULE (GL_ACCOUNT_ID, PREVIOUS_PERIOD, DOCUMENT_TYPE_ID, CURRENCY_CODE, OFR_ID)
values
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), null, null, 'USD', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '47201')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), null, null, 'EUR', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '47202')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), null, null, 'GBP', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '47203')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), null, null, 'CHF', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '47204')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), null, null, 'JPY', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '47205')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), null, null,  null, (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '47206'))
go

delete from acc_impl.SAP_GL_ACCOUNT_RULE where GL_ACCOUNT_ID = (select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '72512')
go

insert into acc_impl.SAP_GL_ACCOUNT_RULE (GL_ACCOUNT_ID, OFR_ID, PREVIOUS_PERIOD, PERSON_TYPE_ID, SAP_GL_ACCOUNT_ID)
values
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '47201'), 1, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3500002020')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '47202'), 1, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3500002020')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '47203'), 1, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3500002020')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '47204'), 1, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3500002020')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '47205'), 1, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3500002020')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '47206'), 1, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3500002020'))
go
