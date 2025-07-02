IF
	exists (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'PAS_IMPL.P_INVOICED_COMMISSION') AND TYPE IN (N'U'))
	and
	not exists (SELECT * FROM sys.columns WHERE Name = N'POSTING_DATE' AND Object_ID = Object_ID(N'PAS_IMPL.P_INVOICED_COMMISSION'))
BEGIN

	EXEC(N'
        alter table PAS_IMPL.P_INVOICED_COMMISSION add POSTING_DATE date null;
        ');

	EXEC(N'
        update PAS_IMPL.P_INVOICED_COMMISSION set POSTING_DATE = DUE_DATE;
        ');  

	EXEC(N'
        alter table PAS_IMPL.P_INVOICED_COMMISSION alter column POSTING_DATE date not null;
        ');

END



