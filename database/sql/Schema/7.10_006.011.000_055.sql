if not exists (select * from sys.objects where object_id = object_id(N'[ACC_IMPL].[PAYMENT_ORDER_HUB]') and type in (N'U'))
begin
	CREATE TABLE [ACC_IMPL].[PAYMENT_ORDER_HUB](
		[PAYMENT_ORDER_HKEY] [char](32) NOT NULL,
		[LOAD_DATE] [datetime2](7) NOT NULL,
		[RECORD_SOURCE] [varchar](50) NOT NULL,
		[PAYMENT_ORDER_NUMBER] [nvarchar](64) NULL,
		CONSTRAINT [PK_ACC_IMPL_PAYMENT_ORDER_HUB] PRIMARY KEY NONCLUSTERED ([PAYMENT_ORDER_HKEY]),
		CONSTRAINT [UQ_PAYMENT_ORDER_HUB] UNIQUE CLUSTERED ([PAYMENT_ORDER_NUMBER])
	);
end
go

if exists (select * from sys.objects where object_id = object_id(N'[ACC].[PAYMENT_ORDER_HUB]') and type in (N'U'))
begin
	insert into [ACC_IMPL].[PAYMENT_ORDER_HUB]
	(
		[PAYMENT_ORDER_HKEY],
		[LOAD_DATE],
		[RECORD_SOURCE],
		[PAYMENT_ORDER_NUMBER]
	)
	select
		[PAYMENT_ORDER_HKEY],
		[LOAD_DATE],
		[RECORD_SOURCE],
		[PAYMENT_ORDER_NUMBER]
	from [ACC].[PAYMENT_ORDER_HUB];
end
go
