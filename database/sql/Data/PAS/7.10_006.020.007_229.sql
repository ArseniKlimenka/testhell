-- Продукты Защита кредита 4.0 Моя защита 5.0 Моя стабильность 2.0
delete from bfx_impl.products
where code in (N'CMS2', N'CCP4', N'CMP5')

insert into bfx_impl.products
(id, code, product_group, description)
values
('BDACD6AC-B92E-4BBF-B08D-9A2D952E285E', N'CMS2', N'credit', N'Моя стабильность 2'),
('9D0C306E-05E0-4306-AA80-232E99A67496', N'CCP4', N'credit', N'Защита кредита 4'),
('4FAA1964-6D25-4A0A-98B9-F647E6CEE36C', N'CMP5', N'credit', N'Моя защита 5')

delete from bfx_impl.risk_product_relation
where product_code in (N'CMS2', N'CCP4', N'CMP5')

delete from bfx_impl.risk_product_relation
where product_code = N'CMS2' and id = '7C4CB998-7484-4935-BE7A-FCB87D2911C8' and risk_code = N'D42204'

insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
('055B1DA6-6128-42EE-830D-BADEE658E54C', N'DLP42204', N'CMS2', '0', NULL, N'DLP42204', N'01', 1),
('8DD3133B-8DF1-4197-848A-A880F3EC769D', N'DT42204', N'CMS2', '0', NULL, N'DT42204', N'01', 2),
('3A0D1018-8B9B-43D5-83C5-E138E6CB0983', N'DLP42204', N'CCP4', '0', NULL, N'DLP42204', N'01', 1),
('06E2AA1E-FE95-42ED-A023-DCC8A8062866', N'DT42204', N'CCP4', '0', NULL, N'DT42204', N'01', 2),
('4916E64F-3CD4-4A52-BA12-7D04CE1CF044', N'DNST42204', N'CMP5', '0', NULL, N'DNST42204', N'01', 1),
('998820B8-1D05-49AB-91E0-100595200676', N'DAT42204', N'CMP5', '0', NULL, N'DAT42204', N'01', 2),
('4ECB86BD-9133-4184-B479-4451967998F3', N'HA42204', N'CMP5', '0', NULL, N'HA42204', N'01', 3),
('D18EF53A-4775-4424-9F8D-E4D26AC5E762', N'I42204', N'CMP5', '0', NULL, N'I42204', N'01', 4),
('F38B3C55-6FCA-4B21-A669-377E6E05184B', N'JL42204', N'CMP5', '0', NULL, N'JL42204', N'01', 5)