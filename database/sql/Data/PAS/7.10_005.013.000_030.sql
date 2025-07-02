delete from bfx_impl.risk_product_relation
 where id in ('e16f7dec-20a4-4855-a12a-a3e109128aee', '87e66987-ddbf-4c46-9d60-545242a480f8', '2a151a26-ab95-4aee-b638-39196c3f38d8')
delete from bfx_impl.risks
 where id in ('c873f85c-0fcd-473a-bc83-d8e8e32933ea')
delete from bfx_impl.products
 where id in ('2ac71174-b4da-401a-9b4e-d44f95e537a8', '3643063d-0fd1-468e-8fe7-f4f3343c32d8', '52a016e6-68f1-4f9f-8a77-54ad550808e8', '436ed528-47b1-4d02-a5c1-e086cd6ef23d')

insert into bfx_impl.products values
('3643063d-0fd1-468e-8fe7-f4f3343c32d8', 'CCP', 'credit', N'Защита кредита'),
('52a016e6-68f1-4f9f-8a77-54ad550808e8', 'CMS', 'credit', N'Моя стабильность'),
('436ed528-47b1-4d02-a5c1-e086cd6ef23d', 'CSB', 'credit', N'РГСЖ bundle ЗП')

insert into bfx_impl.risks
(id, code, type, business_line, short_description, full_description) values
('c873f85c-0fcd-473a-bc83-d8e8e32933ea', N'DLP42204', N'life', N'42204', N'Смерть ЛП', N'Смерть Застрахованного лица по любой причине') 

insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code) values
('e16f7dec-20a4-4855-a12a-a3e109128aee', N'DLP42204', N'CCP', '0', NULL, NULL, N'02'),
('87e66987-ddbf-4c46-9d60-545242a480f8', N'DLP42204', N'CMS', '0', NULL, NULL, N'02'),
('2a151a26-ab95-4aee-b638-39196c3f38d8', N'DLP42204', N'CSB', '0', NULL, NULL, N'02')