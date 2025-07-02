alter table acc_impl.ALLOCATION_POLICY add EXCHANGE_DIFFERENCE decimal(15,2) null
go
update acc_impl.ALLOCATION_POLICY set EXCHANGE_DIFFERENCE = 0
go
alter table acc_impl.ALLOCATION_POLICY alter column EXCHANGE_DIFFERENCE decimal(15,2) not null
go
