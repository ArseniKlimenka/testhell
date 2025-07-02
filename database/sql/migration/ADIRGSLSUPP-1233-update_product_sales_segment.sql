update ctr set ctr.body = json_modify(ctr.body, '$.mainInsuranceConditions.insuranceProduct.salesSegment', p.sales_segment)
from pas.contract ctr
join bfx_impl.products p on json_value(ctr.body, '$.mainInsuranceConditions.insuranceProduct.productCode') = p.code