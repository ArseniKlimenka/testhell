delete from bfx_impl.products
 where code in ('CSB', 'CDMS');

delete from bfx_impl.risk_product_relation
 where product_code = 'CSB';

insert into bfx_impl.products
(id, code, product_group, description)
values
('22cbea75-6b3f-4abc-b33c-97105bbf503e', N'CDMS', N'credit', N'ДМС');

update bfx_impl.risks
   set short_description = N'Инвалидность',
       full_description = N'Инвалидность Застрахованного лица I, II группы по любой причине'
 where id = '4de32b87-2d91-4b4c-8900-83e11837097b';

update bfx_impl.risks
   set short_description = N'Смерть',
       full_description = N'Смерть Застрахованного лица по любой причине'
 where id = 'c873f85c-0fcd-473a-bc83-d8e8e32933ea';

delete from bfx_impl.risks
 where id = '3b4ff906-dcc4-47ba-be59-8c06cd2eba98';

insert into bfx_impl.risks
    (id, code, type, business_line, short_description, full_description)
values
    ('3b4ff906-dcc4-47ba-be59-8c06cd2eba98', N'CD42204', N'life', N'42204', N'КЗ', N'Первичное диагностирование у Застрахованного лица онкологического заболевания, инфаркта, инсульта');

delete from bfx_impl.risks
 where id = '9fe6ee70-c10b-4678-9e41-d5483bdd1429';

insert into bfx_impl.risks
    (id, code, type, business_line, short_description, full_description)
values
    ('9fe6ee70-c10b-4678-9e41-d5483bdd1429', N'JL42204', N'life', N'42204', N'Потеря работы', N'Дожитие до потери работы');

delete from bfx_impl.risks
 where id = 'd286550a-2ea5-409a-8bed-fbb24d8c8336';

insert into bfx_impl.risks
    (id, code, type, business_line, short_description, full_description)
values
    ('d286550a-2ea5-409a-8bed-fbb24d8c8336', N'I42204', N'life', N'42204', N'Травмы', N'Телесные повреждения Застрахованного в результате несчастного случая');

delete from bfx_impl.risk_product_relation
 where id in
(
'5e05ce46-f056-4fb1-b849-08175d61b596',
'920e908d-7015-44f6-bd73-4ffb57f74c0a',
'606005a8-8e32-4018-bfc9-7b0a6f48b732',
'a9e0d673-be40-4057-9bdf-b69c381fc5a4',
'7cc6a794-5ba8-45f5-900c-4804c4155304',
'a6a400aa-4e88-4998-adf0-4c8f8a48a49c'
)

insert into bfx_impl.risk_product_relation
    (id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code)
values
    ('5e05ce46-f056-4fb1-b849-08175d61b596', N'CD42204', N'CCP', '0', NULL, NULL, N'02'),
    ('920e908d-7015-44f6-bd73-4ffb57f74c0a', N'JL42204', N'CCP', '0', NULL, NULL, N'02'),
    ('606005a8-8e32-4018-bfc9-7b0a6f48b732', N'I42204', N'CCP', '0', NULL, NULL, N'02'),
    ('a9e0d673-be40-4057-9bdf-b69c381fc5a4', N'CD42204', N'CMS', '0', NULL, NULL, N'02'),
    ('7cc6a794-5ba8-45f5-900c-4804c4155304', N'JL42204', N'CMS', '0', NULL, NULL, N'02'),
    ('a6a400aa-4e88-4998-adf0-4c8f8a48a49c', N'I42204', N'CMS', '0', NULL, NULL, N'02');

delete from bfx_impl.risks
 where id = '803f7911-eae5-46ba-9bbf-e200e7159e90';

insert into bfx_impl.risks
    (id, code, type, business_line, short_description, full_description)
values
    ('803f7911-eae5-46ba-9bbf-e200e7159e90', N'DMS110800', N'nonLife', N'10800', N'ДМС1', N'Страховым случаем является обращение Застрахованного в медицинскую и/или иную организацию для организации и оказания ему медицинских и/или иных услуг, в связи с впервые установленным и диагностированным в период страхования злокачественным новообразованием или в отношении заболеваний, потребовавших проведения кардио или нейрохирургического оперативного вмешательства. Медицинские и/или иные услуги оказываются Застрахованному лицу в медицинских и/или иных организациях по выбору Страховщика, находящихся на территории РФ, а также за пределами РФ');

delete from bfx_impl.risks
 where id = '1b5af3c9-21e4-4cd1-8f30-c116e1fd74d6';

insert into bfx_impl.risks
    (id, code, type, business_line, short_description, full_description)
values
    ('1b5af3c9-21e4-4cd1-8f30-c116e1fd74d6', N'DMS210800', N'nonLife', N'10800', N'ДМС2', N'Страховым случаем является обращение Застрахованного в медицинскую и/или иную организацию для организации и оказания ему медицинских и/или иных услуг, в связи с впервые установленным и диагностированным в период страхования злокачественным новообразованием Медицинские и/или иные услуги оказываются Застрахованному лицу в медицинских и/или иных организациях по выбору Страховщика, находящихся на территории РФ');

delete from bfx_impl.risk_product_relation
 where id in
(
'361f513b-3c60-4f26-982f-199e963fb733',
'e7c4b5bd-ea39-4681-99a1-e3622ec81126'
)

insert into bfx_impl.risk_product_relation
    (id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code)
values
    ('361f513b-3c60-4f26-982f-199e963fb733', N'DMS110800', N'CDMS', '0', NULL, NULL, N'02'),
    ('e7c4b5bd-ea39-4681-99a1-e3622ec81126', N'DMS210800', N'CDMS', '0', NULL, NULL, N'02');