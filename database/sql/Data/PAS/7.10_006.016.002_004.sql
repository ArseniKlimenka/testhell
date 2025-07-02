--bfx_impl.products
delete from bfx_impl.products
 where code in ('DEMOINV', 'DEMOACC')
insert into bfx_impl.products
(id, code, product_group, description)
values
('d3bdfd5a-9ee4-4ac3-b298-f09867b80f81', N'DEMOINV', N'investment', N'Демо ИСЖ'),
('e0f646fa-221a-46b2-98b1-b0347d8c7a02', N'DEMOACC', N'endowment', N'Демо НСЖ')
--bfx_impl.products

--bfx_impl.risk_product_relation
delete from bfx_impl.risk_product_relation
 where product_code in ('DEMOINV', 'DEMOACC')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
--DEMOACC
('e8ec67d7-21e4-49d1-b08e-143f37edb068', N'E36102', N'DEMOACC', '0', NULL, NULL, N'01', 1),
--DEMOINV
('b74404e8-7fb5-4d31-9dec-6bb4259e9367', N'E36904', N'DEMOINV', '0', NULL, NULL, N'01', 1)
--bfx_impl.risk_product_relation

--declarations
delete from bfx_impl.declaration_medical_questions where id = 'e0556f46-2f74-4c8f-82ab-399428d78a26'; insert into bfx_impl.declaration_medical_questions values ('e0556f46-2f74-4c8f-82ab-399428d78a26', N'Текст пункта 1 декларации о состоянии здоровья и факторах риска застрахованного');
delete from bfx_impl.declaration_medical_questions where id = 'f3f41f65-ec8a-4ba4-b293-3dad2627abd2'; insert into bfx_impl.declaration_medical_questions values ('f3f41f65-ec8a-4ba4-b293-3dad2627abd2', N'Текст пункта 2 декларации о состоянии здоровья и факторах риска застрахованного');

delete from bfx_impl.declaration_medical where id = 'dd980d8f-6be0-46a8-a85a-5c50871c0346'; insert into bfx_impl.declaration_medical values ('dd980d8f-6be0-46a8-a85a-5c50871c0346', 'DEMOINVY', '1', 'e0556f46-2f74-4c8f-82ab-399428d78a26', 'underwriting');	delete from bfx_impl.declaration_medical where id = 'b4643552-d771-4578-845d-dad108d9e9f2'; insert into bfx_impl.declaration_medical values ('b4643552-d771-4578-845d-dad108d9e9f2', 'DEMOINVO', '1', 'e0556f46-2f74-4c8f-82ab-399428d78a26', 'underwriting');	delete from bfx_impl.declaration_medical where id = '62dc0a55-4e3f-49c3-9a4d-a31881ea5ef6'; insert into bfx_impl.declaration_medical values ('62dc0a55-4e3f-49c3-9a4d-a31881ea5ef6', 'DEMOACC', '1', 'e0556f46-2f74-4c8f-82ab-399428d78a26', 'underwriting');
delete from bfx_impl.declaration_medical where id = 'c3436d26-894e-4057-ad7d-fc415af2f3cd'; insert into bfx_impl.declaration_medical values ('c3436d26-894e-4057-ad7d-fc415af2f3cd', 'DEMOINVY', '2', 'f3f41f65-ec8a-4ba4-b293-3dad2627abd2', 'underwriting');	delete from bfx_impl.declaration_medical where id = 'f23f6178-1ad2-4c70-9310-2b0ded251cdb'; insert into bfx_impl.declaration_medical values ('f23f6178-1ad2-4c70-9310-2b0ded251cdb', 'DEMOINVO', '2', 'f3f41f65-ec8a-4ba4-b293-3dad2627abd2', 'underwriting');	delete from bfx_impl.declaration_medical where id = 'e04ce1d5-b48a-4145-85b3-5b6e354bb575'; insert into bfx_impl.declaration_medical values ('e04ce1d5-b48a-4145-85b3-5b6e354bb575', 'DEMOACC', '2', 'f3f41f65-ec8a-4ba4-b293-3dad2627abd2', 'underwriting');

delete from bfx_impl.declaration_main_questions where id = '29a814e2-5651-4364-907d-057fdf394e79'; insert into bfx_impl.declaration_main_questions values ('29a814e2-5651-4364-907d-057fdf394e79', N'Текст пункта 1 декларации страхователя и застрахованного');
delete from bfx_impl.declaration_main_questions where id = '909963f6-dc3e-4751-9bca-1b4b78f4fc0f'; insert into bfx_impl.declaration_main_questions values ('909963f6-dc3e-4751-9bca-1b4b78f4fc0f', N'Текст пункта 2 декларации страхователя и застрахованного');

delete from bfx_impl.declaration_main where id = '27db9b68-101c-48ee-94b5-150aecdfb2ba'; insert into bfx_impl.declaration_main values ('27db9b68-101c-48ee-94b5-150aecdfb2ba', 'DEMOINV', '1', '29a814e2-5651-4364-907d-057fdf394e79', 'underwriting');		delete from bfx_impl.declaration_main where id = 'e6dc3ce8-9673-43e4-b735-62f5b9f82c33'; insert into bfx_impl.declaration_main values ('e6dc3ce8-9673-43e4-b735-62f5b9f82c33', 'DEMOACC', '1', '29a814e2-5651-4364-907d-057fdf394e79', 'underwriting');
delete from bfx_impl.declaration_main where id = 'e0d539e4-2eb5-4e96-aaba-ffa7bebcf6eb'; insert into bfx_impl.declaration_main values ('e0d539e4-2eb5-4e96-aaba-ffa7bebcf6eb', 'DEMOINV', '2', '909963f6-dc3e-4751-9bca-1b4b78f4fc0f', 'underwriting');		delete from bfx_impl.declaration_main where id = '79fe7508-fb96-4c6f-81da-bcce7c3baafd'; insert into bfx_impl.declaration_main values ('79fe7508-fb96-4c6f-81da-bcce7c3baafd', 'DEMOACC', '2', '909963f6-dc3e-4751-9bca-1b4b78f4fc0f', 'underwriting');
--declarations