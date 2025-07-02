-- Корректировка рисков Смерть ЛП для 'IDGV2PPVTB', 'IDGV3PPVTB', 'IDGV5PPVTB' на DLP36404
-- risk product relation
delete from bfx_impl.risk_product_relation
 where product_code in ('IDGV2PPVTB', 'IDGV3PPVTB', 'IDGV5PPVTB')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
('BA50BBCD-6D13-4A60-967D-31353CADC2D1', N'E36404', N'IDGV2PPVTB', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('C4AB6440-5D0C-4C92-B12F-69709C279BB6', N'ME36404', N'IDGV2PPVTB', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('E8742F62-3DA1-4FFD-8545-82FF38213012', N'DLP36404', N'IDGV2PPVTB', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson'),
('A640B557-4B1E-43E8-A82E-ACE5F19E47DB', N'DNS36404', N'IDGV2PPVTB', '0', NULL, NULL, N'01', 4, 'main', 'insuredPerson'),
('10487FCD-83D4-4109-8639-D0B10BBE23A7', N'E36404', N'IDGV3PPVTB', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('D18E95D0-3674-4B7A-9739-DCEBD9084478', N'ME36404', N'IDGV3PPVTB', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('84617094-F75F-46CC-B86E-EC5C54596F4E', N'DLP36404', N'IDGV3PPVTB', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson'),
('2F618DD2-1EEE-4BC8-94E1-0811D1868FB2', N'DNS36404', N'IDGV3PPVTB', '0', NULL, NULL, N'01', 4, 'main', 'insuredPerson'),
('6108C739-EB0C-4250-B94C-70F50D46DD05', N'E36404', N'IDGV5PPVTB', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('237123A7-C05D-479B-9800-85BF3DFFE6A5', N'ME36404', N'IDGV5PPVTB', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('89FE89FE-0F6E-42E9-B753-9A67A0E87C0B', N'DLP36404', N'IDGV5PPVTB', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson'),
('EBD20BDF-C0DE-4F86-A477-B841090CFEEE', N'DNS36404', N'IDGV5PPVTB', '0', NULL, NULL, N'01', 4, 'main', 'insuredPerson')
