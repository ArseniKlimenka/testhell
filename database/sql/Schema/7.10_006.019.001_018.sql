alter table acc_impl.CA_ACT_ITEM
add INV_COMM_FINAL_RATE decimal(15,6) null
go

update acc_impl.CA_ACT_ITEM set INV_COMM_FINAL_RATE = coalesce(DOC_COMM_RATE, AA_COMM_RATE)
go

alter table acc_impl.CA_ACT_ITEM
alter column INV_COMM_FINAL_RATE decimal(15,6) not null
go
