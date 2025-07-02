-- products
delete from bfx_impl.products
where code in ('GENCHKSPORT','GENCHKTALENTS','GENCHKHEALTH')

insert into bfx_impl.products
(id, code, product_group, description)
values
('94CC2B73-11AB-4931-9FEE-C9C2543522DD', N'GENCHKSPORT', N'med', N'Генетичексий чек-ап для детей "Питание и спорт"'),
('A4B0F822-E342-4568-9316-D30AEE500721', N'GENCHKTALENTS', N'med', N'Генетичексий чек-ап для детей "Таланты и способности"'),
('33C2FB9F-F39C-4F53-AB73-1367D34D3C55', N'GENCHKHEALTH', N'med', N'Генетичексий чек-ап "Мое здоровье"')

-- risk product relation
delete from bfx_impl.risk_product_relation
 where product_code in ('GENCHKSPORT', 'GENCHKTALENTS', 'GENCHKHEALTH')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
-- Генетичексий чек-ап для детей "Питание и спорт"
('92582FCF-F40C-4EEB-8023-77E02B415418', N'CU10800', N'GENCHKSPORT', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
-- Генетичексий чек-ап для детей "Таланты и способности"
('9C8D730F-C2DD-41C5-8687-BB5307F86C51', N'CU10800', N'GENCHKTALENTS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
-- Генетичексий чек-ап "Мое здоровье"
('DE450268-6D21-45A4-99F6-3A22B0C16F61', N'CU10800', N'GENCHKHEALTH', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson')
