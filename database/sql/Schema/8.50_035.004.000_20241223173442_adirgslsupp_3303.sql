IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[ACC_IMPL].[CRT_SAT]') AND TYPE IN (N'U'))
BEGIN
	IF COL_LENGTH('ACC_IMPL.CRT_SAT','INCOME_SOURCE') IS NULL
	BEGIN
		ALTER TABLE ACC_IMPL.CRT_SAT
		ADD INCOME_SOURCE nvarchar(100) NULL
	END
END