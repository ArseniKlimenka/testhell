delete from bfx_impl.products
where code in ('PROGENTICSBFKO','PROHEAITHBFKO','PROHEALTHBFKO','PROZOZHBFKO')

insert into bfx_impl.products
(id, code, product_group, description)
values
('23909615-A69C-4B83-A86A-1152ADCF961F', N'PROGENTICSBFKO', N'med', N'ПРО Генетику'),
('C397650A-5503-4085-97BA-A59B8EB53365', N'PROHEALTHBFKO', N'med', N'ПРО Здоровье'),
('7ECF3E82-8643-4015-8628-50A23D3A1BDE', N'PROZOZHBFKO', N'med', N'ПРО ЗОЖ')


-- risk product relation
delete from bfx_impl.risk_product_relation
 where product_code in ('PROGENTICSBFKO','PROHEAITHBFKO','PROHEALTHBFKO','PROZOZHBFKO')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
-- ПРО Генетику
('96B0C469-DD78-4A68-A946-755B1555D053', N'CU10800', N'PROGENTICSBFKO', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),

-- ПРО Здоровье
('9C7E197E-2AAF-41F7-BC27-C7D1104039A9', N'CU10800', N'PROHEALTHBFKO', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),

-- ПРО ЗОЖ
('C5F8D021-3E7C-4CCE-95AF-F5DC00840F72', N'TCU10800', N'PROZOZHBFKO', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson')