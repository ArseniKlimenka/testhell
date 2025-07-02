BEGIN TRY
begin tran

declare @contract_number nvarchar(max)
declare @key int
declare @is_life int

declare cur cursor for
select c.contract_number,
       pr.[key],
       rt.is_life
  from pas.contract c
       cross apply openjson(json_query(c.body, '$.risks')) pr
       join bfx_impl.risks r on r.code = json_value(pr.value, '$.risk.riskCode')
       join bfx_impl.risk_type rt on r.type = rt.risk_type
 where json_value(pr.value, '$.risk.riskCode') is not null
   and json_value(pr.value, '$.risk.isLife') is null
 
open cur
fetch next from cur into @contract_number, @key, @is_life

while @@fetch_status = 0 begin

    update pas.contract
       set body = json_modify(body, '$.risks['+cast(@key as nvarchar)+'].risk.isLife', case @is_life when 1 then CAST(1 as BIT) else CAST(0 as BIT) end)
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