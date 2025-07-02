delete from bfx_impl.products
 where code in ('IBG3BFKO', 'IBG5BFKO', 'IBI3BFKO', 'IBI5BFKO')
insert into bfx_impl.products
(id, code, product_group, description)
values
('095bf813-d034-4eb6-9379-79bfd9060ed3', N'IBG3BFKO', N'investment', N'Базис Гарант (3 года)'),
('b502b980-96b3-4f5a-8cdf-825fa0576a1c', N'IBG5BFKO', N'investment', N'Базис Гарант (5 лет)'),
('10e52e4f-02c7-4b49-9e3b-89317f0c903a', N'IBI3BFKO', N'investment', N'Базис Инвест (3 года)'),
('334ea4ce-6db8-4035-853e-a4c399e9e843', N'IBI5BFKO', N'investment', N'Базис Инвест (5 лет)')

delete from bfx_impl.risk_product_relation
 where product_code in ('IBG3BFKO', 'IBG5BFKO', 'IBI3BFKO', 'IBI5BFKO')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
('5f7bfba4-ea02-4357-b73c-e916c6cfd14b', N'E36904', N'IBG3BFKO', '0', NULL, NULL, N'01', 1),
('d5e159b4-c828-4519-8385-519efd20d37f', N'DLP36904', N'IBG3BFKO', '1', NULL, NULL, N'01', 2),
('6676aa3d-dee6-41dd-a3de-d98a117743b3', N'E36904', N'IBG5BFKO', '0', NULL, NULL, N'01', 1),
('4f12d5fb-6668-4336-998a-a10686001454', N'DLP36904', N'IBG5BFKO', '1', NULL, NULL, N'01', 2),
('cd8ab5d1-97bd-48b7-84df-97c80815a2c5', N'E36904', N'IBI3BFKO', '0', NULL, NULL, N'01', 1),
('b21f33c8-b619-48d6-b46d-9b84a02de6cf', N'DLP36904', N'IBI3BFKO', '1', NULL, NULL, N'01', 2),
('82554c5a-bccc-4d9b-861f-5e18a1872fb5', N'E36904', N'IBI5BFKO', '0', NULL, NULL, N'01', 1),
('6da8f134-f86d-49af-bf20-32ef95f98b7f', N'DLP36904', N'IBI5BFKO', '1', NULL, NULL, N'01', 2)

delete from bfx_impl.investment_strategy
 where code in ('fosagro', 'yandex')
insert into bfx_impl.investment_strategy
(id, code, description)
values
('6c3385f7-798f-479f-a0d9-0dd4cf6cb0e1', N'fosagro', N'Акции - Фосагро'),
('826c9718-d964-41d4-9cbd-b870cf301b3a', N'yandex', N'Акции - Яндекс')