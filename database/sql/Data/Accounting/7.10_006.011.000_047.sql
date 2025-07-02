insert into acc.ATTRIBUTE_SET (ATTRIBUTE_SET_ID, ATTRIBUTE_DEFINITION_ID, REQUIRED, SOURCE_ID, NAME, DESCRIPTION)
values (6, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'IsLife'), 0, null, 'Subledger AVS', 'Attribute set for subledger AVS' );

update acc.GL_POSTING_PROFILE set ATTRIBUTE_SET_ID = 6;

update ACC_IMPL.TRANSACTION_TYPE set DESCRIPTION = N'Начисление вознаграждения посредникам (Оценка)' where TRANSACTION_TYPE_ID = 2 and DESCRIPTION = N'Начисление  вознаграждения посредникам (Оценка)'; --fix typo
update ACC_IMPL.TRANSACTION_TYPE set DESCRIPTION = N'Начисление вознаграждения посредникам (Факт)' where TRANSACTION_TYPE_ID = 3 and DESCRIPTION = N'Начисление  вознаграждения посредникам (Факт)'; --fix typo

insert INTO acc.CT_GL_ACCOUNT_TYPE (GL_ACCOUNT_TYPE_ID,DESCRIPTION, IS_DEBIT, ATTRIBUTE_SET_ID, FROM_PAYMENT)
values (1004, 'Money - Unknown purpose - Debit', 1, NULL, 0),
       (1005, 'Cash - incoming', 0, NULL, 0);
update acc.CT_GL_POSTING_SCHEME set VALIDITY_END = '2000-01-01' where POSTING_SCHEME_ID = 1;

INSERT INTO ACC.CT_GL_POSTING_SCHEME(POSTING_SCHEME_ID, SCHEME_NAME, SCHEME_TYPE_ID, JOURNAL_TYPE_ID, VALUE_SIGN, BA_ACCOUNT_TYPE_ID, INTERNAL, SOURCE_DOC_TYPE_ID, OPENED_BY_ENTRY_TYPE_ID, VALIDITY_START, VALIDITY_END, EXPLICIT, ITEM_TYPE_ID)
VALUES (55, 'Bank statement incoming', 1, 11, null, null, 0, null, null, '19000101', '9999-12-31', 0, null);

INSERT INTO ACC.GL_POSTING_SCHEME(POSTING_SCHEME_ID, SEQ_NUMBER, IS_DEBIT, GL_ACCOUNT_TYPE_ID, SIGN, VALUE_FIELD_ID, NET_VALUE_FIELD_ID, PAIR_NO, PAIR_SEQ_NO)
VALUES (55, 1, 1, 1004, 1, 4, 4, 1, 1),
       (55, 2, 0, 1005, 1, 4, 4, 1, 2);

INSERT INTO ACC.GL_POSTING_PROFILE(GL_ACCOUNT_TYPE_ID, ATTRIBUTE_VALUE_SET_ID, GL_ACCOUNT_ID, ATTRIBUTE_SET_ID, PREVIOUS_PERIOD, BA_ACCOUNT_TYPE_ID, PAYMENT_DOCUMENT_TYPE_ID, ANALYTICS_ATTRIBUTE_SET_ID, VALIDITY_START, VALIDITY_END, INVOICE_DOCUMENT_TYPE_ID)
VALUES(1004, null, (select gl_account_id from acc.gl_account where gl_account_no='47416'), null, NULL, null, null, null, '19000101', '99991231', null),
      (1005, null, (select gl_account_id from acc.gl_account where gl_account_no='48029'), null, NULL, null, null, null, '19000101', '99991231', null);

update acc.GL_ACCOUNT set GL_ACCOUNT_TYPE_ID = 1004, DESCRIPTION = N'Суммы, поступившие на корреспондентские счета, до выяснения' where GL_ACCOUNT_NO = '47416';
update acc.GL_ACCOUNT set GL_ACCOUNT_TYPE_ID = 1004, DESCRIPTION = N'Незавершенные расчеты по операциям страхования и перестрахования' where GL_ACCOUNT_NO = '48029';
