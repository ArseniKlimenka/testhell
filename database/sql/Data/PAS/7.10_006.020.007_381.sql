-- Добавление продуктов
delete from bfx_impl.products
 where code in ('IBI3BFKO17', 'IBI5BFKO17')
insert into bfx_impl.products
(id, code, product_group, description)
values
('20E86827-44C2-4F60-A020-3EEDBE87E55C', N'IBI3BFKO17', N'investment', N'Базис Инвест (3 года)'),
('54B104E7-CA73-4A9D-A2A8-8F45F7B7140E', N'IBI5BFKO17', N'investment', N'Базис Инвест (5 лет)')

-- Добавление рисков 
delete from bfx_impl.risk_product_relation
 where product_code in ('IBI3BFKO17', 'IBI5BFKO17')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
('E84E320C-4CD4-47CE-8552-2D73EE69167F', N'E36904', N'IBI3BFKO17', '0', NULL, NULL, N'01', 1),
('F2A49A8F-4F3E-4B10-A5E0-25D71FBEE828', N'DLP36904', N'IBI3BFKO17', '0', NULL, NULL, N'01', 2),
('EA1CC936-27CD-4ED7-AAFC-BCCCC7293F0A', N'E36904', N'IBI5BFKO17', '0', NULL, NULL, N'01', 1),
('2DB07AF6-3ADB-40DF-A71B-311B789A2080', N'DLP36904', N'IBI5BFKO17', '0', NULL, NULL, N'01', 2)

-- Добавление стратегий 
delete from bfx_impl.investment_strategy
 where code in ('vtb', 'sberbank', 'magnit', 'novatek', 'polusZoloto', 'alrosa', 'afkSystem', 'severstal', 'nlmk', 'mmk', 'nornikel')
insert into bfx_impl.investment_strategy
(id, code, description)
values
('31ABE41C-F2F2-4AE3-9645-5087D258D4F5', N'vtb', N'Акции - ВТБ'),
('0CDA7E35-2A5A-40C3-BC27-163EBD7081A2', N'sberbank', N'Акции - Сбербанк'),
('B70E9879-A262-4779-AD00-BB205559C447', N'magnit', N'Акции - Магнит'),
('AC6E5339-161F-46BC-8BE1-532DC79DFD0A', N'novatek', N'Акции - Новатек'),
('5AF1BFE6-4896-4BC6-BE87-C76A7A692E1F', N'polusZoloto', N'Акции - Полюс Золото'),
('68A5C035-B4D5-4B48-8682-8C323DDC87EE', N'alrosa', N'Акции - Алроса'),
('1C73B4FE-A7DD-47AE-89CC-6A5408A29F1B', N'afkSystem', N'Акции - АФК Система'),
('432510DF-6715-467D-9C35-11B3C4C80B36', N'severstal', N'Акции - Северсталь'),
('5B785F1A-76A8-40AA-8F8B-BD780DBBB160', N'nlmk', N'Акции - НЛМК'),
('043CA214-AD1A-428C-9D64-772EE9F9CE44', N'mmk', N'Акции - ММК'),
('D2CEBC95-0ADA-4983-BDA3-A5092492E605', N'nornikel', N'Акции - ГМК Норникель')



-- Добавление строк для IBI3BFKO17
delete from bfx_impl.declaration_main where id = '1788D5B0-B3F3-4EAB-9410-4266D7C89A77'; insert into bfx_impl.declaration_main values ('1788D5B0-B3F3-4EAB-9410-4266D7C89A77', 'IBI3BFKO17', '1', '02ED9AF9-B8F1-4C3F-81C0-396C00AB40D9', 'underwriting','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = 'A2CE3629-E550-412E-B645-709F8E14687B'; insert into bfx_impl.declaration_main values ('A2CE3629-E550-412E-B645-709F8E14687B', 'IBI3BFKO17', '2', '3C749C44-B107-41D9-A7FD-3A49FD9DAF98', 'compliance','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = '02DF283D-1AC0-4B1A-8B63-AC060C97EC79'; insert into bfx_impl.declaration_main values ('02DF283D-1AC0-4B1A-8B63-AC060C97EC79', 'IBI3BFKO17', '3', 'ECB5B89B-1CC9-453E-A109-67D17377793B', 'compliance','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = 'C74CE338-4BF5-4771-AE0E-2F73F6A6D15A'; insert into bfx_impl.declaration_main values ('C74CE338-4BF5-4771-AE0E-2F73F6A6D15A', 'IBI3BFKO17', '4', '621F76D7-3D42-4824-BB99-F6B8D2CB2DF6', 'compliance','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = 'CD5EFDDA-5654-4419-8578-7D3E0FAFFAC6'; insert into bfx_impl.declaration_main values ('CD5EFDDA-5654-4419-8578-7D3E0FAFFAC6', 'IBI3BFKO17', '5', 'FE343B47-5312-4352-B19E-DD1B54948D76', 'compliance','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = 'AF3A9B2C-FD6C-4FA5-BA1E-7638DAB7F409'; insert into bfx_impl.declaration_main values ('AF3A9B2C-FD6C-4FA5-BA1E-7638DAB7F409', 'IBI3BFKO17', '6', '89213C66-6370-43DB-A9C0-B7F8A0A44849', 'compliance','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = 'D4E87A6D-5D62-4F3D-BFB8-5ACAE256EA7A'; insert into bfx_impl.declaration_main values ('D4E87A6D-5D62-4F3D-BFB8-5ACAE256EA7A', 'IBI3BFKO17', '7', '3B157E3B-3C6D-474A-A5D8-519A128F2440', 'compliance','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = 'C216B19A-30B3-4766-ACC6-9A8C1FA54762'; insert into bfx_impl.declaration_main values ('C216B19A-30B3-4766-ACC6-9A8C1FA54762', 'IBI3BFKO17', '8', 'D6F3EB38-F6FC-4E05-AD03-75734F950DD3', 'compliance','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = 'A7C938FD-D8A3-4DE9-AD4E-A04862156483'; insert into bfx_impl.declaration_main values ('A7C938FD-D8A3-4DE9-AD4E-A04862156483', 'IBI3BFKO17', '9', '4550702B-0F3B-4570-93D1-3FD1A9F02837', 'compliance','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = '407C24B9-4A34-4371-A40A-6DA690899CDC'; insert into bfx_impl.declaration_main values ('407C24B9-4A34-4371-A40A-6DA690899CDC', 'IBI3BFKO17', '10', '821F21AD-2731-4065-93D1-5E2D602C0A0E', 'legal','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = '194937A8-3236-4A87-A130-C0A3CEB7839F'; insert into bfx_impl.declaration_main values ('194937A8-3236-4A87-A130-C0A3CEB7839F', 'IBI3BFKO17', '11', '1D956ABA-F1FB-4DC1-B0C4-F6E0EB4995AF', 'block','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = 'A5532EA9-B305-4C74-88EF-C92A35FB3B26'; insert into bfx_impl.declaration_main values ('A5532EA9-B305-4C74-88EF-C92A35FB3B26', 'IBI3BFKO17', '12', 'A5F6C987-9316-4DBE-8B1F-2B6A9624A4F5', 'block','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = '734C8FE0-FE66-486F-9F17-F2BFC5368288'; insert into bfx_impl.declaration_main values ('734C8FE0-FE66-486F-9F17-F2BFC5368288', 'IBI3BFKO17', '13', '6D5D0404-4C17-45C9-9037-B08BAF9911FF', 'legal','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = 'CF254089-8837-4F2F-A09B-D4FB3108AB31'; insert into bfx_impl.declaration_main values ('CF254089-8837-4F2F-A09B-D4FB3108AB31', 'IBI3BFKO17', '14', '61176CB2-C465-4EBD-AAA9-C4745376E9E8', 'block','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = 'F5C50665-794A-47D1-A909-FB61734F65C1'; insert into bfx_impl.declaration_main values ('F5C50665-794A-47D1-A909-FB61734F65C1', 'IBI3BFKO17', '15', '14BD7FA1-58F1-4622-AEC7-2D7B5D27680F', 'block','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = '3BDBCD01-5081-45E6-8BE1-866799141AFC'; insert into bfx_impl.declaration_main values ('3BDBCD01-5081-45E6-8BE1-866799141AFC', 'IBI3BFKO17', '16', '0F71C806-C12F-4ED1-8619-A1E3B3F738F1', 'legal','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = '13A00D17-A807-409D-8630-6A3C868CD114'; insert into bfx_impl.declaration_main values ('13A00D17-A807-409D-8630-6A3C868CD114', 'IBI3BFKO17', '17', '688E62FB-E838-4CA6-B24D-4340F5301448', 'block','2023-08-15','2099-12-31');

-- Добавление строк для IBI5BFKO17
delete from bfx_impl.declaration_main where id = '719690AC-DFC9-4417-9042-6F42B194DBF1'; insert into bfx_impl.declaration_main values ('719690AC-DFC9-4417-9042-6F42B194DBF1', 'IBI5BFKO17', '1', '02ED9AF9-B8F1-4C3F-81C0-396C00AB40D9', 'underwriting','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = '82DC0094-67A5-4489-87B0-D0BEC52C8017'; insert into bfx_impl.declaration_main values ('82DC0094-67A5-4489-87B0-D0BEC52C8017', 'IBI5BFKO17', '2', '3C749C44-B107-41D9-A7FD-3A49FD9DAF98', 'compliance','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = 'CBBFB084-468D-4FCB-A90C-AA5D3FCF5C28'; insert into bfx_impl.declaration_main values ('CBBFB084-468D-4FCB-A90C-AA5D3FCF5C28', 'IBI5BFKO17', '3', 'ECB5B89B-1CC9-453E-A109-67D17377793B', 'compliance','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = '8562146B-F8E8-4325-89DB-28F28DF31329'; insert into bfx_impl.declaration_main values ('8562146B-F8E8-4325-89DB-28F28DF31329', 'IBI5BFKO17', '4', '621F76D7-3D42-4824-BB99-F6B8D2CB2DF6', 'compliance','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = '9103D5AE-9902-4A3C-936E-A042B211BB06'; insert into bfx_impl.declaration_main values ('9103D5AE-9902-4A3C-936E-A042B211BB06', 'IBI5BFKO17', '5', 'FE343B47-5312-4352-B19E-DD1B54948D76', 'compliance','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = 'AB91E4F2-980B-47CE-B54C-CC4A5138069E'; insert into bfx_impl.declaration_main values ('AB91E4F2-980B-47CE-B54C-CC4A5138069E', 'IBI5BFKO17', '6', '89213C66-6370-43DB-A9C0-B7F8A0A44849', 'compliance','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = 'D4D8721D-0F9F-4C8F-9BBD-6117B9404D96'; insert into bfx_impl.declaration_main values ('D4D8721D-0F9F-4C8F-9BBD-6117B9404D96', 'IBI5BFKO17', '7', '3B157E3B-3C6D-474A-A5D8-519A128F2440', 'compliance','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = '185976FF-DE3A-4F47-8042-2A9451120254'; insert into bfx_impl.declaration_main values ('185976FF-DE3A-4F47-8042-2A9451120254', 'IBI5BFKO17', '8', 'D6F3EB38-F6FC-4E05-AD03-75734F950DD3', 'compliance','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = '5AE3EBC1-0804-41C8-A369-C6840111CA64'; insert into bfx_impl.declaration_main values ('5AE3EBC1-0804-41C8-A369-C6840111CA64', 'IBI5BFKO17', '9', '4550702B-0F3B-4570-93D1-3FD1A9F02837', 'compliance','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = 'E8D67D81-4A13-448F-B950-DF20A972CF5F'; insert into bfx_impl.declaration_main values ('E8D67D81-4A13-448F-B950-DF20A972CF5F', 'IBI5BFKO17', '10', '821F21AD-2731-4065-93D1-5E2D602C0A0E', 'legal','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = '9CFAC598-1576-4C0C-8953-3C0D608111A1'; insert into bfx_impl.declaration_main values ('9CFAC598-1576-4C0C-8953-3C0D608111A1', 'IBI5BFKO17', '11', '1D956ABA-F1FB-4DC1-B0C4-F6E0EB4995AF', 'block','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = '2D42A330-E2DD-445F-9773-9346779A327A'; insert into bfx_impl.declaration_main values ('2D42A330-E2DD-445F-9773-9346779A327A', 'IBI5BFKO17', '12', 'A5F6C987-9316-4DBE-8B1F-2B6A9624A4F5', 'block','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = '99699B36-E24F-4CD7-97BC-EEEB2E9C3D3F'; insert into bfx_impl.declaration_main values ('99699B36-E24F-4CD7-97BC-EEEB2E9C3D3F', 'IBI5BFKO17', '13', '6D5D0404-4C17-45C9-9037-B08BAF9911FF', 'legal','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = 'B3764E79-C8E5-4C8A-8040-B8B433A451DC'; insert into bfx_impl.declaration_main values ('B3764E79-C8E5-4C8A-8040-B8B433A451DC', 'IBI5BFKO17', '14', '61176CB2-C465-4EBD-AAA9-C4745376E9E8', 'block','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = '8DAE6115-35B7-4EFA-908D-43021C244DAF'; insert into bfx_impl.declaration_main values ('8DAE6115-35B7-4EFA-908D-43021C244DAF', 'IBI5BFKO17', '15', '14BD7FA1-58F1-4622-AEC7-2D7B5D27680F', 'block','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = '66AFB762-E975-48D2-991E-DDD6AF5C780B'; insert into bfx_impl.declaration_main values ('66AFB762-E975-48D2-991E-DDD6AF5C780B', 'IBI5BFKO17', '16', '0F71C806-C12F-4ED1-8619-A1E3B3F738F1', 'legal','2023-08-15','2099-12-31');
delete from bfx_impl.declaration_main where id = '60253F83-4D72-4407-A762-CC6B2982AD66'; insert into bfx_impl.declaration_main values ('60253F83-4D72-4407-A762-CC6B2982AD66', 'IBI5BFKO17', '17', '688E62FB-E838-4CA6-B24D-4340F5301448', 'block','2023-08-15','2099-12-31');

-- Строки мед декларации IBI3BFKO17
delete from bfx_impl.declaration_medical where id = '46C14FB8-2281-4232-A34D-4C3217B35D93'; insert into bfx_impl.declaration_medical values ('46C14FB8-2281-4232-A34D-4C3217B35D93', 'IBI3BFKO17Y', '1', '772D1F67-03C0-4D27-9681-0A275B0BACEB', 'underwriting','2023-08-15','2099-12-31',0);
delete from bfx_impl.declaration_medical where id = '83425A55-5A38-4F59-94DA-C1BE895456C3'; insert into bfx_impl.declaration_medical values ('83425A55-5A38-4F59-94DA-C1BE895456C3', 'IBI3BFKO17Y', '2', 'A3480DD9-28D4-4630-943B-23FF35CCEC9B', 'underwriting','2023-08-15','2099-12-31',0);
delete from bfx_impl.declaration_medical where id = '47B5905A-A56D-44E6-B2E2-619725BD83B2'; insert into bfx_impl.declaration_medical values ('47B5905A-A56D-44E6-B2E2-619725BD83B2', 'IBI3BFKO17Y', '3', '55FEBB90-AE79-4799-A8BB-9453C608F690', 'underwriting','2023-08-15','2099-12-31',0);
delete from bfx_impl.declaration_medical where id = '3D2424B7-FC07-466C-99B5-84C3667D07FA'; insert into bfx_impl.declaration_medical values ('3D2424B7-FC07-466C-99B5-84C3667D07FA', 'IBI3BFKO17Y', '4', '62B1D75F-D0BF-4452-B45B-D7F4AF9CF642', 'underwriting','2023-08-15','2099-12-31',0);
delete from bfx_impl.declaration_medical where id = '692CDFF5-7C90-45A5-BA51-6D1DF5E1C44C'; insert into bfx_impl.declaration_medical values ('692CDFF5-7C90-45A5-BA51-6D1DF5E1C44C', 'IBI3BFKO17Y', '5', '2F2476ED-DE08-4276-AE11-6C91B057034D', 'underwriting','2023-08-15','2099-12-31',0);

delete from bfx_impl.declaration_medical where id = '1D035BD9-B79F-4401-AAA9-70EA1676A205'; insert into bfx_impl.declaration_medical values ('1D035BD9-B79F-4401-AAA9-70EA1676A205', 'IBI3BFKO17O', '1', '772D1F67-03C0-4D27-9681-0A275B0BACEB', 'underwriting','2023-08-15','2099-12-31',0);
delete from bfx_impl.declaration_medical where id = 'CC0F51FF-63C5-42C7-A9E6-EEF393BD7EA7'; insert into bfx_impl.declaration_medical values ('CC0F51FF-63C5-42C7-A9E6-EEF393BD7EA7', 'IBI3BFKO17O', '2', 'A3480DD9-28D4-4630-943B-23FF35CCEC9B', 'underwriting','2023-08-15','2099-12-31',0);
delete from bfx_impl.declaration_medical where id = '57EC8F70-77AA-49D4-B4C3-8186FCD42A4C'; insert into bfx_impl.declaration_medical values ('57EC8F70-77AA-49D4-B4C3-8186FCD42A4C', 'IBI3BFKO17O', '3', '55FEBB90-AE79-4799-A8BB-9453C608F690', 'underwriting','2023-08-15','2099-12-31',0);
delete from bfx_impl.declaration_medical where id = '787C784B-7239-4C54-9BA8-D83DF91DF68B'; insert into bfx_impl.declaration_medical values ('787C784B-7239-4C54-9BA8-D83DF91DF68B', 'IBI3BFKO17O', '4', '62B1D75F-D0BF-4452-B45B-D7F4AF9CF642', 'underwriting','2023-08-15','2099-12-31',0);
delete from bfx_impl.declaration_medical where id = 'C12FB332-D2DB-4BB0-A56E-31E255891D30'; insert into bfx_impl.declaration_medical values ('C12FB332-D2DB-4BB0-A56E-31E255891D30', 'IBI3BFKO17O', '5', '2F2476ED-DE08-4276-AE11-6C91B057034D', 'underwriting','2023-08-15','2099-12-31',0);

-- Строки мед декларации IBI5BFKO17
delete from bfx_impl.declaration_medical where id = '2BBE79DA-CA04-4AF0-84A4-4A33605BD06F'; insert into bfx_impl.declaration_medical values ('2BBE79DA-CA04-4AF0-84A4-4A33605BD06F', 'IBI5BFKO17Y', '1', '772D1F67-03C0-4D27-9681-0A275B0BACEB', 'underwriting','2023-08-15','2099-12-31',0);
delete from bfx_impl.declaration_medical where id = '1244331D-BA3D-4817-884C-C72D91DFED9F'; insert into bfx_impl.declaration_medical values ('1244331D-BA3D-4817-884C-C72D91DFED9F', 'IBI5BFKO17Y', '2', 'A3480DD9-28D4-4630-943B-23FF35CCEC9B', 'underwriting','2023-08-15','2099-12-31',0);
delete from bfx_impl.declaration_medical where id = '2BCB2511-CCEA-4B73-8F12-ED4A4037CC0E'; insert into bfx_impl.declaration_medical values ('2BCB2511-CCEA-4B73-8F12-ED4A4037CC0E', 'IBI5BFKO17Y', '3', '55FEBB90-AE79-4799-A8BB-9453C608F690', 'underwriting','2023-08-15','2099-12-31',0);
delete from bfx_impl.declaration_medical where id = '517CAD3A-B35E-4E2E-ADAA-CB3C8EC168B5'; insert into bfx_impl.declaration_medical values ('517CAD3A-B35E-4E2E-ADAA-CB3C8EC168B5', 'IBI5BFKO17Y', '4', '62B1D75F-D0BF-4452-B45B-D7F4AF9CF642', 'underwriting','2023-08-15','2099-12-31',0);
delete from bfx_impl.declaration_medical where id = 'C57408DC-5CEF-4A41-9132-FC89E416809F'; insert into bfx_impl.declaration_medical values ('C57408DC-5CEF-4A41-9132-FC89E416809F', 'IBI5BFKO17Y', '5', '2F2476ED-DE08-4276-AE11-6C91B057034D', 'underwriting','2023-08-15','2099-12-31',0);

delete from bfx_impl.declaration_medical where id = 'EAA5AB77-56E4-4C0F-984B-89D74A5A98E7'; insert into bfx_impl.declaration_medical values ('EAA5AB77-56E4-4C0F-984B-89D74A5A98E7', 'IBI5BFKO17O', '1', '772D1F67-03C0-4D27-9681-0A275B0BACEB', 'underwriting','2023-08-15','2099-12-31',0);
delete from bfx_impl.declaration_medical where id = '04A6EC24-0F33-4294-86B8-96A2AAEDEA73'; insert into bfx_impl.declaration_medical values ('04A6EC24-0F33-4294-86B8-96A2AAEDEA73', 'IBI5BFKO17O', '2', 'A3480DD9-28D4-4630-943B-23FF35CCEC9B', 'underwriting','2023-08-15','2099-12-31',0);
delete from bfx_impl.declaration_medical where id = 'BAF67031-62C4-471A-B769-FC2E93935B97'; insert into bfx_impl.declaration_medical values ('BAF67031-62C4-471A-B769-FC2E93935B97', 'IBI5BFKO17O', '3', '55FEBB90-AE79-4799-A8BB-9453C608F690', 'underwriting','2023-08-15','2099-12-31',0);
delete from bfx_impl.declaration_medical where id = '2661DCED-487F-4A2A-970D-BFDE03B106C0'; insert into bfx_impl.declaration_medical values ('2661DCED-487F-4A2A-970D-BFDE03B106C0', 'IBI5BFKO17O', '4', '62B1D75F-D0BF-4452-B45B-D7F4AF9CF642', 'underwriting','2023-08-15','2099-12-31',0);
delete from bfx_impl.declaration_medical where id = '40A86142-E5D4-47DD-BE8C-06C34583142E'; insert into bfx_impl.declaration_medical values ('40A86142-E5D4-47DD-BE8C-06C34583142E', 'IBI5BFKO17O', '5', '2F2476ED-DE08-4276-AE11-6C91B057034D', 'underwriting','2023-08-15','2099-12-31',0);
