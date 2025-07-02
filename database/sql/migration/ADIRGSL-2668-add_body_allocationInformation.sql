UPDATE pas.CONTRACT
SET BODY = JSON_MODIFY(BODY, '$.allocationInformation', json_query('[]'))