/**
* Description: Update risk and product values
* Auth: IvanM
*/

-- [BFX_IMPL].[RISKS]
DELETE FROM [BFX_IMPL].[RISKS]
INSERT INTO [BFX_IMPL].[RISKS]
(ID, CODE, TYPE, BUSINESS_LINE, SHORT_DESCRIPTION, FULL_DESCRIPTION)
VALUES
('178C3742-90E0-4F8B-9DA9-102622CAAC44', N'endowment', N'life', '36102', N'Дожитие', N'Дожитие застрахованного до окончания срока страхования'),
('35C3A0B8-2513-45E8-87FC-16734702F09E', N'deathLPSS', N'life', '36102', N'Смерть ЛП СС', N'Смерть застрахованного по любой причине'),
('4A2DDA30-C1DA-41CC-877A-25E6E4DBAA8F', N'deathLPVV', N'life', '36102', N'Смерть ЛП ВВ', N'Смерть застрахованного по любой причине с возвратом страховых взносов'),
('992B9D2C-7D7C-4F41-9408-27DAC5FE771F', N'deathNS', N'life', '36102', N'Смерть НС', N'Смерть застрахованного в результате несчастного случая'),
('B33C5A33-2763-4307-9514-33562239FD79', N'disability', N'life', '36102', N'Инвалидность 1,2 гр ЛП ОУСВ', N'Инвалидность застрахованного с установлением I, II группы инвалидности в результате несчастного случая или болезни с освобождением от уплаты страховых взносов'),
('10CDA4AB-B429-48A2-9D43-57F25D3A9CAE', N'jobLoss', N'life', '36102', N'Потеря работы ОУСВ', N'Дожитие застрахованного до недобровольной потери работы с освобождением от уплаты одного взноса'),
('443AEF34-2E78-4147-B27E-5EFE7587978F', N'criticalDesiase', N'life', '36102', N'КЗ', N'Первичное диагностирование застрахованному критического заболевания (5 болезней)'),
('E219D9D1-9665-4776-BF6E-63E655E4D790', N'hardInjury', N'life', '36102', N'ТТП', N'Тяжкие телесные повреждения в результате несчастного случая'),
('2ED330CC-3FFA-4C48-B42F-685E389062B8', N'endowment', N'life', '36404', N'Дожитие', N'Дожитие застрахованного до окончания срока страхования'),
('DC42FAFC-40D8-43A4-9BF9-7C7D2C1E71CA', N'deathLPVV', N'life', '36404', N'Смерть ЛП ВВ', N'Смерть застрахованного по любой причине с возвратом страховых взносов'),
('2AF4F17B-9C10-4119-AB90-9D595DE01CBF', N'deathNS', N'life', '36404', N'Смерть НС', N'Смерть застрахованного в результате несчастного случая'),
('084362C1-73FF-4870-BC46-A7AF545D0B58', N'disability', N'life', '36404', N'Инвалидность 1,2 гр НС ОУСВ', N'Инвалидность Застрахованного с установлением I, II группы инвалидности в результате несчастного случая от уплаты страховых взносов'),
('4C15B75E-78DE-4C44-B45A-A7C25B8AA1C8', N'criticalDesiasePayout', N'life', '36404', N'КЗ выплата', N'Первичное диагностирование Застрахованному критического заболевания'),
('70CA96ED-AA84-4358-88C8-A7E8BD5481D1', N'criticalDesiaseHealing', N'life', '36404', N'КЗ лечение', N'Первичное диагностирование Застрахованному критического заболевания'),
('99F09802-AAB3-4E5D-B9C8-B0C8A0BF84C9', N'checkUp', N'life', '36404', N'Чек-ап', N'Очный чекап для Застрахованного один раз в 2 года'),
('2E02FACF-8482-4103-B8E7-C5801A114753', N'endowment', N'investmentContractWithDPF', '36904', N'Дожитие', N'Дожитие застрахованного до окончания срока страхования'),
('389137AB-6E0F-497B-B611-C67B8DB96517', N'deathLS', N'investmentContractWithDPF', '36904', N'Смерть ЛП', N'Смерть застрахованного по любой причине'),
('5B73416D-718B-4363-8982-CD2A789744C4', N'deathNS', N'investmentContractWithDPF', '36904', N'Смерть НС', N'Смерть застрахованного в результате несчастного случая'),
('D9FD64C9-5FB4-4D0C-B013-D6AFF9508265', N'deathLPDelayPayout', N'investmentContractWithDPF', '36904', N'Смерть ЛП отлож выплата', N'Смерть Застрахованного по любой причине с отложенной страховой выплатой'),
('61C82FB4-80BB-4780-B4A1-E5E7159A5DFC', N'investmentEndowment', N'investmentContractWithDPF', '36904', N'ИСЖ-Регул. премия - Дожитие', N'Дожитие Застрахованного до окончания срока страхования'),
('894C099A-69CB-4B04-9047-E7D76BE154A0', N'investmentDeathLPVV', N'investmentContractWithDPF', '36904', N'ИСЖ-Регул. премия - Смерть ЛП ВВ', N'Смерть Застрахованного по любой причине'),
('EA7D5E0C-3469-481D-87FB-FB5D212DAAED', N'investmentDeathNSVV', N'investmentContractWithDPF', '36904', N'ИСЖ-Регул. премия - Смерть НС ВВ', N'Смерть застрахованного в результате несчастного случая'),
('A3A03580-D4B3-4B73-AE1D-FC947CDB95C2', N'investmentDeathLPDelayPayout', N'investmentContractWithDPF', '36904', N'ИСЖ-Регул. премия - Смерть ЛП отлож. Выплата', N'Смерть Застрахованного по любой причине с отложенной страховой выплатой')


-- [BFX_IMPL].[PRODUCTS]
DELETE FROM [BFX_IMPL].[PRODUCTS]
INSERT INTO [BFX_IMPL].[PRODUCTS]
(ID, CODE, PRODUCT_GROUP, DESCRIPTION)
VALUES
('9F7B38E0-B7F3-470E-83DA-486B9495A232', N'reliableChoise', N'endowment', N'Надежный выбор'),
('5E56BAA4-9D7D-4BF3-962B-547B62795931', N'reliableChoisePremium', N'endowment', N'Надежный выбор Премиум'),
('E2AEC768-92A6-4F9B-AF1D-5673A672E411', N'healthVectorPremium', N'endowment', N'Вектор здоровья Премиум'),
('7237D02A-4716-4CD5-B090-FFAB5E58CBFA', N'DriverClassic3', N'investment', N'Драйвер. Классика (3 года)'),
('4875E9FB-9318-43AE-9785-A6FC4BEB7B59', N'DriverClassic5', N'investment', N'Драйвер. Классика (5 лет)'),
('AB246E46-4E27-4019-800A-AB362FF5C058', N'DriverCoupon', N'investment', N'Драйвер. Купонный'),
('5E894932-90C4-4F39-B811-B8683DC8D0A9', N'DriverClassicPremium3', N'investment', N'Драйвер. Классика Премиум (3 года)'),
('2055F9F1-D74E-405A-A2F2-C1F0D9817077', N'DriverClassicPremium5', N'investment', N'Драйвер. Классика Премиум (5 лет)'),
('F2000675-A0AE-4028-9DC0-D88EBFAB4B9E', N'DriverCouponPremium', N'investment', N'Драйвер. Купонный Премиум'),
('DF452EB8-1817-46E3-BB6E-DE095AA5ED12', N'StrikeOptimum', N'investment', N'Страйк Оптимум'),
('1F842487-4F01-4C6C-901D-64A52BAB0682', N'StrikePremium', N'investment', N'Страйк Премиум'),
('AC96F9D5-224F-414B-81B7-ED6F033254EB', N'DriverFixedPremium', N'investment', N'Драйвер. Фиксированный Премиум')