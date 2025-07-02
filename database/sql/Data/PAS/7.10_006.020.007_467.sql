-- product risks
delete from bfx_impl.risk_product_relation
 where product_code in ('CMC')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
-- CCP2
('F59111D4-6DFB-4F13-A05D-5A4290B7E217', N'CDP42204', N'CMC', '0', NULL, N'CDP42204', N'01', 1),
('8ACCDE35-F5D1-40C3-988B-63DE18AD7B5D', N'CDHW10800', N'CMC', '0', NULL, N'CDHW10800', N'01', 2)
