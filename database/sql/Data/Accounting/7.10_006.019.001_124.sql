INSERT INTO acc.CT_DOCUMENT_TYPE (DOCUMENT_TYPE_ID, DESCRIPTION, ACCOUNT_TYPE_ID, PAYABLE)
values
(1018,'Payment order - Claim (PIT)',NULL,NULL),
(1019,'Payment order - Policy cancellation (PIT)',NULL,NULL);

INSERT INTO ACC.CT_GL_ACCOUNT_TYPE (GL_ACCOUNT_TYPE_ID, DESCRIPTION, IS_DEBIT, ATTRIBUTE_SET_ID, FROM_PAYMENT)
VALUES (1014, N'Payment order - PIT', 0, 2, 0);

--delete from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '60301';
INSERT INTO acc.GL_ACCOUNT (GL_ACCOUNT_TYPE_ID, GL_ACCOUNT_NO, DESCRIPTION, PARENT_ACCOUNT_ID, SYNTHETIC)
VALUES (1014,'60301', N'Расчеты по налогам и сборам',NULL,0);

--delete from ACC.CT_GL_POSTING_SCHEME where POSTING_SCHEME_ID in (71,72,73);
INSERT INTO ACC.CT_GL_POSTING_SCHEME(POSTING_SCHEME_ID, SCHEME_NAME, SCHEME_TYPE_ID, JOURNAL_TYPE_ID, VALUE_SIGN, BA_ACCOUNT_TYPE_ID, INTERNAL, SOURCE_DOC_TYPE_ID, OPENED_BY_ENTRY_TYPE_ID, VALIDITY_START, VALIDITY_END, EXPLICIT, ITEM_TYPE_ID)
VALUES
(71, 'Payment order - Claim (PIT)', 1, 1001, null, null, 0, 1018, null, '19000101', '9999-12-31', 0, null),
(72, 'Payment order - Policy cancellation (PIT)', 1, 1001, null, null, 0, 1019, null, '19000101', '9999-12-31', 0, null),
(73, 'Payment order (PIT)', 1, 16, null, null, 0, 1019, null, '19000101', '9999-12-31', 0, null)
;

--delete from ACC.GL_POSTING_SCHEME where POSTING_SCHEME_ID in (71,72,73);
INSERT INTO ACC.GL_POSTING_SCHEME(POSTING_SCHEME_ID, SEQ_NUMBER, IS_DEBIT, GL_ACCOUNT_TYPE_ID, SIGN, VALUE_FIELD_ID, NET_VALUE_FIELD_ID, PAIR_NO, PAIR_SEQ_NO)
VALUES
(71, 1, 1, 1007, 1, 4, 4, 1, 1),
(71, 2, 0, 1014, 1, 4, 4, 1, 2),
(72, 1, 1, 1007, 1, 4, 4, 1, 1),
(72, 2, 0, 1014, 1, 4, 4, 1, 2),
(73, 1, 1, 1014, 1, 4, 4, 1, 1),
(73, 2, 0, 1008, 1, 4, 4, 1, 2)
;

--delete from ACC.GL_POSTING_PROFILE where GL_ACCOUNT_TYPE_ID = 1014;
INSERT INTO ACC.GL_POSTING_PROFILE(GL_ACCOUNT_TYPE_ID, ATTRIBUTE_VALUE_SET_ID, GL_ACCOUNT_ID, ATTRIBUTE_SET_ID, PREVIOUS_PERIOD, BA_ACCOUNT_TYPE_ID, PAYMENT_DOCUMENT_TYPE_ID, ANALYTICS_ATTRIBUTE_SET_ID, VALIDITY_START, VALIDITY_END, INVOICE_DOCUMENT_TYPE_ID)
VALUES (1014, (select attribute_value_set_id from acc.attribute_value_set where AVS_PURPOSE_ID=3 and IS_LIFE=1), (select gl_account_id from acc.gl_account where gl_account_no='60301'), null, null, null, null, null, '19000101', '99991231', null);

--delete from ACC_IMPL.OFR_RULE where document_type_id in (1019,1018);
insert into ACC_IMPL.OFR_RULE (GL_ACCOUNT_ID, PREVIOUS_PERIOD, DOCUMENT_TYPE_ID, OFR_ID)
values
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71406'), null, 1019, (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '23103')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71406'), null, 1018, (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '23101'));

-- SAP GL ACCOUNT
insert into acc.ATTRIBUTE_SET (ATTRIBUTE_SET_ID, ATTRIBUTE_DEFINITION_ID, REQUIRED, SOURCE_ID, NAME, DESCRIPTION)
values
(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'LocalDimension1'),          0, null, 'SAP GL Account attributes 5', 'SAP GL Account attributes validation' ),
(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'LocalDimension2'),          0, null, 'SAP GL Account attributes 5', 'SAP GL Account attributes validation' ),
(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'LocalDimension3Id'),        1, null, 'SAP GL Account attributes 5', 'SAP GL Account attributes validation' ),
(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'XRef2'),                    1, null, 'SAP GL Account attributes 5', 'SAP GL Account attributes validation' ),
(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'CedentsCountry'),           0, null, 'SAP GL Account attributes 5', 'SAP GL Account attributes validation' ),
(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'TradingPartner'),           0, null, 'SAP GL Account attributes 5', 'SAP GL Account attributes validation' ),
(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'BusinessLine'),             0, null, 'SAP GL Account attributes 5', 'SAP GL Account attributes validation' ),
(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'AAOrderNo'),                0, null, 'SAP GL Account attributes 5', 'SAP GL Account attributes validation' ),
(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'BalanceUnit'),              0, null, 'SAP GL Account attributes 5', 'Other not validated attributes'),
(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'TransactionCode2'),         0, null, 'SAP GL Account attributes 5', 'Other not validated attributes'),
(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'TransactionTypeId'),        0, null, 'SAP GL Account attributes 5', 'Other not validated attributes'),
(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'OfrId'),                    0, null, 'SAP GL Account attributes 5', 'Other not validated attributes'),
(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'TransactionCode1'),         0, null, 'SAP GL Account attributes 5', 'Other not validated attributes'),
(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'Register'),                 0, null, 'SAP GL Account attributes 5', 'Other not validated attributes'),
(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'SapGlAccountId'),           1, null, 'SAP GL Account attributes 5', 'Other not validated attributes'),
(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'DocumentNo' and ATTRIBUTE_VALUE_TYPE_ID = 2),0, null, 'SAP GL Account attributes 5', 'Other not validated attributes'),
(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'PersonalAccountNumber'),    1, null, 'SAP GL Account attributes 5', 'Other not validated attributes'),
(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'PartyCode'),                0, null, 'SAP GL Account attributes 5', 'Other not validated attributes'),
(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'TransactionDocumentTypeId'),0, null, 'SAP GL Account attributes 5', 'Other not validated attributes'),
(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'CommissionRate'),           0, null, 'SAP GL Account attributes 5', 'Other not validated attributes'),
(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'CancelledDocumentNo'),      0, null, 'SAP GL Account attributes 5', 'Other not validated attributes'),
(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'DateToCheckPrevPeriod'),    0, null, 'SAP GL Account attributes 5', 'Other not validated attributes');

insert into ACC_IMPL.SAP_GL_ACCOUNT (SAP_GL_ACCOUNT_NO, DESCRIPTION, ATTRIBUTE_SET_ID)
values ('2970601010', '2970601010', 8);

insert into ACC_IMPL.SAP_GL_ACCOUNT_RULE (GL_ACCOUNT_ID, OFR_ID, PREVIOUS_PERIOD, PERSON_TYPE_ID, SAP_GL_ACCOUNT_ID)
values ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '60301'), null, null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '2970601010'));

-- TRANSACTION DEFINITION
INSERT INTO ACC_IMPL.TRANSACTION_DEFINITION (TRANSACTION_DEFINITION_NO, GL_ACCOUNT_ID_DT, OFR_ID_DT, GL_ACCOUNT_ID_CT, OFR_ID_CT, DOCUMENT_TYPE_ID, BELEGTC, BELEGSC_ALGL_2, BELEGSC_ALGL_3, BUCHUGC, VORGAST_ALGL_2, VORGAST_ALGL_3)
VALUES
('6.3.1', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71406'),	(select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '23103'), (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '60301'), null, null, '09', '09109', '09109', '10', '32', '32'),
('6.3.3', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71406'),	(select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '23101'), (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '60301'), null, null, '09', '09109', '09109', '10', '32', '32'),
('6.4.1', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '60301'), null, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '47417'), null, null, '09', '09109', '09109', '10', '32', '32');

-- FIX previous script
delete from ACC_IMPL.OFR_RULE
where 1=1
	and GL_ACCOUNT_ID = (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71406')
	and DOCUMENT_TYPE_ID is null
	and OFR_ID in (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE in ('23103', '23105'));

insert into ACC_IMPL.OFR_RULE (GL_ACCOUNT_ID, PREVIOUS_PERIOD, DOCUMENT_TYPE_ID, OFR_ID)
values
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71406'), null, 1008, (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '23103')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71406'), null, 1017, (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '23105'));
