insert into acc.CT_DOCUMENT_TYPE (DOCUMENT_TYPE_ID, DESCRIPTION)
values (1027, 'PaymentOrder - Allocation')
go

delete from acc_impl.TRANSACTION_DEFINITION where TRANSACTION_DEFINITION_NO in
(
	'3.3.1', '3.4.1', '3.5.1','3.5.2','3.5.3','3.5.4','3.7.1','3.7.2','3.8.1','3.8.2',
	'5.0.1','5.0.2','5.0.3','5.0.4','5.0.5','5.0.6','5.0.7',
	'6.4.1','6.5.1','6.5.2','6.6.1','6.6.2'
)
go
insert into acc_impl.TRANSACTION_DEFINITION (TRANSACTION_DEFINITION_NO, DOCUMENT_TYPE_ID, [DESCRIPTION], TRANSACTION_TYPE_ID, [SIGN], IS_PREVIOUS_PERIOD, IS_LIFE, AGENT_TYPE,
	BELEGTC, BELEGSC_ALGL_2, BELEGSC_ALGL_3, BUCHUGC, VORGAST_ALGL_2, VORGAST_ALGL_3)
values
('3.3.1',    2, null, 4, null, null, 1, null, '09', '09705', '09705', '10', null, null),
('3.4.1',    2, null, 4, null, null, 0, null, '09', '09705', '09705', '10', null, null),
('3.5.1', 1012, null, 4, null, null, 1, null, '09', '09701', '09701', '10', null, null),
('3.5.2', 1012, null, 4, null, null, 0, null, '09', '09701', '09701', '10', null, null),
('3.5.3', 1013, null, 4, null, null, 1, null, '09', '09705', '09705', '10', null, null),
('3.5.4', 1013, null, 4, null, null, 0, null, '09', '09705', '09705', '10', null, null),
('3.7.1', 1011, null, 4, null, null, 1, null, '09', '09703', '09703', '10', null, null),
('3.7.2', 1011, null, 4, null, null, 0, null, '09', '09703', '09703', '10', null, null),
('3.8.1', 1010, null, 4, null, null, 1, null, '09', '09703', '09703', '10', null, null),
('3.8.2', 1010, null, 4, null, null, 0, null, '09', '09703', '09703', '10', null, null),

('5.0.1', 1006, null, 4, null, null, null, null, '09', '09830', '09830', '20', null, null),
('5.0.3', 1027, null, 4, null, null, null, null, '09', '09705', '09705', '30', null, null),
('5.0.6', 1006, null, 4, null, null, null, 'broker', '09', '09830', '09830', '20', null, null),
('6.4.1', 1019, null, 4, null, null, null, null, '09', '09109', '09109', '10', '32', '32'),

('6.5.1', 1020, null, 4, null, null, 1, null, null, null, null, null, null, null),
('6.5.2', 1020, null, 4, null, null, 0, null, null, null, null, null, null, null),
('6.6.1', 1021, null, 4, null, null, 1, null, null, null, null, null, null, null),
('6.6.2', 1021, null, 4, null, null, 0, null, null, null, null, null, null, null)

delete from acc_impl.TRANSACTION_DEFINITION_STEP where TRANSACTION_DEFINITION_NO in
(
	'3.3.1', '3.4.1', '3.5.1','3.5.2','3.5.3','3.5.4','3.7.1','3.7.2','3.8.1','3.8.2',
	'4.3.1','4.3.2','4.4.1','4.4.2',
	'5.0.1','5.0.2','5.0.3','5.0.4','5.0.5','5.0.6','5.0.7',
	'6.4.1','6.5.1','6.5.2','6.6.1','6.6.2',
	'8.1.17','8.1.18','8.1.19','8.1.20','8.1.21','8.1.22','8.1.23','8.1.24'
)
go
insert into acc_impl.TRANSACTION_DEFINITION_STEP (TRANSACTION_DEFINITION_NO, IS_DEBIT, PAIR_NO, PAIR_SEQ_NO, GL_ACCOUNT_ID, ATTRIBUTE_SET_ID, [SIGN])
values
('3.3.1' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48029'), null,  1),
('3.3.1' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'),    6,  1),
('3.4.1' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48029'), null,  1),
('3.4.1' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'),    6,  1),
('3.5.1' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48029'), null,  1),
('3.5.1' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48002'),    6,  1),
('3.5.2' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48029'), null,  1),
('3.5.2' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48004'),    6,  1),
('3.5.3' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48002'),    6,  1),
('3.5.3' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'),    6,  1),
('3.5.4' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48004'),    6,  1),
('3.5.4' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'),    6,  1),
('3.7.1' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'),    6, -1),
('3.7.1' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71701'),    6, -1),
('3.7.2' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'),    6, -1),
('3.7.2' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71701'),    6, -1),
('3.8.1' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71802'),    6,  1),
('3.8.1' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'),    6,  1),
('3.8.2' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71802'),    6,  1),
('3.8.2' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'),    6,  1),

('4.3.1' , 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='71412'),    6,  1),
('4.3.1' , 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48024'),    6,  1),
('4.3.2' , 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='71412'),    6,  1),
('4.3.2' , 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48024'),    6,  1),
('4.4.1' , 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='71414'),    6,  1),
('4.4.1' , 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48024'),    6,  1),
('4.4.2' , 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='71414'),    6,  1),
('4.4.2' , 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48024'),    6,  1),

('5.0.1' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'),    6,  1),
('5.0.1' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '47417'),    6,  1),
('5.0.3' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48028'),    6,  1),
('5.0.3' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '47417'),    6,  1),
('5.0.6' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48024'),    6,  1),
('5.0.6' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '47417'),    6,  1),
('5.0.6' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48024'),    6,  1),
('5.0.6' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '47417'),    6,  1),

('6.4.1' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '60301'),    6,  1),
('6.4.1' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '47417'),    6,  1),
('6.5.1' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48028'),    6,  1),
('6.5.1' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48002'),    6,  1),
('6.5.2' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48028'),    6,  1),
('6.5.2' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48004'),    6,  1),
('6.6.1' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48002'),    6,  1),
('6.6.1' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'),    6,  1),
('6.6.2' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48004'),    6,  1),
('6.6.2' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'),    6,  1),

('8.1.17', 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='48024'), null,  1),
('8.1.17', 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='71511'),    6,  1),
('8.1.18', 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='71512'), null, -1),
('8.1.18', 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48024'),    6, -1),
('8.1.19', 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='48024'), null,  1),
('8.1.19', 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='72511'),    6,  1),
('8.1.20', 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='72512'), null,  1),
('8.1.20', 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48024'),    6,  1),
('8.1.21', 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='48024'), null,  1),
('8.1.21', 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='71511'),    6,  1),
('8.1.22', 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='71512'), null, -1),
('8.1.22', 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48024'),    6, -1),
('8.1.23', 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='48024'), null,  1),
('8.1.23', 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='72511'),    6,  1),
('8.1.24', 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='72512'), null,  1),
('8.1.24', 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48024'),    6,  1)
go
