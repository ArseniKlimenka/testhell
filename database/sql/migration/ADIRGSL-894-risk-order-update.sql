BEGIN TRY
begin tran

declare @contract_number nvarchar(max)
declare @key nvarchar(max)
declare @risk_order int
declare cur cursor for
select c.contract_number,
       r.[key],
       rpr.risk_order
  from pas.contract c
       cross apply openjson(json_query(c.body, '$.risks')) r
        join bfx_impl.risk_product_relation rpr
             on rpr.product_code = json_value(c.body, '$.mainInsuranceConditions.insuranceProduct.productCode')
             and rpr.risk_code = json_value(r.value, '$.risk.riskCode')

open cur
fetch next from cur into @contract_number, @key, @risk_order
while @@fetch_status = 0 begin

  update pas.contract
     set body = json_modify(body, '$.risks[' + @key + '].risk.riskOrder', @risk_order)
   where contract_number = @contract_number

  fetch next from cur into @contract_number, @key, @risk_order
    
end
close cur    
deallocate cur

commit tran
END TRY
BEGIN CATCH
    ROLLBACK tran
    DECLARE @ErrorMessage NVARCHAR(4000); DECLARE @ErrorSeverity INT; DECLARE @ErrorState INT;
    SELECT @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = 1;
    RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
END CATCH;