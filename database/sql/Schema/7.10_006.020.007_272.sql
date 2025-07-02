alter table acc_impl.RSD_JOB_PP_DATA
add OPEN_AMOUNT_NO_RSD decimal(15,2) null
go
update acc_impl.RSD_JOB_PP_DATA set OPEN_AMOUNT_NO_RSD = OPEN_AMOUNT
go
alter table acc_impl.RSD_JOB_PP_DATA
alter column OPEN_AMOUNT_NO_RSD decimal(15,2) not null
go

alter table acc_impl.RSD_ITEM_SAT
add OPEN_AMOUNT_NO_RSD decimal(15,2) null
go
update acc_impl.RSD_ITEM_SAT set OPEN_AMOUNT_NO_RSD = OPEN_AMOUNT
go
alter table acc_impl.RSD_ITEM_SAT
alter column OPEN_AMOUNT_NO_RSD decimal(15,2) not null
go
