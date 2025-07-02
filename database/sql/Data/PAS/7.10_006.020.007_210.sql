-- products
delete from bfx_impl.products
where code in ('NOTEV2BFKO', 'NOTEV3BFKO')

insert into bfx_impl.products
(id, code, product_group, description, product_class)
values
('509A1214-CF26-441B-9A39-5E3ED4E33A22', N'NOTEV2BFKO', N'investment', N'Нота СЖ (2 года)', N'НСЖ'),
('002599B1-19FE-48D0-BD6C-751A03C7AD1B', N'NOTEV3BFKO', N'investment', N'Нота СЖ (3 года)', N'НСЖ')


-- risk product relation
delete from bfx_impl.risk_product_relation
 where product_code in ('NOTEV2BFKO', 'NOTEV3BFKO')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
-- Нота СЖ (2 года)
('E1F49FBA-1D17-4BF2-8572-6F1D09A730EA', N'E36904', N'NOTEV2BFKO', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('0E8FB504-9336-41F6-91DC-E25D8AF6760E', N'DLP36904', N'NOTEV2BFKO', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('231DA9B6-2E45-4AF4-A41E-EA6871ECDB62', N'DNS36404', N'NOTEV2BFKO', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson'),
-- Нота СЖ (3 года)
('5EED5E96-F67A-44E3-B8A3-40A362694678', N'E36904', N'NOTEV3BFKO', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('040F27D7-EEFE-4E16-8EEB-76CF6012789B', N'DLP36904', N'NOTEV3BFKO', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('CCA01D50-0C0B-4FF1-AA91-C27B04963AD5', N'DNS36404', N'NOTEV3BFKO', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson')


--bfx_impl.investment_strategy
delete from bfx_impl.INVESTMENT_STRATEGY 
 where code in ('keyTrends', 'currentTrends')
insert into bfx_impl.INVESTMENT_STRATEGY
(ID, CODE, DESCRIPTION)
values
('45888C19-74C8-4B91-A7B4-F7C2959A9CBE', N'keyTrends', N'Ключевые тенденции'),
('E97C89A1-1812-4D14-B404-E7D5027461B0', N'currentTrends', N'Актуальные тренды')