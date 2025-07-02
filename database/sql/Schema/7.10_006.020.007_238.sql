alter table acc_impl.TRANSACTION_DEFINITION alter column GL_ACCOUNT_ID_DT bigint null
go
alter table acc_impl.TRANSACTION_DEFINITION alter column GL_ACCOUNT_ID_CT bigint null
go
alter table acc_impl.TRANSACTION_DEFINITION drop constraint TRANSACTION_DEFINITION_UNIQUE_RULE
go
