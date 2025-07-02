BEGIN TRY
begin tran

declare @contract_number nvarchar(max)
declare @key nvarchar(max)
declare @schemaValidationErrorText nvarchar(max)

set @schemaValidationErrorText = N'Body не должно иметь дополнительные свойства (cumulation).';

declare cur cursor for
select c.contract_number,
    schemaValidations.[key],
	json_value(schemaValidations.value, '$.message') as message
from pas.contract c
cross apply openjson(json_query(c.common_body, '$.validations.schemaValidations')) schemaValidations
where (c.sys_created_on >= '2024-03-04 00:00:00' or c.sys_updated_on >= '2024-03-04 00:00:00')
and json_value(schemaValidations.value, '$.message') like '%' + @schemaValidationErrorText + '%'

open cur
fetch next from cur into @contract_number, @key, @schemaValidationErrorText
while @@fetch_status = 0 begin

  update pas.contract
  set common_body =
  JSON_MODIFY(common_body, '$.validations.schemaValidations',
			JSON_QUERY(
                REPLACE(
                    REPLACE(
                        REPLACE(
                            REPLACE(
								REPLACE(
									JSON_QUERY(
										JSON_MODIFY(common_body, '$.validations.schemaValidations[' + @key + ']', null),
										'$.validations.schemaValidations'
									),
									'},
      null', '}
	]'
								),
                                'null,', ''
                            ),
                            'null', ''
                        ),
                        '
      {', '      {'
                    ),
                    '[

	]', '[]'
                )
			)
  )
  where contract_number = @contract_number

  fetch next from cur into @contract_number, @key, @schemaValidationErrorText

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