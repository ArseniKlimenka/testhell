alter table acc_impl.BANK_STATEMENT_ITEM
add IS_MIGRATED bit null
go

update acc_impl.BANK_STATEMENT_ITEM set IS_MIGRATED = 0
go

alter table acc_impl.BANK_STATEMENT_ITEM
alter column IS_MIGRATED bit not null
go
