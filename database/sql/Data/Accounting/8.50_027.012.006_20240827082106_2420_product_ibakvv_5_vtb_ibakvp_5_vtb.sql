-- products
delete from bfx_impl.PRODUCTS
 where CODE in ('IBAKVV5VTB', 'IBAKVP5VTB')
 insert into bfx_impl.PRODUCTS
 (ID, CODE, PRODUCT_GROUP, DESCRIPTION, PRODUCT_CLASS, SALES_SEGMENT)
 VALUES
('20A16D1C-F447-4076-BB4D-4F65FCA603B2', N'IBAKVP5VTB', N'investment', N'Ключевой выбор (5 лет)', N'ИСЖ', N'PremiumVTB'),
('4A18D472-C131-44DC-A95B-F5FC6E76E4C7', N'IBAKVV5VTB', N'investment', N'Ключевой выбор Ультра (5 лет)', N'ИСЖ', N'VIPVTB')

-- product risks
delete from bfx_impl.risk_product_relation
 where product_code in ('IBAKVP5VTB', 'IBAKVV5VTB')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
('82062402-D53B-4E56-A3D1-43C1AA77B246', N'E36904', N'IBAKVP5VTB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
('DC122574-B008-4D12-B667-1303D63A9B1C', N'DLP36904', N'IBAKVP5VTB', '0', NULL, NULL, N'01', 2, N'main', N'insuredPerson'),
('2F3B0047-BD3E-4D0E-965F-98AFEE962918', N'DNS36404', N'IBAKVP5VTB', '0', NULL, NULL, N'01', 3, N'main', N'insuredPerson'),
('67F8D699-E7AB-4C17-9C00-60ABB1C567CB', N'E36904', N'IBAKVV5VTB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
('D06237CD-1CE7-4846-ADBA-774033ECDE8D', N'DLP36904', N'IBAKVV5VTB', '0', NULL, NULL, N'01', 2, N'main', N'insuredPerson'),
('C710C1F4-C36B-4202-BC00-F3663EDFBC37', N'DNS36404', N'IBAKVV5VTB', '0', NULL, NULL, N'01', 3, N'main', N'insuredPerson')

delete from bfx_impl.INVESTMENT_STRATEGY
where id = '611DED0A-13A5-468E-AF23-EDE5D606E7AC'
insert into bfx_impl.INVESTMENT_STRATEGY
(ID, CODE, DESCRIPTION)
values
('611DED0A-13A5-468E-AF23-EDE5D606E7AC', N'mainChoice', N'Ключевой выбор')

--тексты деклараций
delete from bfx_impl.declaration_main where id = '04AB995D-65B2-4BE3-A1BB-609FF6967B77'; insert into bfx_impl.declaration_main values ('04AB995D-65B2-4BE3-A1BB-609FF6967B77', 'IBAKVP5VTB', '1', '17333ADA-6E09-4912-A809-09B4E56B9418', 'underwriting','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'E5CB0D7D-0C25-4A24-9A5A-4700FE9386BB'; insert into bfx_impl.declaration_main values ('E5CB0D7D-0C25-4A24-9A5A-4700FE9386BB', 'IBAKVP5VTB', '2', '511DB97C-6487-4171-AD7E-8744EE544275', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'F1BE50BC-6F5E-4725-AE1B-57133CBB312E'; insert into bfx_impl.declaration_main values ('F1BE50BC-6F5E-4725-AE1B-57133CBB312E', 'IBAKVP5VTB', '3', '4C31E9C9-754F-4F43-989B-C2AAA9BD6975', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '296C61E8-2FA9-4A26-A416-DC7B7563257C'; insert into bfx_impl.declaration_main values ('296C61E8-2FA9-4A26-A416-DC7B7563257C', 'IBAKVP5VTB', '4', '4C194C36-EA39-4786-BCAE-4A136E17D404', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '289D7B0C-F519-48C4-BE46-3D4F1CC97B69'; insert into bfx_impl.declaration_main values ('289D7B0C-F519-48C4-BE46-3D4F1CC97B69', 'IBAKVP5VTB', '5', '981EAED4-68EF-4814-9368-BE96A98E06B6', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '1DD55EF2-4452-489F-BE2B-6071754F1779'; insert into bfx_impl.declaration_main values ('1DD55EF2-4452-489F-BE2B-6071754F1779', 'IBAKVP5VTB', '6', 'CFDA41A5-B8A3-450F-AD8E-673CA0D0F32B', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '682D4EAA-C3F6-4E0D-8328-6664B16144C3'; insert into bfx_impl.declaration_main values ('682D4EAA-C3F6-4E0D-8328-6664B16144C3', 'IBAKVP5VTB', '7', '44D10348-FDF4-4E7C-861C-6C1EFF3365D4', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '2DCD8954-5D45-4819-91F2-F70D5661D25E'; insert into bfx_impl.declaration_main values ('2DCD8954-5D45-4819-91F2-F70D5661D25E', 'IBAKVP5VTB', '8', '038035E8-8286-4136-B45C-E9A6DA408902', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'F8C404A5-879C-4494-B013-DD45FBC37DC5'; insert into bfx_impl.declaration_main values ('F8C404A5-879C-4494-B013-DD45FBC37DC5', 'IBAKVP5VTB', '9', 'A15DBE04-2382-4188-8CAD-F6155A5E12CE', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '83B340ED-288A-46B7-85AA-D7E2D6FD38FA'; insert into bfx_impl.declaration_main values ('83B340ED-288A-46B7-85AA-D7E2D6FD38FA', 'IBAKVP5VTB', '10', '063BD53B-04AB-455D-A63A-595DEFFD4BCE', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '2B243B1A-EA03-4485-BE0D-FDDF32F5678C'; insert into bfx_impl.declaration_main values ('2B243B1A-EA03-4485-BE0D-FDDF32F5678C', 'IBAKVP5VTB', '11', '32DC0849-FF40-4740-A1FF-09BC7D8846DD', 'legal','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'F485E0B6-80DD-42A4-8972-FBB9EB5A21C8'; insert into bfx_impl.declaration_main values ('F485E0B6-80DD-42A4-8972-FBB9EB5A21C8', 'IBAKVP5VTB', '12', '5AA030AD-CF54-49D0-B59D-DB2B321DD907', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '4576A6DE-CEBF-4F0E-80F3-44797DED0FEA'; insert into bfx_impl.declaration_main values ('4576A6DE-CEBF-4F0E-80F3-44797DED0FEA', 'IBAKVP5VTB', '13', 'F8CBF5C7-0249-468F-B47B-18584E7DA2FA', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '80BB883E-6B89-4CA9-8126-4BE536444A38'; insert into bfx_impl.declaration_main values ('80BB883E-6B89-4CA9-8126-4BE536444A38', 'IBAKVP5VTB', '14', '4BDB0537-49AA-4317-BB00-CA29A7DF0833', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'C1A87A49-0F30-4599-AC22-6666D9728BA0'; insert into bfx_impl.declaration_main values ('C1A87A49-0F30-4599-AC22-6666D9728BA0', 'IBAKVP5VTB', '15', '2C208DBD-0723-4DFD-8968-45A64014D068', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'D602B2E4-4611-4782-8426-A1DF7038209D'; insert into bfx_impl.declaration_main values ('D602B2E4-4611-4782-8426-A1DF7038209D', 'IBAKVP5VTB', '16', '8E2C0B0B-4A0E-4281-B54E-078FD288A45C', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '632B448E-7851-44EC-B223-D6CC80BBAA20'; insert into bfx_impl.declaration_main values ('632B448E-7851-44EC-B223-D6CC80BBAA20', 'IBAKVP5VTB', '17', '9BB8DFA2-747F-4763-8708-D91D6A176394', 'block','1900-01-01','2099-12-31');

delete from bfx_impl.declaration_main where id = '27DC41A7-492D-4936-AB5D-8C931D2516F8'; insert into bfx_impl.declaration_main values ('27DC41A7-492D-4936-AB5D-8C931D2516F8', 'IBAKVV5VTB', '1', '17333ADA-6E09-4912-A809-09B4E56B9418', 'underwriting','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '319E5D57-56EC-4995-853C-7F77D793BD35'; insert into bfx_impl.declaration_main values ('319E5D57-56EC-4995-853C-7F77D793BD35', 'IBAKVV5VTB', '2', '511DB97C-6487-4171-AD7E-8744EE544275', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '9B5AC2C4-81CB-400C-AFBA-A5EEEBF913F5'; insert into bfx_impl.declaration_main values ('9B5AC2C4-81CB-400C-AFBA-A5EEEBF913F5', 'IBAKVV5VTB', '3', '4C31E9C9-754F-4F43-989B-C2AAA9BD6975', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '8F2740EF-B2B1-4F92-BE91-73609939D15A'; insert into bfx_impl.declaration_main values ('8F2740EF-B2B1-4F92-BE91-73609939D15A', 'IBAKVV5VTB', '4', '4C194C36-EA39-4786-BCAE-4A136E17D404', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '918A582F-1D9C-4492-9C73-8D10533EF916'; insert into bfx_impl.declaration_main values ('918A582F-1D9C-4492-9C73-8D10533EF916', 'IBAKVV5VTB', '5', '981EAED4-68EF-4814-9368-BE96A98E06B6', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'A1423F88-A439-4F66-B939-9CBC956FB693'; insert into bfx_impl.declaration_main values ('A1423F88-A439-4F66-B939-9CBC956FB693', 'IBAKVV5VTB', '6', 'CFDA41A5-B8A3-450F-AD8E-673CA0D0F32B', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'ABFA3C40-E6F1-493C-8AE8-E2DE20777646'; insert into bfx_impl.declaration_main values ('ABFA3C40-E6F1-493C-8AE8-E2DE20777646', 'IBAKVV5VTB', '7', '44D10348-FDF4-4E7C-861C-6C1EFF3365D4', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'A4517E1D-F7FC-403E-8F29-45C172D796AA'; insert into bfx_impl.declaration_main values ('A4517E1D-F7FC-403E-8F29-45C172D796AA', 'IBAKVV5VTB', '8', '038035E8-8286-4136-B45C-E9A6DA408902', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'A6A33486-682C-4E42-AE7B-028446A23869'; insert into bfx_impl.declaration_main values ('A6A33486-682C-4E42-AE7B-028446A23869', 'IBAKVV5VTB', '9', 'A15DBE04-2382-4188-8CAD-F6155A5E12CE', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '210565E3-9016-4339-B068-E998E24DE9CD'; insert into bfx_impl.declaration_main values ('210565E3-9016-4339-B068-E998E24DE9CD', 'IBAKVV5VTB', '10', '063BD53B-04AB-455D-A63A-595DEFFD4BCE', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'E37B7DA9-BC74-4BB4-9E0A-9BDECB9E631C'; insert into bfx_impl.declaration_main values ('E37B7DA9-BC74-4BB4-9E0A-9BDECB9E631C', 'IBAKVV5VTB', '11', '32DC0849-FF40-4740-A1FF-09BC7D8846DD', 'legal','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'BD5541D2-C0D6-486D-9721-6E9F199EC5B6'; insert into bfx_impl.declaration_main values ('BD5541D2-C0D6-486D-9721-6E9F199EC5B6', 'IBAKVV5VTB', '12', '5AA030AD-CF54-49D0-B59D-DB2B321DD907', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '21E4C630-6707-478A-B40A-45CFF023D728'; insert into bfx_impl.declaration_main values ('21E4C630-6707-478A-B40A-45CFF023D728', 'IBAKVV5VTB', '13', 'F8CBF5C7-0249-468F-B47B-18584E7DA2FA', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'A3BB05F5-830D-4F20-8D1F-5B573DC8266D'; insert into bfx_impl.declaration_main values ('A3BB05F5-830D-4F20-8D1F-5B573DC8266D', 'IBAKVV5VTB', '14', '4BDB0537-49AA-4317-BB00-CA29A7DF0833', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '0E7B6721-299D-434A-91CE-3C62A3B0DA65'; insert into bfx_impl.declaration_main values ('0E7B6721-299D-434A-91CE-3C62A3B0DA65', 'IBAKVV5VTB', '15', '2C208DBD-0723-4DFD-8968-45A64014D068', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '8E224D31-6E80-4152-8B75-243DFEC0D5A0'; insert into bfx_impl.declaration_main values ('8E224D31-6E80-4152-8B75-243DFEC0D5A0', 'IBAKVV5VTB', '16', '8E2C0B0B-4A0E-4281-B54E-078FD288A45C', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '09F35A04-723F-4E8E-897C-F48D63BFEB61'; insert into bfx_impl.declaration_main values ('09F35A04-723F-4E8E-897C-F48D63BFEB61', 'IBAKVV5VTB', '17', '9BB8DFA2-747F-4763-8708-D91D6A176394', 'block','1900-01-01','2099-12-31');

-- тексты мед деклараций
delete from bfx_impl.declaration_medical where id = '59C59812-FB32-4244-AD1B-0D84F6BD173C'; insert into bfx_impl.declaration_medical values ('59C59812-FB32-4244-AD1B-0D84F6BD173C', 'IBAKVP5VTBY', '1', 'E6F17DA0-3E43-44B6-B211-5B989F6FAF7D', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '6DA6D9C9-066A-4C21-B0FE-2301B14596C7'; insert into bfx_impl.declaration_medical values ('6DA6D9C9-066A-4C21-B0FE-2301B14596C7', 'IBAKVP5VTBY', '2', '17C01783-37FC-4AEA-B517-5C814F5F28DE', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '595EC051-E726-48C1-AF51-4957E02B6D06'; insert into bfx_impl.declaration_medical values ('595EC051-E726-48C1-AF51-4957E02B6D06', 'IBAKVP5VTBY', '3', 'AEBCC01F-C8D2-4500-91B2-E860CDCF82E9', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '6AC90F22-8750-4BD0-BE52-11D25A1E77B5'; insert into bfx_impl.declaration_medical values ('6AC90F22-8750-4BD0-BE52-11D25A1E77B5', 'IBAKVP5VTBY', '4', '7680BF50-B886-4C0C-83E3-858F21313927', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '895A39D2-56D5-43B0-8BDA-64328B4BDA4F'; insert into bfx_impl.declaration_medical values ('895A39D2-56D5-43B0-8BDA-64328B4BDA4F', 'IBAKVP5VTBY', '5', '6870E0AF-375E-4C31-BA37-8D17D0F2F7DB', 'underwriting','1900-01-01','2099-12-31', 0);

delete from bfx_impl.declaration_medical where id = 'ABAA2DF8-0034-4109-BC34-EDCACE0209A6'; insert into bfx_impl.declaration_medical values ('ABAA2DF8-0034-4109-BC34-EDCACE0209A6', 'IBAKVP5VTBO', '1', 'E6F17DA0-3E43-44B6-B211-5B989F6FAF7D', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '4B705A99-52E4-4E06-B9CF-85F1F0ABC4DF'; insert into bfx_impl.declaration_medical values ('4B705A99-52E4-4E06-B9CF-85F1F0ABC4DF', 'IBAKVP5VTBO', '2', '17C01783-37FC-4AEA-B517-5C814F5F28DE', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '31727866-AB4F-460E-A4A3-108109BA34EB'; insert into bfx_impl.declaration_medical values ('31727866-AB4F-460E-A4A3-108109BA34EB', 'IBAKVP5VTBO', '3', 'AEBCC01F-C8D2-4500-91B2-E860CDCF82E9', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '862A9191-B876-4D05-A88F-630F15E09786'; insert into bfx_impl.declaration_medical values ('862A9191-B876-4D05-A88F-630F15E09786', 'IBAKVP5VTBO', '4', '7680BF50-B886-4C0C-83E3-858F21313927', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '197197DC-03E6-412C-8CFD-0EED0436F38A'; insert into bfx_impl.declaration_medical values ('197197DC-03E6-412C-8CFD-0EED0436F38A', 'IBAKVP5VTBO', '5', '6870E0AF-375E-4C31-BA37-8D17D0F2F7DB', 'underwriting','1900-01-01','2099-12-31', 0);

delete from bfx_impl.declaration_medical where id = '657EC7FD-403F-47BC-98F4-E63D4DC7F659'; insert into bfx_impl.declaration_medical values ('657EC7FD-403F-47BC-98F4-E63D4DC7F659', 'IBAKVV5VTBY', '1', 'E6F17DA0-3E43-44B6-B211-5B989F6FAF7D', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '96480826-27A7-4E4C-9184-959BF3F3F8C4'; insert into bfx_impl.declaration_medical values ('96480826-27A7-4E4C-9184-959BF3F3F8C4', 'IBAKVV5VTBY', '2', '17C01783-37FC-4AEA-B517-5C814F5F28DE', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '0FFCE2D4-B479-4D22-A8DD-F4945E8C2848'; insert into bfx_impl.declaration_medical values ('0FFCE2D4-B479-4D22-A8DD-F4945E8C2848', 'IBAKVV5VTBY', '3', 'AEBCC01F-C8D2-4500-91B2-E860CDCF82E9', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '4E48A35E-BC93-48B1-8199-A440A481BFD9'; insert into bfx_impl.declaration_medical values ('4E48A35E-BC93-48B1-8199-A440A481BFD9', 'IBAKVV5VTBY', '4', '7680BF50-B886-4C0C-83E3-858F21313927', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = 'E9EFBA69-0B9D-4B80-AAF9-D3F1E08E1A66'; insert into bfx_impl.declaration_medical values ('E9EFBA69-0B9D-4B80-AAF9-D3F1E08E1A66', 'IBAKVV5VTBY', '5', '6870E0AF-375E-4C31-BA37-8D17D0F2F7DB', 'underwriting','1900-01-01','2099-12-31', 0);

delete from bfx_impl.declaration_medical where id = '3C60D0D3-4FED-4B7A-9854-18831F751816'; insert into bfx_impl.declaration_medical values ('3C60D0D3-4FED-4B7A-9854-18831F751816', 'IBAKVV5VTBO', '1', 'E6F17DA0-3E43-44B6-B211-5B989F6FAF7D', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '2B9D6FE5-F512-4C10-99F7-7E9562B64626'; insert into bfx_impl.declaration_medical values ('2B9D6FE5-F512-4C10-99F7-7E9562B64626', 'IBAKVV5VTBO', '2', '17C01783-37FC-4AEA-B517-5C814F5F28DE', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '085C2E9E-330F-4A6B-83BF-4DDAE94C8CBE'; insert into bfx_impl.declaration_medical values ('085C2E9E-330F-4A6B-83BF-4DDAE94C8CBE', 'IBAKVV5VTBO', '3', 'AEBCC01F-C8D2-4500-91B2-E860CDCF82E9', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = 'A2BC3C8F-7DA3-47A1-B434-4BCCA41034AF'; insert into bfx_impl.declaration_medical values ('A2BC3C8F-7DA3-47A1-B434-4BCCA41034AF', 'IBAKVV5VTBO', '4', '7680BF50-B886-4C0C-83E3-858F21313927', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '07F15B8A-3FA0-46FF-9228-24FFA7DB5F20'; insert into bfx_impl.declaration_medical values ('07F15B8A-3FA0-46FF-9228-24FFA7DB5F20', 'IBAKVV5VTBO', '5', '6870E0AF-375E-4C31-BA37-8D17D0F2F7DB', 'underwriting','1900-01-01','2099-12-31', 0);