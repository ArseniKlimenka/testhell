BEGIN try
BEGIN TRAN

DECLARE @entity_id UNIQUEIDENTIFIER
DECLARE cur CURSOR FOR
SELECT DISTINCT entity_id FROM bfx.entity_ref er
WHERE business_key IN
  (
    SELECT business_key
    FROM bfx.entity_ref er
    INNER JOIN cfg.entity_type et ON er.entity_type_id = et.entity_type_id
    WHERE terminated = 1
    AND business_key IN (SELECT contract_number FROM pas.contract)
    GROUP BY business_key
    HAVING Count(entity_id) > 1
  )
AND ENTITY_ID NOT IN (SELECT contract_id FROM pas.contract)

OPEN cur
FETCH next FROM cur INTO @entity_id
WHILE @@fetch_status = 0 BEGIN

  DELETE FROM bfx.entity_history WHERE entity_id = @entity_id
  DELETE FROM bfx.entity_ref WHERE entity_id = @entity_id

  FETCH next FROM cur INTO @entity_id
    
END
CLOSE cur
DEALLOCATE cur

COMMIT TRAN
END try
BEGIN catch

    ROLLBACK TRAN
    DECLARE @ErrorMessage NVARCHAR(4000); DECLARE @ErrorSeverity INT; DECLARE @ErrorState INT;
    SELECT @ErrorMessage = Error_message(), @ErrorSeverity = Error_severity(), @ErrorState = 1;
    RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);

END catch