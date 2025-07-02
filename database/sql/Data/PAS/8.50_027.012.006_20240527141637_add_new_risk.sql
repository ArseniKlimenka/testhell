-- add new migration risk CDH210800
delete from BFX_IMPL.RISKS
where code IN('CDH210800')
insert into BFX_IMPL.RISKS
(ID, CODE, TYPE, BUSINESS_LINE, SHORT_DESCRIPTION, FULL_DESCRIPTION, NOTE, PAYMENT_FORM, RISKS_GROUP, FNS_TYPE)
values
('62C27A8F-9E8E-48E6-A2C1-8C7EEDDFD3EC', N'CDH210800', N'nonLife', '10800', N'КЗ лечение Дет', N'Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой ДМС «Диагностирование и лечение критического заболевания», вследствие расстройства здоровья или состояния Застрахованного, требующих получения таких услуг', NULL, N'InsuranceAmount', N'CD', N'nonLife')