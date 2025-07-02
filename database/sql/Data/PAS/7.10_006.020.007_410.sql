-- products NOTE1BFKO3
delete from bfx_impl.products
where code in ('NOTE1BFKO4')

insert into bfx_impl.products
(id, code, product_group, description, product_class)
values
('8713C295-E920-472A-9F4D-C7D97E7BB556', N'NOTE1BFKO4', N'investment', N'Нота Премиум (1 год)', N'ИСЖ')

-- risk product relation
delete from bfx_impl.risk_product_relation
 where product_code in ('NOTE1BFKO4')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
-- Нота СЖ (1 год)
('7BCB775A-7051-4375-96CB-03C2B40C4ADE', N'E36904', N'NOTE1BFKO4', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('A1AEC64E-C797-4645-B86D-2B4524AAC96F', N'DLP36904', N'NOTE1BFKO4', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('16647EFB-14F3-4214-A794-22586FA00ED1', N'DNS36404', N'NOTE1BFKO4', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson')


--bfx_impl.investment_strategy
delete from bfx_impl.INVESTMENT_STRATEGY 
 where code in ('majorLeague 4.0')
insert into bfx_impl.INVESTMENT_STRATEGY
(ID, CODE, DESCRIPTION)
values
('2D077145-A987-4878-B77C-C4742A701233', N'majorLeague 4.0', N'Высшая лига 4.0')

-- Добавление деклараций
delete from bfx_impl.declaration_main where id = '48A72CB5-0889-4523-AA80-D481062652A4'; insert into bfx_impl.declaration_main values ('48A72CB5-0889-4523-AA80-D481062652A4', 'NOTE1BFKO4', '1', '305A0694-15EF-4CA6-9079-0AF981BC0DFB', 'underwriting','2023-09-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'FAEC7DCB-18D8-47A6-98FF-930E0C8F08FA'; insert into bfx_impl.declaration_main values ('FAEC7DCB-18D8-47A6-98FF-930E0C8F08FA', 'NOTE1BFKO4', '2', '7808126C-4036-47C8-A112-0CE35E15369B', 'underwriting','2023-09-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '624F37E6-DA79-435A-A183-B7C389EC75F3'; insert into bfx_impl.declaration_main values ('624F37E6-DA79-435A-A183-B7C389EC75F3', 'NOTE1BFKO4', '3', '62FB68EF-DD48-49B3-B2E0-2EDCB8213E0E', 'compliance','2023-09-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'DE0B9D90-A45F-4FF3-B014-C2EBAA758D24'; insert into bfx_impl.declaration_main values ('DE0B9D90-A45F-4FF3-B014-C2EBAA758D24', 'NOTE1BFKO4', '4', '119679AA-2B44-43A9-8BE7-438B40C0DB13', 'compliance','2023-09-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '6D54BA0F-BAB7-45E0-830C-C2FAB476D0AA'; insert into bfx_impl.declaration_main values ('6D54BA0F-BAB7-45E0-830C-C2FAB476D0AA', 'NOTE1BFKO4', '5', '95AA9D73-51D6-4791-9D02-4A24A9C16B66', 'compliance','2023-09-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '4367EBD0-8B21-46F6-9F37-AE9F602F3BE6'; insert into bfx_impl.declaration_main values ('4367EBD0-8B21-46F6-9F37-AE9F602F3BE6', 'NOTE1BFKO4', '6', 'E7BA238E-78E8-4BDC-8CE1-4A4340EDADB5', 'compliance','2023-09-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'C83A2AE0-D5BE-43B5-AF85-83C3D435A83F'; insert into bfx_impl.declaration_main values ('C83A2AE0-D5BE-43B5-AF85-83C3D435A83F', 'NOTE1BFKO4', '7', '607177CC-DEBE-416B-8F72-5FE2F133E950', 'compliance','2023-09-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '01890B17-C750-4F2D-9C4D-A7D4EDCD4A9B'; insert into bfx_impl.declaration_main values ('01890B17-C750-4F2D-9C4D-A7D4EDCD4A9B', 'NOTE1BFKO4', '8', 'DD5EE801-D48F-4862-8701-67555CB9BA8F', 'compliance','2023-09-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '67301FE0-88FE-44E0-BDA8-98866A50A612'; insert into bfx_impl.declaration_main values ('67301FE0-88FE-44E0-BDA8-98866A50A612', 'NOTE1BFKO4', '9', 'E07E2F95-A487-4453-AE4E-771D7AB882D8', 'compliance','2023-09-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '8250E582-4681-4AA7-B4B5-3A638C00D89F'; insert into bfx_impl.declaration_main values ('8250E582-4681-4AA7-B4B5-3A638C00D89F', 'NOTE1BFKO4', '10', '6C6E71A4-FC43-46B1-AAD2-8C583963B7FA', 'compliance','2023-09-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'B6B97917-FD23-4830-8CA7-5231EEDAECD9'; insert into bfx_impl.declaration_main values ('B6B97917-FD23-4830-8CA7-5231EEDAECD9', 'NOTE1BFKO4', '11', 'D5751DFF-7D08-4A68-9223-8CB527707919', 'legal','2023-09-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '8B82D7E2-B9F9-4177-B21D-AF784133E631'; insert into bfx_impl.declaration_main values ('8B82D7E2-B9F9-4177-B21D-AF784133E631', 'NOTE1BFKO4', '12', 'DC377858-DDF9-40A3-833D-9170BB73A3F0', 'block','2023-09-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'A8A1EC87-351E-49FE-AC28-6AA229C1CB55'; insert into bfx_impl.declaration_main values ('A8A1EC87-351E-49FE-AC28-6AA229C1CB55', 'NOTE1BFKO4', '13', '52AB1DE7-F87E-4A2C-9D3A-B174A6FCBD56', 'block','2023-09-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'C65AE6D2-B6F4-454D-831A-49A0D3EFE27B'; insert into bfx_impl.declaration_main values ('C65AE6D2-B6F4-454D-831A-49A0D3EFE27B', 'NOTE1BFKO4', '14', 'B2D41C21-A7FA-4FE0-A56B-C7CB8ECA3D9B', 'block','2023-09-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '9DD5D21B-823F-467C-9E77-0A9948FD8470'; insert into bfx_impl.declaration_main values ('9DD5D21B-823F-467C-9E77-0A9948FD8470', 'NOTE1BFKO4', '15', 'FBE90D35-4BCC-47B6-A62A-E5737D51C089', 'block','2023-09-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '66B4BE02-73C3-407E-ABC6-F2C1570189FC'; insert into bfx_impl.declaration_main values ('66B4BE02-73C3-407E-ABC6-F2C1570189FC', 'NOTE1BFKO4', '16', '0BF693E0-AB94-4A8B-A5D1-F88B53F5A040', 'block','2023-09-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '1541C68F-BFAD-450F-B56A-7B52C3E4D4F2'; insert into bfx_impl.declaration_main values ('1541C68F-BFAD-450F-B56A-7B52C3E4D4F2', 'NOTE1BFKO4', '17', 'A039BEEB-A518-4A08-80E0-FB4332DB7320', 'block','2023-09-01','2099-12-31');

-- Добавление мед деклараций
delete from bfx_impl.declaration_medical where id = '9F22C993-9130-425C-88B3-335FDEAD2D55'; insert into bfx_impl.declaration_medical values ('9F22C993-9130-425C-88B3-335FDEAD2D55', 'NOTE1BFKO4Y', '1', '6D8DFFE3-5F5E-4A78-908D-0ABD832009C2', 'underwriting','2023-09-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = 'F472EBF2-5D51-43C5-925A-8058359C8BAE'; insert into bfx_impl.declaration_medical values ('F472EBF2-5D51-43C5-925A-8058359C8BAE', 'NOTE1BFKO4Y', '2', '60287F2B-1A8D-4F46-BEA3-1CFE4E0E242D', 'underwriting','2023-09-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = 'B7C664F0-47B6-40DA-99BA-C6D62732F9B1'; insert into bfx_impl.declaration_medical values ('B7C664F0-47B6-40DA-99BA-C6D62732F9B1', 'NOTE1BFKO4Y', '3', '8D2FFA02-D1A5-49B2-9278-83954BA6A734', 'underwriting','2023-09-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '4A5C7F62-7900-4DBE-B348-E1362217731B'; insert into bfx_impl.declaration_medical values ('4A5C7F62-7900-4DBE-B348-E1362217731B', 'NOTE1BFKO4Y', '4', '6D92326D-A44B-4C97-8568-D34705365E42', 'underwriting','2023-09-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = 'BE0DC34D-CCB2-4937-9979-820F71BF8BBD'; insert into bfx_impl.declaration_medical values ('BE0DC34D-CCB2-4937-9979-820F71BF8BBD', 'NOTE1BFKO4Y', '5', 'EAA972B9-B3DE-4F89-9F40-E37972A30974', 'underwriting','2023-09-01','2099-12-31', 0);

delete from bfx_impl.declaration_medical where id = '7592C6F4-D853-4CF9-AF80-D76D151CC96A'; insert into bfx_impl.declaration_medical values ('7592C6F4-D853-4CF9-AF80-D76D151CC96A', 'NOTE1BFKO4O', '1', '6D8DFFE3-5F5E-4A78-908D-0ABD832009C2', 'underwriting','2023-09-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '10A09082-6BCF-4119-A7D6-09C2BCBAEF01'; insert into bfx_impl.declaration_medical values ('10A09082-6BCF-4119-A7D6-09C2BCBAEF01', 'NOTE1BFKO4O', '2', '60287F2B-1A8D-4F46-BEA3-1CFE4E0E242D', 'underwriting','2023-09-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = 'ABE1BD7A-A7D9-4DA6-BFF5-8377AB0E6E46'; insert into bfx_impl.declaration_medical values ('ABE1BD7A-A7D9-4DA6-BFF5-8377AB0E6E46', 'NOTE1BFKO4O', '3', '8D2FFA02-D1A5-49B2-9278-83954BA6A734', 'underwriting','2023-09-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = 'E9802568-8ADD-43FA-BF32-5DBC3B5F0BED'; insert into bfx_impl.declaration_medical values ('E9802568-8ADD-43FA-BF32-5DBC3B5F0BED', 'NOTE1BFKO4O', '4', '6D92326D-A44B-4C97-8568-D34705365E42', 'underwriting','2023-09-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '90B88541-1B55-4CD9-BB57-CFEFC278B296'; insert into bfx_impl.declaration_medical values ('90B88541-1B55-4CD9-BB57-CFEFC278B296', 'NOTE1BFKO4O', '5', 'EAA972B9-B3DE-4F89-9F40-E37972A30974', 'underwriting','2023-09-01','2099-12-31', 0);
