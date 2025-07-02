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
('b2099efd-406a-4316-be42-ce2ddf81a413', N'E36904', N'IBG', '0', NULL, NULL, N'01'),
('91112ae5-712e-4556-82bd-ac3bec8ffa50', N'DLP36904', N'IBG', '1', NULL, NULL, N'01'),
('32446cf5-c33d-464d-a5b3-985380904d25', N'DLPDP36904', N'IBG', '0', 'DLP36904', NULL, N'03')

-- bfx_impl.investment_strategy
delete from bfx_impl.investment_strategy
 where code in ('endowment')
insert into bfx_impl.investment_strategy
(id, code, description)
values
('6c95f72a-85e3-4501-ab9e-ba7f81b1a906', N'endowment', N'Дожитие')