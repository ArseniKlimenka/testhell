if exists (select * from sys.tables t
	INNER JOIN sys.partitions p on t.object_id = p.object_id
	WHERE t.object_id = OBJECT_ID(N'[ACC_IMPL].[POSTED_PAYMENT_PLAN_SAT]') and p.rows > 0)
BEGIN
	EXEC(N'alter table ACC_IMPL.POSTED_PAYMENT_PLAN_SAT add LAST_DATE_OF_POSTING datetime2 null;');
	EXEC(N'update ACC_IMPL.POSTED_PAYMENT_PLAN_SAT set LAST_DATE_OF_POSTING = LOAD_DATE;');
    EXEC(N'alter table ACC_IMPL.POSTED_PAYMENT_PLAN_SAT alter column LAST_DATE_OF_POSTING datetime2 not null;');
END
go
