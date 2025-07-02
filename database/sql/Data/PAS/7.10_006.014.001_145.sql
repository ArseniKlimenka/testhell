-- product
delete from bfx_impl.products
 where code in ('CCP2', 'CMP')
insert into bfx_impl.products
(id, code, product_group, description)
values
('b04c1f6c-676d-4648-820c-c87c2270cd3a', N'CCP2', N'credit', N'Защита кредита 2'),
('80f05402-f9f9-472b-a803-b9e24f361b6c', N'CMP', N'credit', N'Моя защита')

-- risks
delete from bfx_impl.risks
 where code in ('DNS42204', 'DA1005042204', 'DA10010042204', 'DA12012042204', 'DIL42204', 'DI1005042204', 'DI10010042204', 'DI12012042204')
insert into bfx_impl.risks
(id, code, type, business_line, short_description, full_description)
values
--CCP2
('ae9b7d5c-4ece-4555-a338-0de8a2ad9632', N'DNS42204', N'life', N'42204', N'Смерть НС', N'Смерть Застрахованного лица в результате несчастного случая'),
('7ecfa4ca-1bab-410a-a2bf-da6f15a1dfe5', N'DA1005042204', N'life', N'42204', N'ИНС 1,2 100/50', N'Инвалидность Застрахованного лица I, II группы в результате несчастного случая'),
('eb5982dd-75ff-4739-bced-ca5668916482', N'DA10010042204', N'life', N'42204', N'ИНС 1,2 100/100', N'Инвалидность Застрахованного лица I, II группы в результате несчастного случая'),
('54988d7e-9f19-48fc-9375-853e232f2c15', N'DA12012042204', N'life', N'42204', N'ИНС 1,2 120/120', N'Инвалидность Застрахованного лица I, II группы в результате несчастного случая'),
--CMP
('2e034956-80eb-4edc-aee0-9a401e449461', N'DIL42204', N'life', N'42204', N'Смерть Б', N'Смерть Застрахованного лица в результате болезни'),
('1a2c2cb1-1812-4727-b7e9-6f47f6da5467', N'DI1005042204', N'life', N'42204', N'ИБ 1,2 100/50', N'Инвалидность Застрахованного лица I, II группы в результате болезни'),
('b3ea6f99-1d31-4c8c-9f0b-c2987f08cc64', N'DI10010042204', N'life', N'42204', N'ИБ 1,2 100/100', N'Инвалидность Застрахованного лица I, II группы в результате болезни'),
('17db1d5e-8ae1-45f4-a750-5485b829fcc7', N'DI12012042204', N'life', N'42204', N'ИБ 1,2 120/120', N'Инвалидность Застрахованного лица I, II группы в результате болезни')

-- product risks
delete from bfx_impl.risk_product_relation
 where product_code in ('CCP2', 'CMP')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
-- CCP2
('2be6a203-5c65-49e1-9278-cfc3c60de596', N'DNS42204', N'CCP2', '0', NULL, N'DNS42204', N'01', 1),
('4c6607bb-0078-4a8d-a93e-805f36fdf196', N'DA1005042204', N'CCP2', '0', NULL, N'DA1005042204', N'01', 2),
('321247c6-2368-44bc-b320-bf979b8a1f7f', N'DA10010042204', N'CCP2', '0', NULL, N'DA10010042204', N'01', 3),
('11a5db10-c6bc-416b-b1ad-c2e002acdaa0', N'DA12012042204', N'CCP2', '0', NULL, N'DA12012042204', N'01', 4),
--CMP main
('57be372e-b447-4543-8f00-20ffb23eef94', N'DIL42204', N'CMP', '0', NULL, N'DIL42204', N'01', 1),
('77d01ace-9689-415e-9bd2-28a1ee0de202', N'DI1005042204', N'CMP', '0', NULL, N'DI1005042204', N'01', 2),
('240ddcfd-ae54-485c-9fd5-07502a6e4711', N'DI10010042204', N'CMP', '0', NULL, N'DI10010042204', N'01', 3),
('e8ab54b7-0fb9-41a0-8985-50d9f3936f84', N'DI12012042204', N'CMP', '0', NULL, N'DI12012042204', N'01', 4),
--CMP add (were before in previous products)
('d689ba23-a2fa-424b-a8da-74b01715d7b1', N'CD42204', N'CMP', '0', NULL, N'CD42204', N'01', 5),
('0ac3ab38-6da7-4317-ac42-3cb49c67f4c5', N'JL42204', N'CMP', '0', NULL, N'JL42204', N'01', 6),
('260ca6c0-dd55-4681-8ef2-404717a20b1d', N'I42204', N'CMP', '0', NULL, N'I42204', N'01', 7)