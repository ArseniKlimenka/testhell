-- products
delete from bfx_impl.products
where code in ('NOTE2BFKO', 'NOTE3BFKO')

insert into bfx_impl.products
(id, code, product_group, description, product_class)
values
('BF6EEB21-1760-42B8-A447-010DB01AF3FA', N'NOTE2BFKO', N'investment', N'Нота СЖ (2 года)', N'НСЖ'),
('6A54FA03-9A4B-49C6-9730-015D5DA96CF7', N'NOTE3BFKO', N'investment', N'Нота СЖ (3 года)', N'НСЖ')


-- risk product relation
delete from bfx_impl.risk_product_relation
 where product_code in ('NOTE2BFKO', 'NOTE3BFKO')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
-- Нота СЖ (2 года)
('C44BE82C-8162-4222-88B6-023DF09FA74A', N'E36904', N'NOTE2BFKO', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('A381EBAE-D4D4-4A52-823C-02AE16AB10C0', N'DLP36904', N'NOTE2BFKO', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('9ED1FD40-D74B-40A2-8791-040B83252C59', N'DNS36404', N'NOTE2BFKO', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson'),
-- Нота СЖ (3 года)
('AEAF4198-DBA1-4450-B1F8-05376938C198', N'E36904', N'NOTE3BFKO', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('52BEEF60-719F-48E7-B7EB-062454D08FBC', N'DLP36904', N'NOTE3BFKO', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('145C6389-FA57-4B7A-ABD2-074E06BC2CE1', N'DNS36404', N'NOTE3BFKO', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson')