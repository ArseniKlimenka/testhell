update ACC_IMPL.BANK_STATEMENT_ITEM
set FAKE = 1
where PAYMENT_DESCRIPTION like N'Взаимозачет РНВ:%';
go