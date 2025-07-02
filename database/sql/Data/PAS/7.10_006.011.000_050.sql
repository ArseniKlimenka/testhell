-- bfx_impl.products
delete from bfx_impl.products
 where code in ('IBI3', 'IBI5')
insert into bfx_impl.products
(id, code, product_group, description)
values
('728ac823-4428-47c8-b677-bb2d209ae148', N'IBI3', N'investment', N'Базис Инвест (3 года)'),
('4c6307db-56f7-4f98-91d7-6e2fbc5bfabf', N'IBI5', N'investment', N'Базис Инвест (5 лет)')

-- bfx_impl.risk_product_relation
delete from bfx_impl.risk_product_relation
 where product_code in ('IBI3', 'IBI5')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code)
values
('44ca423a-6be7-4d89-8110-eb4a12edbfbd', N'E36904', N'IBI3', '0', NULL, NULL, N'01'),
('0babef65-8bf3-4c4d-83dd-eb6781247429', N'DLP36904', N'IBI3', '1', NULL, NULL, N'01'),
('e486ac10-7a82-4114-a2a2-56c233c7b761', N'DLPDP36904', N'IBI3', '0', 'DLP36904', NULL, N'03'),
('75c0cf96-2cdb-4df7-b005-6f2a9fda2fd2', N'E36904', N'IBI5', '0', NULL, NULL, N'01'),
('66e1655b-6d69-48e1-9cdd-30614166d7f5', N'DLP36904', N'IBI5', '1', NULL, NULL, N'01'),
('5f57ab96-8ac2-40eb-b9d7-9e12434c4280', N'DLPDP36904', N'IBI5', '0', 'DLP36904', NULL, N'03')

-- bfx_impl.investment_strategy
delete from bfx_impl.investment_strategy
 where code in ('pif1', 'pif2')
insert into bfx_impl.investment_strategy
(id, code, description)
values
('dfe10d41-f1cf-4bd1-adcd-139ae7603eb4', N'pif1', N'ПИФ 1'),
('1163d8ba-586b-456b-93c2-27500b3cd497', N'pif2', N'ПИФ 2')