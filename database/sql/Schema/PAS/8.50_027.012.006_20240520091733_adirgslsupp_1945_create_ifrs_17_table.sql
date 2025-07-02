IF NOT EXISTS (SELECT 1 FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'[BFX_IMPL].[IFRS_17]') AND TYPE IN (N'U'))
BEGIN
    CREATE TABLE [BFX_IMPL].[IFRS_17]
    (
        [DATE_FROM] [date] NOT NULL,
        [DATE_TO] [date] NOT NULL,
        [LLOB] [nvarchar](255) NOT NULL,
        [LLOB_DESCRIPTION] [nvarchar](max) NOT NULL,
        [ACCOUNTING_GROUP] [nvarchar](max) NOT NULL,
        [ACCOUNTING_GROUP_DESCRIPTION] [nvarchar](max) NOT NULL,
        [ACCOUNTING_GROUP_TYPE] [nvarchar](max) NOT NULL
    );
END