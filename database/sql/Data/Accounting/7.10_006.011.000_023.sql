
--region DATA
update ACC.PERIOD set end_date = '2018-06-01' where period_id = 2;

insert into bfx.SEQUENCES_BIG (sequence_code, info, sequence_id)
values ('ACC.GL_SUBLEDGER_ENTRY.PAIR_NO', 'Subledger entry pair number', 0);

--region ATTRIBUTE_SET
insert into ACC.ATTRIBUTE_DEFINITION (NAME, ATTRIBUTE_VALUE_TYPE_ID, DESCRIPTION)
values ('IsLife', 11, N'Is life'),
       ('CostCenter', 2, N'Cost center (МВЗ)'),
       ('LocalDimension1', 2, N'Local dimension 1'),
       ('LocalDimension2', 2, N'Local dimension 2'),
       ('LocalDimension3Id', 1, N'Local dimension 3'),
       ('XRef2', 2, N'X Reference 2'),
       ('CedentsCountry', 2, N'Cedent''s country'),
       ('TradingPartner', 2, N'Trading partner'),
       ('BusinessLine', 2, N'Local line of business'),
       ('AAOrderNo', 2, N'AA Order number (Заказ)');

insert into ACC.ATTRIBUTE_DEFINITION (NAME, ATTRIBUTE_VALUE_TYPE_ID, DESCRIPTION)
values ('BalanceUnit', 2, N'Balance unit (БЕ)'),
       ('TransactionCode2', 1, N'Transaction code 2'),
       ('TransactionTypeId', 1, N'Transaction type ID'),
       ('OfrId', 1, N'OFR ID'),
       ('TransactionCode1', 1, N'Transaction code 1'),
       ('Register', 2, N'Register'),
       ('SapGlAccountId', 1, N'SAP GL account ID'),
       ('ContractNo', 2, N'Contract number'),
       ('PersonalAccountNumber', 2, N'Personal account number'),
       ('PartyCode', 2, N'Party code'),
       ('TransactionDocumentTypeId', 1, N'Transaction document type ID');


insert into acc.ATTRIBUTE_SET (ATTRIBUTE_SET_ID, ATTRIBUTE_DEFINITION_ID, REQUIRED, SOURCE_ID, NAME, DESCRIPTION)
values (2, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'IsLife'), 1, null, 'Profile selection', 'Profile selection' );


insert into acc.ATTRIBUTE_SET (ATTRIBUTE_SET_ID, ATTRIBUTE_DEFINITION_ID, REQUIRED, SOURCE_ID, NAME, DESCRIPTION)
values (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'LocalDimension2'),   0, null, 'SAP GL Account attributes 1', 'SAP GL Account attributes validation' ),
       (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'LocalDimension3Id'), 1, null, 'SAP GL Account attributes 1', 'SAP GL Account attributes validation' ),
       (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'XRef2'),             1, null, 'SAP GL Account attributes 1', 'SAP GL Account attributes validation' ),
       (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'CedentsCountry'),    0, null, 'SAP GL Account attributes 1', 'SAP GL Account attributes validation' ),
       (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'TradingPartner'),    0, null, 'SAP GL Account attributes 1', 'SAP GL Account attributes validation' ),
       (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'BusinessLine'),      0, null, 'SAP GL Account attributes 1', 'SAP GL Account attributes validation' ),
       (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'BalanceUnit'),       0, null, 'SAP GL Account attributes 1', 'Other not validated attributes'),
       (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'TransactionCode2'),  0, null, 'SAP GL Account attributes 1', 'Other not validated attributes'),
       (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'TransactionTypeId'), 0, null, 'SAP GL Account attributes 1', 'Other not validated attributes'),
       (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'OfrId'),             0, null, 'SAP GL Account attributes 1', 'Other not validated attributes'),
       (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'TransactionCode1'),  0, null, 'SAP GL Account attributes 1', 'Other not validated attributes'),
       (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'Register'),          0, null, 'SAP GL Account attributes 1', 'Other not validated attributes'),
       (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'SapGlAccountId'),    1, null, 'SAP GL Account attributes 1', 'Other not validated attributes'),
       (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'ContractNo'),        0, null, 'SAP GL Account attributes 1', 'Other not validated attributes'),
       (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'PersonalAccountNumber'), 1, null, 'SAP GL Account attributes 1', 'Other not validated attributes'),
       (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'PartyCode'),         0, null, 'SAP GL Account attributes 1', 'Other not validated attributes'),
       (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'TransactionDocumentTypeId'), 0, null, 'SAP GL Account attributes 1', 'Other not validated attributes'),

       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'CostCenter'),        1, null, 'SAP GL Account attributes 2', 'SAP GL Account attributes validation' ),
       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'LocalDimension2'),   1, null, 'SAP GL Account attributes 2', 'SAP GL Account attributes validation' ),
       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'LocalDimension3Id'), 1, null, 'SAP GL Account attributes 2', 'SAP GL Account attributes validation' ),
       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'XRef2'),             1, null, 'SAP GL Account attributes 2', 'SAP GL Account attributes validation' ),
       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'CedentsCountry'),    0, null, 'SAP GL Account attributes 2', 'SAP GL Account attributes validation' ),
       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'TradingPartner'),    0, null, 'SAP GL Account attributes 2', 'SAP GL Account attributes validation' ),
       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'BusinessLine'),      1, null, 'SAP GL Account attributes 2', 'SAP GL Account attributes validation' ),
       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'AAOrderNo'),         0, null, 'SAP GL Account attributes 2', 'SAP GL Account attributes validation' ),
       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'BalanceUnit'),       0, null, 'SAP GL Account attributes 2', 'Other not validated attributes'),
       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'TransactionCode2'),  0, null, 'SAP GL Account attributes 2', 'Other not validated attributes'),
       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'TransactionTypeId'), 0, null, 'SAP GL Account attributes 2', 'Other not validated attributes'),
       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'OfrId'),             0, null, 'SAP GL Account attributes 2', 'Other not validated attributes'),
       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'TransactionCode1'),  0, null, 'SAP GL Account attributes 2', 'Other not validated attributes'),
       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'Register'),          0, null, 'SAP GL Account attributes 2', 'Other not validated attributes'),
       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'SapGlAccountId'),    1, null, 'SAP GL Account attributes 2', 'Other not validated attributes'),
       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'ContractNo'),        0, null, 'SAP GL Account attributes 2', 'Other not validated attributes'),
       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'PersonalAccountNumber'), 1, null, 'SAP GL Account attributes 2', 'Other not validated attributes'),
       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'PartyCode'),         0, null, 'SAP GL Account attributes 2', 'Other not validated attributes'),
       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'TransactionDocumentTypeId'), 0, null, 'SAP GL Account attributes 2', 'Other not validated attributes'),

       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'CostCenter'),         1, null, 'SAP GL Account attributes 3', 'SAP GL Account attributes validation' ),
       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'LocalDimension2'),    0, null, 'SAP GL Account attributes 3', 'SAP GL Account attributes validation' ),
       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'LocalDimension3Id'),  1, null, 'SAP GL Account attributes 3', 'SAP GL Account attributes validation' ),
       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'XRef2'),              1, null, 'SAP GL Account attributes 3', 'SAP GL Account attributes validation' ),
       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'CedentsCountry'),     0, null, 'SAP GL Account attributes 3', 'SAP GL Account attributes validation' ),
       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'TradingPartner'),     0, null, 'SAP GL Account attributes 3', 'SAP GL Account attributes validation' ),
       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'BusinessLine'),       1, null, 'SAP GL Account attributes 3', 'SAP GL Account attributes validation' ),
       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'AAOrderNo'),          0, null, 'SAP GL Account attributes 3', 'SAP GL Account attributes validation' ),
       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'BalanceUnit'),        0, null, 'SAP GL Account attributes 3', 'Other not validated attributes'),
       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'TransactionCode2'),   0, null, 'SAP GL Account attributes 3', 'Other not validated attributes'),
       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'TransactionTypeId'),  0, null, 'SAP GL Account attributes 3', 'Other not validated attributes'),
       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'OfrId'),              0, null, 'SAP GL Account attributes 3', 'Other not validated attributes'),
       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'TransactionCode1'),   0, null, 'SAP GL Account attributes 3', 'Other not validated attributes'),
       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'Register'),           0, null, 'SAP GL Account attributes 3', 'Other not validated attributes'),
       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'SapGlAccountId'),     1, null, 'SAP GL Account attributes 3', 'Other not validated attributes'),
       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'ContractNo'),         0, null, 'SAP GL Account attributes 3', 'Other not validated attributes'),
       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'PersonalAccountNumber'), 1, null, 'SAP GL Account attributes 3', 'Other not validated attributes'),
       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'PartyCode'),          0, null, 'SAP GL Account attributes 3', 'Other not validated attributes'),
       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'TransactionDocumentTypeId'), 0, null, 'SAP GL Account attributes 3', 'Other not validated attributes');


--endregion

--region ATTRIBUTE_VALUE_SET
delete from acc.ATTRIBUTE_VALUE_SET where VALUE_SET_HASH = '0182854147aa64edd9ff43aad05fe3ad95ca94018b832e41ec2a7950d617d41b';

INSERT INTO ACC.ATTRIBUTE_VALUE_SET (VALUE_SET_HASH, IS_LIFE, AVS_PURPOSE_ID)
VALUES (N'cdbae565ea42c24aec3bd6725b0ddbd9ba19b65ad043eebdaeee07fe24290e8c', 1, 3), --";True"
       (N'48c6d3cacb4374e206eace8692ab6620655e6bcb485b60442f4bee85d197df79', 0, 3); --";False"

--endregion

--region GL_ACCOUNT_TYPE
insert into ACC.CT_GL_ACCOUNT_TYPE (GL_ACCOUNT_TYPE_ID, DESCRIPTION, ATTRIBUTE_SET_ID, FROM_PAYMENT)
values (1001, N'Accounts receivable - debit', 2, 0),
       (2, N'TODO', 2, 0),
       (9999, N'Other', null, 0); --for the needs to insert GL accounts.
update acc.CT_GL_ACCOUNT_TYPE set attribute_set_id = 2 where gl_account_type_id = 2;--revenue
--endregion

--region GL_ACCOUNT
insert into ACC.GL_ACCOUNT (GL_ACCOUNT_TYPE_ID, GL_ACCOUNT_NO, DESCRIPTION, PARENT_ACCOUNT_ID, SYNTHETIC)
values (1001, '48001', N'Расчеты по страховым премиям (взносам) со страхователями по договорам страхования жизни', null, 0),
       (1001, '48003', N'Расчеты по страховым премиям (взносам) со страхователями по договорам страхования иного, чем страхование жизни', null, 0),
       (2, '71401', N'71401 TODO', null, 0),
       (2, '71403', N'71403 TODO', null, 0),
       (9999, '47416', '47416', null, 0),
       (9999, '47417', '47417', null, 0),
       (9999, '48002', '48002', null, 0),
       (9999, '48021', '48021', null, 0),
       (9999, '48022', '48022', null, 0),
       (9999, '48023', '48023', null, 0),
       (9999, '48024', '48024', null, 0),
       (9999, '48028', '48028', null, 0),
       (9999, '48029', '48029', null, 0),
       (9999, '71402', '71402', null, 0),
       (9999, '71404', '71404', null, 0),
       (9999, '71406', '71406', null, 0),
       (9999, '71410', '71410', null, 0),
       (9999, '71411', '71411', null, 0),
       (9999, '71412', '71412', null, 0),
       (9999, '71413', '71413', null, 0),
       (9999, '71414', '71414', null, 0);
--endregion

--region GL_POSTING_SCHEME
delete from ACC.GL_POSTING_SCHEME where posting_scheme_id = 5;
INSERT INTO ACC.GL_POSTING_SCHEME (POSTING_SCHEME_ID, SEQ_NUMBER, IS_DEBIT, GL_ACCOUNT_TYPE_ID, SIGN, VALUE_FIELD_ID, NET_VALUE_FIELD_ID, PAIR_NO, PAIR_SEQ_NO)
VALUES (5, 1, 1, 1001, 1, 3, 1,  1, 1),
       (5, 2, 0, 2,    1, 1, 1, 1, 2);
--endregion

--region GL_POSTING_PROFILE

INSERT INTO ACC.GL_POSTING_PROFILE (GL_ACCOUNT_TYPE_ID, ATTRIBUTE_VALUE_SET_ID, GL_ACCOUNT_ID, ATTRIBUTE_SET_ID, PREVIOUS_PERIOD, BA_ACCOUNT_TYPE_ID, PAYMENT_DOCUMENT_TYPE_ID, ANALYTICS_ATTRIBUTE_SET_ID, SUBDOCUMENT_TYPE_ID, VALIDITY_START, VALIDITY_END, INVOICE_DOCUMENT_TYPE_ID)
VALUES (1001, (select ATTRIBUTE_VALUE_SET_ID from ACC.ATTRIBUTE_VALUE_SET where AVS_PURPOSE_ID = 3 AND IS_LIFE = 1), (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'), null, null, null, null, null, null, N'1900-01-01 00:00:00.000', N'9999-01-01 00:00:00.000', null),
       (1001, (select ATTRIBUTE_VALUE_SET_ID from ACC.ATTRIBUTE_VALUE_SET where AVS_PURPOSE_ID = 3 AND IS_LIFE = 0), (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'), null, null, null, null, null, null, N'1900-01-01 00:00:00.000', N'9999-01-01 00:00:00.000', null),
       (2,    (select ATTRIBUTE_VALUE_SET_ID from ACC.ATTRIBUTE_VALUE_SET where AVS_PURPOSE_ID = 3 AND IS_LIFE = 1), (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71401'), null, null, null, null, null, null, N'1900-01-01 00:00:00.000', N'9999-01-01 00:00:00.000', null),
       (2,    (select ATTRIBUTE_VALUE_SET_ID from ACC.ATTRIBUTE_VALUE_SET where AVS_PURPOSE_ID = 3 AND IS_LIFE = 0), (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71403'), null, null, null, null, null, null, N'1900-01-01 00:00:00.000', N'9999-01-01 00:00:00.000', null);
--endregion

    --region ACC_IMPL.CT_OFR

    INSERT INTO ACC_IMPL.CT_OFR (OFR_ID, OFR_CODE, DESCRIPTION)
    VALUES (1,  '11101', '11101'),
           (2,  '11105', '11105'),
           (3,  '12101', '12101'),
           (4,  '12105', '12105'),
           (5,  '26101', '26101'),
           (6,  '26109', '26109'),
           (7,  '27101', '27101'),
           (8,  '27109', '27109'),
           (9,  '23103', '23103'),
           (10, '25101', '25101'),
           (11, '23101', '23101'),
           (12, '11103', '11103'),
           (13, '21101', '21101'),
           (14, '21103', '21103'),
           (15, '21107', '21107'),
           (16, '21105', '21105'),
           (17, '12103', '12103'),
           (18, '22101', '22101'),
           (19, '22103', '22103'),
           (20, '22109', '22109'),
           (21, '22105', '22105'),
           (22, '22107', '22107'),
           (23, '16101', '16101'),
           (24, '16102', '16102'),
           (25, '26102', '26102'),
           (26, '27102', '27102'),
           (27, '17101', '17101'),
           (28, '17102', '17102');



    --endregion

    --region ACC_IMPL.CT_TRANSACTION_DOCUMENT_TYPE
    insert into ACC_IMPL.CT_TRANSACTION_DOCUMENT_TYPE (TRANSACTION_DOCUMENT_TYPE_ID, TRANSACTION_DOCUMENT_TYPE_CODE, DESCRIPTION)
    values  (1, N'1P', N'1P'),
            (2, N'1H', N'1H'),
            (3, N'1B', N'1B'),
            (4, N'1D', N'1D');

    --endregion

    --region ACC_IMPL.CT_LOCAL_DIMENSION_3

    insert into ACC_IMPL.CT_LOCAL_DIMENSION_3(LOCAL_DIMENSION_3_ID, LOCAL_DIMENSION_3_CODE, DESCRIPTION)
    values (1, N'TX20', N'TX20'),
           (2, N'ET20', N'ET20');
    --endregion

    --region ACC_IMPL.CT_TRANSACTION_CODE_1

    insert into ACC_IMPL.CT_TRANSACTION_CODE_1 (TRANSACTION_CODE_1_ID, TRANSACTION_CODE, DESCRIPTION)
    values (1, 'FB01', 'FB01'),
           (2, 'FBB1', 'FBB1');

    --endregion

    --region ACC_IMPL.CT_PERSON_TYPE

    insert into ACC_IMPL.CT_PERSON_TYPE (PERSON_TYPE_ID, DESCRIPTION)
    values (1, 'Agent - Natural person'),
           (2, 'Agent - Legal person'),
           (3, 'Agent - Broker');

    --endregion

    --region ACC_IMPL.SAP_GL_ACCOUNT

    insert into ACC_IMPL.SAP_GL_ACCOUNT (SAP_GL_ACCOUNT_NO, DESCRIPTION, ATTRIBUTE_SET_ID)
    values
    ('2980403010', '2980403010', 3),
    ('1580502310', '1580502310', 3),
    ('1510002010', '1510002010', 3),
    ('2980702070', '2980702070', 3),
    ('2910002010', '2910002010', 3),
    ('1520002080', '1520002080', 3),
    ('2920002080', '2920002080', 3),
    ('1580102130', '1580102130', 3),
    ('3110002010', '3110002010', 4),
    ('3110002120', '3110002120', 4),
    ('3110002320', '3110002320', 4),
    ('3110002220', '3110002220', 4),
    ('3110002080', '3110002080', 4),
    ('3120402010', '3120402010', 5),
    ('3130402010', '3130402010', 5),
    ('3170122010', '3170122010', 5),
    ('3170122020', '3170122020', 5),
    ('3170122030', '3170122030', 5);
    --endregion

    --region ACC_IMPL.TRANSACTION_TYPE

    insert into ACC_IMPL.TRANSACTION_TYPE (TRANSACTION_TYPE_ID, DESCRIPTION, TRANSACTION_DOCUMENT_TYPE_ID, LOCAL_DIMENSION_3_ID)
    values (1,
            N'Начисление страховой премии',
            (select TRANSACTION_DOCUMENT_TYPE_ID from ACC_IMPL.CT_TRANSACTION_DOCUMENT_TYPE where TRANSACTION_DOCUMENT_TYPE_CODE = '1P'),
            (select LOCAL_DIMENSION_3_ID from ACC_IMPL.CT_LOCAL_DIMENSION_3 where LOCAL_DIMENSION_3_CODE = 'TX20')),
           (2,
            N'Начисление  вознаграждения посредникам (Оценка)',
            (select TRANSACTION_DOCUMENT_TYPE_ID from ACC_IMPL.CT_TRANSACTION_DOCUMENT_TYPE where TRANSACTION_DOCUMENT_TYPE_CODE = '1H'),
            (select LOCAL_DIMENSION_3_ID from ACC_IMPL.CT_LOCAL_DIMENSION_3 where LOCAL_DIMENSION_3_CODE = 'ET20')),
           (3,
            N'Начисление  вознаграждения посредникам (Факт)',
            (select TRANSACTION_DOCUMENT_TYPE_ID from ACC_IMPL.CT_TRANSACTION_DOCUMENT_TYPE where TRANSACTION_DOCUMENT_TYPE_CODE = '1H'),
            (select LOCAL_DIMENSION_3_ID from ACC_IMPL.CT_LOCAL_DIMENSION_3 where LOCAL_DIMENSION_3_CODE = 'TX20')),
           (4,
            N'Распределение платежей',
            (select TRANSACTION_DOCUMENT_TYPE_ID from ACC_IMPL.CT_TRANSACTION_DOCUMENT_TYPE where TRANSACTION_DOCUMENT_TYPE_CODE = '1B'),
            (select LOCAL_DIMENSION_3_ID from ACC_IMPL.CT_LOCAL_DIMENSION_3 where LOCAL_DIMENSION_3_CODE = 'TX20')),
           (5,
            N'Выплаты',
            (select TRANSACTION_DOCUMENT_TYPE_ID from ACC_IMPL.CT_TRANSACTION_DOCUMENT_TYPE where TRANSACTION_DOCUMENT_TYPE_CODE = '1D'),
            (select LOCAL_DIMENSION_3_ID from ACC_IMPL.CT_LOCAL_DIMENSION_3 where LOCAL_DIMENSION_3_CODE = 'TX20'));

    --endregion

    --region ACC_IMPL.OFR_RULE
    insert into ACC_IMPL.OFR_RULE (GL_ACCOUNT_ID, PREVIOUS_PERIOD, DOCUMENT_TYPE_ID, OFR_ID)
    values ((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71401'), 0, null, (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '11101')),
           ((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71401'), 1, null, (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '11105')),
           ((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71403'), 0, null, (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '12101')),
           ((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71403'), 1, null, (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '12105'));

    --endregion

    --region ACC_IMPL.SAP_GL_ACCOUNT_RULE

    insert into ACC_IMPL.SAP_GL_ACCOUNT_RULE (GL_ACCOUNT_ID, OFR_ID, PREVIOUS_PERIOD, PERSON_TYPE_ID, SAP_GL_ACCOUNT_ID)
    values
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '47416'), null, null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '2980403010')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '47417'), null, null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '1580502310')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'), null, null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '1510002010')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '48002'), null, null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '2910002010')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'), null, null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '1510002010')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '48021'), null, null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '1520002080')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'), null, null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '2920002080')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '48023'), null, null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '1520002080')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '48024'), null, null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '2920002080')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '48028'), null, null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '1580102130')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '48029'), null, null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '2980702070')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71401'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '11101'),null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3110002010')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71401'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '11103'),null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3110002010')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71401'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '11105'),null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3110002120')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71402'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '21101'),null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3110002320')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71402'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '21103'),null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3110002320')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71402'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '21107'),null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3110002220')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71402'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '21105'),null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3110002080')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71402'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '21107'),null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3110002010')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71403'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '12101'),null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3110002010')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71403'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '12103'),null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3110002010')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71403'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '12105'),null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3110002120')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71404'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '22101'),null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3110002320')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71404'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '22103'),null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3110002320')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71404'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '22109'),null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3110002320')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71404'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '22105'),null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3110002320')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71404'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '22107'),null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3110002320')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71404'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '22109'),null, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3110002010')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71406'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '23103'), 0, null,	(select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3120402010')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71406'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '23103'), 1, null,	(select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3130402010')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71406'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '23101'), 0, null,	(select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3120402010')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71406'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '23101'), 1, null,	(select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3130402010')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71410'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '25101'), 0, null,	(select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3120402010')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71410'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '25101'), 1, null,	(select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3130402010')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71411'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '16101'), null, 2, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3170122010')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71411'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '16101'), null, 1, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3170122020')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71411'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '16102'), null, 3, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3170122030')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71412'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '26101'), null, 2, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3170122010')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71412'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '26101'), null, 1, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3170122020')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71412'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '26102'), null, 3, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3170122030')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71412'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '26109'), null, 2, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3170122010')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71412'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '26109'), null, 1, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3170122020')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71412'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '26109'), null, 3, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3170122030')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71412'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '27102'), null, 3, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3170122030')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71413'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '17101'), null, 2, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3170122010')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71413'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '17101'), null, 1, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3170122020')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71413'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '17102'), null, 3, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3170122030')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71414'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '27101'), null, 2, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3170122010')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71414'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '27101'), null, 1, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3170122020')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71414'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '27102'), null, 3, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3170122030')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71414'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '27109'), null, 2, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3170122010')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71414'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '27109'), null, 1, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3170122020')),
    ((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71414'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '27109'), null, 3, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3170122030'));

    --endregion

--endregion