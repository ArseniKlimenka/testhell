--bfx_impl.products
delete from bfx_impl.products
 where code in ('DEMOEQUITY')
insert into bfx_impl.products
(id, code, product_group, description, product_class)
values
('03dc693c-4e5f-4dd2-89a1-8146518f0345', N'DEMOEQUITY', N'equity', N'Демо ДСЖ', N'ДСЖ')
--bfx_impl.products

--bfx_impl.risk_product_relation
delete from bfx_impl.risk_product_relation
 where product_code in ('DEMOEQUITY')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
('ee615a28-46a8-4f48-8e02-3098cf96e8e2', N'E36102', N'DEMOEQUITY', '0', NULL, NULL, N'01', 1, N'main', N'policyHolder')
--bfx_impl.risk_product_relation

--declarations
delete from bfx_impl.declaration_medical_questions where id = '23ced31f-500d-462f-b11c-5ae42ed4f134';
insert into bfx_impl.declaration_medical_questions values ('23ced31f-500d-462f-b11c-5ae42ed4f134', N'Текст пункта 1 декларации о состоянии здоровья и факторах риска застрахованного');
delete from bfx_impl.declaration_medical_questions where id = '84588738-b0ed-4a37-ad10-a121b9711c2b';
insert into bfx_impl.declaration_medical_questions values ('84588738-b0ed-4a37-ad10-a121b9711c2b', N'Текст пункта 2 декларации о состоянии здоровья и факторах риска застрахованного');

delete from bfx_impl.declaration_medical where id = '7236dd90-4398-43cb-a9ef-f4fd6cb01b6d';
insert into bfx_impl.declaration_medical values ('7236dd90-4398-43cb-a9ef-f4fd6cb01b6d', 'DEMOEQUITY', '1', '23ced31f-500d-462f-b11c-5ae42ed4f134', 'underwriting', '1900-01-01', '2099-01-01');
delete from bfx_impl.declaration_medical where id = '1c7ce454-a202-44e1-af5c-555d96b5e436';
insert into bfx_impl.declaration_medical values ('1c7ce454-a202-44e1-af5c-555d96b5e436', 'DEMOEQUITY', '2', '84588738-b0ed-4a37-ad10-a121b9711c2b', 'underwriting', '1900-01-01', '2099-01-01');

delete from bfx_impl.declaration_main_questions where id = 'ec402835-0b94-4eb0-8019-1b5c8bb58755';
insert into bfx_impl.declaration_main_questions values ('ec402835-0b94-4eb0-8019-1b5c8bb58755', N'Текст пункта 1 декларации страхователя и застрахованного');
delete from bfx_impl.declaration_main_questions where id = '22d8b6de-25db-4f3a-8d91-9ce9f3ae5c08';
insert into bfx_impl.declaration_main_questions values ('22d8b6de-25db-4f3a-8d91-9ce9f3ae5c08', N'Текст пункта 2 декларации страхователя и застрахованного');

delete from bfx_impl.declaration_main where id = 'ac8d591f-5797-4cae-9367-42902c505462';
insert into bfx_impl.declaration_main values ('ac8d591f-5797-4cae-9367-42902c505462', 'DEMOEQUITY', '1', 'ec402835-0b94-4eb0-8019-1b5c8bb58755', 'underwriting', '1900-01-01', '2099-01-01');
delete from bfx_impl.declaration_main where id = '02b5bdbe-0373-47e8-a9db-b2d2be0e5a45';
insert into bfx_impl.declaration_main values ('02b5bdbe-0373-47e8-a9db-b2d2be0e5a45', 'DEMOEQUITY', '2', '22d8b6de-25db-4f3a-8d91-9ce9f3ae5c08', 'underwriting', '1900-01-01', '2099-01-01');
--declarations