
INSERT INTO ACC.CT_DOCUMENT_TYPE (DOCUMENT_TYPE_ID, DESCRIPTION, ACCOUNT_TYPE_ID, PAYABLE) VALUES (1016, N'Invoiced commission cancellation', null, null);

INSERT INTO ACC.CT_GL_POSTING_SCHEME(POSTING_SCHEME_ID, SCHEME_NAME, SCHEME_TYPE_ID, JOURNAL_TYPE_ID, VALUE_SIGN, BA_ACCOUNT_TYPE_ID, INTERNAL, SOURCE_DOC_TYPE_ID, OPENED_BY_ENTRY_TYPE_ID, VALIDITY_START, VALIDITY_END, EXPLICIT, ITEM_TYPE_ID)
VALUES (68, 'Invoiced commission cancellation', 1, 3, -1, null, 0, 1016, null, '19000101', '9999-12-31', 0, null)

INSERT INTO ACC.CT_GL_ACCOUNT_TYPE (GL_ACCOUNT_TYPE_ID, DESCRIPTION, IS_DEBIT, ATTRIBUTE_SET_ID, FROM_PAYMENT)
VALUES (1013, N'Acquisition costs (commission) debit', 0, 2, 0); --71411, 71412, 71413, 71414

INSERT INTO ACC.GL_POSTING_SCHEME(POSTING_SCHEME_ID, SEQ_NUMBER, IS_DEBIT, GL_ACCOUNT_TYPE_ID, SIGN, VALUE_FIELD_ID, NET_VALUE_FIELD_ID, PAIR_NO, PAIR_SEQ_NO)
VALUES (68, 1, 1, 1002, -1, 3, 1, 1, 1), --48022
       (68, 2, 0, 1013, -1, 3, 1, 1, 2)  --71411, 71412, 71413, 71414

update acc.GL_ACCOUNT set GL_ACCOUNT_TYPE_ID = 1013 where GL_ACCOUNT_NO = '71411';
update acc.GL_ACCOUNT set GL_ACCOUNT_TYPE_ID = 1013 where GL_ACCOUNT_NO = '71413';

INSERT INTO ACC.GL_POSTING_PROFILE(GL_ACCOUNT_TYPE_ID, ATTRIBUTE_VALUE_SET_ID, GL_ACCOUNT_ID, ATTRIBUTE_SET_ID, PREVIOUS_PERIOD, BA_ACCOUNT_TYPE_ID, PAYMENT_DOCUMENT_TYPE_ID, ANALYTICS_ATTRIBUTE_SET_ID, VALIDITY_START, VALIDITY_END, INVOICE_DOCUMENT_TYPE_ID)
VALUES (1013, (select attribute_value_set_id from acc.attribute_value_set where AVS_PURPOSE_ID=3 and IS_LIFE=1), (select gl_account_id from acc.gl_account where gl_account_no='71412'), null, 0, null, null, null, '19000101', '99991231', null),
       (1013, (select attribute_value_set_id from acc.attribute_value_set where AVS_PURPOSE_ID=3 and IS_LIFE=0), (select gl_account_id from acc.gl_account where gl_account_no='71414'), null, 0, null, null, null, '19000101', '99991231', null),
       (1013, (select attribute_value_set_id from acc.attribute_value_set where AVS_PURPOSE_ID=3 and IS_LIFE=1), (select gl_account_id from acc.gl_account where gl_account_no='71411'), null, 1, null, null, null, '19000101', '99991231', null),
       (1013, (select attribute_value_set_id from acc.attribute_value_set where AVS_PURPOSE_ID=3 and IS_LIFE=0), (select gl_account_id from acc.gl_account where gl_account_no='71413'), null, 1, null, null, null, '19000101', '99991231', null);

insert into ACC_IMPL.OFR_RULE (GL_ACCOUNT_ID, PREVIOUS_PERIOD, DOCUMENT_TYPE_ID, OFR_ID)
    values ((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71411'), 1, null, (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '16101')),
           ((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71413'), 1, null, (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '17101'));


--TRANSCTION DEFINITION
INSERT INTO ACC_IMPL.TRANSACTION_DEFINITION (TRANSACTION_DEFINITION_NO, GL_ACCOUNT_ID_DT, OFR_ID_DT, GL_ACCOUNT_ID_CT, OFR_ID_CT, DOCUMENT_TYPE_ID, BELEGTC, BELEGSC_ALGL_2, BELEGSC_ALGL_3, BUCHUGC, VORGAST_ALGL_2, VORGAST_ALGL_3)
VALUES
('2.3.1', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'),	null, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71412'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '26101'), null, '03', '03011', '03001', '20', '14', '14'),
('2.3.2', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'),	null, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71414'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '27101'), null, '03', '03011', '03001', '20', '14', '14'),
('2.4.1', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'),	null, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71411'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '16101'), null, '03', '03011', '03001', '20', '14', '14'),
('2.4.2', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'),	null, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71413'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '17101'), null, '03', '03011', '03001', '20', '14', '14');
