-- product
delete from bfx_impl.products
 where code in ('EBMZENIT')
insert into bfx_impl.products
(id, code, product_group, description)
values
('94fa4b56-2a48-46ee-a4f5-0d37251979af', N'EBMZENIT', N'endowment', N'Стань миллионером')

-- product risks
delete from bfx_impl.risk_product_relation
 where product_code in ('EBMZENIT')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
('81dbbe7e-6860-4f0e-a44b-639a6c082d77', N'E36404', N'EBMZENIT', '0', NULL, NULL, N'01', 1),
('8c4b5428-a085-487c-bdc9-5fdff9be1081', N'DLP36404', N'EBMZENIT', '0', NULL, N'DLP36404EBMZENIT', N'01', 2),
('162afbdb-1008-44bf-a4d6-03bcc4e41c31', N'DLPVV6536404', N'EBMZENIT', '0', NULL, N'DLPVV6536404EBMZENIT', N'01', 3),
('3ada99f8-8222-4a6a-8811-c62de2677101', N'DLPVV7036404', N'EBMZENIT', '0', NULL, N'DLPVV7036404EBMZENIT', N'01', 4),
('7d9d5e61-7b24-405b-bf70-34ca850fd112', N'DNSVV36404', N'EBMZENIT', '0', NULL, NULL, N'01', 5)

-- bfx_impl.declaration_medical
delete from bfx_impl.declaration_medical
 where product_code = 'EBMZENIT'
insert into  bfx_impl.declaration_medical
(id, product_code, item_number, item_text_id, departament)
values
('875391ac-2619-4218-b84f-60994714b33b', N'EBMZENIT', N'1', N'8fb7dd5a-d614-420e-b704-1f0a63d7e802', N'underwriting'), 
('f9274f6d-ba00-4018-8594-2790d45c0a0c', N'EBMZENIT', N'2', N'388ce7f3-c8db-4c6e-8bcb-1fedf514ce92', N'underwriting'), 
('b1548ad3-5b71-486f-8348-6aae77428059', N'EBMZENIT', N'3', N'0f865628-9e29-46b3-b422-27a58b1c044a', N'underwriting'), 
('c033144a-5cd4-4c91-a171-4a2e485b621f', N'EBMZENIT', N'4', N'4d873f10-7e95-410d-8737-371f90705468', N'underwriting'), 
('7a084fbb-25f9-4c04-af9d-5796cf4c6875', N'EBMZENIT', N'5', N'58249a4a-1a05-49be-a63d-3c212e52fb80', N'underwriting'), 
('4b934643-0fd9-414f-ac01-d11db9a7163a', N'EBMZENIT', N'6', N'a89be899-dfab-4d38-aafb-89cd9e3e5c42', N'underwriting'), 
('597ec6d6-d53c-4fba-ab63-1ed5e82b0622', N'EBMZENIT', N'7', N'c0883fda-4302-4031-9976-9156c80d83f3', N'underwriting'), 
('4e733737-97e2-4058-b946-12b7e2544481', N'EBMZENIT', N'8', N'f6d94e77-e38e-46c9-897c-92d401e1c5ad', N'underwriting'), 
('8bf1758d-f893-4b47-a300-24bf563cd927', N'EBMZENIT', N'9', N'1b758e2b-659f-4e8a-962f-d8ea5e5d4518', N'underwriting'), 
('c7f2f7f5-615d-4dbc-88f9-da92bce6b185', N'EBMZENIT', N'10', N'773585c9-02a1-4a07-af33-dfdfe6ab179a', N'underwriting')

-- bfx_impl.declaration_main
delete from bfx_impl.declaration_main
 where product_code = 'EBMZENIT'
insert into bfx_impl.declaration_main
(id, product_code, item_number, item_text_id, departament)
values
('f0c7164a-e155-472e-b593-489eaa9e7d81', N'EBMZENIT', N'1', N'4c036c88-d623-48f5-8685-063668b1aa84', N'underwriting'), 
('558e4363-2062-4f70-aee6-f6a163937c45', N'EBMZENIT', N'2', N'4fb7e785-1ae9-4d5b-879f-0ec998eab0bd', N'compliance'), 
('e985ee50-e2cb-4cc2-aa6d-98c7bcce2435', N'EBMZENIT', N'3', N'3dc06e0c-34d3-42d1-ac23-2ca1bf660624', N'compliance'), 
('22e0a048-4890-4249-b3c7-fa0b07ccdd71', N'EBMZENIT', N'4', N'8f1944d2-bd96-4e25-9f9b-2fa35fcebdad', N'compliance'), 
('8d62f246-0285-4390-8603-c4228dec5bd6', N'EBMZENIT', N'5', N'ed4e649c-e226-4dc3-aaca-641b1a831b21', N'compliance'), 
('db4b7c25-7932-4459-bd55-ef5b65691bdd', N'EBMZENIT', N'6', N'b8b50932-5941-4142-a695-6b2642c8e424', N'compliance'), 
('17e3ca69-0748-42bf-9915-9c3063ac173b', N'EBMZENIT', N'7', N'626030bd-fecb-4f75-b59e-6dc9b5a083b5', N'compliance'), 
('514b88d8-80c7-4772-8e56-5929dbf82dc4', N'EBMZENIT', N'8', N'4b6d3ea7-d895-49b6-a6e6-71dccc3c4fd5', N'compliance'), 
('23aa61ce-352c-4e29-9482-019a4b3d3269', N'EBMZENIT', N'9', N'e8cab371-471d-42c9-b3d7-752b1dbba3a3', N'compliance'), 
('bda77f9c-f72c-4d0d-b13d-f925099c9af8', N'EBMZENIT', N'10', N'e5b858c6-509c-492a-aac5-77829d378fa2', N'legal'), 
('11245e99-92a0-4849-ae0b-f4f9df1fb5e8', N'EBMZENIT', N'11', N'3523c703-811e-46bf-965a-79856673edbb', N'block'), 
('dbaecd41-67b1-4837-9c0e-63deb3185181', N'EBMZENIT', N'12', N'528adef2-61e7-47e5-a1d5-959053a43298', N'block'), 
('488d47f0-eeaf-4cb6-9dc2-cda9b5c6565e', N'EBMZENIT', N'13', N'5ceb587d-27f5-4830-963c-aa7cc138e60d', N'legal'), 
('33604bf6-a0f9-4a12-90ef-391aba3a35ba', N'EBMZENIT', N'14', N'ee9abd77-4670-41ea-898e-aedc4e4f7b2b', N'block'), 
('c9a1e566-8980-410d-a013-063594132c47', N'EBMZENIT', N'15', N'2301c9f7-408d-474b-9019-b245ba5f664c', N'block'), 
('34441fbb-ef60-4a60-bdf3-40e1f66fbad0', N'EBMZENIT', N'16', N'a725244a-b0ba-4207-acd0-b9bf93161bf0', N'legal'), 
('7ef320bc-7abe-4b6d-8b28-d2e9b07afb30', N'EBMZENIT', N'17', N'54f350c7-1dd1-4f2c-ac60-fc1a5e31325b', N'block')