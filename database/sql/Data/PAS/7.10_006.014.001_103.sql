-- bfx_impl.products
delete from bfx_impl.products
 where code in ('IBG')
insert into bfx_impl.products
(id, code, product_group, description)
values
('7e570e43-7445-4dc7-a3e7-4899569edede', N'IBG', N'investment', N'Базис Гарант')

-- bfx_impl.risk_product_relation
delete from bfx_impl.risk_product_relation
 where product_code in ('IBG')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code)
values
('b2099efd-406a-4316-be42-ce2ddf81a413', N'E36404', N'IBG', '0', NULL, NULL, N'01'),
('91112ae5-712e-4556-82bd-ac3bec8ffa50', N'DLP36404', N'IBG', '1', NULL, NULL, N'01'),
('32446cf5-c33d-464d-a5b3-985380904d25', N'DLPDP36404', N'IBG', '0', 'DLP36404', NULL, N'03')

-- risks
delete from bfx_impl.risks
 where code in ('DLP36404', 'DLPDP36404')
insert into bfx_impl.risks
(id, code, type, business_line, short_description, full_description)
values
('16d3a4b7-fbe4-499b-9bac-734a8a38afb7', N'DLP36404', N'life', N'36404', N'Смерть ЛП', N'Смерть Застрахованного по любой причине'),
('fa453ed5-a609-4367-9975-74bf0ad499c2', N'DLPDP36404', N'life', N'36404', N'Смерть ЛП отлож выплата', N'Смерть Застрахованного по любой причине с отложенной страховой выплатой')