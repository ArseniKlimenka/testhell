if not exists(select * from sys.indexes i where i.name = 'IX_BFX_INTEGRATION_MESSAGE_ERROR_MESSAGE_GROUP_AND_RECORD_ID')
begin
	create nonclustered index IX_BFX_INTEGRATION_MESSAGE_ERROR_MESSAGE_GROUP_AND_RECORD_ID
	on BFX.INTEGRATION_MESSAGE_ERROR (MESSAGE_GROUP, RECORD_ID);
end
go

if not exists(select * from sys.indexes i where i.name = 'IX_BFX_INTEGRATION_MESSAGE_GROUP_SYS_UPDATED_ON')
begin
	create nonclustered index IX_BFX_INTEGRATION_MESSAGE_GROUP_SYS_UPDATED_ON
	on BFX.INTEGRATION_MESSAGE_GROUP (SYS_UPDATED_ON);
end
go