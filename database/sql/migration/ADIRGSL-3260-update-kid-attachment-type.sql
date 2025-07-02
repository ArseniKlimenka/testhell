BEGIN TRY
BEGIN TRAN

-- ############### Backup contracts body
SELECT CONTRACT_NUMBER, BODY, SNAPSHOT_BODY
INTO PAS.CONTRACT_ATTACHMENTS_BACKUP
FROM PAS.CONTRACT
WHERE JSON_QUERY(BODY, '$.attachmentsPackage') like '%"KIDPrintout"%';

-- ############### Some declarations
DECLARE @contractNumber nvarchar(max);

DECLARE cur_contract CURSOR LOCAL for
SELECT CONTRACT_NUMBER
FROM PAS.CONTRACT
WHERE JSON_QUERY(BODY, '$.attachmentsPackage') like '%"KIDPrintout"%'; 
       
open cur_contract;

-- ############### Update contract body, snapshot body
fetch next from cur_contract into @contractNumber;
while @@FETCH_STATUS = 0 
BEGIN

	DECLARE @OldAttachmentsPackage NVARCHAR(max) = (SELECT JSON_QUERY(body, '$.attachmentsPackage') FROM pas.CONTRACT WHERE CONTRACT_NUMBER = @contractNumber);
	DECLARE @NewAttachmentsPackage NVARCHAR(max) = REPLACE(@OldAttachmentsPackage,'"KIDPrintout"','"KIDAttachment"')

	UPDATE c
	SET c.BODY = JSON_MODIFY(c.BODY, '$.attachmentsPackage', JSON_QUERY(@NewAttachmentsPackage))
	FROM pas.CONTRACT c
	WHERE CONTRACT_NUMBER = @contractNumber;

	UPDATE c
	SET c.SNAPSHOT_BODY = JSON_MODIFY(c.SNAPSHOT_BODY, '$.attachmentsPackage', JSON_QUERY(@NewAttachmentsPackage))
	FROM pas.CONTRACT c
	WHERE CONTRACT_NUMBER = @contractNumber;

	fetch next from cur_contract into @contractNumber;
  
END;
close cur_contract;
deallocate cur_contract;

COMMIT TRAN
END TRY

BEGIN CATCH

    ROLLBACK TRAN
    DECLARE @ErrorMessage NVARCHAR(4000); DECLARE @ErrorSeverity INT; DECLARE @ErrorState INT;
    SELECT @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = 1;
    RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);

END CATCH
