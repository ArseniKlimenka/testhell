
-- product
delete from bfx_impl.products
 where code in ('CMC')
insert into bfx_impl.products
(id, code, product_group, description)
values
('CD3F2EBD-640E-4AC7-A761-A86FF98D32ED', N'CMC', N'credit', N'Моя увереность')

-- product risks
delete from bfx_impl.risk_product_relation
 where product_code in ('CMC')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
-- CMC
('F59111D4-6DFB-4F13-A05D-5A4290B7E217', N'CDP36404', N'CMC', '0', NULL, N'CDP36404', N'01', 1),
('8ACCDE35-F5D1-40C3-988B-63DE18AD7B5D', N'CDHW10800', N'CMC', '0', NULL, N'CDHW10800', N'01', 2)

INSERT INTO BFX_IMPL.CREDIT_PROGRAM (CODE, DESCRIPTION, PROGRAM_VERSION) VALUES (N'п00562023', N'п00562023', NULL)