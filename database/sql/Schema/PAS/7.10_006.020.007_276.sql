IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[AMENDMENT_LINES_SAT]') AND TYPE IN (N'U'))
BEGIN

IF COL_LENGTH('PAS_IMPL.AMENDMENT_LINES_SAT','SUM_IN_RUB') IS NULL
BEGIN
ALTER TABLE PAS_IMPL.AMENDMENT_LINES_SAT ADD SUM_IN_RUB DECIMAL(15,2)
END

END
