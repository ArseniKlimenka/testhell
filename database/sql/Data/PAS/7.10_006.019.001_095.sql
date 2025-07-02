if exists (select * from sys.tables t
	INNER JOIN sys.partitions p on t.object_id = p.object_id
	WHERE t.object_id = OBJECT_ID(N'[PAS_IMPL].[POLICY_SAT]') and p.rows > 0)
BEGIN
	EXEC(N'update pas_impl.POLICY_SAT set PAYMENT_END_DATE = END_DATE where PAYMENT_END_DATE is not null and PAYMENT_END_DATE != END_DATE;');
END
go
