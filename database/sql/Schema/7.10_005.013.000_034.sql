alter table acc_impl.CA_ACT_ITEM drop column DOC_COMM_FIXED_AMOUNT
go
alter table acc_impl.CA_ACT_ITEM drop column LC_COMM_FIXED_AMOUNT_MANUAL
go
alter table acc_impl.CA_ACT_ITEM_PC add PAYABLE_COMMISSION_ID bigint not null
go
insert into bfx.SEQUENCES_BIG (sequence_code, info, sequence_id)
values ('ACC_IMPL.CA_ACT_ITEM', 'Commission act item', 0)
go
