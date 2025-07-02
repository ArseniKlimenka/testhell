-- risk product relation
delete from bfx_impl.risk_product_relation
 where product_code in ('WCEN3OAS')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
-- Достойный век 3.0
('72C98CC0-0865-41F5-A278-F55A212F7C1F', N'DLP46204', N'WCEN3OAS', '0', NULL, N'DLP46204WCEN3OAS', N'01', 1, 'main', 'insuredPerson'),
('729A76C8-D017-4E7E-AB10-ED2DA91FC03A', N'DLPVV46204', N'WCEN3OAS', '0', NULL, N'DLPVV46204WCEN3OAS', N'01', 2, 'main', 'insuredPerson'),
('F3BFC3EA-260A-4A6D-A4FC-D197C2EA5BAA', N'DDTP46204', N'WCEN3OAS', '0', NULL, N'DDTP46204WCEN3OAS', N'01', 3, 'main', 'insuredPerson'),
('E266D7CD-D28D-4D4C-BD94-B11EE672F26B', N'DLP46204M', N'WCEN3OAS', '0', NULL, N'DLP46204MWCEN3OAS', N'01', 4, 'main', 'insuredPerson')