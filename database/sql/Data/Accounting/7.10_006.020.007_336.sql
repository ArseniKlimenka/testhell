update acc.CT_DOCUMENT_TYPE set DESCRIPTION = 'Revalation - premium' where DOCUMENT_TYPE_ID = 1022
go
insert into acc.CT_DOCUMENT_TYPE (DOCUMENT_TYPE_ID, DESCRIPTION) values (1025, 'Revalation - IC')
go

-- TRANSACTION DEFINITION
delete from ACC_IMPL.TRANSACTION_DEFINITION where TRANSACTION_DEFINITION_NO in ('8.1.9','8.1.10','8.1.11','8.1.12','8.1.13','8.1.14','8.1.15','8.1.16')
go
insert into acc_impl.TRANSACTION_DEFINITION (TRANSACTION_DEFINITION_NO, TRANSACTION_TYPE_ID, [SIGN], IS_PREVIOUS_PERIOD, IS_LIFE, DOCUMENT_TYPE_ID)
values
('8.1.9' , 6, 1, 0, 1, 1025),
('8.1.10', 6,-1, 0, 1, 1025),
('8.1.11', 6, 1, 1, 1, 1025),
('8.1.12', 6,-1, 1, 1, 1025),
('8.1.13', 6, 1, 0, 0, 1025),
('8.1.14', 6,-1, 0, 0, 1025),
('8.1.15', 6, 1, 1, 0, 1025),
('8.1.16', 6,-1, 1, 0, 1025)
go

delete from ACC_IMPL.TRANSACTION_DEFINITION_STEP where TRANSACTION_DEFINITION_NO in ('8.1.9','8.1.10','8.1.11','8.1.12','8.1.13','8.1.14','8.1.15','8.1.16')
go
insert into acc_impl.TRANSACTION_DEFINITION_STEP (TRANSACTION_DEFINITION_NO, IS_DEBIT, PAIR_NO, PAIR_SEQ_NO, GL_ACCOUNT_ID, ATTRIBUTE_SET_ID, [SIGN])
values
('8.1.9' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'), null, 1),
('8.1.9' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71511'),    6, 1),
('8.1.10', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71512'), null,-1),
('8.1.10', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'),    6,-1),
('8.1.11', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'), null, 1),
('8.1.11', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72511'),    6, 1),
('8.1.12', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), null, 1),
('8.1.12', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'),    6, 1),
('8.1.13', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'), null, 1),
('8.1.13', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71511'),    6, 1),
('8.1.14', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71512'), null,-1),
('8.1.14', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'),    6,-1),
('8.1.15', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'), null, 1),
('8.1.15', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72511'),    6, 1),
('8.1.16', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), null, 1),
('8.1.16', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'),    6, 1)
go
