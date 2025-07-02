alter table ACC.GL_ADDITIONAL_ATTRIBUTES add COMMISSION_RATE decimal(15, 6) null;
alter table ACC.JR_ADDITIONAL_ATTRIBUTES add COMMISSION_RATE decimal(15, 6) null;

insert into ACC.ATTRIBUTE_DEFINITION (NAME, ATTRIBUTE_VALUE_TYPE_ID, DESCRIPTION)
values ('CommissionRate', 2, N'Commission rate');

insert into acc.ATTRIBUTE_SET (ATTRIBUTE_SET_ID, ATTRIBUTE_DEFINITION_ID, REQUIRED, SOURCE_ID, NAME, DESCRIPTION)
values  (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'CommissionRate'), 0, null, 'SAP GL Account attributes 1', 'Other not validated attributes'),
        (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'CommissionRate'), 0, null, 'SAP GL Account attributes 2', 'Other not validated attributes'),
        (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'CommissionRate'), 0, null, 'SAP GL Account attributes 3', 'Other not validated attributes');