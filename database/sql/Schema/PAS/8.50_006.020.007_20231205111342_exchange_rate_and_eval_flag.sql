IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[QUOTE_SAT]') AND TYPE IN (N'U'))
BEGIN

IF COL_LENGTH('PAS_IMPL.QUOTE_SAT','EXCHANGE_RATE') IS NULL
BEGIN
ALTER TABLE PAS_IMPL.QUOTE_SAT ADD EXCHANGE_RATE decimal(15,7)
END

IF COL_LENGTH('PAS_IMPL.QUOTE_SAT','IS_EVALUATION_CTR') IS NULL
BEGIN
ALTER TABLE PAS_IMPL.QUOTE_SAT ADD IS_EVALUATION_CTR bit
END

END

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[POLICY_SAT]') AND TYPE IN (N'U'))
BEGIN

IF COL_LENGTH('PAS_IMPL.POLICY_SAT','EXCHANGE_RATE') IS NULL
BEGIN
ALTER TABLE PAS_IMPL.POLICY_SAT ADD EXCHANGE_RATE decimal(15,7)
END

IF COL_LENGTH('PAS_IMPL.POLICY_SAT','IS_EVALUATION_CTR') IS NULL
BEGIN
ALTER TABLE PAS_IMPL.POLICY_SAT ADD IS_EVALUATION_CTR bit
END

END