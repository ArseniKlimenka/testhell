/*
drop table if exists pas.contract_body_beneficiary_backup
go
*/

BEGIN TRY
BEGIN TRAN

-- ############### Backup contracts body, common body, snapshot body
SELECT CONTRACT_NUMBER, BODY, COMMON_BODY, SNAPSHOT_BODY
INTO PAS.CONTRACT_BODY_BENEFICIARY_BACKUP
FROM PAS.CONTRACT
where lower(json_value(body, '$.beneficiaries.isHeritors')) = 'false';

-- ############### Some declarations
DECLARE @contractNumber nvarchar(max);
DECLARE @key nvarchar(max);
DECLARE @newid nvarchar(max);

DECLARE cur_contract CURSOR LOCAL for
select contract.contract_number,
       contractbeneficiaries.[key] as [key]
  from (select * from pas.contract
         where lower(json_value(body, '$.beneficiaries.isHeritors')) = 'false') contract
       cross apply openjson(json_query(contract.body, '$.beneficiaries.beneficiaries')) contractbeneficiaries
       
open cur_contract;

-- ############### Update contract body, snapshot body, common body
fetch next from cur_contract into @contractNumber, @key;
while @@FETCH_STATUS = 0 
BEGIN

  set @newid = LOWER(NEWID());

	UPDATE PAS.CONTRACT
       SET BODY = JSON_MODIFY(BODY, '$.beneficiaries.beneficiaries[' + @key + '].beneficiaryId', @newid),
           SNAPSHOT_BODY = JSON_MODIFY(SNAPSHOT_BODY, '$.beneficiaries.beneficiaries[' + @key + '].beneficiaryId', @newid),
           COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.parties.beneficiaries[' + @key + '].beneficiaryId', @newid)
	 WHERE @contractNumber = CONTRACT_NUMBER;

	fetch next from cur_contract into @contractNumber, @key;
  
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