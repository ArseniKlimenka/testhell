-- products Драйвер гарантия ВТБ(Премиум сегмент)
delete from bfx_impl.products
where code in ('IDGP2VTB', 'IDGP3VTB', 'IDGP5VTB','IDGP2PPVTB', 'IDGP3PPVTB', 'IDGP5PPVTB')

insert into bfx_impl.products
(id, code, product_group, description, product_class)
values
('92C91C88-E296-4339-87CB-258FC1EC444F', N'IDGP2VTB', N'investment', N'Драйвер Гарантия (2 года)', N'ИСЖ'),
('00D3E653-6A5B-4FEA-8AC7-3F1C38675518', N'IDGP3VTB', N'investment', N'Драйвер Гарантия (3 года)', N'ИСЖ'),
('AD32CF68-A2D0-4784-A810-6466A40FC84D', N'IDGP5VTB', N'investment', N'Драйвер Гарантия (5 лет)', N'ИСЖ'),
('4164BD17-6244-4AD2-B326-693BB1247A01', N'IDGP2PPVTB', N'investment', N'Драйвер Гарантия (2 года) с периодической выплатой дохода', N'ИСЖ'),
('71132256-48DD-4D11-9E7D-8FF49AF725E6', N'IDGP3PPVTB', N'investment', N'Драйвер Гарантия (3 года) с периодической выплатой дохода', N'ИСЖ'),
('3E4CCCB8-688B-4C56-8F87-F4E8C5D1AFE4', N'IDGP5PPVTB', N'investment', N'Драйвер Гарантия (5 лет) с периодической выплатой дохода', N'ИСЖ')


-- risk product relation
delete from bfx_impl.risk_product_relation
 where product_code in ('IDGP2VTB', 'IDGP3VTB', 'IDGP5VTB','IDGP2PPVTB', 'IDGP3PPVTB', 'IDGP5PPVTB')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
('4CC0DB26-BE9C-49A8-BD20-04A5BC155E85', N'E36404', N'IDGP2PPVTB', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('3BD7A6E5-2EE1-47BF-A5CC-06CC48747316', N'ME36404', N'IDGP2PPVTB', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('139E518A-DC97-4314-954E-478A360563CD', N'DLP36404', N'IDGP2PPVTB', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson'),
('BC45E07E-2BF9-4951-9464-496968B12806', N'DNS36404', N'IDGP2PPVTB', '0', NULL, NULL, N'01', 4, 'main', 'insuredPerson'),
('14C116CC-7C67-4D83-A748-7285BEF2F5FD', N'E36404', N'IDGP3PPVTB', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('A0132755-D435-454D-BC2F-B80A82AAD35A', N'ME36404', N'IDGP3PPVTB', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('7647277F-98A9-42F8-8195-1215C9C84807', N'DLP36404', N'IDGP3PPVTB', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson'),
('4CC14E72-DFFD-44E2-B74B-4E6F018D3C41', N'DNS36404', N'IDGP3PPVTB', '0', NULL, NULL, N'01', 4, 'main', 'insuredPerson'),
('E4FDB6E2-4E08-46F7-9D91-57C2D999B112', N'E36404', N'IDGP5PPVTB', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('B1DF68C6-1E2E-4D7B-A9D2-67A0FA921D86', N'ME36404', N'IDGP5PPVTB', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('93D8C09E-7DC2-4F26-AF15-69F194480BA3', N'DLP36404', N'IDGP5PPVTB', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson'),
('8E7DC020-1321-4A84-A1A5-6E5828CDDA32', N'DNS36404', N'IDGP5PPVTB', '0', NULL, NULL, N'01', 4, 'main', 'insuredPerson'),
('84F65DC9-8CB1-4B28-8871-1089F56ACC03', N'E36404', N'IDGP2VTB', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('A097BD61-3BA2-454A-9660-2DC16AF0ECBF', N'DLPT36404', N'IDGP2VTB', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('F0D512AD-D2DF-4B36-B1AD-2ECC6EDDF299', N'DNS36404', N'IDGP2VTB', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson'),
('015FE0D9-7E1A-4F3C-A1E6-47E5F71C1B8A', N'E36404', N'IDGP3VTB', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('D6029ACB-1D64-4F48-A5B9-629B4D4A3EAC', N'DLPT36404', N'IDGP3VTB', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('7D35A448-4B74-4450-BBFD-A6F0658F555B', N'DNS36404', N'IDGP3VTB', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson'),
('B11D1CA4-1B2F-4B8C-8CCA-36422C7F36B5', N'E36404', N'IDGP5VTB', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('14986766-A901-4474-82B2-71B43843F7B5', N'DLPT36404', N'IDGP5VTB', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('5EC4436D-C843-4740-8046-D1918156C4A5', N'DNS36404', N'IDGP5VTB', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson')