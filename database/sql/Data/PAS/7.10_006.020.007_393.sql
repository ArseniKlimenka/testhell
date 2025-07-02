-- Add product IDGV2PPBFKO
delete from bfx_impl.products
where code in ('IDGV2PPBFKO')

insert into bfx_impl.products
(id, code, product_group, description, product_class)
values
('73792750-DA5A-4E11-BFD2-B4C15DB7246B', N'IDGV2PPBFKO', N'investment', N'Драйвер гарантия (2 года) с периодической выплатой дохода', N'НСЖ')

--risk product
delete from bfx_impl.risk_product_relation
 where product_code in ('IDGV2PPBFKO')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
('3C2B6D45-AB2C-4A03-980C-0127F92062B3', N'E36404', N'IDGV2PPBFKO', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('E28A9AF2-3346-41EB-AD41-495330F18089', N'ME36404', N'IDGV2PPBFKO', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('4ACD8C88-52DA-42D0-9857-7D6E21246E8C', N'DLPT36404', N'IDGV2PPBFKO', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson'),
('2FFD4E5B-F6DC-48E5-8505-B058F9EBAE77', N'DNS36404', N'IDGV2PPBFKO', '0', NULL, NULL, N'01', 4, 'main', 'insuredPerson')


-- Добавление строк Драйвер гарантия 2 года с период выплатой IDGV2PPBFKO
delete from bfx_impl.declaration_main where id = '10B2196D-FBEB-421E-B804-E22AC87343AE'; insert into bfx_impl.declaration_main values ('10B2196D-FBEB-421E-B804-E22AC87343AE', 'IDGV2PPBFKO', '1', 'B072D3C9-B398-43A0-B07C-985298E9483A', 'underwriting','2023-08-23','2099-12-31');
delete from bfx_impl.declaration_main where id = 'CFC55372-9808-402C-BC7F-B92FD4CBC8CB'; insert into bfx_impl.declaration_main values ('CFC55372-9808-402C-BC7F-B92FD4CBC8CB', 'IDGV2PPBFKO', '2', 'F3DEAF2B-44E2-44F9-A3C6-20C3B10356E9', 'underwriting','2023-08-23','2099-12-31');
delete from bfx_impl.declaration_main where id = '2522B9A4-E78B-41F7-BA82-1488D864A243'; insert into bfx_impl.declaration_main values ('2522B9A4-E78B-41F7-BA82-1488D864A243', 'IDGV2PPBFKO', '3', '8A6B19E1-7221-47C8-8B9D-4F028FD9E1D7', 'compliance','2023-08-23','2099-12-31');
delete from bfx_impl.declaration_main where id = '4F631FD4-CF02-4825-B7AC-FF124ED93983'; insert into bfx_impl.declaration_main values ('4F631FD4-CF02-4825-B7AC-FF124ED93983', 'IDGV2PPBFKO', '4', 'BBAB81AC-6FB2-48F6-A89A-F8360FA36B4E', 'compliance','2023-08-23','2099-12-31');
delete from bfx_impl.declaration_main where id = '75F81BB1-6C90-40E4-9D32-62A3EC868943'; insert into bfx_impl.declaration_main values ('75F81BB1-6C90-40E4-9D32-62A3EC868943', 'IDGV2PPBFKO', '5', '3E2A362B-8548-4D5A-B942-AB5438CAAC9E', 'compliance','2023-08-23','2099-12-31');
delete from bfx_impl.declaration_main where id = '316C7B2E-FD7C-4DB8-B1BB-F7A79A338534'; insert into bfx_impl.declaration_main values ('316C7B2E-FD7C-4DB8-B1BB-F7A79A338534', 'IDGV2PPBFKO', '6', 'ACBD13E8-60A0-425C-B54B-8422E2E9B4FF', 'compliance','2023-08-23','2099-12-31');
delete from bfx_impl.declaration_main where id = 'B115C4D7-B9D3-49DE-8AF5-9E713524EEC9'; insert into bfx_impl.declaration_main values ('B115C4D7-B9D3-49DE-8AF5-9E713524EEC9', 'IDGV2PPBFKO', '7', '8B95F993-38EB-441C-B53D-A2FACE2AD81D', 'compliance','2023-08-23','2099-12-31');
delete from bfx_impl.declaration_main where id = 'E44A835D-2ED8-41D9-8F09-F5433B91682E'; insert into bfx_impl.declaration_main values ('E44A835D-2ED8-41D9-8F09-F5433B91682E', 'IDGV2PPBFKO', '8', '4346B09F-86F9-42DE-BA95-0BBA310DDDF3', 'compliance','2023-08-23','2099-12-31');
delete from bfx_impl.declaration_main where id = 'D33EDF74-AD4B-4DA1-A89D-7C3B1A58074D'; insert into bfx_impl.declaration_main values ('D33EDF74-AD4B-4DA1-A89D-7C3B1A58074D', 'IDGV2PPBFKO', '9', '310C750E-102C-43B3-8C4A-17018BCE208C', 'compliance','2023-08-23','2099-12-31');
delete from bfx_impl.declaration_main where id = '6D9AB74B-643A-4B3B-B69E-329845D4B238'; insert into bfx_impl.declaration_main values ('6D9AB74B-643A-4B3B-B69E-329845D4B238', 'IDGV2PPBFKO', '10', '8B1CF4B7-DB7D-43FA-BB50-64A3A284296E', 'compliance','2023-08-23','2099-12-31');
delete from bfx_impl.declaration_main where id = '18E06BC5-2EBD-4FD3-8466-45DB5ED002D9'; insert into bfx_impl.declaration_main values ('18E06BC5-2EBD-4FD3-8466-45DB5ED002D9', 'IDGV2PPBFKO', '11', 'A7F3C61D-8C24-4627-B2CE-F460B85A2B8B', 'legal','2023-08-23','2099-12-31');
delete from bfx_impl.declaration_main where id = 'B962F198-4FD0-4CC5-BADF-E1462917370A'; insert into bfx_impl.declaration_main values ('B962F198-4FD0-4CC5-BADF-E1462917370A', 'IDGV2PPBFKO', '12', 'D2A46FE5-0F5F-427C-A23B-FD05472E286D', 'block','2023-08-23','2099-12-31');
delete from bfx_impl.declaration_main where id = 'A18316E4-D1C7-43AC-9745-62E488250037'; insert into bfx_impl.declaration_main values ('A18316E4-D1C7-43AC-9745-62E488250037', 'IDGV2PPBFKO', '13', 'D0A31047-046F-431A-A528-AF706BDA15BA', 'block','2023-08-23','2099-12-31');
delete from bfx_impl.declaration_main where id = '6DBC4EB7-3A92-4F07-916B-262B414082FC'; insert into bfx_impl.declaration_main values ('6DBC4EB7-3A92-4F07-916B-262B414082FC', 'IDGV2PPBFKO', '14', 'A0F6CE04-DD78-4349-8306-35978F726C81', 'block','2023-08-23','2099-12-31');
delete from bfx_impl.declaration_main where id = '1BFFB716-93AD-47AF-AEAA-E7BCD014F530'; insert into bfx_impl.declaration_main values ('1BFFB716-93AD-47AF-AEAA-E7BCD014F530', 'IDGV2PPBFKO', '15', '9556FB4F-F1E3-4A12-A7C8-D1EBDD6B2ACB', 'block','2023-08-23','2099-12-31');
delete from bfx_impl.declaration_main where id = '59FE45A7-77F6-4C1B-9189-41EFFB39F9F2'; insert into bfx_impl.declaration_main values ('59FE45A7-77F6-4C1B-9189-41EFFB39F9F2', 'IDGV2PPBFKO', '16', 'F6A99552-511E-4B35-923E-E5791E7C5B96', 'block','2023-08-23','2099-12-31');
delete from bfx_impl.declaration_main where id = '3C30A721-2DCC-4A18-9626-B1E450800E5D'; insert into bfx_impl.declaration_main values ('3C30A721-2DCC-4A18-9626-B1E450800E5D', 'IDGV2PPBFKO', '17', '469F4627-F5A3-4FF6-AD36-94F59A8DC5F1', 'legal','2023-08-23','2099-12-31');
delete from bfx_impl.declaration_main where id = '7780ABD4-C37D-425F-8CA9-0B1C9BA511BF'; insert into bfx_impl.declaration_main values ('7780ABD4-C37D-425F-8CA9-0B1C9BA511BF', 'IDGV2PPBFKO', '18', '0B746533-F48F-43E4-B514-0FBF89F1D27A', 'block','2023-08-23','2099-12-31');
delete from bfx_impl.declaration_main where id = '2B39BB75-CDCE-45A3-AF64-345D83FE09C8'; insert into bfx_impl.declaration_main values ('2B39BB75-CDCE-45A3-AF64-345D83FE09C8', 'IDGV2PPBFKO', '19', 'FAD8C810-9B63-4860-AB97-3671A8E991C2', 'legal','2023-08-23','2099-12-31');

-- Добавление строк мед деклараций Драйвер гарантия 2 года с период выплатой IDGV2PPBFKO
delete from bfx_impl.declaration_medical where id = '0FDDC9AD-E095-45DF-A2AA-BC18516BE6F8'; insert into bfx_impl.declaration_medical values ('0FDDC9AD-E095-45DF-A2AA-BC18516BE6F8', 'IDGV2PPBFKOY', '1', 'CE9AB8AB-BC3E-41DF-BE04-70FF10120413', 'underwriting','2023-08-23','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = 'CF7F286C-120C-4174-B53C-6AAABAA54318'; insert into bfx_impl.declaration_medical values ('CF7F286C-120C-4174-B53C-6AAABAA54318', 'IDGV2PPBFKOY', '2', '82881240-3AB9-4350-AD2D-092BE2C82F22', 'underwriting','2023-08-23','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '0F0F707C-6713-474D-B607-71AA7C93C531'; insert into bfx_impl.declaration_medical values ('0F0F707C-6713-474D-B607-71AA7C93C531', 'IDGV2PPBFKOY', '3', 'BE7BF7B2-F4F4-4420-9193-9C477B035ADE', 'underwriting','2023-08-23','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = 'BCD43886-B923-4CD9-93EA-7BE8AAFB4ACA'; insert into bfx_impl.declaration_medical values ('BCD43886-B923-4CD9-93EA-7BE8AAFB4ACA', 'IDGV2PPBFKOY', '4', '1E199F89-8616-4282-BA7A-99509C7A4759', 'underwriting','2023-08-23','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '8AE6E4CF-0A89-43A0-9267-97E2B29E0ECF'; insert into bfx_impl.declaration_medical values ('8AE6E4CF-0A89-43A0-9267-97E2B29E0ECF', 'IDGV2PPBFKOY', '5', 'A351ED7A-B241-4716-87C4-0E6A9D30BD6C', 'underwriting','2023-08-23','2099-12-31', 0);

delete from bfx_impl.declaration_medical where id = 'E19B3C71-3768-438F-8FCC-7EF7DBB36929'; insert into bfx_impl.declaration_medical values ('E19B3C71-3768-438F-8FCC-7EF7DBB36929', 'IDGV2PPBFKOO', '1', 'CE9AB8AB-BC3E-41DF-BE04-70FF10120413', 'underwriting','2023-08-23','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = 'B697C7E5-FAA0-43D7-AA46-B69043FFFAB2'; insert into bfx_impl.declaration_medical values ('B697C7E5-FAA0-43D7-AA46-B69043FFFAB2', 'IDGV2PPBFKOO', '2', '82881240-3AB9-4350-AD2D-092BE2C82F22', 'underwriting','2023-08-23','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '2242AF86-E852-4B9F-A993-EDA1ACA998AC'; insert into bfx_impl.declaration_medical values ('2242AF86-E852-4B9F-A993-EDA1ACA998AC', 'IDGV2PPBFKOO', '3', 'BE7BF7B2-F4F4-4420-9193-9C477B035ADE', 'underwriting','2023-08-23','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = 'A913FD27-AC2E-4EA4-9B6C-92714D960E0D'; insert into bfx_impl.declaration_medical values ('A913FD27-AC2E-4EA4-9B6C-92714D960E0D', 'IDGV2PPBFKOO', '4', '1E199F89-8616-4282-BA7A-99509C7A4759', 'underwriting','2023-08-23','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '93E0E20B-38BD-48BF-9579-F7769DB1ACCC'; insert into bfx_impl.declaration_medical values ('93E0E20B-38BD-48BF-9579-F7769DB1ACCC', 'IDGV2PPBFKOO', '5', 'A351ED7A-B241-4716-87C4-0E6A9D30BD6C', 'underwriting','2023-08-23','2099-12-31', 0);

-- Правка текстов мед деклараций EBMOPTIMAOAS2
delete from bfx_impl.declaration_medical_questions where id = 'BF1102D9-801C-4444-83C4-4843E6D55197'; insert into bfx_impl.declaration_medical_questions values ('BF1102D9-801C-4444-83C4-4843E6D55197', N'Являюсь лицом в возрасте от 18 и до 80 полных лет на дату заключения договора страхования');
delete from bfx_impl.declaration_medical_questions where id = '80F38E97-6702-48E2-85F4-48F1D7181282'; insert into bfx_impl.declaration_medical_questions values ('80F38E97-6702-48E2-85F4-48F1D7181282', N'Не являюсь и не являлся (не являлась) инвалидом I группы и не подавал(а) документы на освидетельствование для получения группы инвалидности, не имел(а), не проходил(а) лечения и не страдаю в настоящее время от онкологических заболеваний, болезней сердечно-сосудистой системы (инфаркт миокарда, инсульт, стенокардия, порок сердца, тромбоз, сердечно-сосудистая недостаточность), каких-либо заболеваний головного мозга, гепатита В или С, цирроза печени, сахарного диабета I типа, неврологических или психических расстройств (эпилепсия, паралич, алкоголизм, наркомания), СПИД или ВИЧ-инфекции');
delete from bfx_impl.declaration_medical_questions where id = 'FAE5259C-3B13-4CAC-BBD9-5595206974DA'; insert into bfx_impl.declaration_medical_questions values ('FAE5259C-3B13-4CAC-BBD9-5595206974DA', N'Не употребляю и не употреблял(а) ранее наркотики, токсические вещества, не страдаю алкоголизмом, не состою и не состоял (не состояла) ранее на учете в наркологическом, психоневрологическом диспансере, центрах профилактики борьбы со СПИДом');
delete from bfx_impl.declaration_medical_questions where id = '2B6FDF08-BA64-4846-B0BD-A046B3C4B53E'; insert into bfx_impl.declaration_medical_questions values ('2B6FDF08-BA64-4846-B0BD-A046B3C4B53E', N'Не прохожу службу в вооруженных силах, не работаю с оружием, не занят(а) в работах со взрывчатыми веществами, подземных, подводных или высотных работах, не являюсь пожарным, альпинистом, профессиональным спортсменом, работником нефтяной промышленности, непосредственно задействованным в добыче, транспортировке и переработке нефти и/или природного газа, не занят (не занята) профессионально или непрофессионально авиацией (за исключением пилотов пассажирских авиалиний)');
delete from bfx_impl.declaration_medical_questions where id = 'F1AE3FD1-A8B2-45C0-8F9D-A1B119DFA6C3'; insert into bfx_impl.declaration_medical_questions values ('F1AE3FD1-A8B2-45C0-8F9D-A1B119DFA6C3', N'Не намереваюсь путешествовать на территории, на которой объявлено чрезвычайное положение или проводятся боевые действия');

