update pas.contract
set body = JSON_MODIFY(body, '$.basicInvestmentParameters.discount', -2)
from pas.contract c
join PAS_IMPL.QUOTE_HUB qh ON qh.CONTRACT_NUMBER = c.CONTRACT_NUMBER
join PAS_IMPL.QUOTE_SAT_LATEST qs ON qs.QUOTE_HKEY = qh.QUOTE_HKEY
AND qs.PRODUCT_CODE in ('IBAKVV5VTB', 'IBAKVP5VTB')
AND JSON_VALUE(body, '$.basicInvestmentParameters.discount') = '2'