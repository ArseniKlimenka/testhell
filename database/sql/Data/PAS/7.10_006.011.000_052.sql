-- bfx_impl.products
delete from bfx_impl.products
 where code in ('ERC2', 'ERCP2', 'EHVP2')
insert into bfx_impl.products
(id, code, product_group, description)
values
('716a1298-c915-4f79-8d88-94e62769f4fe', N'ERC2', N'endowment', N'Надежный выбор 2.0'),
('3bfa0347-e070-487b-b415-8038a511bcf7', N'ERCP2', N'endowment', N'Надежный выбор Премиум 2.0'),
('1d6cfdf0-65c7-4e1e-abcf-c8ef270f8364', N'EHVP2', N'endowment', N'Вектор здоровья Премиум 2.0')

-- bfx_impl.risks
delete from bfx_impl.risks
 where code in ('E36404', 'DLPSS36404', 'DNS36404', 'D36404', 'JL36404', 'CD36404', 'HI36404', 'DLPVV36404', 'DA36404', 'CDP36404')
insert into bfx_impl.risks
(id, code, type, business_line, short_description, full_description)
values
('918484b3-95c0-43b9-b3ee-8945f313625a', N'E36404', N'life', N'36404', N'Дожитие', N'Дожитие Застрахованного до окончания срока страхования'),
('8a2fbbfd-ba4a-4822-96fc-789fc2c57aee', N'DLPSS36404', N'life', N'36404', N'Смерть ЛП СС', N'Смерть Застрахованного по любой причине'),
('24db6f95-acc3-4e8c-abb2-03228d21d403', N'DNS36404', N'life', N'36404', N'Смерть НС', N'Смерть Застрахованного в результате несчастного случая'),
('d6a1a1b8-fdf5-4456-a551-1b6dacf404d1', N'D36404', N'life', N'36404', N'Инв 1,2 ЛП ОУСВ', N'Инвалидность Застрахованного с установлением I, II группы инвалидности по любой причине с освобождением от уплаты страховых взносов'),
('7bddf9e7-8908-4237-ad2b-79e45aec5aa3', N'JL36404', N'life', N'36404', N'Потеря работы ОУСВ', N'Дожитие Застрахованного до недобровольной потери работы с освобождением от уплаты одного взноса'),
('b6430376-b794-474e-aff0-588aa09f0b1f', N'CD36404', N'life', N'36404', N'КЗ-5', N'Первичное диагностирование Застрахованному критического заболевания'),
('d5083428-0138-4b34-a640-a4451089764f', N'HI36404', N'life', N'36404', N'Тяжелая травма', N'Тяжкие телесные повреждения Застрахованного в результате несчастного случая'),
('efe0752e-8ac5-46d7-883b-10e2ae5d365f', N'DLPVV36404', N'life', N'36404', N'Смерть ЛП ВВ', N'Смерть Застрахованного по любой причине'),
('0a5d7a02-8c46-49a8-af26-58fd785abdea', N'DA36404', N'life', N'36404', N'Инв 1,2 НС ОУСВ', N'Инвалидность Застрахованного с установлением I, II группы инвалидности в результате несчастного случая с освобождением от уплаты страховых взносов'),
('4833f80b-2a94-4544-9208-7fc3e5e130ef', N'CDP36404', N'life', N'36404', N'КЗ выплата', N'Первичное диагностирование Застрахованному критического заболевания')

-- bfx_impl.risk_product_relation
delete from bfx_impl.risk_product_relation
 where product_code in ('ERC2', 'ERCP2', 'EHVP2')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code)
values
('f4853aac-7c90-4ef8-83dc-2c74ff850a8d', N'E36404', N'ERC2', '0', NULL, NULL, N'01'),
('d85e87f7-e67d-4d7c-9076-92b494701a53', N'DLPSS36404', N'ERC2', '0', NULL, NULL, N'01'),
('1e32cdf3-f04c-4e96-bed7-9a48202fa9e5', N'DNS36404', N'ERC2', '0', NULL, NULL, N'01'),
('bb9af93e-ba15-4e5c-9349-d8a906dc032a', N'D36404', N'ERC2', '0', NULL, 'D36404ERC2', N'01'),
('d9db78e4-37a0-4ffb-9d1c-767b1df1d2c9', N'E36404', N'ERCP2', '0', NULL, NULL, N'01'),
('c51bf324-3dbf-4d66-8d45-59a4d0212ae4', N'DLPSS36404', N'ERCP2', '0', NULL, NULL, N'01'),
('7d6e8581-4145-40a7-9bc1-bc84be98738e', N'DNS36404', N'ERCP2', '0', NULL, NULL, N'01'),
('54f5162b-dfa3-456f-9c09-7800cb879805', N'D36404', N'ERCP2', '0', NULL, 'D36404ERCP2', N'01'),
('68395c15-8eb1-414a-8204-e0c8a5903d96', N'JL36404', N'ERCP2', '0', NULL, 'JL36404ERCP2', N'01'),
('65293f86-e10b-4651-b3d9-3845edcfa4fb', N'CD36404', N'ERCP2', '0', NULL, 'CD36404ERCP2', N'02'),
('06502f65-859a-4ddd-bc69-abe8906d8112', N'HI36404', N'ERCP2', '0', NULL, 'HI36404ERCP2', N'02'),
('78282a96-3f6e-4c77-b227-065be977a0d2', N'E36404', N'EHVP2', '0', NULL, NULL, N'01'),
('228eb5ad-c0e8-4174-a5c5-241ee995c70c', N'DLPVV36404', N'EHVP2', '0', NULL, NULL, N'01'),
('b3296e5f-9698-4da0-ac40-bbaeb0301e94', N'DNS36404', N'EHVP2', '0', NULL, NULL, N'01'),
('4ef83bb0-8bc9-405c-aba6-9a1d11294d02', N'DA36404', N'EHVP2', '0', NULL, 'DA36404EHVP2', N'01'),
('35653ecb-7991-4979-a9a6-0344a08b17f8', N'CDH10800', N'EHVP2', '1', NULL, NULL, N'01'),
('45b08df4-6f39-4c46-8daa-8f868adfacf4', N'CDP36404', N'EHVP2', '0', 'CDH10800', 'CDP36404EHVP2', N'03'),
('7aca1ec5-7e75-40b0-93e3-fdbed4d0c3d8', N'CU10800', N'EHVP2', '0', NULL, NULL, N'01')