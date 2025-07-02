declare @sql nvarchar(max) = N'';

select @sql += N'
alter table ' + SCHEMA_NAME(o.schema_id) + '.' + OBJECT_NAME(o.parent_object_id) + ' drop constraint ' + OBJECT_NAME(o.object_id) + ';'
from sys.objects o
where 1=1
	and o.type_desc = 'FOREIGN_KEY_CONSTRAINT'
	and SCHEMA_NAME(o.schema_id) = 'ACC_IMPL'
	and OBJECT_NAME(o.parent_object_id) = 'BANK_STATEMENT_ITEM'
	and OBJECT_NAME(o.object_id) like 'FK__BANK_STAT__REGIS__%'
;

--print @sql
execute(@sql)

alter table acc_impl.BANK_STATEMENT_ITEM
drop column REGISTRY_FILE_FORMAT
go
