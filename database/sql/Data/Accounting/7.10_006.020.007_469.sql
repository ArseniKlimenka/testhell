delete from acc_impl.TRANSACTION_DEFINITION where TRANSACTION_DEFINITION_NO in ('4.1.1','4.1.2','4.2.1','4.2.2','4.3.1','4.3.2','4.4.1','4.4.2')
go
insert into acc_impl.TRANSACTION_DEFINITION (TRANSACTION_DEFINITION_NO, DOCUMENT_TYPE_ID, [DESCRIPTION],
	BELEGTC, BELEGSC_ALGL_2, BELEGSC_ALGL_3, BUCHUGC, VORGAST_ALGL_2, VORGAST_ALGL_3, TRANSACTION_TYPE_ID, [SIGN], IS_PREVIOUS_PERIOD, IS_LIFE, AGENT_TYPE)
values
('4.1.1', 1003, null, 09, 09301, 09301, 20, 13, 13, 3, null, 0, 1, null),
('4.1.2', 1003, null, 09, 09301, 09301, 20, 13, 13, 3, null, 1, 1, null),
('4.2.1', 1003, null, 09, 09301, 09301, 20, 14, 14, 3, null, 0, 0, null),
('4.2.2', 1003, null, 09, 09301, 09301, 20, 14, 14, 3, null, 1, 0, null),
('4.3.1', 1003, null, 09, 09301, 09301, 20, 13, 13, 3, null, 0, 1, 'broker'),
('4.3.2', 1003, null, 09, 09301, 09301, 20, 13, 13, 3, null, 1, 1, 'broker'),
('4.4.1', 1003, null, 09, 09301, 09301, 20, 14, 14, 3, null, 0, 0, 'broker'),
('4.4.2', 1003, null, 09, 09301, 09301, 20, 14, 14, 3, null, 1, 0, 'broker')
go

delete from acc_impl.TRANSACTION_DEFINITION_STEP where TRANSACTION_DEFINITION_NO in ('4.1.1','4.1.2','4.2.1','4.2.2','4.3.1','4.3.2','4.4.1','4.4.2')
go
insert into acc_impl.TRANSACTION_DEFINITION_STEP (TRANSACTION_DEFINITION_NO, IS_DEBIT, PAIR_NO, PAIR_SEQ_NO, GL_ACCOUNT_ID, ATTRIBUTE_SET_ID, [SIGN])
values
('4.1.1' , 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='71412'),    6,  1),
('4.1.1' , 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48022'),    6,  1),
('4.1.2' , 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='71412'),    6,  1),
('4.1.2' , 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48022'),    6,  1),
('4.2.1' , 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='71414'),    6,  1),
('4.2.1' , 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48022'),    6,  1),
('4.2.2' , 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='71414'),    6,  1),
('4.2.2' , 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48022'),    6,  1),
('4.3.1' , 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='71412'),    6,  1),
('4.3.1' , 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48022'),    6,  1),
('4.3.2' , 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='71412'),    6,  1),
('4.3.2' , 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48022'),    6,  1),
('4.4.1' , 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='71414'),    6,  1),
('4.4.1' , 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48022'),    6,  1),
('4.4.2' , 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='71414'),    6,  1),
('4.4.2' , 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48022'),    6,  1)
go
