insert into acc_impl.CT_PERIOD_TYPE (PERIOD_TYPE_ID, DESCRIPTION) values (5, 'Revaluation')
go

insert into acc.PERIOD(PERIOD_STATUS_ID, DESCRIPTION, START_DATE, END_DATE, SYS_CREATED_ON, SYS_UPDATED_ON, SYS_CREATED_BY_ID, SYS_UPDATED_BY_ID)
select
	p.PERIOD_STATUS_ID,
	p.DESCRIPTION,
	p.START_DATE,
	p.END_DATE,
	'2000-01-01',
	'2000-01-01',
	'00000000-0000-0000-0000-000000000000',
	'00000000-0000-0000-0000-000000000000'
from
	acc_impl.PERIOD p
where p.PERIOD_TYPE_ID = 2
go

insert into acc_impl.PERIOD (PERIOD_ID, PERIOD_TYPE_ID, PERIOD_STATUS_ID, DESCRIPTION, START_DATE, END_DATE)
select
	p.PERIOD_ID,
	5 as PERIOD_TYPE_ID,
	p.PERIOD_STATUS_ID,
	p.DESCRIPTION,
	p.START_DATE,
	p.END_DATE
from acc.period p
where p.description not in ('Closed period', 'Open period - all', 'Open period - blocked sales invoice')
	and not exists (select * from acc_impl.PERIOD f where f.PERIOD_ID = p.PERIOD_ID)
order by p.DESCRIPTION, p.PERIOD_ID
go
