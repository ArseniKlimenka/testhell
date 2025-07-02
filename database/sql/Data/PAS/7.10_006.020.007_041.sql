-- risks
delete from bfx_impl.risks
 where code in ('DSS36404')
insert into bfx_impl.risks
(ID, CODE, TYPE, BUSINESS_LINE, SHORT_DESCRIPTION, FULL_DESCRIPTION)
values
('DF6D9883-DADB-462B-AF95-AA62ABFDA3B1', N'DSS36404', N'life', '36404', N'ИЛП 1,2', N'Инвалидность Застрахованного с установлением I, II группы инвалидности по любой причине')


-- risk product relation
delete from bfx_impl.risk_product_relation
 where id = '4A1C4AA3-4008-4F7B-9B58-413F6D224B88'


insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
-- Надежный капитал. Классика 2.0
('4A1C4AA3-4008-4F7B-9B58-413F6D224B88', N'DSS36404', N'CAPCLRELOAS', '0', NULL, N'DSS36404CAPCLRELOAS', N'01', 8, 'additional', 'insuredPerson')




-- risks
delete from bfx_impl.risks
 where code in ('DASI36404', 'ISI36404', 'DASI20700', 'ISI20700')
insert into bfx_impl.risks
(ID, CODE, TYPE, BUSINESS_LINE, SHORT_DESCRIPTION, FULL_DESCRIPTION)
values
('50b8d7fe-4238-48af-bbf2-5dca613da385', N'DASI20700', N'nonLife', '20700', N'ИНС 1,2+дет неск ЗЛ', N'Инвалидность Застрахованного с установлением категории «ребенок-инвалид» или I, II группы инвалидности в результате несчастного случая'),
('2575865b-a7d7-490e-a5d3-de508b4d6886', N'ISI20700', N'nonLife', '20700', N'Травма неск ЗЛ', N'Травма Застрахованного в результате несчастного случая')


-- risk product relation
delete from bfx_impl.risk_product_relation
 where id in ('655a20a1-2640-48c4-910b-f5acbf1c4518', '9dcbe614-4fcb-49d2-8737-c08f6abec1c7')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
-- Стратегия на пять. Забота о семье
('655a20a1-2640-48c4-910b-f5acbf1c4518', N'DASI20700', N'EBMPFBFKO', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson'),
('9dcbe614-4fcb-49d2-8737-c08f6abec1c7', N'ISI20700', N'EBMPFBFKO', '0', NULL, NULL, N'01', 4, 'main', 'insuredPerson')



update bfx_impl.products
   set description = N'Надежный капитал. Классика 2.0'
 where code = N'CAPCLRELOAS'
 
update bfx_impl.products
   set description = N'Надежный капитал. Классика 2.0 (коробка)'
 where code = N'CAPCLRELBOXOAS'
 
update bfx_impl.products
   set description = N'Детский капитал. Классика 2.0'
 where code = N'CAPCLCHILDOAS'
 
update bfx_impl.products
   set description = N'Детский капитал. Классика 2.0 (коробка)'
 where code = N'CAPCLCHILDBOXOAS'
 
update bfx_impl.products
   set description = N'Стратегия на пять. Забота о себе'
 where code = N'EBMPYBFKO'
 
update bfx_impl.products
   set description = N'Стратегия на пять. Забота о семье'
 where code = N'EBMPFBFKO' 