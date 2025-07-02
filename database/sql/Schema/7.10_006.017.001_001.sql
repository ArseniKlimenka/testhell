alter table ACC_IMPL.BANK_STATEMENT_ITEM add FAKE bit null
go

update ACC_IMPL.BANK_STATEMENT_ITEM
set FAKE = 0;
go

update ACC_IMPL.BANK_STATEMENT_ITEM
set FAKE = 1
where PAYMENT_DESCRIPTION like 'Взаимозачет РНВ:%';
go

alter table ACC_IMPL.BANK_STATEMENT_ITEM
alter column FAKE bit not null
go