-- products
delete from bfx_impl.PRODUCTS
 where CODE in ('IBA2V3VTB', 'IBA2V5VTB', 'IBA2P3VTB', 'IBA2P5VTB')
 insert into bfx_impl.PRODUCTS
 (ID, CODE, PRODUCT_GROUP, DESCRIPTION, PRODUCT_CLASS, sales_segment)
 VALUES
('2C5F8754-F411-4827-8D05-4B1D4B8586EA', N'IBA2P3VTB', N'investment', N'Базис Актив 2.0 (3 года)', N'ИСЖ', N'PremiumVTB'),
('BF85EDD9-5A73-45EE-B2F3-507E3C8BD846', N'IBA2P5VTB', N'investment', N'Базис Актив 2.0 (5 лет)', N'ИСЖ', N'PremiumVTB'),
('5C8B9170-ACA8-499D-8366-13679FD78AAB', N'IBA2V3VTB', N'investment', N'Базис Актив 2.0 Ультра (3 года)', N'ИСЖ', N'VIPVTB'),
('305B9A19-6651-49B9-9E6E-37928466A2ED', N'IBA2V5VTB', N'investment', N'Базис Актив 2.0 Ультра (5 лет)', N'ИСЖ', N'VIPVTB')

-- product risks
delete from bfx_impl.risk_product_relation
 where product_code in ('IBA2P3VTB', 'IBA2P5VTB', 'IBA2V3VTB', 'IBA2V5VTB')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
('B2844347-F8CD-41D2-A47A-C8BFB0F90E51', N'E36904', N'IBA2P3VTB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
('959C5994-55FB-471F-9CCA-3A32F1DA5637', N'DLP36904', N'IBA2P3VTB', '0', NULL, NULL, N'01', 2, N'main', N'insuredPerson'),
('0676E7D5-C8E9-4957-84DA-2CFAAA10A259', N'DNS36904', N'IBA2P3VTB', '0', NULL, NULL, N'01', 3, N'main', N'insuredPerson'),
('5D09E36D-1101-4CF4-9D24-B133772A4D72', N'E36904', N'IBA2P5VTB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
('9C81E5F8-6DA9-4D87-832A-63F74BC964E2', N'DLP36904', N'IBA2P5VTB', '0', NULL, NULL, N'01', 2, N'main', N'insuredPerson'),
('D57D26B1-6BA2-4E4A-8B6A-BD0B4C880160', N'DNS36904', N'IBA2P5VTB', '0', NULL, NULL, N'01', 3, N'main', N'insuredPerson'),
('0D8C61A0-CBBE-42D9-9C74-F5E9A80A5588', N'E36904', N'IBA2V3VTB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
('CD104692-E0D9-4A21-921D-FAFD97B2B373', N'DLP36904', N'IBA2V3VTB', '0', NULL, NULL, N'01', 2, N'main', N'insuredPerson'),
('BEC31AB4-1BEF-42F5-9091-0D1D900A8821', N'DNS36904', N'IBA2V3VTB', '0', NULL, NULL, N'01', 3, N'main', N'insuredPerson'),
('FCA5F156-D7EC-4120-857E-CB3D1F1D9E33', N'E36904', N'IBA2V5VTB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
('8B8B69CC-33E1-4D85-AE90-AC3537C0187D', N'DLP36904', N'IBA2V5VTB', '0', NULL, NULL, N'01', 2, N'main', N'insuredPerson'),
('9A85D104-0B58-4920-B957-ECDAC714D82A', N'DNS36904', N'IBA2V5VTB', '0', NULL, NULL, N'01', 3, N'main', N'insuredPerson')