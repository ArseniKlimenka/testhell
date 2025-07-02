alter table acc_impl.CA_ACT
add IS_DOC_CORRECT bit
go

update acc_impl.CA_ACT set IS_DOC_CORRECT = 0;
go

alter table acc_impl.CA_ACT
alter column IS_DOC_CORRECT bit not null
go