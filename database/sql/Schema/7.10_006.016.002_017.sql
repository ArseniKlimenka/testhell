IF
	exists (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'PAS_IMPL.P_PAYMENT_PLAN_SAT') AND TYPE IN (N'U'))
	and
	not exists (SELECT * FROM sys.columns WHERE Name = N'IS_FIRST_INSTALLMENT' AND Object_ID = Object_ID(N'PAS_IMPL.P_PAYMENT_PLAN_SAT'))
BEGIN


    EXEC(N'alter table PAS_IMPL.P_PAYMENT_PLAN_SAT add IS_FIRST_INSTALLMENT bit null');

    EXEC(N'
    update pps
        set IS_FIRST_INSTALLMENT = case when ppl.FIRST_INST_DUE_DATE = l.DUE_DATE then 1 else 0 end
    from PAS_IMPL.P_PAYMENT_PLAN_SAT pps
    inner join pas_impl.P_PAYMENT_PLAN_LINK l on pps.P_PAYMENT_PLAN_HKEY = l.P_PAYMENT_PLAN_HKEY
    inner join
        (
            select POLICY_HKEY, min(DUE_DATE) as FIRST_INST_DUE_DATE
            from pas_impl.P_PAYMENT_PLAN_LINK
            group by POLICY_HKEY
        ) ppl on l.POLICY_HKEY = ppl.POLICY_HKEY
    ');

    EXEC(N'alter table PAS_IMPL.P_PAYMENT_PLAN_SAT alter column IS_FIRST_INSTALLMENT bit not null');

END