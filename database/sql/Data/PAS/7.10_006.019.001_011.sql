delete from bfx_impl.payment_frequency
 where code in (4, 5)
insert into  bfx_impl.payment_frequency
(id, code, description)
values
('7031ebeb-21d5-4424-93a9-fe824b10c2a1', N'4', N'Раз в квартал'),
('b9453190-7b7c-41e2-a0c6-339d4c3f09b0', N'5', N'Раз в месяц')

delete from bfx_impl.risk_product_relation
 where product_code = N'DEMOACC'
   and risk_code = N'CDH10800'
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
('4efe21c7-1838-4817-ab1b-91aef65aef1d', N'CDH10800', N'DEMOACC', '0', NULL, NULL, N'01', 2)