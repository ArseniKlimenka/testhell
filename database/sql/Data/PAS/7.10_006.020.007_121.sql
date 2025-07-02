-- products
delete from bfx_impl.products
where code in ('IDGV2PP', 'IDGV3PP')

insert into bfx_impl.products
(id, code, product_group, description, product_class)
values
('550259B7-F2B6-4F9A-ADAE-395E6C12D25A', N'IDGV2PP', N'investment', N'Драйвер Гарантия (2 года) с периодической выплатой дохода', N'НСЖ'),
('D8BB06E4-BAFE-429A-8C21-C30C81075EE8', N'IDGV3PP', N'investment', N'Драйвер Гарантия (3 года) с периодической выплатой дохода', N'НСЖ')

-- risks
update bfx_impl.risks
set note = NULL 
where code = 'ME36404'

-- risk product relation
delete from bfx_impl.risk_product_relation
 where product_code in ('IDGV2PP', 'IDGV3PP')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
('1B6067AB-A02F-4F34-8F8A-6BA32E3EA3E5', N'E36404', N'IDGV2PP', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('49F9E04C-E23C-4280-A168-FBB69E12680F', N'ME36404', N'IDGV2PP', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('1DE21000-405E-4FFA-B17D-7A2B66F24875', N'DLPT36404', N'IDGV2PP', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson'),
('3B63554B-2A59-4E0F-BFCA-AADDBF966BC0', N'DNS36404', N'IDGV2PP', '0', NULL, NULL, N'01', 4, 'main', 'insuredPerson'),
('AF37EA59-2773-4F07-BD83-689C9B8864B1', N'E36404', N'IDGV3PP', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('297B34E0-DD52-4B58-B4FA-44B5DC0BE7C2', N'ME36404', N'IDGV3PP', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('FC1397B6-4A95-4128-BBA4-268475742E9A', N'DLPT36404', N'IDGV3PP', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson'),
('BF102EFA-C40C-4575-B784-1BAE8257C35E', N'DNS36404', N'IDGV3PP', '0', NULL, NULL, N'01', 4, 'main', 'insuredPerson')
