update bfx_impl.risk_product_relation
   set parent_risk = 'CDHR10800'
 where product_code = 'EFRBFKO'
   and risk_code = 'CDHW10800'

update bfx_impl.risk_product_relation
   set parent_risk = null,
       relation_type_code = '01',
       is_replaceable = 1
 where product_code = 'EFRBFKO'
   and risk_code = 'CDHR10800'

update bfx_impl.risk_product_relation
   set parent_risk = 'CDHR10800',
       relation_type_code = '03',
       is_replaceable = 0
 where product_code = 'EFRBFKO'
   and risk_code = 'CDP36404'