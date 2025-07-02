if exists (select * from sys.objects where object_id = object_id(N'[ACC_IMPL].[REFERENCE_NUMBER]') and type in (N'U'))
begin
	drop table ACC_IMPL.REFERENCE_NUMBER
end
go

create table ACC_IMPL.REFERENCE_NUMBER
(
	[REFERENCE_NO] [nvarchar](64) not null,
	[DOCUMENT_NO] [nvarchar](50) null,
	[PAYMENT_TYPE_CODE] [nvarchar](64) not null,
	[CURRENCY_CODE] [char](3) not null,
	[DOCUMENT_TYPE_ID] [int] not null,

	constraint [PK_ACC_IMPL_REFERENCE_NO] primary key clustered
	(
		[REFERENCE_NO]
	)
)
go

insert into ACC_IMPL.REFERENCE_NUMBER(REFERENCE_NO, DOCUMENT_NO, PAYMENT_TYPE_CODE, CURRENCY_CODE, DOCUMENT_TYPE_ID)
values ('DUMMY', 'DUMMY', 'Transfer', 'USD', 1)
-- required to not allow visual studio to update the table
go

insert into ACC_IMPL.REFERENCE_NUMBER(REFERENCE_NO, DOCUMENT_NO, PAYMENT_TYPE_CODE, CURRENCY_CODE, DOCUMENT_TYPE_ID)
select
	REFERENCE_NO,
	coalesce(CONTRACT_NO, DOCUMENT_NO) as DOCUMENT_NO,
	PAYMENT_TYPE_CODE,
	CURRENCY_CODE,
	DOCUMENT_TYPE_ID
from ACC.REFERENCE_NUMBER
go
