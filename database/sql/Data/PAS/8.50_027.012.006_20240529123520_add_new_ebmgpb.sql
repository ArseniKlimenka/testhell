-- products
delete from bfx_impl.products
where code in ('EBMGPB')
insert into bfx_impl.products
(id, code, product_group, description, product_class, SALES_SEGMENT)
values
('F7A97BFF-0E4E-4528-A35D-590DA0A26541', N'EBMGPB', N'endowment', N'Стратегия на пять. Гарант', N'НСЖ', N'massPB')


-- risk product relation
delete from bfx_impl.risk_product_relation
 where product_code in ('EBMGPB')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
-- Стратегия на пять. Гарант ВТБ Премиум
('5741CDCA-4FD3-42A2-B0E7-18B5C033B86F', N'E36404', N'EBMGPB', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('36E720B6-8EFA-4BEF-94B5-CBBB659CFF6C', N'DLPVV36404', N'EBMGPB', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('0CECD567-031A-4675-8668-84F5756ED514', N'DNSVV36404', N'EBMGPB', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson')


-- декларации
delete from bfx_impl.declaration_main where id = 'FE458566-DA04-47C5-8DD3-BEDEF4B151B9'; insert into bfx_impl.declaration_main values ('FE458566-DA04-47C5-8DD3-BEDEF4B151B9', 'EBMGPB', '1', '85F2A419-5870-479C-9AAF-013A2264D8CA', 'underwriting','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '3665AB27-A9D8-4B0E-8EB5-27E5BB5578CD'; insert into bfx_impl.declaration_main values ('3665AB27-A9D8-4B0E-8EB5-27E5BB5578CD', 'EBMGPB', '2', '3F60C958-FF56-46C9-AB7C-06FC974DC47C', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '38843657-BDCD-4A30-900F-B14DD8DCEC66'; insert into bfx_impl.declaration_main values ('38843657-BDCD-4A30-900F-B14DD8DCEC66', 'EBMGPB', '3', '2D27FF34-7ECB-4A2C-9793-0A56DDEE654A', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '3FA25AA6-570B-4C24-8B8C-38DA625DC084'; insert into bfx_impl.declaration_main values ('3FA25AA6-570B-4C24-8B8C-38DA625DC084', 'EBMGPB', '4', 'A0FDE93D-E910-4410-9AD2-1113960A651A', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '5B9C349F-2062-4CAD-8872-E178F730FAE2'; insert into bfx_impl.declaration_main values ('5B9C349F-2062-4CAD-8872-E178F730FAE2', 'EBMGPB', '5', '091124C6-F862-4B1F-BF81-34909EBA6261', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'ABC238AA-BC95-43E3-9B3C-0552224740DB'; insert into bfx_impl.declaration_main values ('ABC238AA-BC95-43E3-9B3C-0552224740DB', 'EBMGPB', '6', '822D8A43-A030-49DC-957D-5021C2DA5B33', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'FDDE6C26-7C9A-4FAF-81DA-C95DFB97974A'; insert into bfx_impl.declaration_main values ('FDDE6C26-7C9A-4FAF-81DA-C95DFB97974A', 'EBMGPB', '7', '6BC33663-C519-4724-8857-5D85E9509779', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '87CF8C89-5082-461A-AFC5-6ED66F883F57'; insert into bfx_impl.declaration_main values ('87CF8C89-5082-461A-AFC5-6ED66F883F57', 'EBMGPB', '8', 'A1A662E8-20B5-4905-AD5E-9D015008EBAF', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'CD76B7B7-64D1-475F-9E55-2928655ECD7A'; insert into bfx_impl.declaration_main values ('CD76B7B7-64D1-475F-9E55-2928655ECD7A', 'EBMGPB', '9', '71E9DC4D-A913-45FF-8F1B-A23D9D46AC70', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'B37833FE-4E06-4319-AE7A-F5631A44588D'; insert into bfx_impl.declaration_main values ('B37833FE-4E06-4319-AE7A-F5631A44588D', 'EBMGPB', '10', '5EC5803E-49EA-42E5-9407-A5E41737F105', 'legal','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'F68DE253-FA71-45F7-ADCD-2D15A368DB5B'; insert into bfx_impl.declaration_main values ('F68DE253-FA71-45F7-ADCD-2D15A368DB5B', 'EBMGPB', '11', '79FCF8C4-64F7-4D23-9A51-A6F76439D249', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '5F66FC9E-195F-4A53-9B72-0BE7133F8A21'; insert into bfx_impl.declaration_main values ('5F66FC9E-195F-4A53-9B72-0BE7133F8A21', 'EBMGPB', '12', '7D19E899-E924-4800-A6ED-A9439B7C649D', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'D96FA1DD-2298-44DC-99B5-C16C367EBB32'; insert into bfx_impl.declaration_main values ('D96FA1DD-2298-44DC-99B5-C16C367EBB32', 'EBMGPB', '13', 'EDAFA66F-6673-4AE3-8B03-AA521E65B8FE', 'legal','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'B32D8BDC-D50B-4585-874C-0F2D10B2AF2B'; insert into bfx_impl.declaration_main values ('B32D8BDC-D50B-4585-874C-0F2D10B2AF2B', 'EBMGPB', '14', '2F6D2EA5-66FE-49C3-B772-DB1C1E978661', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '3056BE76-D82F-4256-8192-0DFEC826A24B'; insert into bfx_impl.declaration_main values ('3056BE76-D82F-4256-8192-0DFEC826A24B', 'EBMGPB', '15', 'EB0C58F0-CC0A-4127-916A-E7FB5DD8E939', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'C0B44351-3DB2-4B15-88EB-C79DA1E9A224'; insert into bfx_impl.declaration_main values ('C0B44351-3DB2-4B15-88EB-C79DA1E9A224', 'EBMGPB', '16', '66D0448C-1D1C-427E-BE5C-F6B7E0CF64DC', 'legal','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'C996CD21-13C8-4FD0-A26A-68D141B39FB0'; insert into bfx_impl.declaration_main values ('C996CD21-13C8-4FD0-A26A-68D141B39FB0', 'EBMGPB', '17', '949798F5-D235-4E0F-808A-F6E4A33C69F5', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'CC61E803-FB4D-4E33-813D-AB3713421DDC'; insert into bfx_impl.declaration_main values ('CC61E803-FB4D-4E33-813D-AB3713421DDC', 'EBMGPB', '18', '50B9536A-67F6-45CD-88A2-F7FCBB939D8B', 'block','1900-01-01','2099-12-31');

-- мед декларации
delete from bfx_impl.declaration_medical where id = '0B768311-6FD2-45CB-90F2-5A428EEA0A7B'; insert into bfx_impl.declaration_medical values ('0B768311-6FD2-45CB-90F2-5A428EEA0A7B', 'EBMGPB', '1', '43832856-87FA-4796-946B-2EDAE77A9BF3', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '80A43869-8D07-4B3F-BE98-68DCD858311E'; insert into bfx_impl.declaration_medical values ('80A43869-8D07-4B3F-BE98-68DCD858311E', 'EBMGPB', '2', 'E499CE39-7190-44E4-AF35-959279E884A1', 'underwriting','1900-01-02','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = 'AF9B5A63-9D99-4A6C-BF06-222CEA38B2DC'; insert into bfx_impl.declaration_medical values ('AF9B5A63-9D99-4A6C-BF06-222CEA38B2DC', 'EBMGPB', '3', '7DA8A751-AB69-4F3A-A02A-BCD4F66B1575', 'underwriting','1900-01-03','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = 'A5F40783-403B-4142-B2DF-614F679CCB80'; insert into bfx_impl.declaration_medical values ('A5F40783-403B-4142-B2DF-614F679CCB80', 'EBMGPB', '4', '8B7CF87A-C999-411F-8767-E566F2549CA1', 'underwriting','1900-01-04','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = 'AEA2D530-330D-48F3-92E3-6230E9388F9C'; insert into bfx_impl.declaration_medical values ('AEA2D530-330D-48F3-92E3-6230E9388F9C', 'EBMGPB', '5', 'C38A556E-9F4D-456C-AB31-FACEAE3E56B8', 'underwriting','1900-01-05','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '13BC5385-A87F-49D9-A085-ED07F10E2014'; insert into bfx_impl.declaration_medical values ('13BC5385-A87F-49D9-A085-ED07F10E2014', 'EBMGPB', '6', '40554B80-797E-4B86-B1FD-FDA33140DCDD', 'underwriting','1900-01-06','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '1C481313-95C6-46D5-A64B-7196CCD0E26D'; insert into bfx_impl.declaration_medical values ('1C481313-95C6-46D5-A64B-7196CCD0E26D', 'EBMGPB', '7', '5EF57121-48B6-469F-BEE9-FDEAAA4B3AE3', 'underwriting','1900-01-07','2099-12-31', 0);
