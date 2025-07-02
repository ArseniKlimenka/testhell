if exists (select * from sys.tables t
    INNER JOIN sys.partitions p on t.object_id = p.object_id
    WHERE t.object_id = OBJECT_ID(N'[PAS_IMPL].[P_PAYMENT_PLAN_SAT]') and p.rows > 0)
BEGIN
	EXEC(N'
		alter table pas_impl.P_PAYMENT_PLAN_SAT
		add INSURANCE_YEAR int null;
        ');

	EXEC(N'
		update pps
		set pps.INSURANCE_YEAR = 1 + (datediff(day, coalesce(pols.PAYMENT_START_DATE, pols.START_DATE), ppl.DUE_DATE) / 365)
		from
			pas_impl.POLICY_SAT pols
			inner join pas_impl.P_PAYMENT_PLAN_LINK ppl on ppl.POLICY_HKEY = pols.POLICY_HKEY
			inner join pas_impl.P_PAYMENT_PLAN_SAT pps on pps.P_PAYMENT_PLAN_HKEY = ppl.P_PAYMENT_PLAN_HKEY
		where pps.INSURANCE_YEAR is null;

		update pps
		set pps.INSURANCE_YEAR = 1
		from
			pas_impl.P_PAYMENT_PLAN_SAT pps
		where pps.INSURANCE_YEAR is null;
        ');

	EXEC(N'
		alter table pas_impl.P_PAYMENT_PLAN_SAT
		alter column INSURANCE_YEAR int not null;
        ');
END
go
