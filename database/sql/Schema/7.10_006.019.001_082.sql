alter table acc_impl.BANK_STATEMENT_ITEM_HISTORY
alter column PAYMENT_DESCRIPTION_FROM nvarchar(256) null
go

alter table acc_impl.BANK_STATEMENT_ITEM_HISTORY
alter column PAYMENT_DESCRIPTION_TO nvarchar(256) null
go
