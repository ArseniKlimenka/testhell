declare @sql nvarchar(max) = N'';

select @sql += N'
alter table ' + SCHEMA_NAME(o.schema_id) + '.' + OBJECT_NAME(o.parent_object_id) + ' drop constraint ' + OBJECT_NAME(o.object_id) + ';'
from sys.objects o
where 1=1
	and o.type_desc = 'FOREIGN_KEY_CONSTRAINT'
	and SCHEMA_NAME(o.schema_id) = 'ACC_IMPL'
	and OBJECT_NAME(o.parent_object_id) = 'TRANSACTION_DEFINITION'
	and (  OBJECT_NAME(o.object_id) like 'FK__TRANSACTI__GL_AC_%'
		or OBJECT_NAME(o.object_id) like 'FK__TRANSACTI__OFR_I_%'
	)
;

--print @sql
execute(@sql)
delete from acc_impl.TRANSACTION_DEFINITION where TRANSACTION_TYPE_ID is null
go
alter table acc_impl.TRANSACTION_DEFINITION drop column GL_ACCOUNT_ID_DT, GL_ACCOUNT_ID_CT, OFR_ID_DT, OFR_ID_CT
go

alter table ACC.GL_ADDITIONAL_ATTRIBUTES add PROPOSED_POST_DATE date null
go

update aa
set PROPOSED_POST_DATE = coalesce(j.PROPOSED_POST_DATE, s.POST_DATE)
from acc.GL_SUBLEDGER_ENTRY s
	left join acc.JR_JOURNAL j on s.EVENT_ID = j.EVENT_ID
	inner join acc.GL_ADDITIONAL_ATTRIBUTES aa on s.GL_ADDITIONAL_ATTRIBUTE_ID = aa.GL_ADDITIONAL_ATTRIBUTE_ID
where 1=1
	and aa.PROPOSED_POST_DATE is null
go

alter table ACC.GL_ADDITIONAL_ATTRIBUTES alter column PROPOSED_POST_DATE date not null
go
