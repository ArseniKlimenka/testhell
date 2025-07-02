-- product
delete from bfx_impl.products
 where code in ('IDGV2', 'IDGV3')
insert into bfx_impl.products
(id, code, product_group, description)
values
('9b9e9245-ad1d-42c6-9041-f6b0d2c2d576', N'IDGV2', N'investment', N'Драйвер Гарантия (2 года)'),
('0e6e491b-f88a-412f-82a0-2bbfde7a5ea8', N'IDGV3', N'investment', N'Драйвер Гарантия (3 года)')

-- product risks
delete from bfx_impl.risk_product_relation
 where product_code in ('IDGV2', 'IDGV3')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
('fec023c9-6600-4260-8c12-fa420c29ca58', N'E36404', N'IDGV2', '0', NULL, NULL, N'01', 1),
('32dc39a9-efda-4a4f-9b5f-d6ad9fd5dfb0', N'DLPT36404', N'IDGV2', '0', NULL, NULL, N'01', 2),
('2545f776-4ce0-4351-bcea-881953b02ed7', N'DNS36404', N'IDGV2', '0', NULL, NULL, N'01', 3),
('364f2575-cced-45dd-98b8-12ada9100e49', N'E36404', N'IDGV3', '0', NULL, NULL, N'01', 1),
('2e01c0e7-3d9d-49c7-ae47-757ab07bb8f0', N'DLPT36404', N'IDGV3', '0', NULL, NULL, N'01', 2),
('8b3018a4-dc37-4e59-a5cf-05f26c8bc5d3', N'DNS36404', N'IDGV3', '0', NULL, NULL, N'01', 3)