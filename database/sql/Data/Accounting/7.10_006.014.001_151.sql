update ACC.ATTRIBUTE_DEFINITION set ATTRIBUTE_VALUE_TYPE_ID = 6 where name = 'DateToCheckPrevPeriod' and ATTRIBUTE_VALUE_TYPE_ID = 2;

alter table ACC.GL_ADDITIONAL_ATTRIBUTES add CANCELLED_DOCUMENT_NO [nvarchar](50) null;
alter table ACC.JR_ADDITIONAL_ATTRIBUTES add CANCELLED_DOCUMENT_NO [nvarchar](50) null;

insert into ACC.ATTRIBUTE_DEFINITION (NAME, ATTRIBUTE_VALUE_TYPE_ID, DESCRIPTION)
values ('CancelledDocumentNo', 2, N'Document number of document that was cancelled by this transaction.');

insert into acc.ATTRIBUTE_SET (ATTRIBUTE_SET_ID, ATTRIBUTE_DEFINITION_ID, REQUIRED, SOURCE_ID, NAME, DESCRIPTION)
values  (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'CancelledDocumentNo'), 0, null, 'SAP GL Account attributes 1', 'Other not validated attributes'),
        (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'CancelledDocumentNo'), 0, null, 'SAP GL Account attributes 2', 'Other not validated attributes'),
        (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'CancelledDocumentNo'), 0, null, 'SAP GL Account attributes 3', 'Other not validated attributes');
