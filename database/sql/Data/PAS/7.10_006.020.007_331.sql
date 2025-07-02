-- products
delete from bfx_impl.products
where code in ('NOTE1BFKO')

insert into bfx_impl.products
(id, code, product_group, description, product_class)
values
('B80AF8BB-2937-444B-A192-DFD94EDD5848', N'NOTE1BFKO', N'investment', N'Нота Премиум (1 год)', N'ИСЖ')

-- risk product relation
delete from bfx_impl.risk_product_relation
 where product_code in ('NOTE1BFKO')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
-- Нота СЖ (1 год)
('8280D9B3-7C1D-46C8-8F99-DB7A3C946AED', N'E36904', N'NOTE1BFKO', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('A1F88A13-F613-41FA-B05F-068730FB64B4', N'DLP36904', N'NOTE1BFKO', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('D2CB91A3-E9BF-46E9-AE5A-8D08313816C3', N'DNS36404', N'NOTE1BFKO', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson')


--bfx_impl.investment_strategy
delete from bfx_impl.INVESTMENT_STRATEGY 
 where code in ('majorLeague 2.0')
insert into bfx_impl.INVESTMENT_STRATEGY
(ID, CODE, DESCRIPTION)
values
('91C4FC54-D934-49A7-B42F-49BEBAE5CF0E', N'majorLeague 2.0', N'Высшая лига 2.0')