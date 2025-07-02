update bfx_impl.risk_product_relation
   set relation_type_code = '01',
       conditions_function = risk_code
 where product_code in ('CCP', 'CMS', 'CDMS')