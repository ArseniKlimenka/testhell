insert into acc.CT_DOCUMENT_TYPE (DOCUMENT_TYPE_ID, DESCRIPTION)
values (1026, 'Premium (FinancialChange)')

-- TRANSACTION DEFINITION
delete from ACC_IMPL.TRANSACTION_DEFINITION where TRANSACTION_DEFINITION_NO in ('1.1.1','1.1.2','1.2.1','1.2.2','1.3.1','1.3.2','1.4.1','1.4.2','1.5.1','1.5.2','1.6.1','1.6.2')
go
insert into acc_impl.TRANSACTION_DEFINITION (TRANSACTION_DEFINITION_NO, TRANSACTION_TYPE_ID, [SIGN], IS_PREVIOUS_PERIOD, IS_LIFE, DOCUMENT_TYPE_ID,
	BELEGTC, BELEGSC_ALGL_2, BELEGSC_ALGL_3, BUCHUGC, VORGAST_ALGL_2, VORGAST_ALGL_3)
values
('1.1.1', 1, null,    0, 1,    1, '01', '01010', '01001', '10', '13', '13'),
('1.1.2', 1, null,    1, 1,    1, '01', '01012', '01001', '10', '13', '13'),
('1.2.1', 1, null,    0, 0,    1, '01', '01010', '01001', '10', '14', '14'),
('1.2.2', 1, null,    1, 0,    1, '01', '01012', '01001', '10', '14', '14'),
('1.3.1', 1, null, null, 1, 1014, '01', '01012', '01001', '10', '33', '33'),
('1.3.2', 1, null, null, 0, 1014, '01', '01012', '01001', '10', '33', '33'),
('1.4.1', 1, null, null, 0, 1015, '01', '01012', '01001', '10', '33', '33'),
--('1.4.2', 1, null, null, 0, 1015, '01', '01012', '01001', '10', '33', '33'),
('1.5.1', 1,   -1,    1, 1, 1026, '01', '01012', '01001', '10', '33', '33'),
('1.5.2', 1,   -1,    1, 0, 1026, '01', '01012', '01001', '10', '33', '33'),
('1.6.1', 1,   -1,    0, 1, 1026, null,    null,    null, null, null, null),
('1.6.2', 1,   -1,    0, 0, 1026, null,    null,    null, null, null, null)
go

delete from ACC_IMPL.TRANSACTION_DEFINITION_STEP where TRANSACTION_DEFINITION_NO in ('1.1.1','1.1.2','1.2.1','1.2.2','1.3.1','1.3.2','1.4.1','1.4.2','1.5.1','1.5.2','1.5.1','1.5.2','1.6.1','1.6.2')
go
insert into acc_impl.TRANSACTION_DEFINITION_STEP (TRANSACTION_DEFINITION_NO, IS_DEBIT, PAIR_NO, PAIR_SEQ_NO, GL_ACCOUNT_ID, ATTRIBUTE_SET_ID, [SIGN])
values
('1.1.1' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'), 6, 1),
('1.1.1' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71401'), 6, 1),
('1.1.2' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'), 6, 1),
('1.1.2' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71401'), 6, 1),
('1.2.1' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'), 6, 1),
('1.2.1' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71403'), 6, 1),
('1.2.2' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'), 6, 1),
('1.2.2' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71403'), 6, 1),

('1.3.1' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71402'), 6, -1),
('1.3.1' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'), 6, -1),
('1.3.2' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71404'), 6, -1),
('1.3.2' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'), 6, -1),
('1.4.1' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71404'), 6, -1),
('1.4.1' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'), 6, -1),
--('1.4.2' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71404'), 6, -1),
--('1.4.2' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'), 6, -1),
('1.5.1' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71402'), 6, -1),
('1.5.1' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'), 6, -1),
('1.5.2' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71404'), 6, -1),
('1.5.2' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'), 6, -1),

('1.6.1' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71402'), 6, -1),
('1.6.1' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'), 6, -1),
('1.6.2' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71404'), 6, -1),
('1.6.2' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'), 6, -1)
go
