--- worthy century (Достойный век 2.0)
delete from bfx_impl.risks
 where code in ('DLP46204','DLPVV46204','DDTP46204', 'DLP46204M','I46204')
insert into bfx_impl.risks
(ID, CODE, TYPE, BUSINESS_LINE, SHORT_DESCRIPTION, FULL_DESCRIPTION)
values
('A51E6C62-92D8-40C0-ABEF-88797472CB3A', N'DLP46204', N'life', '46204', N'Смерть ЛП', N'Смерть Застрахованного по любой причине'),
('FE53DFF4-E437-4C95-8D33-4BF38B4A3B83', N'DLPVV46204', N'life', '46204', N'Смерть ЛП ВВ', N'Смерть Застрахованного по любой причине'),
('AD99DC11-52D3-4B7C-9620-BCB7292A50F4', N'DDTP46204', N'life', '46204', N'Смерть ДТП', N'Смерть Застрахованного в результате дорожно-транспортного происшествия'),
('27DE7EFD-E6DC-475D-99B1-D6ADCC830AA4', N'DLP46204M', N'life', '46204', N'Смерть ЛП смеш', N'Смерть ЛП (в результате НСиБ) с разными способами определения СС в период действия договора'),
('41A9470A-B27D-40D7-B3A3-1EEF0D515399', N'I46204', N'life', '46204', N'Травма', N'Травма Застрахованного в результате несчастного случая')

-- risk product relation
delete from bfx_impl.risk_product_relation
 where product_code in ('WCENOAS')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
('16B3427E-0FED-4D8D-8323-2B7A483F2E77', N'DLP46204', N'WCENOAS', '0', NULL, N'DLP46204WCENOAS', N'01', 1, 'main', 'insuredPerson'),
('F2384A84-0D1F-44D5-9CDB-0CD50730CA6E', N'DLPVV46204', N'WCENOAS', '0', NULL, N'DLPVV46204WCENOAS', N'01', 2, 'main', 'insuredPerson'),
('54119B9D-3F43-4D26-B5F2-58AF78ACAAD7', N'DDTP46204', N'WCENOAS', '0', NULL, N'DDTP46204WCENOAS', N'01', 3, 'main', 'insuredPerson'),
('A46249AB-4567-44B0-9711-81A755A14428', N'DLP46204M', N'WCENOAS', '0', NULL, N'DLP46204MWCENOAS', N'01', 4, 'main', 'insuredPerson'),
('00D476B5-237E-4536-9B22-6E076038495E', N'I46204', N'WCENOAS', '0', NULL, N'I46204WCENOAS', N'01', 5, 'additional', 'insuredPerson')
