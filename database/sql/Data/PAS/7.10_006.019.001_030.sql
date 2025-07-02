 --bfx_impl.products
delete from bfx_impl.products
 where code in ('CACB')
insert into bfx_impl.products
(id, code, product_group, description)
values
('d933f9f4-6b31-4a72-8844-63e75dc19284', N'CACB', N'credit', N'Гарант защиты')

--bfx_impl.risks
delete from bfx_impl.risks
 where code in ('TDA42204', 'TDLP42204', 'CDP42204', 'HA42204', 'ITP42204')
insert into bfx_impl.risks
(id, code, type, business_line, short_description, full_description)
values
('0c3f2e6e-0736-4bdc-be56-25fcf7e1ac3c', N'TDA42204', N'life', N'42204', N'ВНТ НС', N'Временная утрата трудоспособности Застрахованным в результате несчастного случая'),
('3211d398-cf43-4f56-8183-f562e6f65aef', N'TDLP42204', N'life', N'42204', N'ВНТ ЛП', N'Временная утрата трудоспособности Застрахованным по любой причине'),
('7ac912b9-b343-43e7-8f1f-ce422df10d72', N'CDP42204', N'life', N'42204', N'КЗ выплата', N'Первичное диагностирование Застрахованному критического заболевания'),
('9b7ff9b2-958b-43c5-af95-e2ebc758b108', N'HA42204', N'life', N'42204', N'Госп НС', N'Госпитализация Застрахованного в результате несчастного случая'),
('2fc4b049-1ae3-4b4d-a224-5e855dfd553d', N'ITP42204', N'life', N'42204', N'Травма ТП', N'Травма Застрахованного в результате транспортного происшествия')

--bfx_impl.risk_product_relation
delete from bfx_impl.risk_product_relation
 where product_code in ('CACB')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
('f9424e41-95ac-4504-86b0-9b25374d967c', N'DNS42204', N'CACB', '0', NULL, N'DNS42204', N'01', 1),
('5d51a8bd-848e-4873-bc92-295a13af4161', N'DA10010042204', N'CACB', '0', NULL, N'DA10010042204', N'01', 2),
('8aad98da-e075-4876-b4b3-fec5ceb725e9', N'TDA42204', N'CACB', '0', NULL, N'TDA42204', N'01', 3),
('c4398edc-f412-4d55-92fc-dcc8af94b94b', N'DLP42204', N'CACB', '0', NULL, N'DLP42204', N'01', 4),
('04145b7c-a32f-4468-9de4-2cdf03bb3403', N'D42204', N'CACB', '0', NULL, N'D42204', N'01', 5),
('e8b0f536-e9ad-4730-814b-0ab55b9caa3d', N'TDLP42204', N'CACB', '0', NULL, N'TDLP42204', N'01', 6),
('d87da0ae-f346-4dda-aad8-8c1e15a914ab', N'CDP42204', N'CACB', '0', NULL, N'CDP42204', N'01', 7),
('b2918f81-45f6-46ca-8252-3931cd0a709a', N'I42204', N'CACB', '0', NULL, N'I42204', N'01', 8),
('94c66e3e-d1b2-4567-93c7-9d943bd8f7d7', N'HA42204', N'CACB', '0', NULL, N'HA42204', N'01', 9),
('e23725d2-dfae-4497-91ac-2a20862a24b2', N'ITP42204', N'CACB', '0', NULL, N'ITP42204', N'01', 10),
('5cd3d302-9001-4452-b7fc-cb11974f675f', N'JL42204', N'CACB', '0', NULL, N'JL42204', N'01', 11)