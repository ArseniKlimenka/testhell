-- IBG PSB start
--bfx_impl.products
select * from bfx_impl.products
 where code in ('IBG', 'IBG3', 'IBG5', 'IBG7', 'IBG10', 'IBGP3', 'IBGP5', 'IBGP7', 'IBGP10')

delete from bfx_impl.products
 where code in ('IBG', 'IBG3', 'IBG5', 'IBG7', 'IBG10', 'IBGP3', 'IBGP5', 'IBGP7', 'IBGP10')
insert into bfx_impl.products
(id, code, product_group, description)
values
('789cd192-ea16-4b2d-9791-0462b06a8079', N'IBG3', N'investment', N'Базис Гарант (3 года)'),
('9fa27e49-73c8-40f5-bbf7-49be0aba2981', N'IBG5', N'investment', N'Базис Гарант (5 лет)'),
('b5f5afc5-3f43-4e96-9403-638c724e412d', N'IBG7', N'investment', N'Базис Гарант (7 лет)'),
('70e9e9c5-9010-4b90-bbc5-d5a6aeeb9c1d', N'IBG10', N'investment', N'Базис Гарант (10 лет)'),
('0d92e82d-1716-4c46-a64d-46f2340fecde', N'IBGP3', N'investment', N'Базис Гарант (3 года)'),
('7f5d7849-2102-4d65-9c57-2d90eb39d338', N'IBGP5', N'investment', N'Базис Гарант (5 лет)'),
('df985cb9-0770-4a61-b010-5add6ece12cf', N'IBGP7', N'investment', N'Базис Гарант (7 лет)'),
('085bdfab-af63-49eb-9d17-e6e666df254c', N'IBGP10', N'investment', N'Базис Гарант (10 лет)')

--bfx_impl.risk_product_relation
select * from bfx_impl.risk_product_relation
 where product_code in ('IBG', 'IBG3', 'IBG5', 'IBG7', 'IBG10', 'IBGP3', 'IBGP5', 'IBGP7', 'IBGP10')

delete from bfx_impl.risk_product_relation
 where product_code in ('IBG', 'IBG3', 'IBG5', 'IBG7', 'IBG10', 'IBGP3', 'IBGP5', 'IBGP7', 'IBGP10')

insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
('aba7dce2-c15e-46de-9f2a-fac66f394a7a', N'E36404', N'IBG3', '0', NULL, NULL, N'01', 1),
('f1a49551-cce2-4463-893c-357c5d0633c8', N'DLP36404', N'IBG3', '0', NULL, NULL, N'01', 2),
('6d880a9b-763d-44b6-bebd-e3a16a7b4d48', N'E36404', N'IBG5', '0', NULL, NULL, N'01', 1),
('df27ce97-647c-43eb-ad6e-da885e7c86ce', N'DLP36404', N'IBG5', '0', NULL, NULL, N'01', 2),
('5a9aaddd-c9f4-4d22-8241-e442d265a47d', N'E36404', N'IBG7', '0', NULL, NULL, N'01', 1),
('c8b51bbf-a47c-4c03-a01f-fdb2e89960a0', N'DLP36404', N'IBG7', '0', NULL, NULL, N'01', 2),
('0b86e407-7261-416b-a418-c6aac0253d17', N'E36404', N'IBG10', '0', NULL, NULL, N'01', 1),
('1aaa2a84-7da3-4e2a-b33d-19523521af76', N'DLP36404', N'IBG10', '0', NULL, NULL, N'01', 2),
('1b12310a-3c0e-4475-959e-cca28a00b3b2', N'E36404', N'IBGP3', '0', NULL, NULL, N'01', 1),
('ef0e606c-fadb-4cc1-be5f-805bdb840ec3', N'DLP36404', N'IBGP3', '0', NULL, NULL, N'01', 2),
('047de42b-955e-4d42-bfdd-cc2f6cd5cfff', N'E36404', N'IBGP5', '0', NULL, NULL, N'01', 1),
('1f38d8a9-2193-4715-bfff-5e02a6e20cc5', N'DLP36404', N'IBGP5', '0', NULL, NULL, N'01', 2),
('537c90b8-7b1a-45c8-bb3c-d5c7b123002a', N'E36404', N'IBGP7', '0', NULL, NULL, N'01', 1),
('c7289336-0ae4-46a9-8b84-b8a635fb24cb', N'DLP36404', N'IBGP7', '0', NULL, NULL, N'01', 2),
('af17ea12-e760-42d4-9cb1-15d506d6b959', N'E36404', N'IBGP10', '0', NULL, NULL, N'01', 1),
('15aa7f10-7870-4790-ab19-33a4f513f84b', N'DLP36404', N'IBGP10', '0', NULL, NULL, N'01', 2)
-- IBG PSB end

-- IBI PSB start
--bfx_impl.products
select * from bfx_impl.products
 where code like '%IBI%'

delete from bfx_impl.products
 where code in ('IBI10', 'IBIP3', 'IBIP5', 'IBIP10')
insert into bfx_impl.products
(id, code, product_group, description)
values
('c4151658-663e-4824-a912-718f115c72fa', N'IBI10', N'investment', N'Базис Инвест (10 лет)'),
('d9e02bfe-28d3-4d99-9d18-b09803624aa0', N'IBIP3', N'investment', N'Базис Инвест (3 года)'),
('9edc5f1f-40f9-43a9-bcdf-6cdfe43a7f45', N'IBIP5', N'investment', N'Базис Инвест (5 лет)'),
('92f84d6d-1e29-4adf-9048-f64a4a11ae8f', N'IBIP10', N'investment', N'Базис Инвест (10 лет)')

--bfx_impl.risk_product_relation
select * from bfx_impl.risk_product_relation
 where product_code in ('IBI3', 'IBI5')

delete from bfx_impl.risk_product_relation
 where product_code in ('IBI10', 'IBIP3', 'IBIP5', 'IBIP10')

insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
('f924dd15-6d29-495f-bb33-e4a342437714', N'E36904', N'IBI10', '0', NULL, NULL, N'01', 1),
('dc722582-288d-4916-9b47-97261653a0b4', N'DLP36904', N'IBI10', '0', NULL, NULL, N'01', 2),
('eeb17ece-fd3a-4623-9144-3359e331b037', N'E36904', N'IBIP3', '0', NULL, NULL, N'01', 1),
('3c949de5-9116-4300-b688-b13386d49ca3', N'DLP36904', N'IBIP3', '0', NULL, NULL, N'01', 2),
('0d49a2f5-af17-4c48-b262-b14db78992e0', N'E36904', N'IBIP5', '0', NULL, NULL, N'01', 1),
('fd1098b6-0f2e-4ed9-a8d3-102092c302c8', N'DLP36904', N'IBIP5', '0', NULL, NULL, N'01', 2),
('c465bc3a-4aa1-4ac1-8b53-db344e0026b0', N'E36904', N'IBIP10', '0', NULL, NULL, N'01', 1),
('8399e9d1-2b2c-4948-b361-5f047031521b', N'DLP36904', N'IBIP10', '0', NULL, NULL, N'01', 2)

delete from bfx_impl.risk_product_relation
 where product_code in ('IBI3', 'IBI5')
   and risk_code = 'DLPDP36904'

update bfx_impl.risk_product_relation
   set is_replaceable = 0
 where product_code in ('IBI3', 'IBI5')
   and risk_code = 'DLP36904'

--bfx_impl.investment_strategy
delete from bfx_impl.investment_strategy
 where code in ('stock1', 'stock2')
insert into bfx_impl.investment_strategy
(id, code, description)
values
('28d8bd9e-572c-43b7-aa14-7570c4cce0a0', N'stock1', N'Акции - 1'),
('337b06b0-014f-49bd-aaa7-e6ac064fdc6c', N'stock2', N'Акции - 2')
-- IBI PSB end