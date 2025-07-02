
alter table acc_impl.ALLOCATION
add MANUAL_EXCHANGE_RATE bit null
go

update acc_impl.ALLOCATION set MANUAL_EXCHANGE_RATE = 0
go

alter table acc_impl.ALLOCATION
alter column MANUAL_EXCHANGE_RATE bit not null
go
