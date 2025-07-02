BEGIN TRY
begin tran

declare @contract_number nvarchar(max)
declare @key int
declare @product_code nvarchar(max)
declare @risk_code nvarchar(max)

declare @risk_program nvarchar(max)
declare @risk_person nvarchar(max)

declare cur cursor for
select c.contract_number,
       r.[key],
       json_value(c.body, '$.mainInsuranceConditions.insuranceProduct.productCode') as product_code,
       json_value(r.value, '$.risk.riskCode') as risk_code
  from pas.contract c
       cross apply openjson(c.body,'$.risks') r
 
open cur
fetch next from cur into @contract_number, @key, @product_code, @risk_code

while @@fetch_status = 0 begin

    select @risk_program = risk_program,
           @risk_person = risk_person
      from bfx_impl.risk_product_relation
     where product_code = @product_code
       and risk_code = @risk_code

    update pas.contract
       set body = json_modify(
                    json_modify(body,
                                '$.risks['+cast(@key as nvarchar)+'].risk.riskProgram',
                                @risk_program
                               ),
                                '$.risks['+cast(@key as nvarchar)+'].risk.riskPerson',
                                @risk_person
                             )
     where contract_number = @contract_number

    fetch next from cur into @contract_number, @key, @product_code, @risk_code
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