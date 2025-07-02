update bfx_impl.risk_product_relation
   set risk_code = 'MJL36404',
       conditions_function = 'MJL36404CAPCLRELOAS'
 where product_code in ('CAPCLRELOAS', 'CAPCLRELBOXOAS')
   and risk_code in ('JL36404', 'MJL36404')