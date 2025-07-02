if exists (select * from sys.tables t
    INNER JOIN sys.partitions p on t.object_id = p.object_id
    WHERE t.object_id = OBJECT_ID(N'[PAS_IMPL].[P_INVOICED_COMMISSION]') and p.rows > 0)
BEGIN
	EXEC(N'
		alter table pas_impl.P_INVOICED_COMMISSION
		drop column PERIOD_NUMBER
        ');
END
go

update acc_impl.CA_ACT_ITEM
set
	AA_COMM_RATE = AA_COMM_RATE / 100,
	COMM_RATE_FINAL = COMM_RATE_FINAL / 100
where AA_COMM_RATE > 1
go
