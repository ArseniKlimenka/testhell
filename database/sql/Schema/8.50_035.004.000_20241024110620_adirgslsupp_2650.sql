IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'BFX_IMPL.SEND_EVENT_EXCEPTIONS') AND TYPE IN (N'U'))
BEGIN
    IF COL_LENGTH('BFX_IMPL.SEND_EVENT_EXCEPTIONS','PARTNER_CODE') IS NULL
    BEGIN
        ALTER TABLE BFX_IMPL.SEND_EVENT_EXCEPTIONS
		ADD PARTNER_CODE NVARCHAR(255) NULL
    END
	IF COL_LENGTH('BFX_IMPL.SEND_EVENT_EXCEPTIONS','SALES_SEGMENT') IS NULL
    BEGIN
        ALTER TABLE BFX_IMPL.SEND_EVENT_EXCEPTIONS
		ADD SALES_SEGMENT NVARCHAR(255) NULL
    END
END
GO