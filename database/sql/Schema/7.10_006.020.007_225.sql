alter table acc_impl.CA_ACT_ITEM add IS_TECHNICAL bit null
go

update acc_impl.CA_ACT_ITEM set IS_TECHNICAL = 0 where IS_TECHNICAL is null
go

alter table acc_impl.CA_ACT_ITEM alter column IS_TECHNICAL bit not null
go
