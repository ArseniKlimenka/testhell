alter table acc_impl.CA_ACT add ACT_TYPE_ID int null
go
update acc_impl.CA_ACT set ACT_TYPE_ID = 1
go
alter table acc_impl.CA_ACT alter column ACT_TYPE_ID int not null
go

alter table acc_impl.CA_ACT_ITEM alter column PAYMENT_TRANSACTION_DATE date null
go
alter table acc_impl.CA_ACT_ITEM alter column BANK_STATEMENT_ITEM_ID bigint null
go
alter table acc_impl.CA_ACT_ITEM add LC_COMM_AMOUNT_EXTRA decimal(15, 2) null
go
