-- products
delete from bfx_impl.products
where code in ('CAPCLRELOAS', 'CAPCLCHILDOAS', 'CAPCLRELBOXOAS', 'CAPCLCHILDBOXOAS')

insert into bfx_impl.products
(id, code, product_group, description)
values
('E8D3A775-6550-49A4-BB1F-EF5AF72714A0', N'CAPCLRELOAS', N'endowment', N'Надежный капитал Классика 2.0'),
('A89D23DC-D1D5-4731-8001-2F5FD61D8B68', N'CAPCLCHILDOAS', N'endowment', N'Детский капитал Классика 2.0'),
('9FD55CBA-12B0-4048-ACCA-90CE12F931FF', N'CAPCLRELBOXOAS', N'endowment', N'Надежный капитал Коробка 2.0'),
('6721A67B-9C2F-45A5-B3E7-BB313CAE5B33', N'CAPCLCHILDBOXOAS', N'endowment', N'Детский капитал Коробка 2.0')

-- risks
delete from bfx_impl.risks
 where code in ('SOA36404')
insert into bfx_impl.risks
(ID, CODE, TYPE, BUSINESS_LINE, SHORT_DESCRIPTION, FULL_DESCRIPTION)
values
('564FA236-F1D8-47C9-8BD9-EFAF3A2E215A', N'SOA36404', N'life', '36404', N'Хирургическая операция в результате НС', N'Хирургические вмешательства в организм Застрахованного в результате несчастного случая')

-- risk product relation
delete from bfx_impl.risk_product_relation
 where product_code in ('CAPCLRELOAS', 'CAPCLCHILDOAS', 'CAPCLRELBOXOAS', 'CAPCLCHILDBOXOAS')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
-- Надежный капитал. Классика 2.0 (Классика)
('24C05D8F-46D0-4118-8F97-A7C48CA654C0', N'E36404', N'CAPCLRELOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('265D12D3-048C-4BE2-83C3-95C1FF4EAC85', N'DLP36404', N'CAPCLRELOAS', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('891697F6-6CFD-445C-B293-DE8475FD2D07', N'D36404', N'CAPCLRELOAS', '0', NULL, N'D36404CAPCLRELOAS', N'01', 3, 'main', 'policyHolder'),
('1938EB18-E8CC-41EF-AF84-F36353411B6B', N'DA36404', N'CAPCLRELOAS', '0', NULL, N'DA36404CAPCLRELOAS', N'01', 4, 'main', 'policyHolder'),
('3F166FE5-18F8-4DF9-85A0-F0FA60843946', N'JL36404', N'CAPCLRELOAS', '0', NULL,  N'JL36404CAPCLRELOAS', N'01', 5, 'main', 'policyHolder'),
('365224AA-B71D-4478-B9D9-8D793C71F581', N'DNS36404', N'CAPCLRELOAS', '0', NULL, N'DNS36404CAPCLRELOAS', N'01', 6, 'additional', 'insuredPerson'),
('0275C0D9-EE19-4BBD-B216-7C53CDA09D1F', N'DDTP36404', N'CAPCLRELOAS', '0', NULL, N'DDTP36404CAPCLRELOAS', N'01', 7, 'additional', 'insuredPerson'),
('4A1C4AA3-4008-4F7B-9B58-413F6D224B88', N'DVV36404', N'CAPCLRELOAS', '0', NULL, N'DVV36404CAPCLRELOAS', N'01', 8, 'additional', 'insuredPerson'),
('C160264A-57ED-4259-ACD4-CBE2BF6EB606', N'CD36404', N'CAPCLRELOAS', '0', NULL, N'CD36404CAPCLRELOAS', N'01', 9, 'additional', 'insuredPerson'),
('5C468A52-1A5A-48AF-99D3-CA6870A7D9FE', N'CD636404', N'CAPCLRELOAS', '0', NULL, N'CD636404CAPCLRELOAS', N'01', 10, 'additional', 'policyHolder'),
('AFF8084E-E6EE-40F6-8C8F-FF68F20227B9', N'HI36404', N'CAPCLRELOAS', '0', NULL, N'HI36404CAPCLRELOAS', N'01', 11, 'additional', 'insuredPerson'),
('6B7012D7-3CCB-451F-99BB-F947BBC34907', N'IH36404', N'CAPCLRELOAS', '0', NULL, N'IH36404CAPCLRELOAS', N'01', 12, 'additional', 'insuredPerson'),
-- Надежный капитал. Классика 2.0 (Коробка)
('90D3B901-A630-475D-9470-7E68C82D181E', N'E36404', N'CAPCLRELBOXOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('3DB7DDAA-0DA7-4BE6-AB47-650DF54FFF76', N'DLP36404', N'CAPCLRELBOXOAS', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('A2612199-A1DF-4E93-9DAB-05B19699B80C', N'D36404', N'CAPCLRELBOXOAS', '0', NULL, N'D36404CAPCLRELOAS', N'01', 3, 'main', 'policyHolder'),
('C9F6FC4B-18EB-45A3-B649-E829E6DEA147', N'DA36404', N'CAPCLRELBOXOAS', '0', NULL, N'DA36404CAPCLRELOAS', N'01', 4, 'main', 'policyHolder'),
('E36D53CD-9DEA-48DB-B2AB-8B7A18F70111', N'JL36404', N'CAPCLRELBOXOAS', '0', NULL,  N'JL36404CAPCLRELOAS', N'01', 5, 'main', 'policyHolder'),
-- Детский капитал. Классика 2.0 (Классика)
('DB15CB67-54BD-44EF-B5E6-A7A6C04F287C', N'E36404', N'CAPCLCHILDOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('4C6FDF54-BBC2-44A1-B886-C6F48D97CA1D', N'DLPVV36404', N'CAPCLCHILDOAS', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('6BAC5D24-1ABB-4F24-8AF3-FDD329C1C504', N'CD5C36404', N'CAPCLCHILDOAS', '0', NULL, N'CD5C36404CAPCLCHILDOAS', N'01', 3, 'main', 'insuredPerson'),
('D9B66D41-D705-4CFB-8BAB-4D1A505368AD', N'SOA36404', N'CAPCLCHILDOAS', '0', NULL, NULL, N'01', 4, 'main', 'insuredPerson'),
('5117101E-478B-4127-8234-E51C1F06F4B9', N'DLPW36404', N'CAPCLCHILDOAS', '0', NULL, NULL, N'01', 5, 'main', 'policyHolder'),
('4136B829-1BFF-4465-9F30-02E60D66503F', N'D36404', N'CAPCLCHILDOAS', '0', NULL, N'D36404CAPCLCHILDOAS', N'01', 6, 'main', 'policyHolder'),
('1637AFEA-BF58-47D1-8194-CC1EFF48F04F', N'DA36404', N'CAPCLCHILDOAS', '0', NULL, N'DA36404CAPCLCHILDOAS', N'01', 7, 'main', 'policyHolder'),
('D7FA17B4-878C-4BE0-B03B-5F7D33FB3F63', N'IH36404', N'CAPCLCHILDOAS', '0', NULL, N'IH36404CAPCLCHILDOAS', N'01', 8, 'additional', 'insuredPerson'),
('993B3112-F63D-4BEC-B1E3-1BACB65D5CF5', N'CD636404', N'CAPCLCHILDOAS', '0', NULL, N'CD636404CAPCLCHILDOAS', N'01', 9, 'additional', 'policyHolder'),
-- Детский капитал. Классика 2.0 (Коробка)
('11D09221-D6CA-48C8-B410-A956E057F293', N'E36404', N'CAPCLCHILDBOXOAS', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('9D3E772A-03E1-4B44-83FC-DB399EAEE870', N'DLPVV36404', N'CAPCLCHILDBOXOAS', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('0F20082C-E39B-4AE5-899F-33DB1561C4A8', N'CD5C36404', N'CAPCLCHILDBOXOAS', '0', NULL, N'CD5C36404CAPCLCHILDOAS', N'01', 3, 'main', 'insuredPerson'),
('D23750B0-5F94-46D6-8C9E-3F636326F3CE', N'SOA36404', N'CAPCLCHILDBOXOAS', '0', NULL, NULL, N'01', 4, 'main', 'insuredPerson'),
('640B04E9-0ED7-44AF-8A2E-52C5F02D1185', N'DLPW36404', N'CAPCLCHILDBOXOAS', '0', NULL, NULL, N'01', 5, 'main', 'policyHolder'),
('3F846BD7-48DB-43B8-A6DC-7FA96AF46F73', N'D36404', N'CAPCLCHILDBOXOAS', '0', NULL, N'D36404CAPCLCHILDOAS', N'01', 6, 'main', 'policyHolder'),
('889842B0-4D43-4DA7-A6C8-AB60974B0075', N'DA36404', N'CAPCLCHILDBOXOAS', '0', NULL, N'DA36404CAPCLCHILDOAS', N'01', 7, 'main', 'policyHolder')
