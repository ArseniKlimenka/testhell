--risks
delete from bfx_impl.risks
where code in ('RCON10800','RIHON10800','RSON10800','RC10800','RIH10800','RS10800','RAD10800','TC10800','TIH10800','TS10800','TAD10800')

delete from bfx_impl.risks
where code in ('MHON10800','MH10800')

insert into bfx_impl.risks
(ID, CODE, TYPE, BUSINESS_LINE, SHORT_DESCRIPTION, FULL_DESCRIPTION)
values
('8FC3338A-C901-4B57-A201-5D8258851202', N'MHON10800', N'life', '10800', N'Обращение на мед. или иными услугами ОНЛАЙН', N'Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой, вследствие расстройства здоровья или состояния Застрахованного, требующих получения таких услуг'),
('FC596E2A-9E7F-47C3-BFAC-1F6D829A3F1D', N'MH10800', N'life', '10800', N'Обращение на мед. или иными услугами', N'Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой, вследствие расстройства здоровья или состояния Застрахованного, требующих получения таких услуг')

-- risk product relation
delete from bfx_impl.risk_product_relation
 where product_code in ('RHELIGHTOAS','RHEBASEOAS','RHEOPTIMAOAS')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
-- Восстанови здоровье Лайт 2.0
('270C54FF-893A-4970-9792-9DC4B9DB4141', N'MHON10800', N'RHELIGHTOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
-- Восстанови здоровье Базовый 2.0
('68ED28E9-CDB5-45EC-9473-8B1BA155FB5F', N'MH10800', N'RHEBASEOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('74471CBA-7FA8-4E66-8F18-70808DF7A0A6', N'HC20700', N'RHEBASEOAS', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
-- Восстанови здоровье Оптима 2.0
('4FCCD633-5084-45DA-97F4-C39C1D7D7427', N'MH10800', N'RHEOPTIMAOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('52245481-D885-46C6-9A9F-5422582FC10B', N'HC20700', N'RHEOPTIMAOAS', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson')