-- products NOTE1BFKO3
delete from bfx_impl.products
where code in ('NOTE1BFKO3')

insert into bfx_impl.products
(id, code, product_group, description, product_class)
values
('26267F6E-D9EF-4F65-AE36-069B8ACB7FA1', N'NOTE1BFKO3', N'investment', N'Нота Премиум (1 год)', N'ИСЖ')

-- risk product relation
delete from bfx_impl.risk_product_relation
 where product_code in ('NOTE1BFKO3')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
-- Нота СЖ (1 год)
('9A4DEA28-CDFC-44BD-BA85-0DBFE6582095', N'E36904', N'NOTE1BFKO3', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('3D58D131-4C60-4972-93A6-6C26AE0D565A', N'DLP36904', N'NOTE1BFKO3', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('6EE8FA09-8A90-4F79-BF08-9065E79ACA6A', N'DNS36404', N'NOTE1BFKO3', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson')


--bfx_impl.investment_strategy
delete from bfx_impl.INVESTMENT_STRATEGY 
 where code in ('majorLeague 3.0')
insert into bfx_impl.INVESTMENT_STRATEGY
(ID, CODE, DESCRIPTION)
values
('B8638463-B6DE-423F-9706-F1F68D04F39D', N'majorLeague 3.0', N'Высшая лига 3.0')


