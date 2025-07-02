delete from acc.CT_GL_POSTING_SCHEME where scheme_name = 'outflow_alloc' and POSTING_SCHEME_ID = 4;

insert INTO acc.CT_DOCUMENT_TYPE (DOCUMENT_TYPE_ID, DESCRIPTION, ACCOUNT_TYPE_ID, PAYABLE)
values  (1005,'PaymentOrder - Claim',NULL,NULL),
        (1006,'PaymentOrder - Commission',NULL,NULL),
        (1007,'PaymentOrder - Payment refund',NULL,NULL),
        (1008,'PaymentOrder - Policy cancellation',NULL,NULL);

insert INTO acc.CT_GL_ACCOUNT_TYPE (GL_ACCOUNT_TYPE_ID,DESCRIPTION, IS_DEBIT, ATTRIBUTE_SET_ID, FROM_PAYMENT)
values (1008,'Money - Unknown purpose - Credit',0,NULL,0);
update acc.GL_ACCOUNT set GL_ACCOUNT_TYPE_ID = 1008 where GL_ACCOUNT_NO = '47417';

INSERT INTO ACC.CT_GL_POSTING_SCHEME(POSTING_SCHEME_ID, SCHEME_NAME, SCHEME_TYPE_ID, JOURNAL_TYPE_ID, VALUE_SIGN, BA_ACCOUNT_TYPE_ID, INTERNAL, SOURCE_DOC_TYPE_ID, OPENED_BY_ENTRY_TYPE_ID, VALIDITY_START, VALIDITY_END, EXPLICIT, ITEM_TYPE_ID)
VALUES  (58, 'Payment order paid (commission)', 1, 16, null, null, 0, 1006, null, '19000101', '9999-12-31', 0, null),
        (59, 'Payment order paid'             , 1, 16, null, null, 0, null, null, '19000101', '9999-12-31', 0, null);

INSERT INTO ACC.GL_POSTING_SCHEME(POSTING_SCHEME_ID, SEQ_NUMBER, IS_DEBIT, GL_ACCOUNT_TYPE_ID, SIGN, VALUE_FIELD_ID, NET_VALUE_FIELD_ID, PAIR_NO, PAIR_SEQ_NO)
VALUES (58, 1, 1, 1002, 1, 4, 4, 1, 1),
       (58, 2, 0, 1008, 1, 4, 4, 1, 2),
       (59, 1, 1, 1006, 1, 4, 4, 1, 1),
       (59, 2, 0, 1008, 1, 4, 4, 1, 2);

INSERT INTO ACC.GL_POSTING_PROFILE(GL_ACCOUNT_TYPE_ID, ATTRIBUTE_VALUE_SET_ID, GL_ACCOUNT_ID, ATTRIBUTE_SET_ID, PREVIOUS_PERIOD, BA_ACCOUNT_TYPE_ID, PAYMENT_DOCUMENT_TYPE_ID, ANALYTICS_ATTRIBUTE_SET_ID, VALIDITY_START, VALIDITY_END, INVOICE_DOCUMENT_TYPE_ID)
VALUES  (1002, null, (select gl_account_id from acc.gl_account where gl_account_no='48022'), 6, NULL, null, null, null, '19000101', '99991231', null),
        (1008, null, (select gl_account_id from acc.gl_account where gl_account_no='47417'), null, NULL, null, null, null, '19000101', '99991231', null),
        (1006, null, (select gl_account_id from acc.gl_account where gl_account_no='48028'), 6, NULL, null, null, null, '19000101', '99991231', null),
        (1008, null, (select gl_account_id from acc.gl_account where gl_account_no='47417'), null, NULL, null, null, null, '19000101', '99991231', null);

