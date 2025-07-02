-- product
delete from bfx_impl.products
 where code in ('IOCVVTB', 'IOCPVTB')
insert into bfx_impl.products
(id, code, product_group, description, product_class, sales_segment)
values
('14C95B04-7CAE-4B9B-B282-17D13E05E17D', N'IOCVVTB', N'investment', N'Оптимальный выбор Ультра',N'ИСЖ',N'VIPVTB'),
('8998CC6E-3E51-41B9-9DCB-80BECF1E4B3C', N'IOCPVTB', N'investment', N'Оптимальный выбор',N'ИСЖ', N'PremiumVTB')

-- product risks
delete from bfx_impl.risk_product_relation
 where product_code in ('IOCVVTB', 'IOCPVTB')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
('F74A4256-F0F9-41F7-8699-3DD659700BDD', N'E36914', N'IOCVVTB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
('683C756B-7F90-4B85-8569-2090EDA532A0', N'DLP36914', N'IOCVVTB', '0', NULL, NULL, N'01', 2, N'main', N'insuredPerson'),
('3A2C208B-4940-4736-ADD2-B114E39E2F3D', N'DNS36414', N'IOCVVTB', '0', NULL, NULL, N'01', 3, N'main', N'insuredPerson'),
('64981F69-71E6-4A8E-AB72-153B13AA6BC8', N'E36914', N'IOCPVTB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
('BFB92935-F1B1-47FF-B115-DC969015F2DF', N'DLP36914', N'IOCPVTB', '0', NULL, NULL, N'01', 2, N'main', N'insuredPerson'),
('F978E015-388A-45F1-A560-FF0EA110791F', N'DNS36414', N'IOCPVTB', '0', NULL, NULL, N'01', 3, N'main', N'insuredPerson')
