-- fill bfx_impl.products
delete from bfx_impl.products
 where code = N'PREEQUITYVTB'
insert into bfx_impl.products
(id, code, product_group, description, product_class, sales_segment, main_llob)
values
('7f55f8e1-2275-4736-abae-7bcfbf626ce5', N'PREEQUITYVTB', N'equity', N'Персональный фонд Ультра', N'ДСЖ', N'VIPVTB', NULL)

-- fill bfx_impl.risks
delete from bfx_impl.risks
 where code in (N'E36914', N'DLP36914', N'DNS36414')
insert into bfx_impl.risks
(id, code, type, business_line, short_description, full_description, note, payment_form, risks_group, fns_type)
values
('47057bb8-15e6-4b3a-9dcc-56ef9a6dcfb1', N'E36914', N'life', N'36914', N'Дожитие', N'Дожитие застрахованного до окончания срока страхования', NULL, N'InsuranceAmount', N'Endowment', N'life'),
('b8ed3ae7-1326-417d-ad42-99dd698634ce', N'DLP36914', N'life', N'36914', N'Смерть ЛП', N'Смерть застрахованного по любой причине', NULL, N'InsuranceAmount', N'Death', N'life'),
('b600be3b-f52d-4351-ab17-be3b4fdc5129', N'DNS36414', N'life', N'36414', N'Смерть НС', N'Смерть Застрахованного в результате несчастного случая', NULL, N'InsuranceAmount', N'Death', N'nonLife')

-- fill bfx_impl.risk_product_relation
delete from bfx_impl.risk_product_relation
 where product_code = N'PREEQUITYVTB'
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
('a1a38025-abb5-4c4d-9e6b-3c87916fe1f6', N'E36914', N'PREEQUITYVTB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
('ac2cb1b6-5e32-4047-ab98-f3e8b8629f21', N'DLP36914', N'PREEQUITYVTB', '0', NULL, NULL, N'01', 2, N'main', N'insuredPerson'),
('19aacc9c-f176-432d-b85d-8ed664052c4a', N'DNS36414', N'PREEQUITYVTB', '0', NULL, NULL, N'01', 3, N'main', N'insuredPerson')