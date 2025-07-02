alter table acc_impl.CA_ACT_ITEM_PC
drop constraint PK_ACC_IMPL_CA_ACT_ITEM_PC_ID
go

create clustered index IX_ACT_ITEM_PC_ACT_AND_ITEM
    on acc_impl.CA_ACT_ITEM_PC (ACT_ID, ACT_ITEM_ID);
go

create index IX_ACT_ITEM_PC_PC_ID
    on acc_impl.CA_ACT_ITEM_PC (PAYABLE_COMMISSION_ID)
	include (cancelled);
go
