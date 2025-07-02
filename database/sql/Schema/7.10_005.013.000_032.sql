if exists (select 1 from sys.objects where object_id = object_id(N'pas_impl.P_INVOICED_COMMISSION'))
begin
	delete from pas_impl.P_INVOICED_COMMISSION;
end
