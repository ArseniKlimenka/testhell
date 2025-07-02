update bfx_impl.risk_product_relation
   set conditions_function = CONCAT(risk_code, product_code)
 where product_code = 'WCENOAS'
   and risk_code in ('DLP46204', 'DLPVV46204', 'DDTP46204')