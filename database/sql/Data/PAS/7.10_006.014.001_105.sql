-- product
delete from bfx_impl.products
 where code in ('EFRBFKO')
insert into bfx_impl.products
(id, code, product_group, description)
values
('035d9edf-f031-4aaa-8cc5-fc538f60a96d', N'EFRBFKO', N'endowment', N'Финансовый резерв')

-- risks
delete from bfx_impl.risks
 where code in ('DVV36404', 'DAVV36404', 'DTP36404', 'CTDA36404', 'DASS36404', 'CDHR10800', 'CDHW10800', 'CDVV36404')
insert into bfx_impl.risks
(id, code, type, business_line, short_description, full_description)
values
('c0b51f1b-1c65-4037-bb3e-44f616a17096', N'DVV36404', N'life', N'36404', N'ИЛП 1,2 ВВ', N'Инвалидность Застрахованного с установлением I, II группы инвалидности по любой причине'),
('89ef9e34-e969-4431-9f32-ae1b83c23773', N'DAVV36404', N'life', N'36404', N'ИНС 1,2 ВВ', N'Инвалидность Застрахованного с установлением I, II группы инвалидности в результате несчастного случая'),
('ebb071e0-e45e-48cd-81f0-06d98cf65604', N'DTP36404', N'life', N'36404', N'Смерть ТП', N'Смерть Застрахованного в результате транспортного происшествия'),
('7e227d74-012e-4853-87d9-74150ad6a594', N'CTDA36404', N'life', N'36404', N'ВНТ НС', N'Непрерывная временная утрата трудоспособности Застрахованным в результате несчастного случая'),
('21ac051d-e710-485a-91d8-6a4392a7cd4b', N'DASS36404', N'life', N'36404', N'ИНС 1,2', N'Инвалидность Застрахованного с установлением I или II группы инвалидности в результате несчастного случая'),
('56b9f79a-c122-4582-821a-50393d75ce7a', N'CDHR10800', N'nonLife', N'10800', N'КЗ лечение РФ', N'Первичное диагностирование Застрахованному критического заболевания'),
('fc161961-24e0-49b5-a529-8341e23feecb', N'CDHW10800', N'nonLife', N'10800', N'КЗ лечение весь мир', N'Первичное диагностирование Застрахованному критического заболевания'),
('a84c7cc7-c583-4938-82d9-c3c9ac8c7bfa', N'CDVV36404', N'life', N'36404', N'КЗ ОУСВ', N'Первичное диагностирование Застрахованному критического заболевания с освобождением от уплаты страховых взносов')

-- product risks
delete from bfx_impl.risk_product_relation
 where product_code in ('EFRBFKO')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
-- main risks
('a6989c47-6ac4-4036-a377-569629038b12', N'E36404', N'EFRBFKO', '0', NULL, NULL, N'01', 1),
('5136bef2-4a0e-4982-afb2-058e795bc564', N'DLPSS36404', N'EFRBFKO', '0', NULL, NULL, N'01', 2),
('a1d284ff-f8fa-4811-afd9-89fd6c088801', N'DVV36404', N'EFRBFKO', '1', NULL, N'DVV36404EFRBFKO', N'01', 3),
('13cc01ed-1cf9-45b1-a619-236ffbfda7c4', N'DAVV36404', N'EFRBFKO', '0', N'DVV36404', N'DAVV36404EFRBFKO', N'03', 4),
-- package 1
('0ba67ee0-8ab7-474c-b2e3-af2b0c2727b3', N'DNS36404', N'EFRBFKO', '0', NULL, N'DNS36404EFRBFKO', N'01', 5),
('0e649325-851b-46ab-aa14-119109ee75d6', N'DTP36404', N'EFRBFKO', '0', NULL, N'DTP36404EFRBFKO', N'01', 6),
-- package 2
('783b61db-796f-4c15-a3f9-42b5579c8900', N'CTDA36404', N'EFRBFKO', '0', NULL, N'CTDA36404EFRBFKO', N'01', 7),
('0a2e0616-7fbc-4ea0-907f-5ef3077051c2', N'DASS36404', N'EFRBFKO', '0', NULL, N'DASS36404EFRBFKO', N'01', 8),
-- package 3
('788efa11-647c-49c2-9534-4dfa4c979acd', N'CDP36404', N'EFRBFKO', '1', NULL, N'CDP36404EFRBFKO', N'01', 9),
('fedf0301-a200-4a3d-b830-4c410309b9d7', N'CDHR10800', N'EFRBFKO', '0', N'CDP36404', N'CDHR10800EFRBFKO', N'03', 10),
('5be1f4ae-2557-43f4-b8fb-118b4565c8bf', N'CDHW10800', N'EFRBFKO', '0', N'CDP36404', N'CDHW10800EFRBFKO', N'03', 11),
('843c7934-6dbb-4355-91ca-2d14a7c19516', N'CDVV36404', N'EFRBFKO', '0', NULL, N'CDVV36404EFRBFKO', N'01', 12)