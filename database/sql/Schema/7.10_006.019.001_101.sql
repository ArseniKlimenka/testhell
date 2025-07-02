if exists (select * from sys.tables t
	INNER JOIN sys.partitions p on t.object_id = p.object_id
	WHERE t.object_id = OBJECT_ID(N'[PAS_IMPL].[POLICY_SAT]') and p.rows > 0)
BEGIN
	EXEC(N'alter table pas_impl.POLICY_SAT add RISK_PREMIUM decimal(15,2) null');

	EXEC(N'
		update ps
		set ps.RISK_PREMIUM = 
		case 
                 when TRY_CONVERT(decimal(15,2), JSON_VALUE(BODY, ''$.basicConditions.riskPremium'')) IS NOT NULL
                 then CONVERT(decimal(15,2), JSON_VALUE(BODY, ''$.basicConditions.riskPremium'')  )
                 else 0
        end
		from
			pas_impl.POLICY_SAT ps
			inner join pas_impl.POLICY_HUB ph on ph.POLICY_HKEY = ps.POLICY_HKEY
			inner join pas.CONTRACT c on c.CONTRACT_NUMBER = ph.CONTRACT_NUMBER
			
	');

	EXEC(N'
		update pas_impl.POLICY_SAT
		set RISK_PREMIUM = 0
		where RISK_PREMIUM IS NULL 
	');

	EXEC(N'alter table pas_impl.POLICY_SAT alter column RISK_PREMIUM decimal(15,2) not null');
END
go
