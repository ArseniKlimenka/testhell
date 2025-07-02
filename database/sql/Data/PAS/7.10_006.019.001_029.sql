delete from bfx_impl.risk_product_relation
 where product_code in (N'EBMBFKO', N'EBMZENIT', N'EBMAKCEPT')
   and relation_type_code = N'03'
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
('4b4f365d-a985-45de-935e-115db3315aaf', N'DLPVV6536404', N'EBMBFKO', '0', N'DLP36404', N'DLPVV6536404EBMBFKOR', N'03', 3),
('0397e3b7-fec8-4a1c-a273-a2c1cba91d3e', N'DLPVV7036404', N'EBMBFKO', '0', N'DLP36404', N'DLPVV7036404EBMBFKOR', N'03', 4),
('ba99220f-8488-468e-a364-7571dc9d2a1f', N'DLPVV7036404', N'EBMBFKO', '0', N'DLPVV6536404', N'DLPVV7036404EBMBFKOR', N'03', 4),
--
('36c2e3ea-e3dd-4d6e-bfe8-29441a0a22ec', N'DLPVV6536404', N'EBMZENIT', '0', N'DLP36404', N'DLPVV6536404EBMZENITR', N'03', 3),
('75fbe7b0-5811-4561-be39-dc010b2a1558', N'DLPVV7036404', N'EBMZENIT', '0', N'DLP36404', N'DLPVV7036404EBMZENITR', N'03', 4),
('5deae787-4df6-4e54-b8d9-4511587ce94e', N'DLPVV7036404', N'EBMZENIT', '0', N'DLPVV6536404', N'DLPVV7036404EBMZENITR', N'03', 4),
--
('8e5ca301-b26b-4394-9b34-104bd6dc88e8', N'DLPVV6536404', N'EBMAKCEPT', '0', N'DLP36404', N'DLPVV6536404EBMAKCEPTR', N'03', 3),
('e9806923-ac4a-4ad0-8f75-d7fcc335274b', N'DLPVV7036404', N'EBMAKCEPT', '0', N'DLP36404', N'DLPVV7036404EBMAKCEPTR', N'03', 4),
('48a2e03c-8e1c-4792-a5a2-56d138ca13cf', N'DLPVV7036404', N'EBMAKCEPT', '0', N'DLPVV6536404', N'DLPVV7036404EBMAKCEPTR', N'03', 4)

update bfx_impl.risk_product_relation
   set is_replaceable = 1
 where product_code in (N'EBMBFKO', N'EBMZENIT', N'EBMAKCEPT')
   and risk_code in (N'DLP36404', N'DLPVV6536404')
   and relation_type_code = N'01'