-- product risks
delete from bfx_impl.risk_product_relation
 where product_code in ('IBAKSP3VTB', 'IBAKSV3VTB')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
('4D99132D-2DA7-4813-B772-1FAF82A70B62', N'E36904', N'IBAKSP3VTB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
('A1C98A0A-011D-4771-B54D-7DBCC777BEAC', N'DLP36904', N'IBAKSP3VTB', '0', NULL, NULL, N'01', 2, N'main', N'insuredPerson'),
('8E85515C-CF1D-437F-85C9-6F21196431BF', N'DNS36904', N'IBAKSP3VTB', '0', NULL, NULL, N'01', 3, N'main', N'insuredPerson'),
('3C01C61A-5179-40C4-B702-4AE33C08259B', N'E36904', N'IBAKSV3VTB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
('A213FDFA-D069-4C2A-B039-C8096687FC90', N'DLP36904', N'IBAKSV3VTB', '0', NULL, NULL, N'01', 2, N'main', N'insuredPerson'),
('6DF54C86-4A4D-415D-81DF-69AD126C0142', N'DNS36904', N'IBAKSV3VTB', '0', NULL, NULL, N'01', 3, N'main', N'insuredPerson')
