if (not exists(select * from sys.indexes where name = 'IX_ACC_GL_ADDITIONAL_ATTRIBUTES_CONTRACT_NUMBER'))
begin
	create nonclustered index IX_ACC_GL_ADDITIONAL_ATTRIBUTES_CONTRACT_NUMBER on ACC.GL_ADDITIONAL_ATTRIBUTES(CONTRACT_NUMBER)
end
go
if (not exists(select * from sys.indexes where name = 'IX_ACC_JR_ADDITIONAL_ATTRIBUTES_CONTRACT_NUMBER'))
begin
	create nonclustered index IX_ACC_JR_ADDITIONAL_ATTRIBUTES_CONTRACT_NUMBER on ACC.JR_ADDITIONAL_ATTRIBUTES(CONTRACT_NUMBER)
end
go
