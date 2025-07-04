IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[UNI_IMPL].[RQT_SAT]') AND TYPE IN (N'U'))
BEGIN

    IF COL_LENGTH('UNI_IMPL.RQT_SAT','CONTRACT_HOLDER_NAME') IS NULL
    BEGIN
    ALTER TABLE UNI_IMPL.RQT_SAT ADD CONTRACT_HOLDER_NAME nvarchar(max)
    END

    IF COL_LENGTH('UNI_IMPL.RQT_SAT','CONTRACT_CONF_CODE_NAME') IS NULL
    BEGIN
    ALTER TABLE UNI_IMPL.RQT_SAT ADD CONTRACT_CONF_CODE_NAME nvarchar(100)
    END

END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[EWT_IMPL].[EWT_SAT]') AND TYPE IN (N'U'))
BEGIN

IF COL_LENGTH('EWT_IMPL.EWT_SAT','CONTRACT_NUMBER') IS NULL
BEGIN
ALTER TABLE EWT_IMPL.EWT_SAT ADD CONTRACT_NUMBER nvarchar(100)
END

IF COL_LENGTH('EWT_IMPL.EWT_SAT','CONTRACT_HOLDER_NAME') IS NULL
BEGIN
ALTER TABLE EWT_IMPL.EWT_SAT ADD CONTRACT_HOLDER_NAME nvarchar(max)
END

IF COL_LENGTH('EWT_IMPL.EWT_SAT','CONTRACT_CONF_CODE_NAME') IS NULL
BEGIN
ALTER TABLE EWT_IMPL.EWT_SAT ADD CONTRACT_CONF_CODE_NAME nvarchar(100)
END

END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[CLM_IMPL].[CLM_SAT]') AND TYPE IN (N'U'))
BEGIN

IF COL_LENGTH('CLM_IMPL.CLM_SAT','CONTRACT_NUMBER') IS NULL
BEGIN
ALTER TABLE CLM_IMPL.CLM_SAT ADD CONTRACT_NUMBER nvarchar(100)
END

IF COL_LENGTH('CLM_IMPL.CLM_SAT','CONTRACT_HOLDER_NAME') IS NULL
BEGIN
ALTER TABLE CLM_IMPL.CLM_SAT ADD CONTRACT_HOLDER_NAME nvarchar(max)
END

IF COL_LENGTH('CLM_IMPL.CLM_SAT','CONTRACT_CONF_CODE_NAME') IS NULL
BEGIN
ALTER TABLE CLM_IMPL.CLM_SAT ADD CONTRACT_CONF_CODE_NAME nvarchar(100)
END

END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[INQUIRY_SAT]') AND TYPE IN (N'U'))
BEGIN

IF COL_LENGTH('PAS_IMPL.INQUIRY_SAT','CONTRACT_NUMBER') IS NULL
BEGIN
ALTER TABLE PAS_IMPL.INQUIRY_SAT ADD CONTRACT_NUMBER nvarchar(100)
END

IF COL_LENGTH('PAS_IMPL.INQUIRY_SAT','CONTRACT_HOLDER_NAME') IS NULL
BEGIN
ALTER TABLE PAS_IMPL.INQUIRY_SAT ADD CONTRACT_HOLDER_NAME nvarchar(max)
END

IF COL_LENGTH('PAS_IMPL.INQUIRY_SAT','CONTRACT_CONF_CODE_NAME') IS NULL
BEGIN
ALTER TABLE PAS_IMPL.INQUIRY_SAT ADD CONTRACT_CONF_CODE_NAME nvarchar(100)
END

END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[CNL_AMENDMENT_SAT]') AND TYPE IN (N'U'))
BEGIN

IF COL_LENGTH('PAS_IMPL.CNL_AMENDMENT_SAT','CONTRACT_NUMBER') IS NULL
BEGIN
ALTER TABLE PAS_IMPL.CNL_AMENDMENT_SAT ADD CONTRACT_NUMBER nvarchar(100)
END

IF COL_LENGTH('PAS_IMPL.CNL_AMENDMENT_SAT','CONTRACT_HOLDER_NAME') IS NULL
BEGIN
ALTER TABLE PAS_IMPL.CNL_AMENDMENT_SAT ADD CONTRACT_HOLDER_NAME nvarchar(max)
END

IF COL_LENGTH('PAS_IMPL.CNL_AMENDMENT_SAT','CONTRACT_CONF_CODE_NAME') IS NULL
BEGIN
ALTER TABLE PAS_IMPL.CNL_AMENDMENT_SAT ADD CONTRACT_CONF_CODE_NAME nvarchar(100)
END

END
GO