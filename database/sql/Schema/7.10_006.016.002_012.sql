if exists (select * from sys.tables t
    INNER JOIN sys.partitions p on t.object_id = p.object_id
    WHERE t.object_id = OBJECT_ID(N'[PAS_IMPL].[POLICY_SAT]') and p.rows > 0)
BEGIN
	EXEC(N'
        ALTER TABLE PAS_IMPL.POLICY_SAT ADD PAYMENT_START_DATE date;
        ALTER TABLE PAS_IMPL.POLICY_SAT ADD PAYMENT_END_DATE date;
        ');

	EXEC(N'
        update pas_impl.POLICY_SAT set PAYMENT_START_DATE = START_DATE, PAYMENT_END_DATE = END_DATE;
        ');        
END
go

alter table acc_impl.CA_ACT
alter column ITEMS_COUNT int not null
go

alter table acc_impl.PAYABLE_COMMISSION
drop column DOC_COMM_RATE, DOC_COMM_FIXED_AMOUNT, DOC_COMM_CALC_AMOUNT, AA_COMM_RATE, AA_COMM_FIXED_AMOUNT, AA_COMM_CALC_AMOUNT
go

if exists (select * from sys.tables t
    INNER JOIN sys.partitions p on t.object_id = p.object_id
    WHERE t.object_id = OBJECT_ID(N'[PAS_IMPL].[COM_CALC_SAT]') and p.rows > 0)
BEGIN
	EXEC(N'
        alter table pas_impl.COM_CALC_SAT
        add INSURANCE_YEAR int
        ');
END
go
