-- products
delete from bfx_impl.products
where code in ('MOPROZVBFKO','MOPROCHEKVBFKO')

insert into bfx_impl.products
(id, code, product_group, description)
values
('09173D2F-D2CA-4433-A903-4AD5F4583988', N'MOPROZVBFKO', N'med', N'PRO ЗДОРОВЬЕ - Генетическое тестирование'),
('68C128AF-6A2F-412B-A970-F39A9956A6A4', N'MOPROCHEKVBFKO', N'med', N'PRO ЧЕК-АП - Комплексное медицинское исследование')

-- risk product relation
delete from bfx_impl.risk_product_relation
 where product_code in ('MOPROZVBFKO','MOPROCHEKVBFKO')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
-- Медицинское обследование PRO ЗДОРОВЬЕ - Генетическое тестирование
('B2D0728D-9921-4565-8118-B425BF54F450', N'CU10800', N'MOPROZVBFKO', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),

-- Медицинское обследовани - PRO ЧЕК-АП - Комплексное медицинское исследование
('876DAAD5-2005-4F96-862B-A30C5E92BF91', N'CU10800', N'MOPROCHEKVBFKO', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson')