exec sp_rename 'ACC_IMPL.CA_ACT_ITEM.COMM_RATE_CALC', 'COMM_RATE_FINAL', 'COLUMN';
go
alter table acc_impl.CA_ACT_ITEM add LC_COMM_AMOUNT_FINAL decimal(15,2) null
go
update acc_impl.CA_ACT_ITEM set LC_COMM_AMOUNT_FINAL = coalesce(LC_COMM_AMOUNT_MANUAL, LC_COMM_AMOUNT_CALC);
go
alter table acc_impl.CA_ACT_ITEM alter column LC_COMM_AMOUNT_FINAL decimal(15,2) not null
go
