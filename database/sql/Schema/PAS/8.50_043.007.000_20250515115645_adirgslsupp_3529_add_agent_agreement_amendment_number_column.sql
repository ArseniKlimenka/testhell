IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'PAS_IMPL.POLICY_COMMISSION_SAT') AND TYPE IN (N'U'))
BEGIN

	IF COL_LENGTH('PAS_IMPL.POLICY_COMMISSION_SAT','AA_AMENDMENT_NUMBER') IS NULL
	BEGIN
		alter table PAS_IMPL.POLICY_COMMISSION_SAT
		add AA_AMENDMENT_NUMBER nvarchar(50) null
	END

END
GO
