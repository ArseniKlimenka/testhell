/*
remove is_advance_payment flag from the allocation. Now this flag belongs to the matching. Later we could add it if we will need it.
*/

alter table acc_impl.allocation_policy
drop column is_advance_payment
go

/*
add posting date to matchings
*/

alter table acc_impl.MATCHING_POLICY
add POSTING_DATE date null
go

update matp
set matp.POSTING_DATE = alcp.DUE_DATE
from
	acc_impl.ALLOCATION_POLICY alcp
	inner join acc_impl.MATCHING mat on mat.ALLOCATION_ID = alcp.ALLOCATION_ID
	inner join acc_impl.MATCHING_POLICY matp on matp.MATCHING_ID = mat.MATCHING_ID
go

alter table acc_impl.MATCHING_POLICY
alter column POSTING_DATE date not null
go

/*
populate tables:
[PAS_IMPL].[P_PAYMENT_PLAN_SAT];
[PAS_IMPL].[P_PAYMENT_PLAN_LINK];
[PAS_IMPL].[P_PAYMENT_PLAN_BILLING_SAT];
*/

if exists (select * from sys.tables t
    INNER JOIN sys.partitions p on t.object_id = p.object_id
    WHERE t.object_id = OBJECT_ID(N'[PAS].[P_PAYMENT_PLAN_SAT]') and p.rows > 0)
BEGIN
	EXEC(N'
		IF
			not exists (SELECT 1 FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N''[PAS_IMPL].[P_PAYMENT_PLAN_SAT]'') AND TYPE IN (N''U''))
		BEGIN
			CREATE TABLE [PAS_IMPL].[P_PAYMENT_PLAN_SAT](
				[P_PAYMENT_PLAN_HKEY] [char](32) NOT NULL,
				[LOAD_DATE] [datetime2](7) NOT NULL,
				[RECORD_SOURCE] [varchar](50) NOT NULL,
				[HASH_DIFF] [char](32) NOT NULL,
				[ITEM_NO] [varchar](250) NOT NULL,
				[POSTING_DATE] [date] NULL,
				[TARIFF_CODE] [varchar](60) NULL,
				[TARIFF_UNIT_CODE] [nvarchar](32) NULL,
				[GROUP_CODE] [nvarchar](250) NULL,
				[AMOUNT] [decimal](15, 2) NULL,
				[CURRENCY_CODE] [char](3) NULL,
				[AMENDMENT_NUMBER] [nvarchar](50) NULL,
				[ADDITIONAL_ATTRIBUTES] [nvarchar](max) NULL,
				[ADDITIONAL_ATTRIBUTES_HKEY] [char](32) NULL,

				CONSTRAINT [PK_PAS_IMPL_P_PAYMENT_PLAN_SAT] PRIMARY KEY NONCLUSTERED
				(
					[P_PAYMENT_PLAN_HKEY] ASC,
					[LOAD_DATE] ASC,
					[ITEM_NO] ASC
				)
			);

			CREATE TABLE [PAS_IMPL].[P_PAYMENT_PLAN_LINK]
			(
				[P_PAYMENT_PLAN_HKEY] [char](32) NOT NULL,
				[LOAD_DATE] [datetime2](7) NOT NULL,
				[RECORD_SOURCE] [varchar](50) NOT NULL,
				[DUE_DATE] [date] NOT NULL,
				[POLICY_HKEY] [char](32) NOT NULL,

				CONSTRAINT [PK_PAS_IMPL_P_PAYMENT_PLAN_LINK] PRIMARY KEY NONCLUSTERED
				(
					[P_PAYMENT_PLAN_HKEY] ASC
				),
				CONSTRAINT [UQ_P_PAYMENT_PLAN_LINK] UNIQUE NONCLUSTERED
				(
					[POLICY_HKEY] ASC,
					[DUE_DATE] ASC
				)
			);

			CREATE TABLE [PAS_IMPL].[P_PAYMENT_PLAN_BILLING_SAT]
			(
				[P_PAYMENT_PLAN_BILLING_HKEY] [char](32) NOT NULL,
				[LOAD_DATE] [datetime2](7) NOT NULL,
				[RECORD_SOURCE] [varchar](50) NOT NULL,
				[HASH_DIFF] [char](32) NOT NULL,
				[PAYMENT_TYPE] [nvarchar](64) NULL,
				[PAYER_CODE] [nvarchar](128) NULL,
				[AGENT_CODE] [nvarchar](128) NULL,
				CONSTRAINT [PK_PAS_IMPL_P_PAYMENT_PLAN_BILLING_SAT] PRIMARY KEY NONCLUSTERED
				(
					[P_PAYMENT_PLAN_BILLING_HKEY] ASC,
					[LOAD_DATE] ASC
				)
			);
		END;

		insert into pas_impl.P_PAYMENT_PLAN_SAT
		(
			P_PAYMENT_PLAN_HKEY,
			LOAD_DATE,
			RECORD_SOURCE,
			HASH_DIFF,
			ITEM_NO,
			TARIFF_CODE,
			TARIFF_UNIT_CODE,
			GROUP_CODE,
			AMOUNT,
			CURRENCY_CODE,
			AMENDMENT_NUMBER,
			ADDITIONAL_ATTRIBUTES,
			ADDITIONAL_ATTRIBUTES_HKEY
		)
		select
			P_PAYMENT_PLAN_HKEY,
			LOAD_DATE,
			RECORD_SOURCE,
			HASH_DIFF,
			ITEM_NO,
			TARIFF_CODE,
			TARIFF_UNIT_CODE,
			GROUP_CODE,
			AMOUNT,
			CURRENCY_CODE,
			AMENDMENT_NUMBER,
			ADDITIONAL_ATTRIBUTES,
			ADDITIONAL_ATTRIBUTES_HKEY
		from pas.P_PAYMENT_PLAN_SAT;

		insert into pas_impl.P_PAYMENT_PLAN_LINK
		(
			P_PAYMENT_PLAN_HKEY,
			LOAD_DATE,
			RECORD_SOURCE,
			DUE_DATE,
			POLICY_HKEY
		)
		select
			P_PAYMENT_PLAN_HKEY,
			LOAD_DATE,
			RECORD_SOURCE,
			DUE_DATE,
			POLICY_HKEY
		from pas.P_PAYMENT_PLAN_LINK;

		insert into pas_impl.P_PAYMENT_PLAN_BILLING_SAT
		(
			P_PAYMENT_PLAN_BILLING_HKEY,
			LOAD_DATE,
			RECORD_SOURCE,
			HASH_DIFF,
			PAYMENT_TYPE,
			PAYER_CODE,
			AGENT_CODE
		)
		select
			P_PAYMENT_PLAN_BILLING_HKEY,
			LOAD_DATE,
			RECORD_SOURCE,
			HASH_DIFF,
			PAYMENT_TYPE,
			PAYER_CODE,
			AGENT_CODE
		from pas.P_PAYMENT_PLAN_BILLING_SAT;
');
END
go
