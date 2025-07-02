insert into acc.CT_DOCUMENT_TYPE (DOCUMENT_TYPE_ID, DESCRIPTION) values
(1023, 'RSD approved'),
(1024, 'RSD payment allocation')
go

insert into acc.GL_ACCOUNT (GL_ACCOUNT_TYPE_ID, GL_ACCOUNT_NO, DESCRIPTION, PARENT_ACCOUNT_ID, SYNTHETIC)
values
	(9999, '71416', N'Прочие расходы по страхованию жизни', null, 0),
	(9999, '71418', N'Прочие расходы по страхованию иному, чем страхование жизни', null, 0),
	(9999, '48027', N'Резервы под обесценение по активным остаткам на счетах расчетов по операциям страхования и перестрахования', null, 0)
go

insert into ACC_IMPL.CT_TRANSACTION_DOCUMENT_TYPE (TRANSACTION_DOCUMENT_TYPE_ID, TRANSACTION_DOCUMENT_TYPE_CODE, DESCRIPTION)
values  (5, 'SA', 'SA')
go

insert into ACC_IMPL.CT_LOCAL_DIMENSION_3(LOCAL_DIMENSION_3_ID, LOCAL_DIMENSION_3_CODE, DESCRIPTION)
values (3, N'TP20', N'TP20')
go

insert into acc_impl.TRANSACTION_TYPE (TRANSACTION_TYPE_ID, DESCRIPTION, TRANSACTION_DOCUMENT_TYPE_ID, LOCAL_DIMENSION_3_ID)
values
(
	7,
	N'РСД',
	(select TRANSACTION_DOCUMENT_TYPE_ID from ACC_IMPL.CT_TRANSACTION_DOCUMENT_TYPE where TRANSACTION_DOCUMENT_TYPE_CODE = 'SA'),
	(select LOCAL_DIMENSION_3_ID from ACC_IMPL.CT_LOCAL_DIMENSION_3 where LOCAL_DIMENSION_3_CODE = 'TP20')
)
go

INSERT INTO ACC_IMPL.CT_OFR (OFR_ID, OFR_CODE, DESCRIPTION)
VALUES
(38,  '28401', '28401'),
(39,  '29501', '29501')
go

insert into acc_impl.OFR_RULE (GL_ACCOUNT_ID, PREVIOUS_PERIOD, DOCUMENT_TYPE_ID, CURRENCY_CODE, OFR_ID)
values
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71416'), null, null,  null, (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '28401')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71418'), null, null,  null, (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '29501'))
go

insert into acc.ATTRIBUTE_SET (ATTRIBUTE_SET_ID, ATTRIBUTE_DEFINITION_ID, REQUIRED, SOURCE_ID, NAME, DESCRIPTION)
values
--(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'CostCenter'),               0, null, 'SAP GL Account attributes 6', 'SAP GL Account attributes validation' ),
--(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'LocalDimension1'),          0, null, 'SAP GL Account attributes 6', 'SAP GL Account attributes validation' ),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'LocalDimension2'),          0, null, 'SAP GL Account attributes 6', 'SAP GL Account attributes validation' ),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'LocalDimension3Id'),        1, null, 'SAP GL Account attributes 6', 'SAP GL Account attributes validation' ),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'XRef2'),                    1, null, 'SAP GL Account attributes 6', 'SAP GL Account attributes validation' ),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'CedentsCountry'),           0, null, 'SAP GL Account attributes 6', 'SAP GL Account attributes validation' ),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'TradingPartner'),           0, null, 'SAP GL Account attributes 6', 'SAP GL Account attributes validation' ),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'BusinessLine'),             0, null, 'SAP GL Account attributes 6', 'SAP GL Account attributes validation' ),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'AAOrderNo'),                0, null, 'SAP GL Account attributes 6', 'SAP GL Account attributes validation' ),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'BalanceUnit'),              0, null, 'SAP GL Account attributes 6', 'SAP GL Account attributes validation'),

(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'TransactionCode2'),         0, null, 'SAP GL Account attributes 6', 'Other not validated attributes'),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'TransactionTypeId'),        0, null, 'SAP GL Account attributes 6', 'Other not validated attributes'),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'OfrId'),                    0, null, 'SAP GL Account attributes 6', 'Other not validated attributes'),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'TransactionCode1'),         0, null, 'SAP GL Account attributes 6', 'Other not validated attributes'),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'Register'),                 0, null, 'SAP GL Account attributes 6', 'Other not validated attributes'),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'SapGlAccountId'),           1, null, 'SAP GL Account attributes 6', 'Other not validated attributes'),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'DocumentNo' and ATTRIBUTE_VALUE_TYPE_ID = 2),0, null, 'SAP GL Account attributes 6', 'Other not validated attributes'),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'PersonalAccountNumber'),    1, null, 'SAP GL Account attributes 6', 'Other not validated attributes'),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'PartyCode'),                0, null, 'SAP GL Account attributes 6', 'Other not validated attributes'),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'TransactionDocumentTypeId'),0, null, 'SAP GL Account attributes 6', 'Other not validated attributes'),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'DateToCheckPrevPeriod'),    0, null, 'SAP GL Account attributes 6', 'Other not validated attributes'),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'CancelledDocumentNo'),      0, null, 'SAP GL Account attributes 6', 'Other not validated attributes'),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'CommissionRate'),           0, null, 'SAP GL Account attributes 6', 'Other not validated attributes'),

(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'BankStatementItemId'),      0, null, 'SAP GL Account attributes 6', 'Other not validated attributes'),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'CommissionActId'),          0, null, 'SAP GL Account attributes 6', 'Other not validated attributes'),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'ContractNumber'),           0, null, 'SAP GL Account attributes 6', 'Other not validated attributes'),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'PaymentOrderNumber'),       0, null, 'SAP GL Account attributes 6', 'Other not validated attributes'),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where NAME = 'TransactionDefinitionNo'),  0, null, 'SAP GL Account attributes 6', 'Other not validated attributes')
go

insert into ACC_IMPL.SAP_GL_ACCOUNT (SAP_GL_ACCOUNT_NO, DESCRIPTION, ATTRIBUTE_SET_ID)
values
('3110002270', '3110002270', 4),
('3110002290', '3110002290', 4),
('1510102010', '1510102010', 9)
go

insert into acc_impl.SAP_GL_ACCOUNT_RULE (GL_ACCOUNT_ID, OFR_ID, PREVIOUS_PERIOD, PERSON_TYPE_ID, SAP_GL_ACCOUNT_ID)
values
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71416'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '28401'), 0, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3110002270')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71418'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '29501'), 0, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3110002290')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '48027'),                                                          null, 0, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '1510102010'))
go

--delete from ACC_IMPL.TRANSACTION_DEFINITION where TRANSACTION_DEFINITION_NO in ('9.1.1','9.1.2','9.2.1','9.2.2');
insert into acc_impl.TRANSACTION_DEFINITION (TRANSACTION_DEFINITION_NO, TRANSACTION_TYPE_ID, [SIGN], IS_PREVIOUS_PERIOD, IS_LIFE, DOCUMENT_TYPE_ID)
values
('9.1.1', 7, null, 0, 0, 1023),
('9.1.2', 7, null, 0, 0, 1024),
('9.2.1', 7, null, 0, 1, 1023),
('9.2.2', 7, null, 0, 1, 1024)
go

--delete from ACC_IMPL.TRANSACTION_DEFINITION_STEP where TRANSACTION_DEFINITION_NO in ('9.1.1','9.1.2','9.2.1','9.2.2');
insert into acc_impl.TRANSACTION_DEFINITION_STEP (TRANSACTION_DEFINITION_NO, IS_DEBIT, PAIR_NO, PAIR_SEQ_NO, GL_ACCOUNT_ID, ATTRIBUTE_SET_ID, [SIGN])
values
('9.1.1', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71416'), null, 1),
('9.1.1', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48027'),    6, 1),
('9.1.2', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48027'), null, 1),
('9.1.2', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'),    6, 1),
('9.2.1', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71418'), null, 1),
('9.2.1', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48027'),    6, 1),
('9.2.2', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48027'), null, 1),
('9.2.2', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'),    6, 1)
go
