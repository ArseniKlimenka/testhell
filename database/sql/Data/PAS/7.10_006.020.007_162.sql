-- products
delete from bfx_impl.PRODUCTS
 where CODE in ('IDGV1BFKO','IDGV2BFKO','IDGV3BFKO','IDGV5BFKO')
 insert into bfx_impl.PRODUCTS
 (ID, CODE, PRODUCT_GROUP, DESCRIPTION)
 VALUES
('382EC875-D169-4619-A796-43A35B713AED', N'IDGV1BFKO', N'investment', N'Драйвер гарантия (1 год)'),
('361D0507-A85A-43ED-B878-55465A37C286', N'IDGV2BFKO', N'investment', N'Драйвер гарантия (2 года)'),
('32134E1C-AD8B-4998-A45A-5F77DD424F52', N'IDGV3BFKO', N'investment', N'Драйвер гарантия (3 года)'),
('032B561E-0073-4EC0-85E8-D386289A4940', N'IDGV5BFKO', N'investment', N'Драйвер гарантия (5 лет)')

delete from bfx_impl.products
where code in ('IDGV3PPBFKO', 'IDGV5PPBFKO')

insert into bfx_impl.products
(id, code, product_group, description, product_class)
values
('EA82777A-97A0-4098-9A7F-DFC434156088', N'IDGV3PPBFKO', N'investment', N'Драйвер гарантия (3 года) с периодической выплатой дохода', N'НСЖ'),
('09CCC83F-0EDF-4325-93F4-E9E8A456C89E', N'IDGV5PPBFKO', N'investment', N'Драйвер гарантия (5 лет) с периодической выплатой дохода', N'НСЖ')

  -- product risks relation
delete from bfx_impl.risk_product_relation
 where product_code in ('IDGV1BFKO','IDGV2BFKO','IDGV3BFKO','IDGV5BFKO')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
('B7FB485D-AB86-4EF7-A289-2312A9F56430', N'E36404', N'IDGV1BFKO', '0', NULL, NULL, N'01', 1),
('7352D047-D831-4F2D-AEB2-2F8620470725', N'DLPT36404', N'IDGV1BFKO', '1', NULL, NULL, N'01', 2),
('BE9D9E78-2E97-4360-A8FF-30BF506698BB', N'DLPDP36404', N'IDGV1BFKO', '0','DLPT36404', NULL, N'03', 3),
('5D2315AF-066F-4AA0-8B54-376308912C2B', N'DNS36404', N'IDGV1BFKO', '0', NULL, NULL, N'01', 4),
('BF5A16B7-D585-4DC6-96D7-BE3BC993FE84', N'E36404', N'IDGV2BFKO', '0', NULL, NULL, N'01', 1),
('45FD2239-94D1-4B40-AEE2-E6B5BB61C462', N'DLPT36404', N'IDGV2BFKO', '1', NULL, NULL, N'01', 2),
('453ECF3C-21AC-4E9B-B016-101B7CAA1009', N'DLPDP36404', N'IDGV2BFKO', '0','DLPT36404', NULL, N'03', 3),
('95B1F1E8-D7EA-4E6A-B43B-10AF9130B1A1', N'DNS36404', N'IDGV2BFKO', '0', NULL, NULL, N'01', 4),
('8D7C0A98-3548-4338-8856-826AE978FD32', N'E36404', N'IDGV3BFKO', '0', NULL, NULL, N'01', 1),
('760BC449-7693-41E0-972B-10C5CD5E46DC', N'DLPT36404', N'IDGV3BFKO', '1', NULL, NULL, N'01', 2),
('F220959F-ED62-413E-AE61-39D519307844', N'DLPDP36404', N'IDGV3BFKO', '0','DLPT36404', NULL, N'03', 3),
('2178F635-65F3-4B5F-B58D-4DC098739945', N'DNS36404', N'IDGV3BFKO', '0', NULL, NULL, N'01', 4),
('93A9519E-5B9D-43BE-8566-4FE3E64C8CBE', N'E36404', N'IDGV5BFKO', '0', NULL, NULL, N'01', 1),
('776506DB-CA7E-46F7-AEDE-9073C1F04918', N'DLPT36404', N'IDGV5BFKO', '1', NULL, NULL, N'01', 2),
('A933A6C1-8C8B-4FFB-BA79-D4122B8033E1', N'DLPDP36404', N'IDGV5BFKO', '0','DLPT36404', NULL, N'03', 3),
('1CC319A1-A42E-4529-823C-D91DD26E5B5A', N'DNS36404', N'IDGV5BFKO', '0', NULL, NULL, N'01', 4)

-- risk product relation
delete from bfx_impl.risk_product_relation
 where product_code in ('IDGV3PPBFKO', 'IDGV5PPBFKO')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
('6D923574-1A0D-499B-997A-49A7C689C1B8', N'E36404', N'IDGV3PPBFKO', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('F9910334-0445-4D64-8901-81B540DAE501', N'ME36404', N'IDGV3PPBFKO', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('9DB01CD7-F928-45CA-BADF-BACD793E1502', N'DLPT36404', N'IDGV3PPBFKO', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson'),
('D3B6BEF5-4CB4-4749-B18E-EB1125AE9011', N'DNS36404', N'IDGV3PPBFKO', '0', NULL, NULL, N'01', 4, 'main', 'insuredPerson'),
('38C8856F-6696-4581-9C4F-EEDC6E2D60D0', N'E36404', N'IDGV5PPBFKO', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('D11FD7C3-5EB5-4A62-8667-F370B551F965', N'ME36404', N'IDGV5PPBFKO', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('62E2C59A-F04B-4FB7-B98D-F8247BBDAD0B', N'DLPT36404', N'IDGV5PPBFKO', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson'),
('995927C1-E6A5-46DA-8CDA-FEB83FBFA486', N'DNS36404', N'IDGV5PPBFKO', '0', NULL, NULL, N'01', 4, 'main', 'insuredPerson')