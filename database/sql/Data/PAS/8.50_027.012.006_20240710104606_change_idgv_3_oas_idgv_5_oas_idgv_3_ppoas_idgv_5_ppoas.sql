delete from bfx_impl.risk_product_relation where product_code IN  ('IDGV3OAS' , 'IDGV5OAS', 'IDGV3PPOAS', 'IDGV5PPOAS');
insert into bfx_impl.risk_product_relation (id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, RISK_PROGRAM, RISK_PERSON) values
('077C8FA5-19FB-4354-80B6-4AB5A1AB97E8', N'E36404', N'IDGV3OAS', '0',NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
('0CFBA7F4-61CA-4DF1-9402-2BC910A32A16', N'DLPT36404', N'IDGV3OAS', '1',NULL, NULL, N'01', 2, N'main', N'insuredPerson'),
('D3BCA4C2-94D8-46DB-84F1-34920E6809A6', N'DLPDP36404', N'IDGV3OAS', '0',N'DLPT36404', NULL, N'03', 3, N'main', N'insuredPerson'),
('D78F61FB-4FD4-4AD6-AB71-6EC5F869A1F2', N'DNS36404', N'IDGV3OAS', '0',NULL, NULL, N'01', 4, N'main', N'insuredPerson'),
('A36F2430-0CE5-4F05-92AC-A7CD9F005AA6', N'E36404', N'IDGV5OAS', '0',NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
('AA703BAF-5E15-4B6B-BA1D-AEB8E65E0C0E', N'DLPT36404', N'IDGV5OAS', '1',NULL, NULL, N'01', 2, N'main', N'insuredPerson'),
('48551E74-E699-4F14-9247-6FA6D9EC8A49', N'DLPDP36404', N'IDGV5OAS', '0',N'DLPT36404', NULL, N'03', 3, N'main', N'insuredPerson'),
('46BA58F1-2B48-41EC-8FCA-B535AAB73102', N'DNS36404', N'IDGV5OAS', '0',NULL, NULL, N'01', 4, N'main', N'insuredPerson'),
('E8002350-7C7B-40B2-A891-0B00A35D187A', N'E36404', N'IDGV3PPOAS', '0',NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
('1EE2E581-D3B7-44F3-8DF4-A10AE4DEF6CB', N'DLP36404', N'IDGV3PPOAS', '1',NULL, NULL, N'01', 5, N'main', N'insuredPerson'),
('6B278953-6347-4DE6-9913-64DE7015BD19', N'DLPTDP36404', N'IDGV3PPOAS', '0',N'DLP36404', NULL, N'03', 3, N'main', N'insuredPerson'),
('7245A3CD-1F43-4411-97CA-B03407579FE4', N'DNS36404', N'IDGV3PPOAS', '0',NULL, NULL, N'01', 4, N'main', N'insuredPerson'),
('AA5EADBD-D707-4CF0-AE9B-E9C83B34AB7A', N'ME36404', N'IDGV3PPOAS', '0',NULL, NULL, N'01', 2, N'main', N'insuredPerson'),
('DAF5FC08-9FE5-4A38-A2F7-E40A4DEBE73E', N'E36404', N'IDGV5PPOAS', '0',NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
('AC29A57B-3D70-4DAC-9C1D-16C1EB1C062E', N'DLP36404', N'IDGV5PPOAS', '1',NULL, NULL, N'01', 5, N'main', N'insuredPerson'),
('A5406400-07F7-484A-AE05-69A4342D4124', N'DLPTDP36404', N'IDGV5PPOAS', '0',N'DLP36404', NULL, N'03', 3, N'main', N'insuredPerson'),
('F7E224D1-24D7-4C31-82A1-D94F74B58227', N'DNS36404', N'IDGV5PPOAS', '0',NULL, NULL, N'01', 4, N'main', N'insuredPerson'),
('45F4C5CD-9B01-4DE4-BB85-EA7C2F99D58E', N'ME36404', N'IDGV5PPOAS', '0',NULL, NULL, N'01', 2, N'main', N'insuredPerson');

delete from bfx_impl.declaration_main_questions where id = '56CEF15A-B9BE-4435-8328-4A9DEE4496E6'; insert into bfx_impl.declaration_main_questions values ('56CEF15A-B9BE-4435-8328-4A9DEE4496E6', N'Общая страховая сумма в отношении Застрахованного по риску «Смерть Застрахованного в результате несчастного случая» по всем договорам страхования ООО СК «Росгосстрах Жизнь» по продуктам инвестиционного страхования жизни и продуктам, договоры страхования по которым заключаются на основании Правил добровольного инвестиционного страхования жизни физических лиц №1 (в редакции от любого числа) и/или Правил страхования жизни (в редакции от любого числа), включая настоящий договор страхования не превышает 3 000 000 рублей для Застрахованных в возрасте от 18 до 70 полных лет (включительно) на дату заключения договора страхования.');