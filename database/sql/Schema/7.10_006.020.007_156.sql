create table [ACC_IMPL].[OVERDUE_DAYS_RATE]
(
	[DAYS_FROM] int not null,
	[DAYS_TO] int not null,
	[RATE] decimal(15,4) not null,
)
go

insert into acc_impl.OVERDUE_DAYS_RATE (DAYS_FROM, DAYS_TO, RATE)
values
(1, 90, 0.1),
(91, 179, 0.25),
(180, 365, 0.5),
(366, 707, 1)
go
