update c
   set c.common_body = json_modify(c.common_body, '$.payment.paymentFrequency', pf.code)
  from pas.contract c
       join bfx_impl.payment_frequency pf on json_value(c.common_body, '$.payment.paymentFrequency') = pf.description