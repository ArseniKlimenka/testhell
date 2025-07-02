
INSERT INTO ACC.CT_DOCUMENT_TYPE (DOCUMENT_TYPE_ID, DESCRIPTION, ACCOUNT_TYPE_ID, PAYABLE) VALUES (1014, N'Sales invoice cancellation not paid', null, null);
INSERT INTO ACC.CT_DOCUMENT_TYPE (DOCUMENT_TYPE_ID, DESCRIPTION, ACCOUNT_TYPE_ID, PAYABLE) VALUES (1015, N'Sales invoice cancellation paid', null, null);

INSERT INTO ACC.CT_GL_POSTING_SCHEME (POSTING_SCHEME_ID, SCHEME_NAME, SCHEME_TYPE_ID, JOURNAL_TYPE_ID, VALUE_SIGN, BA_ACCOUNT_TYPE_ID, INTERNAL, SOURCE_DOC_TYPE_ID, OPENED_BY_ENTRY_TYPE_ID, VALIDITY_START, VALIDITY_END, EXPLICIT, ITEM_TYPE_ID)
VALUES (66, N'Premium decrease - not paid', 1, 3, -1, null, 0, 1014, null, N'1900-01-01 00:00:00.000', N'9999-12-31 00:00:00.000', 0, null),
       (67, N'Premium decrease - paid', 1, 3, -1, null, 0, 1015, null, N'1900-01-01 00:00:00.000', N'9999-12-31 00:00:00.000', 0, null);

--difference between paid and not paid is only in OFR code... but in order to use document type for OFR code, we need to define separate schemas for paid and not paid part.
INSERT INTO ACC.GL_POSTING_SCHEME (POSTING_SCHEME_ID, SEQ_NUMBER, IS_DEBIT, GL_ACCOUNT_TYPE_ID, SIGN, VALUE_FIELD_ID, NET_VALUE_FIELD_ID, PAIR_NO, PAIR_SEQ_NO)
VALUES (66, 1, 1, 1009, -1, 4, 4, 1, 1),
       (66, 2, 0, 1001, -1, 4, 4, 1, 2),
       (67, 1, 1, 1009, -1, 4, 4, 1, 1),
       (67, 2, 0, 1001, -1, 4, 4, 1, 2);

insert into ACC_IMPL.OFR_RULE (GL_ACCOUNT_ID, PREVIOUS_PERIOD, DOCUMENT_TYPE_ID, OFR_ID)
    values ((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71404'), 0, null, (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '22105')),
           ((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71404'), 1, null, (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '22109')),
           ((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71404'), 0, 1015, (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '22107'));


--TRANSCTION DEFINITION
INSERT INTO ACC_IMPL.TRANSACTION_DEFINITION (TRANSACTION_DEFINITION_NO, GL_ACCOUNT_ID_DT, OFR_ID_DT, GL_ACCOUNT_ID_CT, OFR_ID_CT, DOCUMENT_TYPE_ID, BELEGTC, BELEGSC_ALGL_2, BELEGSC_ALGL_3, BUCHUGC, VORGAST_ALGL_2, VORGAST_ALGL_3)
VALUES
('1.3.1', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71402'),	(select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '21105'), (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'), null, null, '01', '01012', '01001', '10', '33', '33'),
('1.3.2', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71404'),	(select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '22105'), (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'), null, null, '01', '01012', '01001', '10', '33', '33'),
('1.5.1', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71402'),	(select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '21107'), (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'), null, null, '01', '01012', '01001', '10', '33', '33'),
('1.5.2', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71404'),	(select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '22109'), (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'), null, null, '01', '01012', '01001', '10', '33', '33'),
('1.4.1', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71404'),	(select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '22107'), (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'), null, null, '01', '01012', '01001', '10', '33', '33');

