delete from bfx_impl.products
where code in
(
	N'MIXED192559',
    N'NSIBPOOLS192559'
)

insert into bfx_impl.products
(id, code, product_group, description, product_class)
values
('F6EC4A8B-C1D7-40F3-A671-53837ABD1304', N'MIXED192559', N'endowment', N'НСЖ. Смешанное страхование жизни', N'ДМС'),
('5A3E4D2D-B332-41ED-9DD2-00B4A116326E', N'NSIBPOOLS192559', N'accidentOrIllness', N'Коллективное страхование физических лиц от НСиБ (пулы)', N'НСиБ')

delete from bfx_impl.risk_product_relation
where product_code in
(
	N'MIXED192559',
    N'NSIBPOOLS192559'
)

insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
(N'CF2ED707-240E-4665-B263-48E98039F01C', N'E36102', N'MIXED192559', N'0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'2DF8A85D-DA94-4401-921D-FDF718349EA0', N'DLP36102', N'MIXED192559', N'0', NULL, NULL, N'01', 2, N'main', N'insuredPerson'),

(N'76CE755C-4218-4911-869D-959641D016A2', N'DA20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'CD8CF39E-C63B-4E71-932B-D7C0822CCEB6', N'DIL20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 2, N'main', N'insuredPerson'),
(N'3700C39D-7847-437C-A872-68695D7C0F32', N'I20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 3, N'main', N'insuredPerson'),
(N'F2CC2AB9-7CD6-427A-BDA9-46F9D49693DF', N'TDA20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 4, N'main', N'insuredPerson'),
(N'A50F84C7-FD69-4F1D-B284-7D81D1931B6A', N'TDI20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 5, N'main', N'insuredPerson'),
(N'66270077-31BB-4C16-8375-ADDD639A6FA8', N'DC1A20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 6, N'main', N'insuredPerson'),
(N'1659C5CC-95A2-4F62-BEB0-D5652B8ED55C', N'DC12A20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 7, N'main', N'insuredPerson'),
(N'9A1C40D9-08DC-4F66-A432-366511453416', N'DC123A20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 8, N'main', N'insuredPerson'),
(N'E1AB8C01-CAAC-4F05-97CB-905369BBDAEC', N'DC1I20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 9, N'main', N'insuredPerson'),
(N'ECFAE0CF-957F-46B6-826C-4207BF2A4615', N'DC12I20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 10, N'main', N'insuredPerson'),
(N'FF4D3575-5073-42E1-B255-414FB3E2C519', N'DC123I20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 11, N'main', N'insuredPerson'),
(N'27D28CC3-5879-4145-B719-FF6DE7FA6D28', N'HA20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 12, N'main', N'insuredPerson'),
(N'FCC9FBF0-8EAB-4A45-BCE6-BFAB512C85A8', N'HI20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 13, N'main', N'insuredPerson'),
(N'C1D0FC46-A4F7-4C69-B763-D2A45087ABC7', N'SOA20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 14, N'main', N'insuredPerson'),
(N'DBC93278-B568-4753-BBB2-2D045E5DFAF6', N'SOI20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 15, N'main', N'insuredPerson'),
(N'B666F0D8-0842-499F-88F0-8D13262E317B', N'CD620700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 16, N'main', N'insuredPerson'),
(N'E1FC4080-C130-4B8D-AB21-C82201D0B370', N'CD1120700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 17, N'main', N'insuredPerson'),
(N'4F25BFF6-D74C-4A31-AFD7-5A4A0A4BBF06', N'CD1520700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 18, N'main', N'insuredPerson'),
(N'F6B7299F-69F4-464A-B909-FA0D51EC402A', N'CD2220700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 19, N'main', N'insuredPerson'),
(N'3B1DB2A5-0597-46CE-AB42-B1DFF95CA928', N'CD3320700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 20, N'main', N'insuredPerson'),
(N'CBBD11EF-6586-49D6-A27D-4272C882C13B', N'CD4720700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 21, N'main', N'insuredPerson'),
(N'1EEAF1D9-A4CE-4F95-8853-937AA6B26417', N'HIA20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 22, N'main', N'insuredPerson'),
(N'7188E4B1-1534-4012-996F-404191F39904', N'PDAT20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 23, N'main', N'insuredPerson'),
(N'66DC4F98-2CC2-49D1-B2A8-A7F315177B52', N'PDATD20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 24, N'main', N'insuredPerson'),
(N'78395BB9-EBD1-4BCB-B1A2-BFFB73417A51', N'PDIT20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 25, N'main', N'insuredPerson'),
(N'89BA4AA1-6068-4492-9928-C9BDC908D0B1', N'PDITD20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 26, N'main', N'insuredPerson'),
(N'5EA385DE-7ACA-4115-93E3-6833514E4276', N'PPDA20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 27, N'main', N'insuredPerson'),
(N'2976A2C0-CADB-48C4-B81E-CE8EE515F32B', N'PPDAI20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 28, N'main', N'insuredPerson'),
(N'27196CF2-F792-438F-B123-5807EA8C27D9', N'F20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 29, N'main', N'insuredPerson'),
(N'5A006C27-C636-4801-9B38-A1C86E192D7B', N'B20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 30, N'main', N'insuredPerson'),
(N'41221B6C-22C6-4D61-8E92-0011BBFB8928', N'DDTPA20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 31, N'main', N'insuredPerson'),
(N'A85C58D7-13AD-412D-8432-EB0094CFF0EA', N'DDTP20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 32, N'main', N'insuredPerson'),
(N'E2301FDA-990F-439E-926E-542D6700F8D1', N'DCDTP20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 33, N'main', N'insuredPerson'),
(N'22B91B60-75B5-4919-A1B7-590B6904C670', N'IA20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 34, N'main', N'insuredPerson'),
(N'2149C18C-0F42-40C6-935D-74C2C00A9CAA', N'CD4A20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 35, N'main', N'insuredPerson'),
(N'1A4E073E-B6E1-4893-9032-BA1D4547F50E', N'CD7A20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 36, N'main', N'insuredPerson'),
(N'5D3CF642-EB92-480F-8F0C-6033E1269C48', N'CD11A20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 37, N'main', N'insuredPerson'),
(N'B9583105-9F1F-4FDF-808E-367EEB9D4900', N'CD18A20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 38, N'main', N'insuredPerson'),
(N'8ABF472D-3B99-4ABC-97A7-38C3F32A8C12', N'CD27A20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 39, N'main', N'insuredPerson'),
(N'02D2547F-DC37-48E9-BAB9-88D7A1837814', N'CD38A20700', N'NSIBPOOLS192559', N'0', NULL, NULL, N'01', 40, N'main', N'insuredPerson')
