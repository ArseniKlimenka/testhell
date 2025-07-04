IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'BFX_IMPL.SINK_ERROR') AND TYPE IN (N'U'))
BEGIN

IF COL_LENGTH('BFX_IMPL.SINK_ERROR', 'RELATED_UNI_VERS_DOC_NUMBER') IS NULL
BEGIN
	ALTER TABLE BFX_IMPL.SINK_ERROR ADD RELATED_UNI_VERS_DOC_NUMBER NVARCHAR(128) NULL
END

IF COL_LENGTH('BFX_IMPL.SINK_ERROR', 'RELATED_UNI_VERS_DOC_TRANSITION') IS NULL
BEGIN
	ALTER TABLE BFX_IMPL.SINK_ERROR ADD RELATED_UNI_VERS_DOC_TRANSITION NVARCHAR(128) NULL
END

IF COL_LENGTH('BFX_IMPL.SINK_ERROR', 'RELATED_UNI_VERS_DOC_CONF') IS NULL
BEGIN
	ALTER TABLE BFX_IMPL.SINK_ERROR ADD RELATED_UNI_VERS_DOC_CONF NVARCHAR(128) NULL
END

IF COL_LENGTH('BFX_IMPL.SINK_ERROR', 'RELATED_UNI_ME_CODE') IS NULL
BEGIN
	ALTER TABLE BFX_IMPL.SINK_ERROR ADD RELATED_UNI_ME_CODE NVARCHAR(128) NULL
END

IF COL_LENGTH('BFX_IMPL.SINK_ERROR', 'RELATED_UNI_ME_CONF') IS NULL
BEGIN
	ALTER TABLE BFX_IMPL.SINK_ERROR ADD RELATED_UNI_ME_CONF NVARCHAR(128) NULL
END

END
GO