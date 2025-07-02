-- product
delete from bfx_impl.products
 where code in ('EBMAKCEPT')
insert into bfx_impl.products
(id, code, product_group, description)
values
('a5cf10d1-9c1c-4c11-84c8-b256398df492', N'EBMAKCEPT', N'endowment', N'Стань миллионером')

-- product risks
delete from bfx_impl.risk_product_relation
 where product_code in ('EBMAKCEPT')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
('c70ff2cc-915d-4903-94ef-bcaf0c623ba7', N'E36404', N'EBMAKCEPT', '0', NULL, NULL, N'01', 1),
('6dad3e55-d654-4c2c-8d8f-726fd739eea7', N'DLP36404', N'EBMAKCEPT', '0', NULL, N'DLP36404EBMAKCEPT', N'01', 2),
('d18be8dd-3349-498f-a2fc-9de1ded61ec6', N'DLPVV6536404', N'EBMAKCEPT', '0', NULL, N'DLPVV6536404EBMAKCEPT', N'01', 3),
('a91953f2-7ee4-4f93-a8f2-e9da26e967d1', N'DLPVV7036404', N'EBMAKCEPT', '0', NULL, N'DLPVV7036404EBMAKCEPT', N'01', 4),
('0c3035ac-be09-41c1-b6d4-0aace22c018f', N'DNSVV36404', N'EBMAKCEPT', '0', NULL, NULL, N'01', 5)

-- bfx_impl.declaration_medical
delete from bfx_impl.declaration_medical
 where product_code = 'EBMAKCEPT'
insert into  bfx_impl.declaration_medical
(id, product_code, item_number, item_text_id, departament)
values
('34bfcce1-86bc-4f6a-bcce-bbfa990ad070', N'EBMAKCEPT', N'1', N'8fb7dd5a-d614-420e-b704-1f0a63d7e802', N'underwriting'), 
('5655d6b3-55dd-4c38-86c0-8465031ead2a', N'EBMAKCEPT', N'2', N'388ce7f3-c8db-4c6e-8bcb-1fedf514ce92', N'underwriting'), 
('50e4a97a-e194-4c61-9244-ea7eb2134fe3', N'EBMAKCEPT', N'3', N'0f865628-9e29-46b3-b422-27a58b1c044a', N'underwriting'), 
('d028f10a-edcc-496a-9323-8529f09949a2', N'EBMAKCEPT', N'4', N'4d873f10-7e95-410d-8737-371f90705468', N'underwriting'), 
('3b464dc7-0f25-43a1-b889-e6c826b6204f', N'EBMAKCEPT', N'5', N'58249a4a-1a05-49be-a63d-3c212e52fb80', N'underwriting'), 
('612ab94c-1e2a-457e-9db2-0f070f100a8c', N'EBMAKCEPT', N'6', N'a89be899-dfab-4d38-aafb-89cd9e3e5c42', N'underwriting'), 
('26d94b93-a01e-4d62-b1af-c8242277d0f3', N'EBMAKCEPT', N'7', N'c0883fda-4302-4031-9976-9156c80d83f3', N'underwriting'), 
('8b306ff6-fd8c-4348-85cd-ae8fae90a02b', N'EBMAKCEPT', N'8', N'f6d94e77-e38e-46c9-897c-92d401e1c5ad', N'underwriting'), 
('5625ba39-4f78-411c-867a-555a2bd6708d', N'EBMAKCEPT', N'9', N'1b758e2b-659f-4e8a-962f-d8ea5e5d4518', N'underwriting'), 
('e6499bb2-6fba-4bf5-8f97-273dee1b58a5', N'EBMAKCEPT', N'10', N'773585c9-02a1-4a07-af33-dfdfe6ab179a', N'underwriting')

-- bfx_impl.declaration_main
delete from bfx_impl.declaration_main
 where product_code = 'EBMAKCEPT'
insert into bfx_impl.declaration_main
(id, product_code, item_number, item_text_id, departament)
values
('f4820013-84ff-4548-8df9-16a77839bded', N'EBMAKCEPT', N'1', N'4c036c88-d623-48f5-8685-063668b1aa84', N'underwriting'), 
('e3d76a5b-b6bc-42c4-9c8d-62a5a14d6741', N'EBMAKCEPT', N'2', N'4fb7e785-1ae9-4d5b-879f-0ec998eab0bd', N'compliance'), 
('09631316-750e-4477-8663-e06819f7957f', N'EBMAKCEPT', N'3', N'3dc06e0c-34d3-42d1-ac23-2ca1bf660624', N'compliance'), 
('7ebe50ec-e9e8-4086-89d3-cbcc49a4c6f8', N'EBMAKCEPT', N'4', N'8f1944d2-bd96-4e25-9f9b-2fa35fcebdad', N'compliance'), 
('70a61934-edee-429c-8d97-473d74340daa', N'EBMAKCEPT', N'5', N'ed4e649c-e226-4dc3-aaca-641b1a831b21', N'compliance'), 
('689018f7-1594-42dc-8b57-9c1181824482', N'EBMAKCEPT', N'6', N'b8b50932-5941-4142-a695-6b2642c8e424', N'compliance'), 
('37981fff-c2c3-4262-a27e-30e9975f6905', N'EBMAKCEPT', N'7', N'626030bd-fecb-4f75-b59e-6dc9b5a083b5', N'compliance'), 
('10a93706-89ff-47cc-9733-152df695a8d4', N'EBMAKCEPT', N'8', N'4b6d3ea7-d895-49b6-a6e6-71dccc3c4fd5', N'compliance'), 
('8953abab-eab3-443f-9191-a99131202ea0', N'EBMAKCEPT', N'9', N'e8cab371-471d-42c9-b3d7-752b1dbba3a3', N'compliance'), 
('ab1d8691-b39a-4563-a7e6-722f661d9876', N'EBMAKCEPT', N'10', N'e5b858c6-509c-492a-aac5-77829d378fa2', N'legal'), 
('cb081287-6a58-4f1c-844c-fcde19f21827', N'EBMAKCEPT', N'11', N'3523c703-811e-46bf-965a-79856673edbb', N'block'), 
('37904ff5-b111-436b-8ef0-2000695a4591', N'EBMAKCEPT', N'12', N'528adef2-61e7-47e5-a1d5-959053a43298', N'block'), 
('b30228e2-418a-4cd8-a865-6c5136e69661', N'EBMAKCEPT', N'13', N'5ceb587d-27f5-4830-963c-aa7cc138e60d', N'legal'), 
('ca9932b4-1a50-40eb-937d-a47e55219f01', N'EBMAKCEPT', N'14', N'ee9abd77-4670-41ea-898e-aedc4e4f7b2b', N'block'), 
('742a4f8f-b5fc-41d1-acc3-ef81447c78eb', N'EBMAKCEPT', N'15', N'2301c9f7-408d-474b-9019-b245ba5f664c', N'block'), 
('5a6ccf9c-5960-4b5a-a228-01157e29c7fe', N'EBMAKCEPT', N'16', N'a725244a-b0ba-4207-acd0-b9bf93161bf0', N'legal'), 
('dd0fd539-b9f7-4f32-8ab3-3697e61bdbf0', N'EBMAKCEPT', N'17', N'54f350c7-1dd1-4f2c-ac60-fc1a5e31325b', N'block')