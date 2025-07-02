if exists (select * from sys.tables t
	INNER JOIN sys.partitions p on t.object_id = p.object_id
	WHERE t.object_id = OBJECT_ID(N'[PAS_IMPL].[POLICY_SAT]') and p.rows > 0)
BEGIN
	EXEC(N'alter table pas_impl.POLICY_SAT add INVOICE_ON_ACTIVATION bit null;');
	EXEC(N'
		update pols
		set INVOICE_ON_ACTIVATION = case when json_value(c.BODY, ''$.basicConditions.isReinvest'') = ''true'' then 1 else 0 end
		from
			pas_impl.POLICY_SAT pols
			inner join pas_impl.POLICY_HUB polh on polh.POLICY_HKEY = pols.POLICY_HKEY
			inner join pas.CONTRACT c on c.CONTRACT_NUMBER = polh.CONTRACT_NUMBER;
		');
END
go
