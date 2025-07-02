-- bfx_impl.products
delete from bfx_impl.products
 where code in ('EBMAKBARS')
insert into bfx_impl.products
(id, code, product_group, description)
values
('0b2c2878-b14b-48d1-ba6c-22a7ede4a970', N'EBMAKBARS', N'endowment', N'Стратегия на пять')

-- bfx_impl.risk_product_relation
delete from bfx_impl.risk_product_relation
 where product_code in ('EBMAKBARS')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
('44815d74-c0fb-46e6-aa33-e6d6dbe36685', N'E36404', N'EBMAKBARS', '0', NULL, NULL, N'01', 1), 
('035118c4-3e44-469c-94ac-3e9b85ac6f08', N'DLP36404', N'EBMAKBARS', '1', NULL, N'DLP36404EBMAKBARS', N'01', 2), 
('82891435-ea75-4bb6-9d67-049b04729061', N'DLPVV6536404', N'EBMAKBARS', '0', N'DLP36404', N'DLPVV6536404EBMAKBARSR', N'03', 3), 
('a3242fba-8c06-4492-bfc9-b48a0685af5d', N'DLPVV6536404', N'EBMAKBARS', '1', NULL, N'DLPVV6536404EBMAKBARS', N'01', 3), 
('cee07651-da7d-4c83-999b-fe3699f2ab67', N'DLPVV7036404', N'EBMAKBARS', '0', NULL, N'DLPVV7036404EBMAKBARS', N'01', 4), 
('69512dfd-78b5-4d55-b261-910f980cb6a2', N'DLPVV7036404', N'EBMAKBARS', '0', N'DLPVV6536404', N'DLPVV7036404EBMAKBARSR', N'03', 4), 
('876a74fb-1122-4b58-8c78-381aaa3a7fab', N'DLPVV7036404', N'EBMAKBARS', '0', N'DLP36404', N'DLPVV7036404EBMAKBARSR', N'03', 4), 
('33fe492a-bc8e-408f-9eac-1e1dda78d529', N'DNSVV36404', N'EBMAKBARS', '0', NULL, NULL, N'01', 5)

--bfx_impl.declaration_main
delete from bfx_impl.declaration_main
 where product_code = N'EBMAKBARS'
insert into bfx_impl.declaration_main
(id, product_code, item_number, item_text_id, departament)
values
('a73b2b03-3f73-4f8f-a768-0212dd95aed4', N'EBMAKBARS', N'9', N'e8cab371-471d-42c9-b3d7-752b1dbba3a3', N'compliance'), 
('1532b11c-e0ab-4a50-a062-07fff3d298a9', N'EBMAKBARS', N'15', N'2301c9f7-408d-474b-9019-b245ba5f664c', N'block'), 
('3c92b38e-0122-41a5-9556-099fee86a9b1', N'EBMAKBARS', N'14', N'ee9abd77-4670-41ea-898e-aedc4e4f7b2b', N'block'), 
('1b4ac2cb-d3fe-4223-a8e8-29ff66ef3346', N'EBMAKBARS', N'16', N'a725244a-b0ba-4207-acd0-b9bf93161bf0', N'legal'), 
('dfefed22-29a4-4cd5-a474-54d2c4461e20', N'EBMAKBARS', N'1', N'4c036c88-d623-48f5-8685-063668b1aa84', N'underwriting'), 
('a12a44ec-b31f-494b-8ac2-8437b0d15a2c', N'EBMAKBARS', N'8', N'4b6d3ea7-d895-49b6-a6e6-71dccc3c4fd5', N'compliance'), 
('0ecaa432-a11b-43dd-b562-b1e34b180c22', N'EBMAKBARS', N'12', N'528adef2-61e7-47e5-a1d5-959053a43298', N'block'), 
('2993b773-9c42-4559-a026-bbf68a08d0fb', N'EBMAKBARS', N'3', N'3dc06e0c-34d3-42d1-ac23-2ca1bf660624', N'compliance'), 
('3931829c-41a7-4988-b65e-c0368b2253b6', N'EBMAKBARS', N'7', N'626030bd-fecb-4f75-b59e-6dc9b5a083b5', N'compliance'), 
('040f52f3-728a-45d3-807c-c23d59e7b7aa', N'EBMAKBARS', N'5', N'ed4e649c-e226-4dc3-aaca-641b1a831b21', N'compliance'), 
('c72b53d1-2a66-4089-8f59-c435cdb7e5e2', N'EBMAKBARS', N'13', N'5ceb587d-27f5-4830-963c-aa7cc138e60d', N'legal'), 
('56dfb439-d5f1-40fb-956b-c79a2ecc73fc', N'EBMAKBARS', N'17', N'54f350c7-1dd1-4f2c-ac60-fc1a5e31325b', N'block'), 
('a3d36e0a-6265-468a-8b1c-d6f1ceb49315', N'EBMAKBARS', N'6', N'b8b50932-5941-4142-a695-6b2642c8e424', N'compliance'), 
('af2155a0-71b4-4110-b184-dbc8c8b3d08d', N'EBMAKBARS', N'11', N'3523c703-811e-46bf-965a-79856673edbb', N'block'), 
('8d9c778f-e404-47d9-826b-eff79aadde51', N'EBMAKBARS', N'2', N'4fb7e785-1ae9-4d5b-879f-0ec998eab0bd', N'compliance'), 
('6831581a-dcf5-401b-a1a3-f5957fb4fc42', N'EBMAKBARS', N'10', N'e5b858c6-509c-492a-aac5-77829d378fa2', N'legal'), 
('f2dde875-b13e-41ae-8890-f9dd81eb048c', N'EBMAKBARS', N'4', N'8f1944d2-bd96-4e25-9f9b-2fa35fcebdad', N'compliance') 

-- bfx_impl.declaration_medical
delete from bfx_impl.declaration_medical
 where product_code = N'EBMAKBARS'
insert into bfx_impl.declaration_medical 
(id, product_code, item_number, item_text_id, departament)
values
('20385591-a5bb-47cc-8aea-0a71fd7f7198', N'EBMAKBARS', N'8', N'f6d94e77-e38e-46c9-897c-92d401e1c5ad', N'underwriting'), 
('5661e21f-3ebd-4c5b-9d6d-0bf6c643edbc', N'EBMAKBARS', N'7', N'c0883fda-4302-4031-9976-9156c80d83f3', N'underwriting'), 
('4acbfff8-c016-49dc-ba98-13fe5837ba8c', N'EBMAKBARS', N'9', N'1b758e2b-659f-4e8a-962f-d8ea5e5d4518', N'underwriting'), 
('cb54d2df-d3b0-44ea-9753-6efb87a9ff63', N'EBMAKBARS', N'2', N'388ce7f3-c8db-4c6e-8bcb-1fedf514ce92', N'underwriting'), 
('2fe8cfbe-3eba-4be2-b333-6f0047474a59', N'EBMAKBARS', N'4', N'4d873f10-7e95-410d-8737-371f90705468', N'underwriting'), 
('55fbf2d1-16a3-4f95-9bc5-8e9c4acc2bd5', N'EBMAKBARS', N'5', N'58249a4a-1a05-49be-a63d-3c212e52fb80', N'underwriting'), 
('6aa859bf-baae-42cc-be88-b1a01b41f21e', N'EBMAKBARS', N'1', N'8fb7dd5a-d614-420e-b704-1f0a63d7e802', N'underwriting'), 
('6c2fe325-0ce1-4a76-a249-b40b702830eb', N'EBMAKBARS', N'3', N'0f865628-9e29-46b3-b422-27a58b1c044a', N'underwriting'), 
('d1df75d3-556e-41bb-96a7-d8e6b5423fe2', N'EBMAKBARS', N'6', N'a89be899-dfab-4d38-aafb-89cd9e3e5c42', N'underwriting'), 
('3a945bfe-3f9c-4a9a-b31a-ea3f836fd13b', N'EBMAKBARS', N'10', N'773585c9-02a1-4a07-af33-dfdfe6ab179a', N'underwriting')