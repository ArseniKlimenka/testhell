if exists (select * from sys.tables t
    INNER JOIN sys.partitions p on t.object_id = p.object_id
    WHERE t.object_id = OBJECT_ID(N'[PAS_IMPL].[P_INVOICED_COMMISSION]') and p.rows > 0)
BEGIN
	EXEC(N'
		alter table pas_impl.P_INVOICED_COMMISSION alter column DOC_COMM_RATE decimal(15,6)
        ');
END
go
