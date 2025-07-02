alter table ACC_IMPL.PAYMENT_REFERENCE add ERROR_CODE nvarchar(48) null
go
alter table ACC_IMPL.PAYMENT_REFERENCE add LAST_UPDATED datetime2 null
go
exec sp_rename 'ACC_IMPL.PAYMENT_REFERENCE.AUTO_ALLOCATION_MESSAGE', 'ERROR_MESSAGE', 'COLUMN'
go
update acc_impl.PAYMENT_REFERENCE set ERROR_MESSAGE = null where ERROR_MESSAGE = 'Ok'
go
update acc_impl.PAYMENT_REFERENCE set ERROR_CODE = 'RsdAllocated' where ERROR_CODE is null and ERROR_MESSAGE like N'Error: Allocation is not allowed if RSD allocation exist%'
go
update acc_impl.PAYMENT_REFERENCE set ERROR_CODE = 'RsdAllocated' where ERROR_CODE is null and ERROR_MESSAGE like N'Error: Идентификация не разрешена если есть идентификации по РС%'
go
