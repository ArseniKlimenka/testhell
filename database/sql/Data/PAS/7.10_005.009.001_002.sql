update bfx_impl.risk_product_relation
   set risk_code = 'CDH10800',
       conditions_function = 'CDH10800EHVP'
 where id = 'f9e4aa98-ce8a-492c-add8-8516ca8a3954'

update bfx_impl.risk_product_relation
   set conditions_function = 'CDH10800EHVPREPLACEABLE'
 where id = '919fdb8e-1e2a-42a1-b872-d3f33ff616fb'