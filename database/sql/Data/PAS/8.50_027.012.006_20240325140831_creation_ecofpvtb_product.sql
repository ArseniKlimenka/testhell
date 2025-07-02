-- product
delete from bfx_impl.products
 where code in ('ECOFPVTB','ECOFVVTB')
insert into bfx_impl.products
(id, code, product_group, description, product_class, sales_segment)
values
('5FD6F28C-3F19-4EAC-9332-05A4D49EE46C', N'ECOFPVTB', N'endowment', N'Забота о семье', N'НСЖ', N'PremiumVTB'),
('2CFC41FD-887B-42B3-B72D-120FADAE80EE', N'ECOFVVTB', N'endowment', N'Забота о семье Ультра', N'НСЖ', N'VTBVIP')

-- product risks
delete from bfx_impl.risk_product_relation
 where product_code in ('ECOFPVTB','ECOFVVTB')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, RISK_PROGRAM, RISK_PERSON)
values
-- main risks
('511DDAC1-325B-45FD-AFEF-6CB79F624962', N'E36404', N'ECOFPVTB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
('863C5B0D-9B6E-4B55-A7FF-82FB624FD916', N'E36404', N'ECOFVVTB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
('8B1D94B4-6030-4053-9390-965BC9695417', N'DLPSS36404', N'ECOFPVTB', '0', NULL, NULL, N'01', 2, N'main', N'insuredPerson'),
('7DBC920D-56BA-49C8-B7F3-ABEDA8E1ABBF', N'DLPSS36404', N'ECOFVVTB', '0', NULL, NULL, N'01', 2, N'main', N'insuredPerson'),
('04C69FF9-F5DE-4009-B462-D0C1B256EC02', N'DVV36404', N'ECOFPVTB', '1', NULL, N'DVV36404ECOFPVTB', N'01', 3,N'main', N'insuredPerson'),
('F7F4FA1C-6DE9-4836-8679-D6E0915F464A', N'DVV36404', N'ECOFVVTB', '1', NULL, N'DVV36404ECOFVVTB', N'01', 3,N'main', N'insuredPerson'),
('7EEB6E3C-6314-47EB-8417-DEF46E3F0DCB', N'DAVV36404', N'ECOFPVTB', '0', N'DVV36404', N'DAVV36404ECOFPVTB', N'03', 4, N'main', N'insuredPerson'),
('C3C5F9F5-804E-4E7B-B606-FC582CBFAB46', N'DAVV36404', N'ECOFVVTB', '0', N'DVV36404', N'DAVV36404ECOFVVTB', N'03', 4, N'main', N'insuredPerson'),
-- package 1
('D28A2DD3-AB38-4DB4-A593-2F7FDA1A3809', N'DNS36404', N'ECOFPVTB', '0', NULL, N'DNS36404ECOFPVTB', N'01', 5, N'additional', N'insuredPerson'),
('41D6D9CB-36A6-4418-B336-3ECDE65DE838', N'DNS36404', N'ECOFVVTB', '0', NULL, N'DNS36404ECOFVVTB', N'01', 5, N'additional', N'insuredPerson'),
('E43C4D03-C557-4EAE-A717-4F4AA53A22E9', N'DTP36404', N'ECOFPVTB', '0', NULL, N'DTP36404ECOFPVTB', N'01', 6, N'additional', N'insuredPerson'),
('852DD9A7-C48B-4E53-991D-506DF1A33F28', N'DTP36404', N'ECOFVVTB', '0', NULL, N'DTP36404ECOFVVTB', N'01', 6, N'additional', N'insuredPerson'),

-- package 2
('23A83104-4A97-4B3E-810F-6908A76551A2', N'CTDA36404', N'ECOFPVTB', '0', NULL, N'CTDA36404ECOFPVTB', N'01', 7, N'additional', N'insuredPerson'),
('4E7A56C0-C2C8-42DE-A461-A4768C7897AA', N'CTDA36404', N'ECOFVVTB', '0', NULL, N'CTDA36404ECOFVVTB', N'01', 7, N'additional', N'insuredPerson'),
('77BD7A5B-B38F-4B6E-86D9-C6F5BB2D3966', N'DASS36404', N'ECOFPVTB', '0', NULL, N'DASS36404ECOFPVTB', N'01', 8, N'additional', N'insuredPerson'),
('5EF6250E-1BCB-4705-ADF6-D70BFA693CD0', N'DASS36404', N'ECOFVVTB', '0', NULL, N'DASS36404ECOFVVTB', N'01', 8, N'additional', N'insuredPerson'),

-- package 3
('11790206-EFEE-4CB9-868B-E48856C695AD', N'CDP36404', N'ECOFPVTB', '1', NULL, N'CDP36404ECOFPVTB', N'01', 9, N'additional', N'insuredPerson'),
('78240269-9BAF-4220-8471-F9B881308421', N'CDP36404', N'ECOFVVTB', '1', NULL, N'CDP36404ECOFVVTB', N'01', 9, N'additional', N'insuredPerson'),
('6247D0CB-7B08-47FD-80D3-0A57C1434E64', N'CDHR10800', N'ECOFPVTB', '0', N'CDP36404', N'CDHR10800ECOFPVTB', N'03', 10, N'additional', N'insuredPerson'),
('B994960C-3E8F-4E8B-89CD-77845B04AA67', N'CDHR10800', N'ECOFVVTB', '0', N'CDP36404', N'CDHR10800ECOFVVTB', N'03', 10, N'additional', N'insuredPerson'),
('3B39A94A-43CB-4754-8BA0-C1BFCA7EB005', N'CDVV36404', N'ECOFPVTB', '0', NULL, N'CDVV36404ECOFPVTB', N'01', 11, N'additional', N'insuredPerson'),
('145AD283-355F-4844-BF85-D186894958FB', N'CDVV36404', N'ECOFVVTB', '0', NULL, N'CDVV36404ECOFVVTB', N'01', 11, N'additional', N'insuredPerson')