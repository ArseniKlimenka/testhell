-- products
delete from bfx_impl.products
where code in ('IDGV1VTB', 'IDGV2VTB', 'IDGV3VTB', 'IDGV5VTB', 'IDGV2PPVTB', 'IDGV3PPVTB', 'IDGV5PPVTB')

insert into bfx_impl.products
(id, code, product_group, description, product_class)
values
('0DE33D3C-E37B-470A-BBDA-05D42E76808B', N'IDGV1VTB', N'investment', N'Драйвер Гарантия Ультра (1 год)', N'ИСЖ'),
('C4206CD0-7B9D-4E09-B3F0-11A4772E6DFB', N'IDGV2VTB', N'investment', N'Драйвер Гарантия Ультра (2 года)', N'ИСЖ'),
('FB23FFC2-E1F5-471C-8BEA-2F37BC7E263F', N'IDGV3VTB', N'investment', N'Драйвер Гарантия Ультра (3 года)', N'ИСЖ'),
('0A6383D9-09F2-4F40-8C33-AA01ABFFAAAD', N'IDGV5VTB', N'investment', N'Драйвер Гарантия Ультра (5 лет)', N'ИСЖ'),
('C5C93600-9888-4166-8579-BD383054A897', N'IDGV2PPVTB', N'investment', N'Драйвер Гарантия Ультра (2 года) с периодической выплатой дохода', N'ИСЖ'),
('931FD482-C02A-4E56-8EB3-C08AA7921C62', N'IDGV3PPVTB', N'investment', N'Драйвер Гарантия Ультра (3 года) с периодической выплатой дохода', N'ИСЖ'),
('61485875-08A7-415A-86CD-FF2700D098FE', N'IDGV5PPVTB', N'investment', N'Драйвер Гарантия Ультра (5 лет) с периодической выплатой дохода', N'ИСЖ')


-- risk product relation
delete from bfx_impl.risk_product_relation
 where product_code in ('IDGV1VTB', 'IDGV2VTB', 'IDGV3VTB', 'IDGV5VTB', 'IDGV2PPVTB', 'IDGV3PPVTB', 'IDGV5PPVTB')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
('BA50BBCD-6D13-4A60-967D-31353CADC2D1', N'E36404', N'IDGV2PPVTB', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('C4AB6440-5D0C-4C92-B12F-69709C279BB6', N'ME36404', N'IDGV2PPVTB', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('E8742F62-3DA1-4FFD-8545-82FF38213012', N'DLPT36404', N'IDGV2PPVTB', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson'),
('A640B557-4B1E-43E8-A82E-ACE5F19E47DB', N'DNS36404', N'IDGV2PPVTB', '0', NULL, NULL, N'01', 4, 'main', 'insuredPerson'),
('10487FCD-83D4-4109-8639-D0B10BBE23A7', N'E36404', N'IDGV3PPVTB', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('D18E95D0-3674-4B7A-9739-DCEBD9084478', N'ME36404', N'IDGV3PPVTB', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('84617094-F75F-46CC-B86E-EC5C54596F4E', N'DLPT36404', N'IDGV3PPVTB', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson'),
('2F618DD2-1EEE-4BC8-94E1-0811D1868FB2', N'DNS36404', N'IDGV3PPVTB', '0', NULL, NULL, N'01', 4, 'main', 'insuredPerson'),
('6108C739-EB0C-4250-B94C-70F50D46DD05', N'E36404', N'IDGV5PPVTB', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('237123A7-C05D-479B-9800-85BF3DFFE6A5', N'ME36404', N'IDGV5PPVTB', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('89FE89FE-0F6E-42E9-B753-9A67A0E87C0B', N'DLPT36404', N'IDGV5PPVTB', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson'),
('EBD20BDF-C0DE-4F86-A477-B841090CFEEE', N'DNS36404', N'IDGV5PPVTB', '0', NULL, NULL, N'01', 4, 'main', 'insuredPerson'),
('7039F6ED-C8C2-4110-A1CE-BFB4419A850C', N'E36404', N'IDGV1VTB', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('68355688-B57A-43BA-8356-FC3A132FD357', N'DLPT36404', N'IDGV1VTB', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('19D88304-8570-4DB6-B368-00D2A8D5948C', N'DNS36404', N'IDGV1VTB', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson'),
('DC62F1CD-6FA2-4B6C-A81F-2CFA4A5B02AB', N'E36404', N'IDGV2VTB', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('30B55635-4A52-44A0-ABB0-616328D179EC', N'DLPT36404', N'IDGV2VTB', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('E93F4788-EF7D-41D5-99C6-91441A848759', N'DNS36404', N'IDGV2VTB', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson'),
('1CEFE020-EAC4-459B-98A0-95D64DC237C9', N'E36404', N'IDGV3VTB', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('EDC198BC-2A89-4AE5-AEAC-E907934426B7', N'DLPT36404', N'IDGV3VTB', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('095EA63D-BA32-4849-8480-FE74EC72B558', N'DNS36404', N'IDGV3VTB', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson'),
('075664A6-346E-4F42-A47B-2AA8009A901B', N'E36404', N'IDGV5VTB', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('CB56457F-CC13-4950-96C6-85D1B10DE182', N'DLPT36404', N'IDGV5VTB', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('1F7F2E8C-E914-49AE-A8EC-B8EE43CAE960', N'DNS36404', N'IDGV5VTB', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson')