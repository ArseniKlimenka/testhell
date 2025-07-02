alter table acc_impl.BANK_STATEMENT_ITEM add RELOAD_REQUIRED bit
go
update acc_impl.BANK_STATEMENT_ITEM set RELOAD_REQUIRED = 0
go
alter table acc_impl.BANK_STATEMENT_ITEM alter column RELOAD_REQUIRED bit not null
go
