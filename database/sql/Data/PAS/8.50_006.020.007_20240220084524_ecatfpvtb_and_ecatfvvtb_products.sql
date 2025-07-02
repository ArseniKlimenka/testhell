-- risk
delete from bfx_impl.risks
 where code = N'DLPDPE36404'
insert into bfx_impl.risks
(id, code, type, business_line, short_description, full_description, note, payment_form, risks_group, fns_type)
values
('1e268d02-72c0-459c-845d-a1b9b64912dd', N'DLPDPE36404', N'life', N'36404', N'Смерть ЛП ОтлВ', N'Смерть ЛП с отложенной выплатой НСЖ', NULL, N'InsuranceAmount', N'Death', N'life')

-- products
delete from bfx_impl.products
 where code in ('ECATFPVTB', 'ECATFVVTB')
insert into bfx_impl.products
(id, code, product_group, description, product_class)
values
('f041a760-f2e6-4d85-97eb-ec3a623d5a2c', N'ECATFPVTB', N'endowment', N'Забота о будущем', N'НСЖ'),
('59281c0d-dad0-470b-8882-ea9c157c8891', N'ECATFVVTB', N'endowment', N'Забота о будущем Ультра', N'НСЖ')

-- products risks
delete from bfx_impl.risk_product_relation
 where product_code in ('ECATFPVTB', 'ECATFVVTB')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
('d4bfdd4a-a408-43fc-8564-3f29e2966d52', N'E36404', N'ECATFPVTB', '0', null, null, N'01', 1, N'main', N'insuredPerson'),
('77408a6a-4f74-4f31-b083-0298ad7987b3', N'DLPVV36404', N'ECATFPVTB', '0', null, null, N'01', 2, N'main', N'insuredPerson'),
('24133660-3c55-42cc-8257-dd5f647b80cc', N'D36404', N'ECATFPVTB', '0', null, N'D36404ECATFPVTB', N'01', 3, N'main', N'policyHolder'),
('11010eaa-b15c-40eb-9b54-57340c894f98', N'DA36404', N'ECATFPVTB', '0', null, N'DA36404ECATFPVTB', N'01', 4, N'main', N'policyHolder'),
('fb71200a-5478-410d-931e-1db3fbd2fc25', N'DLPDPE36404', N'ECATFPVTB', '0', null, null, N'01', 5, N'main', N'insuredPerson'),
('481a6875-be54-42d0-a095-1bf6dab7746b', N'E36404', N'ECATFVVTB', '0', null, null, N'01', 1, N'main', N'insuredPerson'),
('7f2f14ca-9f60-4ce3-9e06-f1203b34f7e9', N'DLPVV36404', N'ECATFVVTB', '0', null, null, N'01', 2, N'main', N'insuredPerson'),
('3b56f31d-bda2-4712-849c-98b268b5afd9', N'D36404', N'ECATFVVTB', '0', null, N'D36404ECATFVVTB', N'01', 3, N'main', N'policyHolder'),
('cb79dd6f-9aee-403a-864b-86f491d75b91', N'DA36404', N'ECATFVVTB', '0', null, N'DA36404ECATFVVTB', N'01', 4, N'main', N'policyHolder'),
('80270109-00c8-4c15-91a4-7b246d86d4d4', N'DLPDPE36404', N'ECATFVVTB', '0', null, null, N'01', 5, N'main', N'insuredPerson')