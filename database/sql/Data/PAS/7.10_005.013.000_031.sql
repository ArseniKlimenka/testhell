delete from bfx_impl.risks
 where code in (select risk_code
                  from bfx_impl.risk_product_relation
                 where product_code in (select code
                                          from bfx_impl.products
                                         where product_group = 'credit'))

delete from bfx_impl.risk_product_relation
 where product_code in (select code
                          from bfx_impl.products
                         where product_group = 'credit')

delete from bfx_impl.products
 where product_group = 'credit'

insert into bfx_impl.products values
('3643063d-0fd1-468e-8fe7-f4f3343c32d8', 'CCP', 'credit', N'Защита кредита'),
('52a016e6-68f1-4f9f-8a77-54ad550808e8', 'CMS', 'credit', N'Моя стабильность'),
('436ed528-47b1-4d02-a5c1-e086cd6ef23d', 'CSB', 'credit', N'РГСЖ bundle ЗП')

insert into bfx_impl.risks
(id, code, type, business_line, short_description, full_description) values
('c873f85c-0fcd-473a-bc83-d8e8e32933ea', N'DLP42204', N'life', N'42204', N'Смерть ЛП', N'Смерть Застрахованного лица по любой причине'),
('4de32b87-2d91-4b4c-8900-83e11837097b', N'D42204', N'life', N'42204', N'Инвалидность ЛП', N'Инвалидность Застрахованного лица I, II группы по любой причине') 

insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code) values
('e16f7dec-20a4-4855-a12a-a3e109128aee', N'DLP42204', N'CCP', '0', NULL, NULL, N'02'),
('87e66987-ddbf-4c46-9d60-545242a480f8', N'DLP42204', N'CMS', '0', NULL, NULL, N'02'),
('2a151a26-ab95-4aee-b638-39196c3f38d8', N'DLP42204', N'CSB', '0', NULL, NULL, N'02'),
('fdd0895d-a322-40b8-966a-9d57bcce8f32', N'D42204', N'CCP', '0', NULL, NULL, N'02'),
('e93651d0-c99c-4908-8387-9379c6e618cb', N'D42204', N'CMS', '0', NULL, NULL, N'02'),
('213c8998-965c-407e-98b7-4b229a47db2c', N'D42204', N'CSB', '0', NULL, NULL, N'02')