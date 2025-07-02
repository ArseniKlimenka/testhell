/*
select * from acc.CT_GL_POSTING_SCHEME where POSTING_SCHEME_ID = 68
select * from acc.GL_POSTING_SCHEME where POSTING_SCHEME_ID = 68
select * from acc.CT_GL_ACCOUNT_TYPE where GL_ACCOUNT_TYPE_ID in (1002, 1013)

select * from acc.GL_POSTING_PROFILE where GL_ACCOUNT_TYPE_ID in (1002, 1013) or GL_ACCOUNT_TYPE_ID is null
select * from acc.GL_ACCOUNT where GL_ACCOUNT_ID in (33,35)
*/

delete from ACC_IMPL.TRANSACTION_DEFINITION where TRANSACTION_DEFINITION_NO in ('2.1.1','2.1.2','2.2.1','2.2.2','2.3.1','2.3.2','2.4.1','2.4.2')
go
insert into acc_impl.TRANSACTION_DEFINITION (TRANSACTION_DEFINITION_NO, TRANSACTION_TYPE_ID, [SIGN], IS_PREVIOUS_PERIOD, IS_LIFE, DOCUMENT_TYPE_ID, BELEGTC, BELEGSC_ALGL_2, BELEGSC_ALGL_3, BUCHUGC, VORGAST_ALGL_2, VORGAST_ALGL_3)
values
('2.1.1', 2, null, 0, 1, 1002, 03, 03011, 03001, 20, 13, 13),
('2.1.2', 2, null, 1, 1, 1002, 03, 03011, 03001, 20, 13, 13),
('2.2.1', 2, null, 0, 0, 1002, 03, 03011, 03001, 20, 14, 14),
('2.2.2', 2, null, 1, 0, 1002, 03, 03011, 03001, 20, 14, 14),
('2.3.1', 2, null, 0, 1, 1016, 03, 03011, 03001, 20, 33, 33),
('2.3.2', 2, null, 0, 0, 1016, 03, 03011, 03001, 20, 33, 33),
('2.4.1', 2, null, 1, 1, 1016, 03, 03011, 03001, 20, 33, 33),
('2.4.2', 2, null, 1, 0, 1016, 03, 03011, 03001, 20, 33, 33)
go

delete from ACC_IMPL.TRANSACTION_DEFINITION_STEP where TRANSACTION_DEFINITION_NO in ('2.1.1','2.1.2','2.2.1','2.2.2','2.3.1','2.3.2','2.4.1','2.4.2')
go
insert into acc_impl.TRANSACTION_DEFINITION_STEP (TRANSACTION_DEFINITION_NO, IS_DEBIT, PAIR_NO, PAIR_SEQ_NO, GL_ACCOUNT_ID, ATTRIBUTE_SET_ID, [SIGN])
values
('2.1.1', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71412'),    6, 1),
('2.1.1', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'),    6, 1),

('2.1.2', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71412'),    6, 1),
('2.1.2', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'),    6, 1),

('2.2.1', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71414'),    6, 1),
('2.2.1', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'),    6, 1),

('2.2.2', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71414'),    6, 1),
('2.2.2', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'),    6, 1),

('2.3.1', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'),    6, -1),
('2.3.1', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71412'), null, -1),

('2.3.2', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'),    6, -1),
('2.3.2', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71414'), null, -1),

('2.4.1', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'),    6, -1),
('2.4.1', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71411'), null, -1),

('2.4.2', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'),    6, -1),
('2.4.2', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71413'), null, -1)
go
