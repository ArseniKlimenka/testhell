BEGIN TRY
BEGIN TRAN

UPDATE PAS.CONTRACT SET COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.attributes.partner', JSON_QUERY(BODY, '$.mainInsuranceConditions.partner'))

COMMIT TRAN
END TRY

BEGIN CATCH

    ROLLBACK TRAN
    DECLARE @ErrorMessage NVARCHAR(4000); DECLARE @ErrorSeverity INT; DECLARE @ErrorState INT;
    SELECT @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = 1;
    RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);

END CATCH