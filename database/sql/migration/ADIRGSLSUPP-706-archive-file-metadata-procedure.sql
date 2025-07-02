IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ARCHIVE_FILE_METADATA]') AND type IN (N'P', N'RF', N'PC'))
BEGIN
DROP PROCEDURE dbo.ARCHIVE_FILE_METADATA;
END
GO

CREATE PROCEDURE ARCHIVE_FILE_METADATA
AS
BEGIN TRY
begin tran

      INSERT INTO BFX_IMPL.FILE_METADATA_ARCH
      SELECT * FROM BFX.FILE_METADATA
       where file_metadata_id in (select a.file_metadata_id
                                    from bfx.attachment a
                                   where a.upload_status in (3, 4))

      DELETE FROM BFX.FILE_METADATA
       where file_metadata_id in (select a.file_metadata_id
                                    from bfx.attachment a
                                   where a.upload_status in (3, 4))

commit tran
END TRY
BEGIN CATCH
    ROLLBACK tran
    DECLARE @ErrorMessage NVARCHAR(4000); DECLARE @ErrorSeverity INT; DECLARE @ErrorState INT;
    SELECT @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = 1;
    RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState );
END CATCH;
GO