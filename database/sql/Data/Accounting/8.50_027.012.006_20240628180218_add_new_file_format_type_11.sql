delete from acc_impl.CT_BSI_REGISTRY_SOURCE where FILE_FORMAT_TYPE_ID = 11
go

insert into acc_impl.CT_BSI_REGISTRY_SOURCE ([FILE_FORMAT_TYPE_ID], [REGISTRY_SOURCE_ID], [DESCRIPTION], [ACCOUNT_NO])
values (11, 88, N'Открытие', '40701810401700000724')
go
