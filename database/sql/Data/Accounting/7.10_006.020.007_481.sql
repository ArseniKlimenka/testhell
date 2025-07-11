insert into acc.CT_DOCUMENT_TYPE (DOCUMENT_TYPE_ID, DESCRIPTION)
values (1028, 'Payment allocation')
go

update acc_impl.TRANSACTION_DEFINITION set DOCUMENT_TYPE_ID = 1028 where TRANSACTION_DEFINITION_NO in ('3.3.1','3.4.1')

delete from acc_impl.TRANSACTION_DEFINITION where TRANSACTION_DEFINITION_NO in ('3.1.0','5.1.1','5.1.2')
go
insert into acc_impl.TRANSACTION_DEFINITION (TRANSACTION_DEFINITION_NO, DOCUMENT_TYPE_ID, [DESCRIPTION], TRANSACTION_TYPE_ID, [SIGN], IS_PREVIOUS_PERIOD, IS_LIFE, AGENT_TYPE,
	BELEGTC, BELEGSC_ALGL_2, BELEGSC_ALGL_3, BUCHUGC, VORGAST_ALGL_2, VORGAST_ALGL_3)
values
('3.1.0',    2, null, 4, null, null, null, null, '09', '09700', '09700', '50', null, null)
go

delete from acc_impl.TRANSACTION_DEFINITION_STEP where TRANSACTION_DEFINITION_NO in ('3.1.0','5.1.1','5.1.2')
go
insert into acc_impl.TRANSACTION_DEFINITION_STEP (TRANSACTION_DEFINITION_NO, IS_DEBIT, PAIR_NO, PAIR_SEQ_NO, GL_ACCOUNT_ID, ATTRIBUTE_SET_ID, [SIGN])
values
('3.1.0' , 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '47416'), null,  1),
('3.1.0' , 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48029'), null,  1)
go
