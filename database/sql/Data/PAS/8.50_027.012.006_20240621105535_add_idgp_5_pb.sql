delete from bfx_impl.products where code = 'IDGP5PB';
insert into bfx_impl.products
(id, code, product_group, description, product_class, sales_segment) 
values ('4BBD65D4-5764-42E2-A62C-7814C9FC99B7', N'IDGP5PB', N'investment', N'Драйвер Гарантия  (5 лет)', N'ИСЖ', N'massPB');			

--add risks
delete from bfx_impl.risk_product_relation where product_code = 'IDGP5PB';
insert into bfx_impl.risk_product_relation (id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, RISK_PROGRAM, RISK_PERSON) values
('6A1F344B-8CE8-40F5-A5F5-626747678CD1', N'E36404', N'IDGP5PB', '0',NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
('7EDE0AAA-68E6-4337-BB18-A1E30DC60D63', N'DLPT36404', N'IDGP5PB', '1',NULL,NULL, N'01', 2, N'main', N'insuredPerson'),
('BD2FEB0B-CD7A-41F7-A110-A258D6D6D145', N'DNS36404', N'IDGP5PB', '0',NULL, NULL, N'01', 4, N'main', N'insuredPerson');

--text decl
delete from bfx_impl.declaration_main where id = 'B7D50692-626A-4BD2-A92D-9E2CC493FA7B'; insert into bfx_impl.declaration_main values ('B7D50692-626A-4BD2-A92D-9E2CC493FA7B', 'IDGP5PB', '1', 'DD1954D0-2A58-44DD-BB94-FFF7823C6A36', 'underwriting','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '7AE57487-9A3D-4AC4-A23E-8F75E8ADDA37'; insert into bfx_impl.declaration_main values ('7AE57487-9A3D-4AC4-A23E-8F75E8ADDA37', 'IDGP5PB', '2', 'A7D4F2F0-350C-42DB-BDB5-7D1B5F641395', 'underwriting','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'D435EF5C-63E6-4696-984B-F343C8D57BD4'; insert into bfx_impl.declaration_main values ('D435EF5C-63E6-4696-984B-F343C8D57BD4', 'IDGP5PB', '3', '1FEFCF7A-94D9-481D-A5FB-5CD4BEC773D2', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '16BC5D13-39E5-4061-91E3-EC4A41F75AE8'; insert into bfx_impl.declaration_main values ('16BC5D13-39E5-4061-91E3-EC4A41F75AE8', 'IDGP5PB', '4', '9617109A-72D1-4795-8070-A723EDA21F92', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '5C630012-2EA1-46CB-B439-FE52273FC649'; insert into bfx_impl.declaration_main values ('5C630012-2EA1-46CB-B439-FE52273FC649', 'IDGP5PB', '5', '007FC2AB-5560-4D7B-8662-81AE00F01530', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'D73AE81B-94E2-4C8A-82DF-769C0DF55922'; insert into bfx_impl.declaration_main values ('D73AE81B-94E2-4C8A-82DF-769C0DF55922', 'IDGP5PB', '6', 'EE56822E-E7B1-4273-B659-59403EBB0864', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '53558532-05AA-411C-A972-9D31F82A8915'; insert into bfx_impl.declaration_main values ('53558532-05AA-411C-A972-9D31F82A8915', 'IDGP5PB', '7', '8450B216-9810-4CF9-BE8E-B3F4F97D69E9', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '76281B18-6175-4D28-859A-B91E08AFB5FE'; insert into bfx_impl.declaration_main values ('76281B18-6175-4D28-859A-B91E08AFB5FE', 'IDGP5PB', '8', 'D86B8E98-D4D2-4AA1-8FB3-00640E61477C', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '313E1B2E-8A0C-4C66-8999-2A3B2BDB6943'; insert into bfx_impl.declaration_main values ('313E1B2E-8A0C-4C66-8999-2A3B2BDB6943', 'IDGP5PB', '9', 'ED3B1E38-A250-4F63-8696-EA663F2F4632', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'BA3A22E3-38BA-434F-AAAB-64F3897EE15F'; insert into bfx_impl.declaration_main values ('BA3A22E3-38BA-434F-AAAB-64F3897EE15F', 'IDGP5PB', '10', '17DDFE5E-29D9-4A50-9FBE-FBBE680E6EEB', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'CA4277F5-DBF6-4CC0-84F5-156EC0DE60AC'; insert into bfx_impl.declaration_main values ('CA4277F5-DBF6-4CC0-84F5-156EC0DE60AC', 'IDGP5PB', '11', '66A51ADC-5F31-4487-9DA2-B472D33BE87A', 'legal','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'BA11C2DA-B9C7-48F6-8230-91496978B77A'; insert into bfx_impl.declaration_main values ('BA11C2DA-B9C7-48F6-8230-91496978B77A', 'IDGP5PB', '12', '3788D328-7887-41A0-8BE4-BAC79D7BFD5E', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '9A984D00-95BF-4621-BBD1-96422E4B166A'; insert into bfx_impl.declaration_main values ('9A984D00-95BF-4621-BBD1-96422E4B166A', 'IDGP5PB', '13', '6B93167A-2670-4C58-A529-72E4DE677DE0', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '5926E5C6-3F8C-410E-8B4C-99260651CCAE'; insert into bfx_impl.declaration_main values ('5926E5C6-3F8C-410E-8B4C-99260651CCAE', 'IDGP5PB', '14', '1C64F64C-FA9D-44B8-9F71-BBEEF2B158CC', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '122BF507-B922-4A6E-9EDD-D7020295AFED'; insert into bfx_impl.declaration_main values ('122BF507-B922-4A6E-9EDD-D7020295AFED', 'IDGP5PB', '15', '7644412F-ED42-4D09-BC64-2120D449E1DB', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'B3BAAC86-7C8F-4BCF-A00D-CA6F2755CC0B'; insert into bfx_impl.declaration_main values ('B3BAAC86-7C8F-4BCF-A00D-CA6F2755CC0B', 'IDGP5PB', '16', '03F47541-2964-4371-BED2-9B8F2A6A77EF', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '16E55D70-BADC-4147-A702-6A5A69059521'; insert into bfx_impl.declaration_main values ('16E55D70-BADC-4147-A702-6A5A69059521', 'IDGP5PB', '17', 'D11523EF-3FE6-4873-8E38-FC1DCED8C0E8', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'FEFF7B31-AA40-4384-BF54-23CBCFFCA432'; insert into bfx_impl.declaration_main values ('FEFF7B31-AA40-4384-BF54-23CBCFFCA432', 'IDGP5PB', '18', '56E637FB-3259-4A38-B0F3-2294C76DD867', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '62BCE891-FCBD-4020-BE2C-CF5066D74112'; insert into bfx_impl.declaration_main values ('62BCE891-FCBD-4020-BE2C-CF5066D74112', 'IDGP5PB', '19', '2776D7A7-1ADF-43BE-AC99-2F0EAD898832', 'block','1900-01-01','2099-12-31');

--text med decl
delete from bfx_impl.declaration_medical where id = 'BD157183-F897-422D-947F-BDFC9208D60E'; insert into bfx_impl.declaration_medical values ('BD157183-F897-422D-947F-BDFC9208D60E', 'IDGP5PBY', '1', '162997D3-1F55-4AAF-B249-91DAB9410564', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '872EBFA6-5CB8-478F-BEBA-7C24C5DDABDF'; insert into bfx_impl.declaration_medical values ('872EBFA6-5CB8-478F-BEBA-7C24C5DDABDF', 'IDGP5PBY', '2', 'C1B44AAA-2024-453E-B5C9-19C8EDD810DF', 'underwriting','1900-01-02','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '73958A96-D65D-4A05-BBCA-EECB08BB949A'; insert into bfx_impl.declaration_medical values ('73958A96-D65D-4A05-BBCA-EECB08BB949A', 'IDGP5PBY', '3', 'DAF9EB47-3108-48D3-AE85-79886615312C', 'underwriting','1900-01-03','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = 'BDC46AF8-4716-4E25-A3DB-B1072583B471'; insert into bfx_impl.declaration_medical values ('BDC46AF8-4716-4E25-A3DB-B1072583B471', 'IDGP5PBY', '4', '545D4375-C9C6-407F-B714-C661BC003871', 'underwriting','1900-01-04','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '18BBD66E-1575-4995-A93F-2EE335DB32E1'; insert into bfx_impl.declaration_medical values ('18BBD66E-1575-4995-A93F-2EE335DB32E1', 'IDGP5PBY', '5', '641A484A-611C-48FC-9DC7-F4DD1C846A26', 'underwriting','1900-01-05','2099-12-31', 0);

delete from bfx_impl.declaration_medical where id = '77A1B101-9CD4-48EF-A944-16E1D07FD274'; insert into bfx_impl.declaration_medical values ('77A1B101-9CD4-48EF-A944-16E1D07FD274', 'IDGP5PBO', '1', '162997D3-1F55-4AAF-B249-91DAB9410564', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '33CF5C54-8AD7-4A1F-AC4F-EECE70DE7DC5'; insert into bfx_impl.declaration_medical values ('33CF5C54-8AD7-4A1F-AC4F-EECE70DE7DC5', 'IDGP5PBO', '2', 'C1B44AAA-2024-453E-B5C9-19C8EDD810DF', 'underwriting','1900-01-02','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '2E65E08B-A3F7-4AE2-9220-27FA6BD8974C'; insert into bfx_impl.declaration_medical values ('2E65E08B-A3F7-4AE2-9220-27FA6BD8974C', 'IDGP5PBO', '3', 'DAF9EB47-3108-48D3-AE85-79886615312C', 'underwriting','1900-01-03','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = 'D8124F42-1DBE-48B6-9A40-6D24C8C109DE'; insert into bfx_impl.declaration_medical values ('D8124F42-1DBE-48B6-9A40-6D24C8C109DE', 'IDGP5PBO', '4', '545D4375-C9C6-407F-B714-C661BC003871', 'underwriting','1900-01-04','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '153E7050-DE99-4ADC-9844-A3ACB089433B'; insert into bfx_impl.declaration_medical values ('153E7050-DE99-4ADC-9844-A3ACB089433B', 'IDGP5PBO', '5', '641A484A-611C-48FC-9DC7-F4DD1C846A26', 'underwriting','1900-01-05','2099-12-31', 0);


