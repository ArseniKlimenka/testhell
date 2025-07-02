INSERT INTO acc.CT_DOCUMENT_TYPE (DOCUMENT_TYPE_ID, DESCRIPTION, ACCOUNT_TYPE_ID, PAYABLE) values (1010,'Tolerance - underpayment',NULL,NULL);
INSERT INTO acc.CT_DOCUMENT_TYPE (DOCUMENT_TYPE_ID, DESCRIPTION, ACCOUNT_TYPE_ID, PAYABLE) values (1011,'Tolerance - overpayment',NULL,NULL);

INSERT INTO acc.CT_GL_ACCOUNT_TYPE (GL_ACCOUNT_TYPE_ID,DESCRIPTION, IS_DEBIT, ATTRIBUTE_SET_ID, FROM_PAYMENT) values (1010,'Underpayment',1,NULL,0);

INSERT INTO acc.GL_ACCOUNT (GL_ACCOUNT_TYPE_ID, GL_ACCOUNT_NO, DESCRIPTION, PARENT_ACCOUNT_ID, SYNTHETIC)
VALUES (1010,'71802', N'Недоплата в валюте договора страхования в пределах, установленных УП',NULL,0),
       (9999,'71701', N'71701',NULL,0);

--TRANSACTION CONFIGURATION (POSTING SCHEME AND PROFILE)
INSERT INTO ACC.CT_GL_POSTING_SCHEME(POSTING_SCHEME_ID, SCHEME_NAME, SCHEME_TYPE_ID, JOURNAL_TYPE_ID, VALUE_SIGN, BA_ACCOUNT_TYPE_ID, INTERNAL, SOURCE_DOC_TYPE_ID, OPENED_BY_ENTRY_TYPE_ID, VALIDITY_START, VALIDITY_END, EXPLICIT, ITEM_TYPE_ID)
VALUES (62, 'Tolerance - Underpayment', 1, 12, null, null, 0, 1010, null, '19000101', '9999-12-31', 0, null);

INSERT INTO ACC.GL_POSTING_SCHEME(POSTING_SCHEME_ID, SEQ_NUMBER, IS_DEBIT, GL_ACCOUNT_TYPE_ID, SIGN, VALUE_FIELD_ID, NET_VALUE_FIELD_ID, PAIR_NO, PAIR_SEQ_NO)
VALUES (62, 1, 1, 1010, 1, 4, 4, 1, 1),
       (62, 2, 0, 1001, 1, 4, 4, 1, 2);

INSERT INTO ACC.GL_POSTING_PROFILE(GL_ACCOUNT_TYPE_ID, ATTRIBUTE_VALUE_SET_ID, GL_ACCOUNT_ID, ATTRIBUTE_SET_ID, PREVIOUS_PERIOD, BA_ACCOUNT_TYPE_ID, PAYMENT_DOCUMENT_TYPE_ID, ANALYTICS_ATTRIBUTE_SET_ID, VALIDITY_START, VALIDITY_END, INVOICE_DOCUMENT_TYPE_ID)
VALUES (1010, null, (select gl_account_id from acc.gl_account where gl_account_no='71802'), 6, NULL, null, null, null, '19000101', '99991231', null);

--OFR CODE select * from ACC_IMPL.CT_OFR
INSERT INTO ACC_IMPL.CT_OFR (OFR_ID, OFR_CODE, DESCRIPTION)
    VALUES (29, N'55606', N'55606'),
           (30, N'54406', N'54406');


INSERT INTO ACC_IMPL.OFR_RULE (GL_ACCOUNT_ID, PREVIOUS_PERIOD, DOCUMENT_TYPE_ID, OFR_ID)
    VALUES ((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71802'), null, null, (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '55606'));

--TRANSACTION DEFINITION
INSERT INTO ACC_IMPL.TRANSACTION_DEFINITION (TRANSACTION_DEFINITION_NO, GL_ACCOUNT_ID_DT, OFR_ID_DT, GL_ACCOUNT_ID_CT, OFR_ID_CT, DOCUMENT_TYPE_ID, BELEGTC, BELEGSC_ALGL_2, BELEGSC_ALGL_3, BUCHUGC, VORGAST_ALGL_2, VORGAST_ALGL_3)
VALUES
('3.8.1', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71802'),	(select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '55606'), (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'), null, null, '09', '09703', '09703', '10', null, null),
('3.8.2', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71802'),	(select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '55606'), (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'), null, null, '09', '09703', '09703', '10', null, null);

--SAP GL ACCOUNT
insert into acc.ATTRIBUTE_SET (ATTRIBUTE_SET_ID, ATTRIBUTE_DEFINITION_ID, REQUIRED, SOURCE_ID, NAME, DESCRIPTION)
values (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'CostCenter'),               1, null, 'SAP GL Account attributes 4', 'SAP GL Account attributes validation' ),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'LocalDimension2'),          0, null, 'SAP GL Account attributes 4', 'SAP GL Account attributes validation' ),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'LocalDimension3Id'),        1, null, 'SAP GL Account attributes 4', 'SAP GL Account attributes validation' ),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'XRef2'),                    0, null, 'SAP GL Account attributes 4', 'SAP GL Account attributes validation' ),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'CedentsCountry'),           0, null, 'SAP GL Account attributes 4', 'SAP GL Account attributes validation' ),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'TradingPartner'),           0, null, 'SAP GL Account attributes 4', 'SAP GL Account attributes validation' ),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'BusinessLine'),             0, null, 'SAP GL Account attributes 4', 'SAP GL Account attributes validation' ),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'AAOrderNo'),                0, null, 'SAP GL Account attributes 4', 'SAP GL Account attributes validation' ),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'BalanceUnit'),              0, null, 'SAP GL Account attributes 4', 'Other not validated attributes'),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'TransactionCode2'),         0, null, 'SAP GL Account attributes 4', 'Other not validated attributes'),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'TransactionTypeId'),        0, null, 'SAP GL Account attributes 4', 'Other not validated attributes'),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'OfrId'),                    0, null, 'SAP GL Account attributes 4', 'Other not validated attributes'),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'TransactionCode1'),         0, null, 'SAP GL Account attributes 4', 'Other not validated attributes'),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'Register'),                 0, null, 'SAP GL Account attributes 4', 'Other not validated attributes'),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'SapGlAccountId'),           1, null, 'SAP GL Account attributes 4', 'Other not validated attributes'),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'DocumentNo' and ATTRIBUTE_VALUE_TYPE_ID = 2),0, null, 'SAP GL Account attributes 4', 'Other not validated attributes'),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'PersonalAccountNumber'),    1, null, 'SAP GL Account attributes 4', 'Other not validated attributes'),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'PartyCode'),                0, null, 'SAP GL Account attributes 4', 'Other not validated attributes'),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'TransactionDocumentTypeId'),0, null, 'SAP GL Account attributes 4', 'Other not validated attributes'),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'CommissionRate'),           0, null, 'SAP GL Account attributes 4', 'Other not validated attributes'),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'CancelledDocumentNo'),      0, null, 'SAP GL Account attributes 4', 'Other not validated attributes'),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'DateToCheckPrevPeriod'),    0, null, 'SAP GL Account attributes 4', 'Other not validated attributes');

INSERT INTO ACC_IMPL.SAP_GL_ACCOUNT (SAP_GL_ACCOUNT_NO, DESCRIPTION, ATTRIBUTE_SET_ID)
VALUES (N'3520302010', N'3520302010', 7),
       (N'3411602120', N'3411602120', 7);

insert into ACC_IMPL.SAP_GL_ACCOUNT_RULE (GL_ACCOUNT_ID, OFR_ID, PREVIOUS_PERIOD, PERSON_TYPE_ID, SAP_GL_ACCOUNT_ID)
    values
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71802'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '55606'),null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3520302010')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71701'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '54406'),null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3411602120'));
