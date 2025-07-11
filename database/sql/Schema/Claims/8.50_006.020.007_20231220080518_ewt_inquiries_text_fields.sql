IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[EWT_IMPL].[ENDOWMENT_INQUIRY_SAT]') AND TYPE IN (N'U'))
BEGIN

    IF COL_LENGTH('EWT_IMPL.ENDOWMENT_INQUIRY_SAT','TEXT_OF_ANSWER') IS NULL
    BEGIN
    ALTER TABLE EWT_IMPL.ENDOWMENT_INQUIRY_SAT ADD TEXT_OF_ANSWER nvarchar(max)
    END

	IF COL_LENGTH('EWT_IMPL.ENDOWMENT_INQUIRY_SAT','TEXT_OF_COMMENT') IS NULL
    BEGIN
    ALTER TABLE EWT_IMPL.ENDOWMENT_INQUIRY_SAT ADD TEXT_OF_COMMENT nvarchar(max)
    END

END
GO