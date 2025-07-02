if exists (select * from sys.tables t
    INNER JOIN sys.partitions p on t.object_id = p.object_id
    WHERE t.object_id = OBJECT_ID(N'[PAS_IMPL].[P_PAYMENT_PLAN_SAT]') and p.rows > 0)
BEGIN
	EXEC(N'
		UPDATE pp set pp.POSTING_DATE = ppl.DUE_DATE
		FROM pas_impl.P_PAYMENT_PLAN_SAT pp
		JOIN PAS_IMPL.P_PAYMENT_PLAN_LINK ppl on ppl.P_PAYMENT_PLAN_HKEY = pp.P_PAYMENT_PLAN_HKEY
		WHERE POSTING_DATE is null
        ');
END
go




