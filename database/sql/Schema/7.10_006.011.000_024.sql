alter table acc_impl.CA_ACT add LAST_UPDATED datetime2 null
go
update acc_impl.CA_ACT set LAST_UPDATED = GETUTCDATE()
go
alter table acc_impl.CA_ACT alter column LAST_UPDATED datetime2 not null
go
