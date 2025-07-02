-- product risks
delete from bfx_impl.risk_product_relation
 where id in ('F59111D4-6DFB-4F13-A05D-5A4290B7E217')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
-- CMC
('A6070B2A-9C12-40B2-B302-6F5810CF5CA4', N'CD42204', N'CMC', '0', NULL, N'CD42204', N'01', 1)