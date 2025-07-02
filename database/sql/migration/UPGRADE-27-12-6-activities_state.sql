if exists(
	select *
	from INFORMATION_SCHEMA.COLUMNS
	where TABLE_SCHEMA = 'BFX' 
	and TABLE_NAME = 'ACTIVITY'
	and COLUMN_NAME = 'DOCUMENT_STATE'
	and DATA_TYPE = 'NVARCHAR'
)
begin
	alter table BFX.ACTIVITY alter column DOCUMENT_STATE int;
end
go

if not exists(select * from sys.indexes where object_id = OBJECT_ID('BFX.ACTIVITY') and name = 'IX_BFX_ACTIVITY_DOCUMENT_STATE')
begin
	create nonclustered index IX_BFX_ACTIVITY_DOCUMENT_STATE
	on BFX.ACTIVITY (DOCUMENT_STATE);
end
go
