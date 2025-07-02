GRANT ALTER ON SCHEMA::ACC_IMPL TO RUN_USER
GRANT ALTER ON SCHEMA::BFX_IMPL TO RUN_USER
GRANT ALTER ON SCHEMA::CLM_IMPL TO RUN_USER
GRANT ALTER ON SCHEMA::ORG_IMPL TO RUN_USER
GRANT ALTER ON SCHEMA::PAS_IMPL TO RUN_USER
GRANT ALTER ON SCHEMA::PTY_IMPL TO RUN_USER
GRANT ALTER ON SCHEMA::EWT_IMPL TO RUN_USER
GRANT ALTER ON SCHEMA::UNI_IMPL TO RUN_USER
GO

-- ACC
CREATE PROCEDURE ACC_IMPL.ACC_IMPL_SCRIPT_RUNNER
    @stmnt nvarchar(max),
    @param nvarchar(1000) = NULL
AS
BEGIN
    EXECUTE AS USER = 'RUN_USER'
    EXEC sp_executesql @stmnt, N'@param nvarchar(1000)', @param
END
GO

-- BFX
CREATE PROCEDURE BFX_IMPL.BFX_IMPL_SCRIPT_RUNNER
    @stmnt nvarchar(max),
    @param nvarchar(1000) = NULL
AS
BEGIN
    EXECUTE AS USER = 'RUN_USER'
    EXEC sp_executesql @stmnt, N'@param nvarchar(1000)', @param
END
GO

-- CLM
CREATE PROCEDURE CLM_IMPL.CLM_IMPL_SCRIPT_RUNNER
    @stmnt nvarchar(max),
    @param nvarchar(1000) = NULL
AS
BEGIN
    EXECUTE AS USER = 'RUN_USER'
    EXEC sp_executesql @stmnt, N'@param nvarchar(1000)', @param
END
GO

-- ORG
CREATE PROCEDURE ORG_IMPL.ORG_IMPL_SCRIPT_RUNNER
    @stmnt nvarchar(max),
    @param nvarchar(1000) = NULL
AS
BEGIN
    EXECUTE AS USER = 'RUN_USER'
    EXEC sp_executesql @stmnt, N'@param nvarchar(1000)', @param
END
GO

-- PAS
CREATE PROCEDURE PAS_IMPL.PAS_IMPL_SCRIPT_RUNNER
    @stmnt nvarchar(max),
    @param nvarchar(1000) = NULL
AS
BEGIN
    EXECUTE AS USER = 'RUN_USER'
    EXEC sp_executesql @stmnt, N'@param nvarchar(1000)', @param
END
GO

-- PTY
CREATE PROCEDURE PTY_IMPL.PTY_IMPL_SCRIPT_RUNNER
    @stmnt nvarchar(max),
    @param nvarchar(1000) = NULL
AS
BEGIN
    EXECUTE AS USER = 'RUN_USER'
    EXEC sp_executesql @stmnt, N'@param nvarchar(1000)', @param
END
GO

-- EWT
CREATE PROCEDURE EWT_IMPL.EWT_IMPL_SCRIPT_RUNNER
    @stmnt nvarchar(max),
    @param nvarchar(1000) = NULL
AS
BEGIN
    EXECUTE AS USER = 'RUN_USER'
    EXEC sp_executesql @stmnt, N'@param nvarchar(1000)', @param
END
GO

-- UNI
CREATE PROCEDURE UNI_IMPL.UNI_IMPL_SCRIPT_RUNNER
    @stmnt nvarchar(max),
    @param nvarchar(1000) = NULL
AS
BEGIN
    EXECUTE AS USER = 'RUN_USER'
    EXEC sp_executesql @stmnt, N'@param nvarchar(1000)', @param
END
GO