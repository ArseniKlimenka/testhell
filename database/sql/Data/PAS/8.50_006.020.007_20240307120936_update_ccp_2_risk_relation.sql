delete from bfx_impl.risk_product_relation
 where product_code in (N'CCP2')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
('4B9F3447-8540-4796-94D0-4343FED63EBB', N'DLP42204', N'CCP2', '0', NULL, N'DLP42204', N'01', 1),
('6DD921A9-3B01-4FA8-A36F-E073302CFB59', N'DT42204', N'CCP2', '0', NULL, N'DT42204', N'01', 2)