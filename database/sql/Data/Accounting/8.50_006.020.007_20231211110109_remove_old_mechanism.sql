delete from acc_impl.TRANSACTION_DEFINITION where TRANSACTION_DEFINITION_NO in ('5.3.1','5.3.2','5.4.1','5.4.2','6.1.1','6.1.2','6.2.1','6.2.2','6.3.1','6.3.2')
go
insert into acc_impl.TRANSACTION_DEFINITION (TRANSACTION_DEFINITION_NO, DOCUMENT_TYPE_ID, [DESCRIPTION], TRANSACTION_TYPE_ID, [SIGN], IS_PREVIOUS_PERIOD, IS_LIFE, AGENT_TYPE,
	BELEGTC, BELEGSC_ALGL_2, BELEGSC_ALGL_3, BUCHUGC, VORGAST_ALGL_2, VORGAST_ALGL_3)
values
('5.3.1', 1004, null, 5, null, 0, 1, null, null, null, null, null, null, null),
('5.3.2', 1004, null, 5, null, 1, 1, null, null, null, null, null, null, null),
('5.4.1', 1004, null, 5, null, 0, 0, null, null, null, null, null, null, null),
('5.4.2', 1004, null, 5, null, 1, 0, null, null, null, null, null, null, null),
('6.1.1', 1008, null, 5, null, 0, 1, null, '09', '09108', '09108', '10', '32', '32'),
('6.1.2', 1008, null, 5, null, 1, 1, null, '09', '09108', '09108', '10', '32', '32'),
('6.2.1', 1017, null, 5, null, 0, 1, null, '09', '09108', '09108', '10', '32', '32'),
('6.2.2', 1017, null, 5, null, 1, 1, null, '09', '09108', '09108', '10', '32', '32'),
('6.3.1', 1019, null, 5, null, 0, 1, null, '09', '09109', '09109', '10', '32', '32'),
('6.3.2', 1019, null, 5, null, 1, 1, null, '09', '09109', '09109', '10', '32', '32')
go

delete from acc_impl.TRANSACTION_DEFINITION_STEP where TRANSACTION_DEFINITION_NO in ('5.3.1','5.3.2','5.4.1','5.4.2','6.1.1','6.1.2','6.2.1','6.2.2','6.3.1','6.3.2')
go
insert into acc_impl.TRANSACTION_DEFINITION_STEP (TRANSACTION_DEFINITION_NO, IS_DEBIT, PAIR_NO, PAIR_SEQ_NO, GL_ACCOUNT_ID, ATTRIBUTE_SET_ID, [SIGN])
values
('5.3.1' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71406'),    6,  1),
('5.3.1' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48028'), null,  1),
('5.3.2' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71406'),    6,  1),
('5.3.2' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48028'), null,  1),

('5.4.1' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71410'),    6,  1),
('5.4.1' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48028'), null,  1),
('5.4.2' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71410'),    6,  1),
('5.4.2' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48028'), null,  1),
('6.1.1' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71406'),    6,  1),
('6.1.1' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48028'), null,  1),
('6.1.2' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71406'),    6,  1),
('6.1.2' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48028'), null,  1),
('6.2.1' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71406'),    6,  1),
('6.2.1' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48028'), null,  1),
('6.2.2' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71406'),    6,  1),
('6.2.2' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48028'), null,  1),
('6.3.1' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71406'),    6,  1),
('6.3.1' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '60301'), null,  1),
('6.3.2' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71406'),    6,  1),
('6.3.2' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '60301'), null,  1)
go

insert into ACC.ATTRIBUTE_DEFINITION (NAME, ATTRIBUTE_VALUE_TYPE_ID, DESCRIPTION)
values ('ProposedPostDate', 2, N'Proposed posting date')
go

insert into acc.ATTRIBUTE_SET (ATTRIBUTE_SET_ID, ATTRIBUTE_DEFINITION_ID, REQUIRED, SOURCE_ID, NAME, DESCRIPTION)
values
	(3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'ProposedPostDate'), 1, null, 'SAP GL Account attributes 1', 'Other not validated attributes'),
	(4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'ProposedPostDate'), 1, null, 'SAP GL Account attributes 2', 'Other not validated attributes'),
	(5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'ProposedPostDate'), 1, null, 'SAP GL Account attributes 3', 'Other not validated attributes'),
	(7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'ProposedPostDate'), 1, null, 'SAP GL Account attributes 4', 'Other not validated attributes'),
	(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'ProposedPostDate'), 1, null, 'SAP GL Account attributes 5', 'Other not validated attributes'),
	(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'ProposedPostDate'), 1, null, 'SAP GL Account attributes 6', 'Other not validated attributes')
go
