IF EXISTS (select * from sys.objects where object_id = object_id(N'[ACC_IMPL].[CRT_SAT]') and type in (N'U'))
BEGIN
    IF COL_LENGTH('ACC_IMPL.CRT_SAT','IS_INSURER_SEND_DATA_TO_FNS') IS NULL
    BEGIN
        ALTER TABLE ACC_IMPL.CRT_SAT
        ADD IS_INSURER_SEND_DATA_TO_FNS BIT NULL
    END
END
GO

IF EXISTS (select * from sys.objects where object_id = object_id(N'[ACC_IMPL].[CRT_SAT]') and type in (N'U'))
BEGIN
    IF COL_LENGTH('ACC_IMPL.CRT_SAT','IS_INSURER_SEND_DATA_TO_FNS') IS NOT NULL
    BEGIN
        UPDATE ACC_IMPL.CRT_SAT
        SET IS_INSURER_SEND_DATA_TO_FNS = 0
    END
END
GO