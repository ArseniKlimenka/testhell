alter table acc_impl.REVALUATION_DATA
alter column AMOUNT decimal(15,2) null
go
alter table acc_impl.REVALUATION_DATA
add REVALUATION_TYPE_ID int null
go
update acc_impl.REVALUATION_DATA set REVALUATION_TYPE_ID = 1
go
alter table acc_impl.REVALUATION_DATA
alter column REVALUATION_TYPE_ID int not null
go
