-- products
delete from bfx_impl.PRODUCTS
 where CODE in ('IDG3', 'IDG5', 'IDG7', 'IDG10','IDGP3', 'IDGP5', 'IDGP7', 'IDGP10')
 insert into bfx_impl.PRODUCTS
 (ID, CODE, PRODUCT_GROUP, DESCRIPTION)
 VALUES
('A1D5090F-CF8D-4FF3-A9DC-C15A12BF8DBD', N'IDG3', N'investment', N'Драйвер Гарантия (3 года)'),
('2097B944-266B-496B-B968-72097C8D57F8', N'IDG5', N'investment', N'Драйвер Гарантия (5 лет)'),
('0DFE59A7-CEE2-4F73-87BD-8A245F680802', N'IDG7', N'investment', N'Драйвер Гарантия (7 лет)'),
('7170FDA7-7ECF-4092-B0AA-C5F4FDCB8602', N'IDG10', N'investment', N'Драйвер Гарантия (10 лет)'),
('5EC77638-1DDD-4426-A974-22C442431846', N'IDGP3', N'investment', N'Драйвер Гарантия (3 года)'),
('E40ACDD0-BB45-4C0A-92E7-48E3C4788C81', N'IDGP5', N'investment', N'Драйвер Гарантия (5 лет)'),
('F332B7A9-ACE5-4601-9BB3-CD4D22FD09BD', N'IDGP7', N'investment', N'Драйвер Гарантия (7 лет)'),
('9C87100B-2D8B-4C61-9B01-2C2988E37FA8', N'IDGP10', N'investment', N'Драйвер Гарантия (10 лет)')

-- risks
delete from bfx_impl.risks
 where code = 'DLPT36404'
insert into bfx_impl.risks
(ID, CODE, TYPE, BUSINESS_LINE, SHORT_DESCRIPTION, FULL_DESCRIPTION)
VALUES
('08E42485-CF9B-4B40-9D45-3F867061ACF8', N'DLPT36404', N'life', N'36404', N'Смерть ЛП', N'Смерть застрахованного по любой причине')

  -- product risks
delete from bfx_impl.risk_product_relation
 where product_code in ('IDG3', 'IDG5', 'IDG7', 'IDG10','IDGP3', 'IDGP5', 'IDGP7', 'IDGP10')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
('502A4A0B-77B1-4666-85F1-656C113BC215', N'E36404', N'IDG3', '0', NULL, NULL, N'01', 1),
('9CE0C7CD-BAD1-4FD2-93D0-875910851B9D', N'DLPT36404', N'IDG3', '1', NULL, NULL, N'01', 2),
('4D93416D-94E6-4DFC-A7FD-0EF4CAE74174', N'DLPDP36404', N'IDG3', '0','DLPT36404', NULL, N'03', 3),
('68B79EEB-497A-4621-B463-ED2B05A77893', N'DNS36404', N'IDG3', '0', NULL, NULL, N'01', 4),
('EB2FD10C-0BD6-4C28-8B54-D8CE38FFA54D', N'E36404', N'IDG5', '0', NULL, NULL, N'01', 1),
('E03D3B74-FB11-4549-B324-9F0D598A6597', N'DLPT36404', N'IDG5', '1', NULL, NULL, N'01', 2),
('963C694D-6A62-4F83-B613-AA828FB87ED5', N'DLPDP36404', N'IDG5', '0','DLPT36404', NULL, N'03', 3),
('A71F420E-45BD-44C3-BC32-5C539F3F0C9E', N'DNS36404', N'IDG5', '0', NULL, NULL, N'01', 4),
('51DB8A4C-489E-4ACC-9492-6D72D1D32725', N'E36404', N'IDG7', '0', NULL, NULL, N'01', 1),
('1C0E6465-0E4D-4281-9801-43C61517DFAA', N'DLPT36404', N'IDG7', '1', NULL, NULL, N'01', 2),
('5E941DD2-1CDF-447A-B7B0-825B9DDAF9AE', N'DLPDP36404', N'IDG7', '0','DLPT36404', NULL, N'03', 3),
('0E7422E1-24AF-4A40-845C-1CCEA26006F5', N'DNS36404', N'IDG7', '0', NULL, NULL, N'01', 4),
('CD03208E-6E53-4E9B-917E-DD201346F5DE', N'E36404', N'IDG10', '0', NULL, NULL, N'01', 1),
('A5E28297-2D11-4B15-8497-9B9C7E00515C', N'DLPT36404', N'IDG10', '1', NULL, NULL, N'01', 2),
('C3EF5B83-5D50-4E61-8FEF-32183ECFACBA', N'DLPDP36404', N'IDG10', '0','DLPT36404', NULL, N'03', 3),
('BE29F8DD-856B-4620-A88A-7050F013CDA0', N'DNS36404', N'IDG10', '0', NULL, NULL, N'01', 4),
('0268018F-05FF-4A82-A5BA-097CAA3E577E', N'E36404', N'IDGP3', '0', NULL, NULL, N'01', 1),
('0DA7DBC9-2F91-49C9-8403-B723AA086086', N'DLPT36404', N'IDGP3', '1', NULL, NULL, N'01', 2),
('6A8CABA5-4F61-422D-9E41-20F856DEA8AE', N'DLPDP36404', N'IDGP3', '0','DLPT36404', NULL, N'03', 3),
('18D12572-DB9C-495A-A1C6-D335F4F9ED22', N'DNS36404', N'IDGP3', '0', NULL, NULL, N'01', 4),
('AC081AD6-9A95-48CA-BFAE-1816B4FFFC12', N'E36404', N'IDGP5', '0', NULL, NULL, N'01', 1),
('74CF0366-3FEF-444F-84BB-A32EDCA6CF8D', N'DLPT36404', N'IDGP5', '1', NULL, NULL, N'01', 2),
('5689E3A6-FD6E-4FE0-AFDB-7D6DA8FD37B7', N'DLPDP36404', N'IDGP5', '0','DLPT36404', NULL, N'03', 3),
('961FA64B-206A-4474-861F-F00A79D48760', N'DNS36404', N'IDGP5', '0', NULL, NULL, N'01', 4),
('133B2803-071E-47D8-A42B-95EE4778634E', N'E36404', N'IDGP7', '0', NULL, NULL, N'01', 1),
('EE5E9DF0-5E7A-40CE-9DF7-A86A06543178', N'DLPT36404', N'IDGP7', '1', NULL, NULL, N'01', 2),
('8866A32D-41FC-442B-A74F-A9D9E19D8C21', N'DLPDP36404', N'IDGP7', '0','DLPT36404', NULL, N'03', 3),
('17D80E1A-A177-4279-AC11-38DB21415210', N'DNS36404', N'IDGP7', '0', NULL, NULL, N'01', 4),
('922B5D01-7306-438E-BB19-56EA0A5FBC18', N'E36404', N'IDGP10', '0', NULL, NULL, N'01', 1),
('ED85B5EA-5D9A-43B6-968C-07156CA1F80D', N'DLPT36404', N'IDGP10', '1', NULL, NULL, N'01', 2),
('2F40C72F-E1FC-49CA-ABE0-7FC568F04E2F', N'DLPDP36404', N'IDGP10', '0','DLPT36404', NULL, N'03', 3),
('254964F8-C3BD-4CC2-AB67-0775291410DE', N'DNS36404', N'IDGP10', '0', NULL, NULL, N'01', 4)
