IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[AA_BASE_COMM_SAT]') AND TYPE IN (N'U'))
BEGIN

IF COL_LENGTH('PAS_IMPL.AA_BASE_COMM_SAT','CREDIT_PROGRAM_VALUE_REF_ID') IS NULL
BEGIN

ALTER TABLE pas_impl.AA_BASE_COMM_SAT ADD CREDIT_PROGRAM_VALUE_REF_ID BIGINT NULL
CREATE INDEX IDX_AA_BASE_COMM_SAT_CR_PROGRAM_CODE ON PAS_IMPL.AA_BASE_COMM_SAT(CREDIT_PROGRAM_VALUE_REF_ID)

END

IF COL_LENGTH('PAS_IMPL.AA_BASE_COMM_SAT','CREDIT_PROGRAM_INVERSION') IS NULL
BEGIN

ALTER TABLE pas_impl.AA_BASE_COMM_SAT ADD CREDIT_PROGRAM_INVERSION BIT NULL

END

END
GO

IF NOT EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[BFX_IMPL].[CREDIT_PROGRAM]') AND TYPE IN (N'U'))
BEGIN

CREATE TABLE BFX_IMPL.CREDIT_PROGRAM 
(
	CODE nvarchar(150) PRIMARY KEY,
	DESCRIPTION nvarchar(500) NOT NULL
)

END
GO