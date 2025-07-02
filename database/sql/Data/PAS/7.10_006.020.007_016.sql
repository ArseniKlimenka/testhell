-- products
delete from bfx_impl.products
where code in ('CAPCLRELOAS', 'CAPCLCHILDOAS', 'CAPCLRELBOXOAS', 'CAPCLCHILDBOXOAS')

insert into bfx_impl.products
(id, code, product_group, description)
values
('E8D3A775-6550-49A4-BB1F-EF5AF72714A0', N'CAPCLRELOAS', N'endowment', N'Надежный капитал. Классика 2.0 (Классика)'),
('A89D23DC-D1D5-4731-8001-2F5FD61D8B68', N'CAPCLCHILDOAS', N'endowment', N'Детский капитал. Классика 2.0 (Классика)'),
('9FD55CBA-12B0-4048-ACCA-90CE12F931FF', N'CAPCLRELBOXOAS', N'endowment', N'Надежный капитал. Классика 2.0 (Коробка)'),
('6721A67B-9C2F-45A5-B3E7-BB313CAE5B33', N'CAPCLCHILDBOXOAS', N'endowment', N'Детский капитал. Классика 2.0 (Коробка)')

delete from bfx_impl.products
where code in ('RHELIGHTOAS','RHEBASEOAS','RHEOPTIMAOAS')

insert into bfx_impl.products
(id, code, product_group, description)
values
('F571A5CB-2ED4-4D6C-AC33-7DCA4EDB8071', N'RHELIGHTOAS', N'med', N'Восстанови здоровье Лайт 2.0'),
('F765AE69-9753-4565-BD1D-93B7A386A05D', N'RHEBASEOAS', N'med', N'Восстанови здоровье Базовый 2.0'),
('E7E35111-76F8-44CF-8139-180FC946C62C', N'RHEOPTIMAOAS', N'med', N'Восстанови здоровье Оптима 2.0')

--risks
delete from bfx_impl.risks
 where code in ('RCON10800','RIHON10800','RSON10800','RC10800','RIH10800','RS10800','RAD10800','TC10800','TIH10800','TS10800','TAD10800')
insert into bfx_impl.risks
(ID, CODE, TYPE, BUSINESS_LINE, SHORT_DESCRIPTION, FULL_DESCRIPTION)
values
('7D4C85B8-106A-415B-83DC-AE0D9CFA7F93', N'RCON10800', N'life', '10800', N'Реабилитация в результате COVID-19 ОНЛАЙН', N'Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой, вследствие расстройства здоровья или состояния Застрахованного, требующих получения таких услуг'),
('299C0BBD-E2F4-46C4-8513-732EB1ED841A', N'RIHON10800', N'life', '10800', N'Реабилитация Травма головы ОНЛАЙН', N'Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой, вследствие расстройства здоровья или состояния Застрахованного, требующих получения таких услуг'),
('8DB7D6EB-DA4A-4CD0-ACF8-EE0666A12E52', N'RSON10800', N'life', '10800', N'Реабилитация Инсульт ОНЛАЙН', N'Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой, вследствие расстройства здоровья или состояния Застрахованного, требующих получения таких услуг'),
('9043BDDB-C439-46A5-BE74-68856BB1DF64', N'RC10800', N'life', '10800', N'Реабилитация COVID', N'Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой, вследствие расстройства здоровья или состояния Застрахованного, требующих получения таких услуг'),
('D0FDC0E8-D41B-4B99-8649-ACB24FE9EB6D', N'RIH10800', N'life', '10800', N'Реабилитация травма головы', N'Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой, вследствие расстройства здоровья или состояния Застрахованного, требующих получения таких услуг'),
('DF5986B7-9417-461A-A8D0-F7F538C14FB1', N'RS10800', N'life', '10800', N'Реабилитация инсульт', N'Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой, вследствие расстройства здоровья или состояния Застрахованного, требующих получения таких услуг'),
('A3A1F714-F934-4F12-85ED-103C2D1C93E8', N'RAD10800', N'life', '10800', N'Реабилитация расширенные заболевания', N'Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой, вследствие расстройства здоровья или состояния Застрахованного, требующих получения таких услуг'),
('FA66BD0E-1EE5-486D-9899-B4F5207A993C', N'TC10800', N'life', '10800', N'Транспортировка COVID', N'Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой, вследствие расстройства здоровья или состояния Застрахованного, требующих получения таких услуг'),
('4E862CFD-1025-4F21-A23B-081DAE47F748', N'TIH10800', N'life', '10800', N'Транспортировка травма головы', N'Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой, вследствие расстройства здоровья или состояния Застрахованного, требующих получения таких услуг'),
('39581A65-2216-4999-B8B8-7A2E5011D466', N'TS10800', N'life', '10800', N'Транспортировка инсульт', N'Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой, вследствие расстройства здоровья или состояния Застрахованного, требующих получения таких услуг'),
('C2E60F69-E40A-4AD5-B1F1-3E66633ABAA1', N'TAD10800', N'life', '10800', N'Транспортировка расширенные заболевания', N'Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой, вследствие расстройства здоровья или состояния Застрахованного, требующих получения таких услуг')

-- risk product relation
delete from bfx_impl.risk_product_relation
 where product_code in ('RHELIGHTOAS','RHEBASEOAS','RHEOPTIMAOAS')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
-- Восстанови здоровье Лайт 2.0
('CF4130BA-C340-4A7C-8BF5-206CBB764FEE', N'RCON10800', N'RHELIGHTOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('CE9F3589-A169-4E3B-BDE8-58889344D4D7', N'RIHON10800', N'RHELIGHTOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('1A86EB59-2BF7-4E94-BC94-ED902B379446', N'RSON10800', N'RHELIGHTOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
-- Восстанови здоровье Базовый 2.0
('8B4F840D-845B-4095-8DCB-A3329075D7A2', N'RIH10800', N'RHEBASEOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('FD954E60-5930-4EF9-87BF-7F4F2872DED7', N'RS10800', N'RHEBASEOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('E53D4A52-2BF9-43B6-9EE3-F5A90E60AC59', N'TIH10800', N'RHEBASEOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('DD352FB6-B8C8-422C-A168-185475FB6D68', N'TS10800', N'RHEBASEOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('2E0B1657-83C7-4FA3-AEE5-22E2C6C36C43', N'HC20700', N'RHEBASEOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
-- Восстанови здоровье Оптима 2.0
('6DA30714-032D-48E3-B330-4BA313690CC6', N'RC10800', N'RHEOPTIMAOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('36EA8FC9-02A1-4958-9621-ADB529F8224E', N'RIH10800', N'RHEOPTIMAOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('602C5585-57B2-43A0-81D2-EC7DEC95F225', N'RS10800', N'RHEOPTIMAOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('13B12722-1D02-4154-92EE-1308683C9669', N'RAD10800', N'RHEOPTIMAOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('971F0D77-C976-4C6D-AA90-3011CDD075F9', N'TC10800', N'RHEOPTIMAOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('8717F156-B2D7-4B3B-B9F3-FFF1268794A7', N'TIH10800', N'RHEOPTIMAOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('323D4709-3226-4C89-8FD2-B00C9C5D631A', N'TS10800', N'RHEOPTIMAOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('0F72157F-6E4B-44AB-AAB5-4F3D86B04D41', N'TAD10800', N'RHEOPTIMAOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('E621DD19-AC71-4D89-A994-5C4E7B59E69D', N'HC20700', N'RHEOPTIMAOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson')