alter table ACC.GL_ADDITIONAL_ATTRIBUTES add BANK_STATEMENT_ITEM_ID bigint null constraint FK_ACC_GL_BANK_STATEMENT_ITEM_ID foreign key references ACC_IMPL.BANK_STATEMENT_ITEM (BANK_STATEMENT_ITEM_ID);
alter table ACC.GL_ADDITIONAL_ATTRIBUTES add COMMISSION_ACT_ID bigint null constraint FK_ACC_GL_COMMISSION_ACT_ID foreign key references ACC_IMPL.CA_ACT (ACT_ID);
alter table ACC.GL_ADDITIONAL_ATTRIBUTES add CONTRACT_NUMBER nvarchar(64) null constraint FK_PAS_GL_CONTRACT_NUMBER foreign key references PAS.CONTRACT (CONTRACT_NUMBER);
alter table ACC.GL_ADDITIONAL_ATTRIBUTES add PAYMENT_ORDER_NUMBER nvarchar(64) null constraint FK_ACC_GL_PAYMENT_ORDER_NUMBER foreign key references ACC.PAYMENT_ORDER (PAYMENT_ORDER_NUMBER);

insert into ACC.ATTRIBUTE_DEFINITION (NAME, ATTRIBUTE_VALUE_TYPE_ID, DESCRIPTION)
values ('BankStatementItemId', 1, N'Bank statement item ID');
insert into ACC.ATTRIBUTE_DEFINITION (NAME, ATTRIBUTE_VALUE_TYPE_ID, DESCRIPTION)
values ('CommissionActId', 1, N'Commission act ID');
insert into ACC.ATTRIBUTE_DEFINITION (NAME, ATTRIBUTE_VALUE_TYPE_ID, DESCRIPTION)
values ('ContractNumber', 2, N'Contract number');
insert into ACC.ATTRIBUTE_DEFINITION (NAME, ATTRIBUTE_VALUE_TYPE_ID, DESCRIPTION)
values ('PaymentOrderNumber', 2, N'Payment order number');

insert into acc.ATTRIBUTE_SET (ATTRIBUTE_SET_ID, ATTRIBUTE_DEFINITION_ID, REQUIRED, SOURCE_ID, NAME, DESCRIPTION)
values (1, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'BankStatementItemId'), 0, null, 'NAME1', 'Other not validated attributes'),
       (2, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'BankStatementItemId'), 0, null, 'Profile selection', 'Other not validated attributes'),
       (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'BankStatementItemId'), 0, null, 'SAP GL Account attributes 1', 'Other not validated attributes'),
       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'BankStatementItemId'), 0, null, 'SAP GL Account attributes 2', 'Other not validated attributes'),
       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'BankStatementItemId'), 0, null, 'SAP GL Account attributes 3', 'Other not validated attributes'),
       (6, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'BankStatementItemId'), 0, null, 'Subledger AVS', 'Other not validated attributes'),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'BankStatementItemId'), 0, null, 'SAP GL Account attributes 4', 'Other not validated attributes'),
       (8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'BankStatementItemId'), 0, null, 'SAP GL Account attributes 5', 'Other not validated attributes');
insert into acc.ATTRIBUTE_SET (ATTRIBUTE_SET_ID, ATTRIBUTE_DEFINITION_ID, REQUIRED, SOURCE_ID, NAME, DESCRIPTION)
values (1, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'CommissionActId'), 0, null, 'NAME1', 'Other not validated attributes'),
       (2, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'CommissionActId'), 0, null, 'Profile selection', 'Other not validated attributes'),
       (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'CommissionActId'), 0, null, 'SAP GL Account attributes 1', 'Other not validated attributes'),
       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'CommissionActId'), 0, null, 'SAP GL Account attributes 2', 'Other not validated attributes'),
       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'CommissionActId'), 0, null, 'SAP GL Account attributes 3', 'Other not validated attributes'),
       (6, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'CommissionActId'), 0, null, 'Subledger AVS', 'Other not validated attributes'),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'CommissionActId'), 0, null, 'SAP GL Account attributes 4', 'Other not validated attributes'),
       (8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'CommissionActId'), 0, null, 'SAP GL Account attributes 5', 'Other not validated attributes');
insert into acc.ATTRIBUTE_SET (ATTRIBUTE_SET_ID, ATTRIBUTE_DEFINITION_ID, REQUIRED, SOURCE_ID, NAME, DESCRIPTION)
values (1, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'ContractNumber'), 0, null, 'NAME1', 'Other not validated attributes'),
       (2, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'ContractNumber'), 0, null, 'Profile selection', 'Other not validated attributes'),
       (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'ContractNumber'), 0, null, 'SAP GL Account attributes 1', 'Other not validated attributes'),
       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'ContractNumber'), 0, null, 'SAP GL Account attributes 2', 'Other not validated attributes'),
       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'ContractNumber'), 0, null, 'SAP GL Account attributes 3', 'Other not validated attributes'),
       (6, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'ContractNumber'), 0, null, 'Subledger AVS', 'Other not validated attributes'),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'ContractNumber'), 0, null, 'SAP GL Account attributes 4', 'Other not validated attributes'),
       (8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'ContractNumber'), 0, null, 'SAP GL Account attributes 5', 'Other not validated attributes');
insert into acc.ATTRIBUTE_SET (ATTRIBUTE_SET_ID, ATTRIBUTE_DEFINITION_ID, REQUIRED, SOURCE_ID, NAME, DESCRIPTION)
values (1, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'PaymentOrderNumber'), 0, null, 'NAME1', 'Other not validated attributes'),
       (2, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'PaymentOrderNumber'), 0, null, 'Profile selection', 'Other not validated attributes'),
       (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'PaymentOrderNumber'), 0, null, 'SAP GL Account attributes 1', 'Other not validated attributes'),
       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'PaymentOrderNumber'), 0, null, 'SAP GL Account attributes 2', 'Other not validated attributes'),
       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'PaymentOrderNumber'), 0, null, 'SAP GL Account attributes 3', 'Other not validated attributes'),
       (6, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'PaymentOrderNumber'), 0, null, 'Subledger AVS', 'Other not validated attributes'),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'PaymentOrderNumber'), 0, null, 'SAP GL Account attributes 4', 'Other not validated attributes'),
       (8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'PaymentOrderNumber'), 0, null, 'SAP GL Account attributes 5', 'Other not validated attributes');