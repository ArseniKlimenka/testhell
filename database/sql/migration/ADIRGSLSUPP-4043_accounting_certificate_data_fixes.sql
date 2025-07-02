if exists (select * from sys.objects where object_id = object_id(N'[ACC_IMPL].[CRT_SAT]') AND TYPE IN (N'U'))
if exists (select * from sys.objects where object_id = object_id(N'[ACC_IMPL].[CRT_HUB]') AND TYPE IN (N'U'))
if exists (select * from sys.objects where object_id = object_id(N'[ACC_IMPL].[CRT_ATTACHMENT_TYPE_SAT]') AND TYPE IN (N'U'))
begin
	insert into acc_impl.CRT_ATTACHMENT_TYPE_SAT (CRT_ATTACHMENT_TYPE_HKEY, LOAD_DATE, RECORD_SOURCE, HASH_DIFF, ATTACHMENT_TYPE)
	select
		cs.CRT_HKEY,
		cs.LOAD_DATE,
		'ADINSURE' as RECORD_SOURCE,
		CONVERT(CHAR(32),
		HashBytes('MD5', cast(newid() as varbinary(max))), 2) as HASH_DIFF,
		cs.TAX_CERTIFICATE_FORMAT as ATTACHMENT_TYPE
	from bfx.UNIVERSAL_VERSIONED_DOCUMENT  ud
		inner join acc_impl.CRT_HUB ch on ud.UNIVERSAL_VERSIONED_DOCUMENT_NUMBER = ch.CERTIFICATE_NUMBER
		inner join acc_impl.CRT_SAT cs on cs.CRT_HKEY = ch.CRT_HKEY
	where cs.TAX_CERTIFICATE_FORMAT is not null
		and not exists (select * from acc_impl.CRT_ATTACHMENT_TYPE_SAT bb where bb.CRT_ATTACHMENT_TYPE_HKEY = cs.CRT_HKEY and bb.LOAD_DATE = cs.LOAD_DATE)
end
