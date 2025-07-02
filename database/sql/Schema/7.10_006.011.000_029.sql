if object_id('PAS.P_INVOICE_SAT_LATEST') is null
begin
	insert into bfx.SEQUENCES_BIG (sequence_code, info, sequence_id)
	values ('PAS_IMPL.INVOICE', 'Invoice number', 0);
end
else
begin
	insert into bfx.SEQUENCES_BIG (sequence_code, info, sequence_id)
	values ('PAS_IMPL.INVOICE', 'Invoice number', (select coalesce(max(LAST_INVOICE_SEQ), 0) from pas.P_INVOICE_SAT_LATEST));
end
go
