alter table acc_impl.PAYABLE_COMMISSION add IS_MIGRATED bit null
go
update acc_impl.PAYABLE_COMMISSION set IS_MIGRATED = 0
go
alter table acc_impl.PAYABLE_COMMISSION alter column IS_MIGRATED bit null
go
