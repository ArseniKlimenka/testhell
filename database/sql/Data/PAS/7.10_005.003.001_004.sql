/**
* Description: Initial population of Risks, Insurance Program and Products code tables
* Auth: IvanM
*/


-- [BFX_IMPL].[RISKS]
DELETE FROM [BFX_IMPL].[RISKS]
INSERT INTO [BFX_IMPL].[RISKS]
(ID, CODE, TYPE, SHORT_DESCRIPTION, FULL_DESCRIPTION)
VALUES
('1D5A2D97-D299-4085-A791-21CC35A0F123', N'endowment', N'life', N'Дожитие', N'Дожитие застрахованного'),
('2EC5A352-5968-424A-8914-3BA167EC3E73', N'death', N'life', N'Смерть ЛП', N'Смерть застрахованного по любой причине'),
('868849A8-F8D9-4DC9-9916-50722CB3E93F', N'deathReturn', N'life', N'Смерть ЛП возврат взносов', N'Смерть застрахованного по любой причине с возвратом страховых взносов'),
('B13DB87C-3C43-48A8-9C33-53ECE661BC1F', N'deathAcc', N'life', N'Смерть НС', N'Смерть застрахованного в результате несчастного случая'),
('0B1A2390-3E5A-46DF-8B02-68257C07DDF4', N'deathCar', N'life', N'Смерть ДТП', N'Смерть застрахованного в результате дорожно-транспортного происшествия'),
('5FBB4EA6-C34E-4619-8CE7-79B89FA88F74', N'disabilityAccWop', N'life', N'Инв 1,2 НС ОУСВ', N'Инвалидность застрахованного с установлением I, II группы инвалидности в результате несчастного случая с освобождением от уплаты страховых взносов'),
('AA6B4334-DDF9-4E1D-ADE6-8BC9F6A84493', N'endowment', N'investmentContractWithDPF', N'Дожитие', N'Дожитие Застрахованного до окончания срока страхования'),
('5B21A4A5-4604-45EF-8C7C-C63DE8A8DD28', N'endowmentCoupon', N'investmentContractWithDPF', N'Дожитие до дат выплаты аннуитетов', N'Дожитие Застрахованного до оговоренных в договоре страхования сроков, установленных в договоре страхования для выплаты аннуитетов'),
('8C543D8C-9AD9-4386-846B-CA354949671D', N'death', N'investmentContractWithDPF', N'Смерть ЛП', N'Смерть застрахованного по любой причине'),
('DF43E571-6828-407B-BDBA-E1FF8085A999', N'deathAcc', N'investmentContractWithDPF', N'Смерть НС', N'Смерть застрахованного в результате несчастного случая'),
('835C4F52-6EF5-40BD-97D4-F643082E7B5D', N'deathDeferred', N'investmentContractWithDPF', N'Смерть ЛП отложенная выплата', N'Смерть Застрахованного по любой причине с отложенной страховой выплатой')


-- [BFX_IMPL].[INSURANCE_PROGRAMS]
DELETE FROM [BFX_IMPL].[INSURANCE_PROGRAMS]
INSERT INTO [BFX_IMPL].[INSURANCE_PROGRAMS]
(ID, CODE, DESCRIPTION)
VALUES
('E04925BB-9690-4FA3-B731-50E3252948CF', N'classic', N'Классика'),
('5BCF81A0-42CC-433A-8742-9B5111985C31', N'coupon', N'Купонный')


-- [BFX_IMPL].[PRODUCTS]
DELETE FROM [BFX_IMPL].[PRODUCTS]
INSERT INTO [BFX_IMPL].[PRODUCTS]
(ID, CODE, PRODUCT_GROUP, DESCRIPTION)
VALUES
('94FB0181-6EDC-4347-AC6D-2D229E7FA737', N'financialPlan', N'НСЖ', N'Финансовый план'),
('652D66A1-9D3E-4819-B694-E1E4283E1B40', N'driver', N'ИСЖ', N'Драйвер')