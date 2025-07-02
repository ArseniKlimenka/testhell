delete from bfx_impl.risk_product_relation
 where id in('b4d69481-dda9-40b8-8486-1bf7a8defec1', '9cb14147-1139-459d-8565-0faa5889174c');

delete from bfx_impl.risks
 where id = 'e9862772-4d0e-4739-b06f-5f856fe46e02';

insert into bfx_impl.risks
    (id, code, type, business_line, short_description, full_description)
values
    ('e9862772-4d0e-4739-b06f-5f856fe46e02', N'IDNSSS36904', N'investmentContractWithDPF', N'36904', N'ИСЖ-Регул. премия - Смерть НС СС', N'Смерть Застрахованного в результате несчастного случая с фиксированной неизменяющейся страховой суммой');

insert into bfx_impl.risk_product_relation
    (id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code)
values
    ('b4d69481-dda9-40b8-8486-1bf7a8defec1', N'IDNSSS36904', N'ISO', '0', N'IDNSVV36904', NULL, N'03'),
    ('9cb14147-1139-459d-8565-0faa5889174c', N'IDNSSS36904', N'ISP', '0', N'IDNSVV36904', NULL, N'03');

update bfx_impl.risk_product_relation
   set is_replaceable = 1
 where id in ('b422a524-74eb-4bac-a811-f558b4bd9b41', 'a7f4cea0-d993-469c-af29-f885d00bdac1');