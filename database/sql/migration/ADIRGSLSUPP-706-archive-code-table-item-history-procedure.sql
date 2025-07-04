IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ARCHIVE_CODE_TABLE_ITEM_HISTORY]') AND type IN (N'P', N'RF', N'PC'))
BEGIN
DROP PROCEDURE dbo.ARCHIVE_CODE_TABLE_ITEM_HISTORY;
END
GO

CREATE PROCEDURE ARCHIVE_CODE_TABLE_ITEM_HISTORY
AS
BEGIN TRY
begin tran

	INSERT INTO BFX_IMPL.CODE_TABLE_ITEM_HISTORY_ARCH
	SELECT * FROM BFX.CODE_TABLE_ITEM_HISTORY 
	WHERE SYS_CREATED_ON < dateadd(month, -1, getdate())

	DELETE FROM BFX.CODE_TABLE_ITEM_HISTORY 
	WHERE SYS_CREATED_ON < dateadd(month, -1, getdate())

commit tran
END TRY
BEGIN CATCH
    ROLLBACK tran
    DECLARE @ErrorMessage NVARCHAR(4000); DECLARE @ErrorSeverity INT; DECLARE @ErrorState INT;
    SELECT @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = 1;
    RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState );
END CATCH;
GO
