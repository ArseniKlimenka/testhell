create table acc_impl.BSI_IS_REGISTRY_MASK
(
	REGISTRY_MASK_ID int not null identity(1,1),
	ACCOUNT_NUMBER nvarchar(128) null,
	PAYMENT_DESCRIPTION nvarchar(128) null,
	constraint PK_ACC_IMPL_BSI_IS_REGISTRY_MASK primary key clustered (REGISTRY_MASK_ID)
)
go

create table acc_impl.BSI_IS_REGISTRY_MASK_HISTORY
(
	REGISTRY_MASK_HISTORY_ID int not null identity(1,1),
	LOAD_DATE datetime2 not null,
	USERNAME nvarchar(64) not null,
	CLIENT_ID nvarchar(64) not null,
	ACCOUNT_NUMBER nvarchar(128) null,
	PAYMENT_DESCRIPTION nvarchar(128) null,
	constraint PK_ACC_IMPL_BSI_IS_REGISTRY_MASK_HISTORY primary key clustered (REGISTRY_MASK_HISTORY_ID)
)
go

insert into acc_impl.BSI_IS_REGISTRY_MASK (ACCOUNT_NUMBER, PAYMENT_DESCRIPTION)
values
('40701810438000001404', null),
(null, N'РЕЕСТР'),
(null, N'Оплата страховой премии по АД № 3-100930'),
(null, N'Возмещение ср-в по операциям эквайринга'),
(null, N'ЗАЧИСЛЕНИЕ СРЕДСТВ ПО ОПЕРАЦИЯМ ЭКВАЙРИНГА')
go
