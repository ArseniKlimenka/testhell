alter table acc_impl.CA_ACT_HISTORY add USER_ID uniqueidentifier not null
go
alter table acc_impl.CA_ACT_HISTORY drop column person_code
go
