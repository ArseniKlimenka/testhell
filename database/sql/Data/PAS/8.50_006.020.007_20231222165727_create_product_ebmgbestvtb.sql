-- products
delete from bfx_impl.products
where code in ('EBMGBESTVTB')
insert into bfx_impl.products
(id, code, product_group, description, product_class)
values
('0216C52D-951C-4F91-8D2C-5FE631DD96F8', N'EBMGBESTVTB', N'endowment', N'Стратегия на пять. Гарант', N'НСЖ')


-- risk product relation
delete from bfx_impl.risk_product_relation
where product_code in ('EBMGBESTVTB')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
-- Стратегия на пять. Гарант ВТБ Премиум. Сотрудники ВТБ
('AE279030-A900-49AC-9AAD-4C772603B25B', N'E36404', N'EBMGBESTVTB', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('82EFF8AE-FA52-41E3-BCF4-8F67C900B603', N'DLPVV36404', N'EBMGBESTVTB', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('25381A8F-3E20-4973-958D-98D744463909', N'DNSVV36404', N'EBMGBESTVTB', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson')
