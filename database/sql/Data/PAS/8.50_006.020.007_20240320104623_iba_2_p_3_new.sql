
-- products
delete from bfx_impl.PRODUCTS
 where CODE in ('IBA2P3')
 insert into bfx_impl.PRODUCTS
 (ID, CODE, PRODUCT_GROUP, DESCRIPTION, PRODUCT_CLASS)
 VALUES
('180678AA-0481-49B1-9937-504B8EDEA1FB', N'IBA2P3', N'investment', N'Базис Актив Премиум 2.0', N'ИСЖ')

-- product risks
delete from bfx_impl.risk_product_relation
 where product_code in ('IBA2P3')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
('4FCCDB2D-CE06-4AA0-B93D-AE29DC4AE275', N'E36904', N'IBA2P3', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
('F4246A4F-DAAB-45FB-AA6D-E909680206ED', N'DLP36904', N'IBA2P3', '0', NULL, NULL, N'01', 2, N'main', N'insuredPerson'),
('2D31465B-A850-4544-9B98-9F9633A9B0BF', N'DNS36404', N'IBA2P3', '0', NULL, NULL, N'01', 3, N'main', N'insuredPerson')



--declaration main
delete from bfx_impl.declaration_main where id = '4BDFCE40-D0C9-47A4-BD20-BCD778D60C17'; insert into bfx_impl.declaration_main values ('4BDFCE40-D0C9-47A4-BD20-BCD778D60C17', 'IBA2P3', '1', '17333ADA-6E09-4912-A809-09B4E56B9418', 'underwriting','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'C5C90EED-E8F0-400F-A48D-597DB963A436'; insert into bfx_impl.declaration_main values ('C5C90EED-E8F0-400F-A48D-597DB963A436', 'IBA2P3', '2', '511DB97C-6487-4171-AD7E-8744EE544275', 'underwriting','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'DD15BBD0-5D25-41CE-80B6-3ED9C647127F'; insert into bfx_impl.declaration_main values ('DD15BBD0-5D25-41CE-80B6-3ED9C647127F', 'IBA2P3', '3', '4C31E9C9-754F-4F43-989B-C2AAA9BD6975', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '36D96119-785C-4AE1-971C-872AE3A291B2'; insert into bfx_impl.declaration_main values ('36D96119-785C-4AE1-971C-872AE3A291B2', 'IBA2P3', '4', '4C194C36-EA39-4786-BCAE-4A136E17D404', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'F531A7EA-A2C1-4BAF-8FAA-C5DF762E1902'; insert into bfx_impl.declaration_main values ('F531A7EA-A2C1-4BAF-8FAA-C5DF762E1902', 'IBA2P3', '5', '981EAED4-68EF-4814-9368-BE96A98E06B6', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '83B3708E-CF8C-4C8E-8E36-C20347F60518'; insert into bfx_impl.declaration_main values ('83B3708E-CF8C-4C8E-8E36-C20347F60518', 'IBA2P3', '6', 'CFDA41A5-B8A3-450F-AD8E-673CA0D0F32B', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'CBB72475-2DBE-480C-8980-BEDF04CA8EFB'; insert into bfx_impl.declaration_main values ('CBB72475-2DBE-480C-8980-BEDF04CA8EFB', 'IBA2P3', '7', '44D10348-FDF4-4E7C-861C-6C1EFF3365D4', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '037F09F0-BDE2-43F5-84BA-335308C965F0'; insert into bfx_impl.declaration_main values ('037F09F0-BDE2-43F5-84BA-335308C965F0', 'IBA2P3', '8', '038035E8-8286-4136-B45C-E9A6DA408902', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '8416E486-40D6-462F-AB29-169BF2A5394C'; insert into bfx_impl.declaration_main values ('8416E486-40D6-462F-AB29-169BF2A5394C', 'IBA2P3', '9', 'A15DBE04-2382-4188-8CAD-F6155A5E12CE', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '3FE3EF19-BC25-4C54-BC5A-E8975EAF213C'; insert into bfx_impl.declaration_main values ('3FE3EF19-BC25-4C54-BC5A-E8975EAF213C', 'IBA2P3', '10', '063BD53B-04AB-455D-A63A-595DEFFD4BCE', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'E51CDA77-01D2-442B-8892-747DE86582D2'; insert into bfx_impl.declaration_main values ('E51CDA77-01D2-442B-8892-747DE86582D2', 'IBA2P3', '11', '32DC0849-FF40-4740-A1FF-09BC7D8846DD', 'legal','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'A2B59F4C-A99B-4A72-B1AE-BF0D1A1AE14E'; insert into bfx_impl.declaration_main values ('A2B59F4C-A99B-4A72-B1AE-BF0D1A1AE14E', 'IBA2P3', '12', '5AA030AD-CF54-49D0-B59D-DB2B321DD907', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'FA499BC5-BE28-43D0-B3C8-CE57362EC501'; insert into bfx_impl.declaration_main values ('FA499BC5-BE28-43D0-B3C8-CE57362EC501', 'IBA2P3', '13', 'F8CBF5C7-0249-468F-B47B-18584E7DA2FA', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '29C4C806-2DDE-47F2-9A7A-E795F1CF0303'; insert into bfx_impl.declaration_main values ('29C4C806-2DDE-47F2-9A7A-E795F1CF0303', 'IBA2P3', '14', '4BDB0537-49AA-4317-BB00-CA29A7DF0833', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'EF7FB8A5-371C-48C9-A9A6-D2C572784A29'; insert into bfx_impl.declaration_main values ('EF7FB8A5-371C-48C9-A9A6-D2C572784A29', 'IBA2P3', '15', '2C208DBD-0723-4DFD-8968-45A64014D068', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'A35E4B76-4E65-432D-AE5F-EE8CF2F2E73E'; insert into bfx_impl.declaration_main values ('A35E4B76-4E65-432D-AE5F-EE8CF2F2E73E', 'IBA2P3', '16', '8E2C0B0B-4A0E-4281-B54E-078FD288A45C', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'E6EDF44E-221C-40AC-A5D0-199FF64FC51B'; insert into bfx_impl.declaration_main values ('E6EDF44E-221C-40AC-A5D0-199FF64FC51B', 'IBA2P3', '17', '9BB8DFA2-747F-4763-8708-D91D6A176394', 'block','1900-01-01','2099-12-31');

--declaration medical
delete from bfx_impl.declaration_medical where id = 'CA207A31-CD3F-4974-84F5-52E790D0D966'; insert into bfx_impl.declaration_medical values ('CA207A31-CD3F-4974-84F5-52E790D0D966', 'IBA2P3Y', '1', 'E6F17DA0-3E43-44B6-B211-5B989F6FAF7D', 'underwriting','1900-01-01','2099-12-31',0);
delete from bfx_impl.declaration_medical where id = 'D81C42E2-444E-4E2E-8D72-96FD2EEA8143'; insert into bfx_impl.declaration_medical values ('D81C42E2-444E-4E2E-8D72-96FD2EEA8143', 'IBA2P3Y', '2', '17C01783-37FC-4AEA-B517-5C814F5F28DE', 'underwriting','1900-01-02','2099-12-31',0);
delete from bfx_impl.declaration_medical where id = 'EE759360-1555-41E6-BC90-0007A3DABA16'; insert into bfx_impl.declaration_medical values ('EE759360-1555-41E6-BC90-0007A3DABA16', 'IBA2P3Y', '3', 'AEBCC01F-C8D2-4500-91B2-E860CDCF82E9', 'underwriting','1900-01-03','2099-12-31',0);
delete from bfx_impl.declaration_medical where id = '532163D4-2EE7-4CF5-9A42-7D66D0660093'; insert into bfx_impl.declaration_medical values ('532163D4-2EE7-4CF5-9A42-7D66D0660093', 'IBA2P3Y', '4', '7680BF50-B886-4C0C-83E3-858F21313927', 'underwriting','1900-01-04','2099-12-31',0);
delete from bfx_impl.declaration_medical where id = 'F5518D8F-E55E-4EB7-AA41-86FDA724643A'; insert into bfx_impl.declaration_medical values ('F5518D8F-E55E-4EB7-AA41-86FDA724643A', 'IBA2P3Y', '5', '6870E0AF-375E-4C31-BA37-8D17D0F2F7DB', 'underwriting','1900-01-05','2099-12-31',0);

delete from bfx_impl.declaration_medical where id = '96F8E155-7936-488F-9730-F516369F63BA'; insert into bfx_impl.declaration_medical values ('96F8E155-7936-488F-9730-F516369F63BA', 'IBA2P3O', '1', 'E6F17DA0-3E43-44B6-B211-5B989F6FAF7D', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '9746C0FB-72A1-4BB6-98D9-20142C183BB1'; insert into bfx_impl.declaration_medical values ('9746C0FB-72A1-4BB6-98D9-20142C183BB1', 'IBA2P3O', '2', '17C01783-37FC-4AEA-B517-5C814F5F28DE', 'underwriting','1900-01-02','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '2C0B738E-36C8-4FA3-AE60-81DD7E223B6E'; insert into bfx_impl.declaration_medical values ('2C0B738E-36C8-4FA3-AE60-81DD7E223B6E', 'IBA2P3O', '3', 'AEBCC01F-C8D2-4500-91B2-E860CDCF82E9', 'underwriting','1900-01-03','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = 'CB99F94C-870B-400C-B84F-91CB021194F8'; insert into bfx_impl.declaration_medical values ('CB99F94C-870B-400C-B84F-91CB021194F8', 'IBA2P3O', '4', '7680BF50-B886-4C0C-83E3-858F21313927', 'underwriting','1900-01-04','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '95CA72C5-3BC6-4B3A-A9FA-ABB5281E9BCE'; insert into bfx_impl.declaration_medical values ('95CA72C5-3BC6-4B3A-A9FA-ABB5281E9BCE', 'IBA2P3O', '5', '6870E0AF-375E-4C31-BA37-8D17D0F2F7DB', 'underwriting','1900-01-05','2099-12-31', 0);


