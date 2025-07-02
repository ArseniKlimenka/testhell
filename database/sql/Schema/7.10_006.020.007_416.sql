alter table acc_impl.SAP_GL_ACCOUNT_RULE add AGENT_TYPE nvarchar(64) null
go

alter table acc_impl.TRANSACTION_DEFINITION add AGENT_TYPE nvarchar(64) null
go

update acc_impl.SAP_GL_ACCOUNT_RULE set AGENT_TYPE = 'broker', PERSON_TYPE_ID = null where PERSON_TYPE_ID = 3;

update acc_impl.CT_PERSON_TYPE set DESCRIPTION = 'Natural person' where PERSON_TYPE_ID = 1;
update acc_impl.CT_PERSON_TYPE set DESCRIPTION = 'Legal person' where PERSON_TYPE_ID = 2;
delete from acc_impl.CT_PERSON_TYPE where PERSON_TYPE_ID = 3;

alter table ACC.GL_ADDITIONAL_ATTRIBUTES add AGENT_TYPE nvarchar(64) null;

insert into ACC.ATTRIBUTE_DEFINITION (NAME, ATTRIBUTE_VALUE_TYPE_ID, DESCRIPTION)
values ('AgentType', 1, N'Agent type');

insert into acc.ATTRIBUTE_SET (ATTRIBUTE_SET_ID, ATTRIBUTE_DEFINITION_ID, REQUIRED, SOURCE_ID, NAME, DESCRIPTION)
values
(3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'AgentType'), 0, null, 'SAP GL Account attributes 1', 'Other not validated attributes'),
(4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'AgentType'), 0, null, 'SAP GL Account attributes 2', 'Other not validated attributes'),
(5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'AgentType'), 0, null, 'SAP GL Account attributes 3', 'Other not validated attributes'),
(7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'AgentType'), 0, null, 'SAP GL Account attributes 4', 'Other not validated attributes'),
(8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'AgentType'), 0, null, 'SAP GL Account attributes 5', 'Other not validated attributes'),
(9, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'AgentType'), 0, null, 'SAP GL Account attributes 6', 'Other not validated attributes')
;


delete from acc_impl.TRANSACTION_DEFINITION where TRANSACTION_DEFINITION_NO in ('2.5.1','2.5.2','2.6.1','2.6.2','2.7.1','2.7.2','2.8.1','2.8.2','4.1.1','4.1.2','4.2.1','4.2.2','4.3.1','4.3.2','4.4.1','4.4.2','8.1.17','8.1.18','8.1.19','8.1.20','8.1.21','8.1.22','8.1.23','8.1.24')
go
insert into acc_impl.TRANSACTION_DEFINITION (TRANSACTION_DEFINITION_NO, DOCUMENT_TYPE_ID, [DESCRIPTION],
	BELEGTC, BELEGSC_ALGL_2, BELEGSC_ALGL_3, BUCHUGC, VORGAST_ALGL_2, VORGAST_ALGL_3, TRANSACTION_TYPE_ID, [SIGN], IS_PREVIOUS_PERIOD, IS_LIFE, AGENT_TYPE)
values
('2.5.1', 1002, null, 3, 3011, 3001, 20, 13, 13, 2, null, 0, 1, 'broker'),
('2.5.2', 1002, null, 3, 3011, 3001, 20, 13, 13, 2, null, 1, 1, 'broker'),
('2.6.1', 1002, null, 3, 3011, 3001, 20, 14, 14, 2, null, 0, 0, 'broker'),
('2.6.2', 1002, null, 3, 3011, 3001, 20, 14, 14, 2, null, 1, 0, 'broker'),
('2.7.1', 1016, null, 3, 3011, 3001, 20, 33, 33, 2, null, 0, 1, 'broker'),
('2.7.2', 1016, null, 3, 3011, 3001, 20, 33, 33, 2, null, 0, 0, 'broker'),
('2.8.1', 1016, null, 3, 3011, 3001, 20, 33, 33, 2, null, 1, 1, 'broker'),
('2.8.2', 1016, null, 3, 3011, 3001, 20, 33, 33, 2, null, 1, 0, 'broker'),

('4.1.1', 1003, null, 09, 09301, 09301, 20, 13, 13, 3, null, 1, 0, null),
('4.1.2', 1003, null, 09, 09301, 09301, 20, 13, 13, 3, null, 1, 1, null),
('4.2.1', 1003, null, 09, 09301, 09301, 20, 14, 14, 3, null, 0, 0, null),
('4.2.2', 1003, null, 09, 09301, 09301, 20, 14, 14, 3, null, 0, 1, null),
('4.3.1', 1003, null, 09, 09301, 09301, 20, 13, 13, 3, null, 1, 0, 'broker'),
('4.3.2', 1003, null, 09, 09301, 09301, 20, 13, 13, 3, null, 1, 1, 'broker'),
('4.4.1', 1003, null, 09, 09301, 09301, 20, 14, 14, 3, null, 0, 0, 'broker'),
('4.4.2', 1003, null, 09, 09301, 09301, 20, 14, 14, 3, null, 0, 1, 'broker'),

('8.1.17', 1025, null, null, null, null, null, null, null, 6,  1, 0, 1, 'broker'),
('8.1.18', 1025, null, null, null, null, null, null, null, 6, -1, 0, 1, 'broker'),
('8.1.19', 1025, null, null, null, null, null, null, null, 6,  1, 1, 1, 'broker'),
('8.1.20', 1025, null, null, null, null, null, null, null, 6, -1, 1, 1, 'broker'),
('8.1.21', 1025, null, null, null, null, null, null, null, 6,  1, 0, 0, 'broker'),
('8.1.22', 1025, null, null, null, null, null, null, null, 6, -1, 0, 0, 'broker'),
('8.1.23', 1025, null, null, null, null, null, null, null, 6,  1, 1, 0, 'broker'),
('8.1.24', 1025, null, null, null, null, null, null, null, 6, -1, 1, 0, 'broker')
go

delete from acc_impl.TRANSACTION_DEFINITION_STEP where TRANSACTION_DEFINITION_NO in ('2.5.1','2.5.2','2.6.1','2.6.2','2.7.1','2.7.2','2.8.1','2.8.2','4.1.1','4.1.2','4.2.1','4.2.2','4.3.1','4.3.2','4.4.1','4.4.2','8.1.17','8.1.18','8.1.19','8.1.20','8.1.21','8.1.22','8.1.23','8.1.24')
go
insert into acc_impl.TRANSACTION_DEFINITION_STEP (TRANSACTION_DEFINITION_NO, IS_DEBIT, PAIR_NO, PAIR_SEQ_NO, GL_ACCOUNT_ID, ATTRIBUTE_SET_ID, [SIGN])
values
('2.5.1' , 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='71412'),    6,  1),
('2.5.1' , 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48024'),    6,  1),
('2.5.2' , 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='71412'),    6,  1),
('2.5.2' , 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48024'),    6,  1),
('2.6.1' , 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='71414'),    6,  1),
('2.6.1' , 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48024'),    6,  1),
('2.6.2' , 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='71414'),    6,  1),
('2.6.2' , 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48024'),    6,  1),
('2.7.1' , 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='48024'),    6, -1),
('2.7.1' , 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='71412'), null, -1),
('2.7.2' , 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='48024'),    6, -1),
('2.7.2' , 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='71414'), null, -1),
('2.8.1' , 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='48024'),    6, -1),
('2.8.1' , 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='71411'), null, -1),
('2.8.2' , 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='48024'),    6, -1),
('2.8.2' , 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='71413'), null, -1),
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
('4.4.2' , 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48022'),    6,  1),
('8.1.17', 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='48022'), null,  1),
('8.1.17', 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='71511'),    6,  1),
('8.1.18', 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='71512'), null, -1),
('8.1.18', 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48022'),    6, -1),
('8.1.19', 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='48022'), null,  1),
('8.1.19', 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='72511'),    6,  1),
('8.1.20', 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='72512'), null,  1),
('8.1.20', 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48022'),    6,  1),
('8.1.21', 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='48022'), null,  1),
('8.1.21', 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='71511'),    6,  1),
('8.1.22', 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='71512'), null, -1),
('8.1.22', 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48022'),    6, -1),
('8.1.23', 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='48022'), null,  1),
('8.1.23', 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='72511'),    6,  1),
('8.1.24', 1, 1, 1, (select gl_account_id from acc.gl_account where gl_account_no='72512'), null,  1),
('8.1.24', 0, 1, 2, (select gl_account_id from acc.gl_account where gl_account_no='48022'),    6,  1)
go
