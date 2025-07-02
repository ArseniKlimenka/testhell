-- products
delete from bfx_impl.products
where code in ('EBMGRETVTB')
insert into bfx_impl.products
(id, code, product_group, description, product_class, sales_segment)
values
('0C7FA7BA-F8B7-44D2-9275-09787E528809', N'EBMGRETVTB', N'endowment', N'Стратегия на пять. Гарант', N'НСЖ', N'massVTB')


-- risk product relation
delete from bfx_impl.risk_product_relation
 where product_code in ('EBMGRETVTB')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
-- Стратегия на пять. Гарант ВТБ розница
('25EDA52C-4420-4500-AAC1-2D56467FEFD3', N'E36404', N'EBMGRETVTB', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('D3A5FE2E-7D85-43E0-B0D2-8EF149483267', N'DLPVV36404', N'EBMGRETVTB', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('E910B4F3-97ED-4F6D-863B-2396865CE44D', N'DNSVV36404', N'EBMGRETVTB', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson')