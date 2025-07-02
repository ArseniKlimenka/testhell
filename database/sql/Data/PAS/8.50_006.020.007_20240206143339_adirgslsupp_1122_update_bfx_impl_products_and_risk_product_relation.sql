delete from bfx_impl.products
where code in
 (
	N'CorpDMS19633'
 )
insert into bfx_impl.products
(id, code, product_group, description, product_class)
values
('44CA9D8B-0214-49ED-8C0F-7F90AF5B88AD', N'CorpDMS19633', N'accidentOrIllness', N'Коллективный ДМС', N'ДМС')

delete from bfx_impl.risk_product_relation
where product_code in
 (
    N'CorpDMS19633'
 )
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
(N'7FE46117-0617-4B2D-BC4A-3AB5C851040B', N'DMS10800', N'CorpDMS19633', N'0', NULL, NULL, N'01', 1, N'main', N'insuredPerson')