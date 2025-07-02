if not exists(select * from sys.indexes i where i.name = 'IX_BFX_ETL_EXECUTION_STATUS_CONF_VERS_HASH_STAT')
begin
	create nonclustered index IX_BFX_ETL_EXECUTION_STATUS_CONF_VERS_HASH_STAT
	on BFX.ETL_EXECUTION_STATUS(CONFIGURATION_NAME, [VERSION], BODY_HASH, [STATUS]);
end
go