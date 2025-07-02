if not exists (select 1 from sys.objects where object_id = object_id(N'ACC_IMPL.AGGREGATED_PAYMENT_REGISTER'))
begin
    create table acc_impl.AGGREGATED_PAYMENT_REGISTER
	(
		[AGGREGATED_PAYMENT_REGISTER_ID] [uniqueidentifier] not null,
		[AGGREGATED_PAYMENT_NUMBER] [nvarchar](64) null,
		[BANK_STATEMENT_NUMBER] [nvarchar](64) null,
		[SMALL_PAYMENT_NUMBER] [nvarchar](64) null,
		[PAYMENT_DATE] [datetime] null,
		[PAYER_FULL_NAME] [nvarchar](500) null,
		[REF_CONTRACT_NUMBER] [nvarchar](64) null,
		[CONTRACT_BEGIN_DATE] [datetime] null,
		[PRODUCT_NAME] [nvarchar](100) null,
		[PAYMENT_AMOUNT] [decimal](15, 2) null,
		[CURRENCY_CODE] [nvarchar](3) null,
		[CONTRACT_DURATION] [int] null,
		[ADDITIONAL_INFORMATION] [nvarchar](500) null,
		[SEGMENT] [nvarchar](100) null,
		[SOURCE_FILE_FORMAT] [int] null,
		[PAYER_BIRTHDAY] [datetime] null,
		[PAYER_EMAIL] [nvarchar](100) null,
		constraint [PK_ACC_IMPL_AGGREGATED_PAYMENT_REGISTER] primary key clustered ([AGGREGATED_PAYMENT_REGISTER_ID] asc)
	)
end
go

exec sp_rename 'acc_impl.AGGREGATED_PAYMENT_REGISTER.REF_CONTRACT_NUMBER', 'PAYMENT_DESCRIPTION', 'COLUMN'
go

alter table acc_impl.BANK_STATEMENT_ITEM add AGGREGATED_PAYMENT_REGISTER_ID uniqueidentifier null
go

update bsi
set AGGREGATED_PAYMENT_REGISTER_ID = apr.AGGREGATED_PAYMENT_REGISTER_ID
from
	acc_impl.BANK_STATEMENT_ITEM bsi
	inner join acc_impl.AGGREGATED_PAYMENT_REGISTER apr on apr.AGGREGATED_PAYMENT_NUMBER = bsi.REGISTRY_REFERENCE_NO and bsi.ORIGINAL_PAYMENT_DESCRIPTION = apr.PAYMENT_DESCRIPTION
where 1=1
	and bsi.AGGREGATED_PAYMENT_REGISTER_ID is null
	and bsi.REGISTRY_REFERENCE_NO is not null
go
