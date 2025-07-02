alter table acc_impl.CA_ACT_ITEM
add STATUS_ID int null
go

update acc_impl.CA_ACT_ITEM set STATUS_ID = 0
go

alter table acc_impl.CA_ACT_ITEM
alter column STATUS_ID int not null
go

