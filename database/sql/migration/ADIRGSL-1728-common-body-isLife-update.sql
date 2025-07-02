BEGIN TRY
begin tran

declare @contract_number nvarchar(max)
declare @key int
declare @is_life int

declare cur cursor for
select c.contract_number,
       rd.[key],
       --json_value(rd.value, '$.riskCode') as riskCode,
       --json_value(rd.value, '$.isLife') as isLife,
       rt.is_life
  from pas.contract c
         cross apply openjson(c.common_body,'$.evaluation.itemEvaluation[0].attributes.calculatedAttributes.riskData') rd
         inner join bfx_impl.risks r on r.code = json_value(rd.value, '$.riskCode')
         inner join bfx_impl.risk_type rt on rt.risk_type = r.type
 where json_value(rd.value, '$.isLife') is null
 
open cur
fetch next from cur into @contract_number, @key, @is_life

while @@fetch_status = 0 begin

    update pas.contract
       set common_body = json_modify(common_body, '$.evaluation.itemEvaluation[0].attributes.calculatedAttributes.riskData['+cast(@key as nvarchar)+'].isLife', case @is_life when 1 then CAST(1 as BIT) else CAST(0 as BIT) end)
     where contract_number = @contract_number

    fetch next from cur into @contract_number, @key, @is_life
end

close cur    
deallocate cur


commit tran
END TRY
BEGIN CATCH
    ROLLBACK tran
    DECLARE @ErrorMessage NVARCHAR(4000); DECLARE @ErrorSeverity INT; DECLARE @ErrorState INT;
    SELECT @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = 1;
    RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState );
END CATCH;