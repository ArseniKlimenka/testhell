if object_id(N'ACC_IMPL.RSD_JOB_LOG', N'U') is not null
	drop table ACC_IMPL.RSD_JOB_LOG;
go

if object_id(N'ACC_IMPL.RSD_JOB_PP_DATA', N'U') is not null
	drop table ACC_IMPL.RSD_JOB_PP_DATA;
go

create table ACC_IMPL.RSD_JOB_LOG
(
	EXECUTION_DATE date not null,
	ETL_EXECUTION_STATUS_ID uniqueidentifier not null,
	constraint PK_ACC_IMPL_RSD_JOB_LOG primary key clustered (EXECUTION_DATE)
)
go

create table ACC_IMPL.RSD_JOB_PP_DATA
(
	RSD_JOB_PP_DATA_ID bigint not null,
	CONTRACT_NUMBER nvarchar(50) not null,
	LOAD_DATE date not null,
	DUE_DATE date not null,
	OBJECT_CODE nvarchar(250) not null,
	ITEM_NO varchar(250) not null,
	EXECUTION_DATE date not null,
	POSTING_DATE date not null,
	DEADLINE_DATE date not null,
	AMOUNT decimal(15, 2) not null,
	OPEN_AMOUNT decimal(15, 2) not null,
	constraint PK_ACC_IMPL_RSD_JOB_PP_DATA primary key clustered (RSD_JOB_PP_DATA_ID)
)
go

insert into acc_impl.RSD_JOB_LOG (EXECUTION_DATE, ETL_EXECUTION_STATUS_ID) values ('2000-01-01', CAST(CAST(0 AS BINARY) AS UNIQUEIDENTIFIER))
go

insert into acc_impl.RSD_JOB_PP_DATA (RSD_JOB_PP_DATA_ID, CONTRACT_NUMBER, LOAD_DATE, DUE_DATE, OBJECT_CODE, ITEM_NO, EXECUTION_DATE, POSTING_DATE, DEADLINE_DATE, AMOUNT, OPEN_AMOUNT) values (0, '-', '2000-01-01', '2000-01-01', '-', '-', '2000-01-01', '2000-01-01', '2000-01-01', 0, 0)
go

if object_id(N'PAS_IMPL.P_PAYMENT_PLAN_SAT', N'U') is not null
begin
	if exists(select * from pas_impl.P_PAYMENT_PLAN_SAT)
		exec(N'alter table pas_impl.P_PAYMENT_PLAN_SAT add DEADLINE_DATE date null');
	else
		exec(N'alter table pas_impl.P_PAYMENT_PLAN_SAT add DEADLINE_DATE date not null');
end
go
