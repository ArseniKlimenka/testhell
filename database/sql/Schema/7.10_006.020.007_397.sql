if (exists(select * from sys.tables where object_id = OBJECT_ID('pas_impl.POLICY_SAT') and type = 'U'))
begin
	alter table pas_impl.POLICY_SAT add IS_MIGRATED bit null
end
go

