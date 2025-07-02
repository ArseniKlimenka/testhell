/**
* Description: Update risk and product values. Add Risk-Product relation values
* Auth: IvanM
*/

-- [BFX_IMPL].[RISKS]
DELETE FROM [BFX_IMPL].[RISKS]
INSERT INTO [BFX_IMPL].[RISKS]
(ID, CODE, TYPE, BUSINESS_LINE, SHORT_DESCRIPTION, FULL_DESCRIPTION)
VALUES
('178C3742-90E0-4F8B-9DA9-102622CAAC44', N'E36102', N'life', '36102', N'Дожитие', N'Дожитие застрахованного до окончания срока страхования'),
('35C3A0B8-2513-45E8-87FC-16734702F09E', N'DLPSS36102', N'life', '36102', N'Смерть ЛП СС', N'Смерть застрахованного по любой причине'),
('4A2DDA30-C1DA-41CC-877A-25E6E4DBAA8F', N'DPVV36102', N'life', '36102', N'Смерть ЛП ВВ', N'Смерть застрахованного по любой причине с возвратом страховых взносов'),
('992B9D2C-7D7C-4F41-9408-27DAC5FE771F', N'DNS36102', N'life', '36102', N'Смерть НС', N'Смерть застрахованного в результате несчастного случая'),
('B33C5A33-2763-4307-9514-33562239FD79', N'D36102', N'life', '36102', N'Инвалидность 1,2 гр ЛП ОУСВ', N'Инвалидность застрахованного с установлением I, II группы инвалидности в результате несчастного случая или болезни с освобождением от уплаты страховых взносов'),
('10CDA4AB-B429-48A2-9D43-57F25D3A9CAE', N'JL36102', N'life', '36102', N'Потеря работы ОУСВ', N'Дожитие застрахованного до недобровольной потери работы с освобождением от уплаты одного взноса'),
('443AEF34-2E78-4147-B27E-5EFE7587978F', N'CD36102', N'life', '36102', N'КЗ', N'Первичное диагностирование застрахованному критического заболевания (5 болезней)'),
('E219D9D1-9665-4776-BF6E-63E655E4D790', N'HI36102', N'life', '36102', N'ТТП', N'Тяжкие телесные повреждения в результате несчастного случая'),
('2ED330CC-3FFA-4C48-B42F-685E389062B8', N'E36404', N'life', '36404', N'Дожитие', N'Дожитие застрахованного до окончания срока страхования'),
('DC42FAFC-40D8-43A4-9BF9-7C7D2C1E71CA', N'DLPVV36404', N'life', '36404', N'Смерть ЛП ВВ', N'Смерть застрахованного по любой причине с возвратом страховых взносов'),
('2AF4F17B-9C10-4119-AB90-9D595DE01CBF', N'DNS36404', N'life', '36404', N'Смерть НС', N'Смерть застрахованного в результате несчастного случая'),
('084362C1-73FF-4870-BC46-A7AF545D0B58', N'D36404', N'life', '36404', N'Инвалидность 1,2 гр НС ОУСВ', N'Инвалидность Застрахованного с установлением I, II группы инвалидности в результате несчастного случая от уплаты страховых взносов'),
('4C15B75E-78DE-4C44-B45A-A7C25B8AA1C8', N'CDP36404', N'life', '36404', N'КЗ выплата', N'Первичное диагностирование Застрахованному критического заболевания'),
('70CA96ED-AA84-4358-88C8-A7E8BD5481D1', N'CDH36404', N'life', '36404', N'КЗ лечение', N'Первичное диагностирование Застрахованному критического заболевания'),
('99F09802-AAB3-4E5D-B9C8-B0C8A0BF84C9', N'CU36404', N'life', '36404', N'Чек-ап', N'Очный чекап для Застрахованного один раз в 2 года'),
('2E02FACF-8482-4103-B8E7-C5801A114753', N'E36904', N'investmentContractWithDPF', '36904', N'Дожитие', N'Дожитие застрахованного до окончания срока страхования'),
('389137AB-6E0F-497B-B611-C67B8DB96517', N'DLP36904', N'investmentContractWithDPF', '36904', N'Смерть ЛП', N'Смерть застрахованного по любой причине'),
('5B73416D-718B-4363-8982-CD2A789744C4', N'DNS36904', N'investmentContractWithDPF', '36904', N'Смерть НС', N'Смерть застрахованного в результате несчастного случая'),
('D9FD64C9-5FB4-4D0C-B013-D6AFF9508265', N'DLPDP36904', N'investmentContractWithDPF', '36904', N'Смерть ЛП отлож выплата', N'Смерть Застрахованного по любой причине с отложенной страховой выплатой'),
('61C82FB4-80BB-4780-B4A1-E5E7159A5DFC', N'IE36904', N'investmentContractWithDPF', '36904', N'ИСЖ-Регул. премия - Дожитие', N'Дожитие Застрахованного до окончания срока страхования'),
('894C099A-69CB-4B04-9047-E7D76BE154A0', N'IDLPVV36904', N'investmentContractWithDPF', '36904', N'ИСЖ-Регул. премия - Смерть ЛП ВВ', N'Смерть Застрахованного по любой причине'),
('EA7D5E0C-3469-481D-87FB-FB5D212DAAED', N'IDNSVV36904', N'investmentContractWithDPF', '36904', N'ИСЖ-Регул. премия - Смерть НС ВВ', N'Смерть застрахованного в результате несчастного случая'),
('A3A03580-D4B3-4B73-AE1D-FC947CDB95C2', N'IDLPDP36904', N'investmentContractWithDPF', '36904', N'ИСЖ-Регул. премия - Смерть ЛП отлож. Выплата', N'Смерть Застрахованного по любой причине с отложенной страховой выплатой')


-- [BFX_IMPL].[PRODUCTS]
DELETE FROM [BFX_IMPL].[PRODUCTS]
INSERT INTO [BFX_IMPL].[PRODUCTS]
(ID, CODE, PRODUCT_GROUP, DESCRIPTION)
VALUES
('9F7B38E0-B7F3-470E-83DA-486B9495A232', N'ERC', N'endowment', N'Надежный выбор'),
('5E56BAA4-9D7D-4BF3-962B-547B62795931', N'ERCP', N'endowment', N'Надежный выбор Премиум'),
('E2AEC768-92A6-4F9B-AF1D-5673A672E411', N'EHVP', N'endowment', N'Вектор здоровья Премиум'),
('7237D02A-4716-4CD5-B090-FFAB5E58CBFA', N'IDC3', N'investment', N'Драйвер. Классика (3 года)'),
('4875E9FB-9318-43AE-9785-A6FC4BEB7B59', N'IDC5', N'investment', N'Драйвер. Классика (5 лет)'),
('AB246E46-4E27-4019-800A-AB362FF5C058', N'IDC', N'investment', N'Драйвер. Купонный'),
('5E894932-90C4-4F39-B811-B8683DC8D0A9', N'IDCP3', N'investment', N'Драйвер. Классика Премиум (3 года)'),
('2055F9F1-D74E-405A-A2F2-C1F0D9817077', N'IDCP5', N'investment', N'Драйвер. Классика Премиум (5 лет)'),
('F2000675-A0AE-4028-9DC0-D88EBFAB4B9E', N'IDCP', N'investment', N'Драйвер. Купонный Премиум'),
('DF452EB8-1817-46E3-BB6E-DE095AA5ED12', N'ISO', N'investment', N'Страйк Оптимум'),
('1F842487-4F01-4C6C-901D-64A52BAB0682', N'ISP', N'investment', N'Страйк Премиум'),
('AC96F9D5-224F-414B-81B7-ED6F033254EB', N'IDFP', N'investment', N'Драйвер. Фиксированный Премиум')

DELETE FROM BFX_IMPL.RISK_PRODUCT_RELATION
INSERT INTO BFX_IMPL.RISK_PRODUCT_RELATION
(ID, PRODUCT_CODE, RELATION_TYPE, RISK_CODE, REPLACEMENT_RISKS, CONDITIONS_FUNCTION)
VALUES
('8F7C47DE-3AD4-4570-BFEB-12DAB4C7E8B7', N'ERC',	N'mandatory', N'E36102', NULL, NULL),
('6D1407BD-3028-4DC1-86D3-1598038B3526', N'ERCP',	N'mandatory', N'E36102', NULL, NULL),
('A8EDBEAF-F3A9-453F-8751-162FD70B0EB0', N'ERC',	N'mandatory', N'DLPSS36102', NULL, N'DLPSS36102ERC'),
('CE64DA6A-E6F1-4448-85A7-17CBA9DDCEBF', N'ERCP',	N'mandatory', N'DLPSS36102', NULL, N'DLPSS36102ERCP'),
('78318A26-B832-446C-998B-18D413C791F1', N'ERC',	N'mandatory', N'DPVV36102', NULL, N'DPVV36102ERC'),
('B56C205B-A97C-4BD4-80C0-1C6E88728069', N'ERCP',	N'mandatory', N'DPVV36102', NULL, N'DPVV36102ERCP'),
('A122DF15-DCD1-4FAA-8E29-1E885F8DB813', N'ERC',	N'mandatory', N'DNS36102', NULL, NULL),
('A254A8A1-7A2C-4C28-9D65-222A42504DB8', N'ERCP',	N'mandatory', N'DNS36102', NULL, NULL),
('585337CB-50E1-4906-96BB-28DBB76BC3C4', N'ERC',	N'mandatory', N'D36102', NULL, N'D36102ERC'),
('31629E5F-124B-43E5-A40F-3791E0839143', N'ERCP',	N'mandatory', N'D36102', NULL, N'D36102ERCP'),
('8F8D143F-A92C-403B-939B-40B7789EA4EC', N'ERCP',	N'mandatory', N'JL36102', NULL, N'JL36102ERCP'),
('DE045024-4ACD-4E11-8650-466392956BD7', N'ERCP',	N'mandatory', N'CD36102', NULL, N'CD36102ERCP'),
('C1D5B0F7-F1FD-4C57-A55D-581E17CF7324', N'ERCP',	N'mandatory', N'HI36102', NULL, N'HI36102ERCP'),
('F745651E-9A3A-4494-B2E5-5DDBB8BF13A3', N'EHVP',	N'mandatory', N'E36404', NULL, NULL),
('1C598018-A253-4520-A27F-6933358B2ECE', N'EHVP',	N'mandatory', N'DLPVV36404', NULL, N'DLPVV36404EHVP'),
('71A8FE82-B4AA-4E3F-8678-78580D8BDF5F', N'EHVP',	N'mandatory', N'DNS36404', NULL, NULL),
('722A2869-8B5A-4EA1-BD3A-7ABF1A206EFB', N'EHVP',	N'mandatory', N'D36404', NULL, N'D36404EHVP'),
('F9E4AA98-CE8A-492C-ADD8-8516CA8A3954', N'EHVP',	N'optional', N'CDP36404', N'CDH36404', N'CDP36404EHVP'),
('E69C6C53-EAC1-4EA2-8113-87430B089171', N'EHVP',	N'mandatory', N'CU36404', NULL, NULL),
('16B3B567-EC29-4843-915E-8ED1B71E3EBC', N'IDC3', N'mandatory', N'E36904', NULL, NULL),
('EA1CB583-20D5-4136-8F6D-8F7E29F0E456', N'IDC5', N'mandatory', N'E36904', NULL, NULL),
('CEE457F3-0F5A-4303-A5F4-9317A5547311', N'IDC', N'mandatory', N'E36904', NULL, NULL),
('19C74AB3-EFC9-4D83-9DDA-9CF0E9F24851', N'IDCP3', N'mandatory', N'E36904', NULL, NULL),
('CFC0C468-6419-4FAC-A37E-9F6C23BB6D3E', N'IDCP5', N'mandatory', N'E36904', NULL, NULL),
('A96390B4-61C4-4F53-956F-A60F7A6F9161', N'IDCP', N'mandatory', N'E36904', NULL, NULL),
('5ABF531F-CBD4-4A54-B3A4-A6FC0AE9D78F', N'IDC3', N'optional', N'DLP36904', N'DLPDP36904', NULL),
('3B379C10-7CD5-49DF-8172-ACA681584666', N'IDC5', N'optional', N'DLP36904', N'DLPDP36904', NULL),
('93E9CF86-BA7A-4C45-BF0A-ACDD9C3EF888', N'IDC', N'optional', N'DLP36904', N'DLPDP36904', NULL),
('31B8FC14-28E4-485D-B9E5-C00384628050', N'IDCP3', N'optional', N'DLP36904', N'DLPDP36904', NULL),
('3B4FAF0C-61A6-4FCF-87D7-C0692210682E', N'IDCP5', N'optional', N'DLP36904', N'DLPDP36904', NULL),
('5AD85B06-094D-431C-97DF-CEC8DD1146CE', N'IDCP', N'optional', N'DLP36904', N'DLPDP36904', NULL),
('F0620819-934B-4399-9FAE-D377D2C28AFB', N'IDC3', N'mandatory', N'DNS36904', NULL, NULL),
('F86DE17E-0C9B-4CC4-870E-D4CE1142A158', N'IDC5', N'mandatory', N'DNS36904', NULL, NULL),
('34CEFCF3-F0D0-4121-A506-D544EF172F1E', N'IDC', N'mandatory', N'DNS36904', NULL, NULL),
('B71B247E-DF27-4CC0-9E59-D9AADD89AD5D', N'IDCP3', N'mandatory', N'DNS36904', NULL, NULL),
('4C8EC29F-2930-4380-AF44-DA004184B405', N'IDCP5', N'mandatory', N'DNS36904', NULL, NULL),
('D4002DEE-BF1E-4203-B21A-DA46ACDAB035', N'IDCP', N'mandatory', N'DNS36904', NULL, NULL),
('64B8F423-BFE0-4AB6-975C-DE85F25EF403', N'ISO', N'mandatory', N'IE36904', NULL, NULL),
('F24E8508-D418-4A28-9AD4-E919BA53EBA2', N'ISP', N'mandatory', N'IE36904', NULL, NULL),
('2DDC2B24-BC15-4660-AD8F-EAD8E0481248', N'ISO', N'optional', N'IDLPVV36904', N'IDLPDP36904', NULL),
('6CF2800E-4CE2-43E9-BB33-EC0026953097', N'ISP', N'optional', N'IDLPVV36904', N'IDLPDP36904', NULL),
('B422A524-74EB-4BAC-A811-F558B4BD9B41', N'ISO', N'mandatory', N'IDNSVV36904', NULL, NULL),
('A7F4CEA0-D993-469C-AF29-F885D00BDAC1', N'ISP', N'mandatory', N'IDNSVV36904', NULL, NULL)
