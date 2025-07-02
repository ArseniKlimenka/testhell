-- product TERM LIFE (На всякий случай Ультра)
delete from bfx_impl.products
 where code in ('TERMVVTB')
insert into bfx_impl.products
(id, code, product_group, description)
values
('7D7C3217-2741-4B09-8873-27BE9D605909', N'TERMVVTB', N'risk', N'На всякий случай Ультра')

-- risks
delete from bfx_impl.risks
 where code in ('DTP42204')
insert into bfx_impl.risks
(id, code, type, business_line, short_description, full_description)
values
('E2D88726-55C3-40B4-89A2-28EAF0605257', N'DTP42204', N'life', N'42204', N'Смерть ТП', N'Смерть Застрахованного в результате транспортного происшествия')

-- product risks
delete from bfx_impl.risk_product_relation
 where product_code in ('TERMVVTB')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
-- main risks
('1C77AAF5-127F-4AB1-8F79-3AB2919A4169', N'DLP42204', N'TERMVVTB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
('77B9B76E-761F-4DD3-AA50-6B5A16420D20', N'D42204', N'TERMVVTB', '0', NULL, NULL, N'01', 2, N'main', N'insuredPerson'),
-- package 1
('61BDDABD-13E1-41A0-A5F1-8EBB7DFEF72F', N'DNS42204', N'TERMVVTB', '0', NULL, N'DNS42204TERM', N'01', 3, N'additional', N'insuredPerson'),
('AB3216D2-C2FD-48BC-9C44-9328807F2F58', N'DTP42204', N'TERMVVTB', '0', NULL, N'DTP42204TERM', N'01', 4, N'additional', N'insuredPerson'),
('052CF807-4EE9-4789-94FA-A1549F5668D3', N'I42204', N'TERMVVTB', '0', NULL, N'I42204TERM', N'01', 5, N'additional', N'insuredPerson'),
-- package 2
('5111B63B-B3E5-45F1-82EE-FD1FB2CE23F1', N'CDHR10800', N'TERMVVTB', '1', NULL, N'CDHR10800TERM', N'01', 6, N'additional', N'insuredPerson'),
('00D1F1A3-1FA2-4C3D-9DDE-7D2CF33910D7', N'CDHW10800', N'TERMVVTB', '0', N'CDHR10800', N'CDHW10800TERM', N'03', 7, N'additional', N'insuredPerson')