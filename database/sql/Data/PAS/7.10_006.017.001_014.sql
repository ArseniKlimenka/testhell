-- product risks
delete from bfx_impl.risk_product_relation
 where product_code in ('EPGPAKBARS')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
('16ddb928-a243-4434-b800-98a72740122f', N'E36404', N'EPGPAKBARS', '0', NULL, NULL, N'01', 1),
('45df0003-ce6a-497f-a345-a75fdcc2d7c1', N'DLPSS36404', N'EPGPAKBARS', '0', NULL, NULL, N'01', 2),
('bcf6ef05-ee46-407f-a8ab-2b1c669ac7dd', N'DNS36404', N'EPGPAKBARS', '0', NULL, NULL, N'01', 3),
('27a549bc-f676-4c92-88a6-58d0ec070b27', N'DDTP36404', N'EPGPAKBARS', '0', NULL, NULL, N'01', 4),
('331731d6-bf29-41d0-9815-f9e71bb5bc9f', N'D36404', N'EPGPAKBARS', '0', NULL, N'D36404EPGPAKBARS', N'01', 5),
('3babc3e3-65d6-403d-93af-f19fa4f812a2', N'JL36404', N'EPGPAKBARS', '0', NULL, N'JL36404EPGPAKBARS', N'01', 6)