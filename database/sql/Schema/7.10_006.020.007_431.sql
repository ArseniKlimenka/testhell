alter table acc_impl.BANK_STATEMENT_ITEM
add REGISTRY_FILE_FORMAT int null foreign key references acc_impl.CT_BSI_REGISTRY_SOURCE(FILE_FORMAT_TYPE_ID)
go
