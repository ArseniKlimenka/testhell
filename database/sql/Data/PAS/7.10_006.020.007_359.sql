-- products
delete from bfx_impl.products
where code in ('EBMOPTIMAOAS2')
insert into bfx_impl.products
(id, code, product_group, description)
values
('192781EA-BF07-44BA-80C3-EFAB028FA70C', N'EBMOPTIMAOAS2', N'endowment', N'Стань миллионером. Оптима')

-- risk product relation
delete from bfx_impl.risk_product_relation
 where product_code in ('EBMOPTIMAOAS2')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
-- Стань миллионером. Оптима
('43C00E60-041C-4C3C-9617-03CE739F8C28', N'E36404', N'EBMOPTIMAOAS2', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('76D4C395-33B0-4CAC-8EF6-CA68BE732A25', N'DLPVV36404', N'EBMOPTIMAOAS2', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('B78169C4-65AA-4CFA-BC30-594ED391413C', N'DNSVV36404', N'EBMOPTIMAOAS2', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson')

-- Добавление текстов декларации EBMOPTIMAOAS2
delete from bfx_impl.declaration_main where id = '65B62D4B-95A5-4354-A491-235DA7237086'; insert into bfx_impl.declaration_main values ('65B62D4B-95A5-4354-A491-235DA7237086', 'EBMOPTIMAOAS2', '1', '2E3D42CA-1F9C-4BE9-800D-453B2C7D774D', 'underwriting','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '60C29B4A-2543-45AA-A507-E8E4A612A216'; insert into bfx_impl.declaration_main values ('60C29B4A-2543-45AA-A507-E8E4A612A216', 'EBMOPTIMAOAS2', '2', 'C6C843E2-BCAB-49F0-9C16-9C1D762A3C8F', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'DB0EEEF8-2934-46DC-A88C-79E4D4DB3ECF'; insert into bfx_impl.declaration_main values ('DB0EEEF8-2934-46DC-A88C-79E4D4DB3ECF', 'EBMOPTIMAOAS2', '3', '4B16841C-887A-4E5D-91E8-71F865D2C4FF', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '9A02F345-1E35-4C3E-9A82-869B2F2060FE'; insert into bfx_impl.declaration_main values ('9A02F345-1E35-4C3E-9A82-869B2F2060FE', 'EBMOPTIMAOAS2', '4', '6E8B98EA-6558-4550-AD8A-8B4C624E4B7A', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '7754E210-E3B8-48FE-9F28-821DFDF34719'; insert into bfx_impl.declaration_main values ('7754E210-E3B8-48FE-9F28-821DFDF34719', 'EBMOPTIMAOAS2', '5', '8D93A41C-ACFB-498D-8A4D-866BA505927A', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '662A1CBF-ADF9-4371-9340-559E6C2BA79D'; insert into bfx_impl.declaration_main values ('662A1CBF-ADF9-4371-9340-559E6C2BA79D', 'EBMOPTIMAOAS2', '6', '80528D3B-869B-4A9F-8E91-1A16AFF4927A', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '7F616A94-77A1-4C28-9D97-AEB7D17ECA86'; insert into bfx_impl.declaration_main values ('7F616A94-77A1-4C28-9D97-AEB7D17ECA86', 'EBMOPTIMAOAS2', '7', 'A588EE87-FCB0-4FE9-8D35-E9D972B418E1', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'A68F97C6-8007-4F2B-B65A-259B12D08432'; insert into bfx_impl.declaration_main values ('A68F97C6-8007-4F2B-B65A-259B12D08432', 'EBMOPTIMAOAS2', '8', 'F36B50B2-9273-4823-8A80-238024ACCBDE', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '3F3CBB17-E94D-4489-B784-6B167DB5012C'; insert into bfx_impl.declaration_main values ('3F3CBB17-E94D-4489-B784-6B167DB5012C', 'EBMOPTIMAOAS2', '9', '2AA2FD96-0438-4993-A242-6FD32491A311', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'DB736B3B-789A-46E7-A135-1876B73529B2'; insert into bfx_impl.declaration_main values ('DB736B3B-789A-46E7-A135-1876B73529B2', 'EBMOPTIMAOAS2', '10', 'FC904CF8-F2BB-47F4-84B9-116C7875310D', 'legal','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '3FD75930-7D7A-4B18-803E-D03EABE647FE'; insert into bfx_impl.declaration_main values ('3FD75930-7D7A-4B18-803E-D03EABE647FE', 'EBMOPTIMAOAS2', '11', '7A3CC3F7-6918-46C1-B8DF-42373FC0A8B4', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'EF25009B-DCFB-4ABD-9CA7-ECE96DB9756F'; insert into bfx_impl.declaration_main values ('EF25009B-DCFB-4ABD-9CA7-ECE96DB9756F', 'EBMOPTIMAOAS2', '12', 'E4733152-19B0-4CC9-9862-EDA71BBFE6F3', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '20F21DD1-2FC9-4EFE-83BB-C143471BFA5C'; insert into bfx_impl.declaration_main values ('20F21DD1-2FC9-4EFE-83BB-C143471BFA5C', 'EBMOPTIMAOAS2', '13', '520E97E1-7686-4F09-B703-5E1276704D9F', 'legal','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '47D6E3F5-FB80-4DA1-86A1-16BA1A7D49A1'; insert into bfx_impl.declaration_main values ('47D6E3F5-FB80-4DA1-86A1-16BA1A7D49A1', 'EBMOPTIMAOAS2', '14', '42BAC187-D594-4824-9FCA-2B8172EE8537', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '7ECFD3A8-1D4D-4B9F-B791-228A75D852F8'; insert into bfx_impl.declaration_main values ('7ECFD3A8-1D4D-4B9F-B791-228A75D852F8', 'EBMOPTIMAOAS2', '15', 'D49EFAB4-1F3A-4829-8738-33E8C0E9F33B', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '8EA721A4-1958-47AF-9797-DDA678F03767'; insert into bfx_impl.declaration_main values ('8EA721A4-1958-47AF-9797-DDA678F03767', 'EBMOPTIMAOAS2', '16', 'EF742385-E4FF-48AE-A64D-A4C6960A047C', 'legal','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '281840E1-C04C-445E-B2AB-27E385D63427'; insert into bfx_impl.declaration_main values ('281840E1-C04C-445E-B2AB-27E385D63427', 'EBMOPTIMAOAS2', '17', 'D18AA1CC-2C9E-40D9-AE82-D55F0D663A03', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '0D39588E-250F-4A6C-B93F-56005D26DBEC'; insert into bfx_impl.declaration_main values ('0D39588E-250F-4A6C-B93F-56005D26DBEC', 'EBMOPTIMAOAS2', '18', '4ABB3BF3-3290-405B-BFAE-9BAD15A0AC8C', 'legal','1900-01-01','2099-12-31');

-- Добавление текстов мед декларации EBMOPTIMAOAS2
delete from bfx_impl.declaration_medical where id = 'B00A49CF-A1BE-49CC-A0F3-047F87AD7EDA'; insert into bfx_impl.declaration_medical values ('B00A49CF-A1BE-49CC-A0F3-047F87AD7EDA', 'EBMOPTIMAOAS2', '1', 'BF1102D9-801C-4444-83C4-4843E6D55197', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = 'A9B7C3F3-52B2-4CF7-932D-A5451DF96480'; insert into bfx_impl.declaration_medical values ('A9B7C3F3-52B2-4CF7-932D-A5451DF96480', 'EBMOPTIMAOAS2', '2', '80F38E97-6702-48E2-85F4-48F1D7181282', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '10E2EB3A-7A5A-4948-BF3F-4964ACCDBB22'; insert into bfx_impl.declaration_medical values ('10E2EB3A-7A5A-4948-BF3F-4964ACCDBB22', 'EBMOPTIMAOAS2', '3', 'FAE5259C-3B13-4CAC-BBD9-5595206974DA', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '439B00D4-0C98-4D17-955F-593EF1A0FC3A'; insert into bfx_impl.declaration_medical values ('439B00D4-0C98-4D17-955F-593EF1A0FC3A', 'EBMOPTIMAOAS2', '4', '2B6FDF08-BA64-4846-B0BD-A046B3C4B53E', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '467D23FE-B4A6-4481-83E9-5EB6478D416B'; insert into bfx_impl.declaration_medical values ('467D23FE-B4A6-4481-83E9-5EB6478D416B', 'EBMOPTIMAOAS2', '5', 'F1AE3FD1-A8B2-45C0-8F9D-A1B119DFA6C3', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '26B366C7-66E3-4A6D-8801-5CF29B1BE700'; insert into bfx_impl.declaration_medical values ('26B366C7-66E3-4A6D-8801-5CF29B1BE700', 'EBMOPTIMAOAS2', '6', 'F824466F-A5F6-4792-9BDE-CAC74A816D16', 'underwriting','1900-01-01','2099-12-31', 0);

