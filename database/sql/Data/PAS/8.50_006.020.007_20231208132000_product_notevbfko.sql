-- products NOTEV1BFKO
delete from bfx_impl.products
where code in ('NOTEV1BFKO')

insert into bfx_impl.products
(id, code, product_group, description, product_class)
values
('52C68E7D-AA39-4E43-A7E3-E82B8B46E447', N'NOTEV1BFKO', N'investment', N'Нота СЖ (1 год)', N'ИСЖ')


-- risk product relation
delete from bfx_impl.risk_product_relation
where product_code in ('NOTEV1BFKO')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
-- Нота СЖ (1 года)
('7541C00A-2336-4EB4-958D-FE52C52F6E62', N'E36904', N'NOTEV1BFKO', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('3A85990C-DD1C-4119-A086-1F7B39AAD51D', N'DLP36904', N'NOTEV1BFKO', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('C8600B54-6D54-4EC2-BCB1-300AD20CC5C0', N'DNS36404', N'NOTEV1BFKO', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson')


--bfx_impl.investment_strategy
delete from bfx_impl.INVESTMENT_STRATEGY 
 where code in ('growthHeadliners 4.0')
insert into bfx_impl.INVESTMENT_STRATEGY
(ID, CODE, DESCRIPTION)
values
('AAAF5E91-B1E1-4041-873A-12F08101E625', N'growthHeadliners 4.0', N'Хедлайнеры роста 4.0')
