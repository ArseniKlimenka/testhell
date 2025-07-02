delete from bfx_impl.risks
 where code in (N'SDDA20700', N'SDI20700', N'SDD123A20700')
insert into bfx_impl.risks
(id, code, type, business_line, short_description, full_description, note, payment_form, risks_group, fns_type)
values
 (N'FC6DBB21-6831-4030-AAB2-8711C109C18C', N'SDDA20700', N'life', N'20700', N'Смерть НС', N'Смерть Застрахованного в результате несчастного случая',NULL,'InsuranceAmount',NULL,N'life'),
 (N'B4D86974-7F37-47E9-8732-94AA13A8CE18', N'SDI20700',  N'life', N'20700', N'Травма', N'Инвалидность Застрахованного с установлением I, II, III группы инвалидности в результате несчастного случая',NULL,'InsuranceAmount',NULL,N'life'),
 (N'8FEE384C-3FCD-44F2-9D66-61FB4B149503', N'SDD123A20700', N'life', N'20700', N'ИНС 1,2,3, дет', N'Нарушение структуры живых тканей и анатомической целостности органов, явившееся следствием несчастного случая, произошедшее в период действия Договора страхования и предусмотренное Таблицей страховых выплат при травмах Застрахованного в результате несчастного случая',NULL,'InsuranceAmount',NULL,N'life');


delete from bfx_impl.products   where code = 'ACCIDPC'; insert into bfx_impl.products   (id, code, product_group, description, product_class, sales_segment)   values ('5E5634A8-225D-4E60-8C7F-8F3E216A5BB0', N'ACCIDPC', N'accident', N'Защита чемпионов', N'НС', N'');			

delete from bfx_impl.risk_product_relation where product_code = 'ACCIDPC';
insert into bfx_impl.risk_product_relation (id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, RISK_PROGRAM, RISK_PERSON) values
('B671964E-DD77-43DD-AA64-B45B493B3090', N'SDDA20700', N'ACCIDPC', '0',NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
('CB99B8CF-6C3A-4F8B-B133-D5505E3438EC', N'SDD123A20700', N'ACCIDPC', '0',NULL, NULL, N'01', 2, N'main', N'insuredPerson'),
('494DB0F5-BB91-4880-A0FD-A796589A90AB', N'SDI20700', N'ACCIDPC', '0',NULL, NULL, N'01', 3, N'main', N'insuredPerson')