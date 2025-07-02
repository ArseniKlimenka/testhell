/*
select * from bfx_impl.risks
 where code in (N'DT42204', N'DNST42204', N'DAT42204')
*/

delete from bfx_impl.risks
 where code in (N'DT42204', N'DNST42204', N'DAT42204')
insert into  bfx_impl.risks
(id, code, type, business_line, short_description, full_description)
values
('89104af8-f942-4e94-92be-e21957ee8f99', N'DT42204', N'life', N'42204', N'ИЛП 1,2 таб', N'Инвалидность 1,2 гр ЛП (НСиБ) с табл изменения СС'),
('8eb42857-5ac0-4390-9a93-b0c62a08dcec', N'DNST42204', N'life', N'42204', N'СмертьНС ИзмСС', N'Смерть НС с табл.изменениями СС'),
('891dc824-b38e-40e8-b7a7-d3bb2dcd522e', N'DAT42204', N'life', N'42204', N'ИнвалНС ИзмСС', N'Инвалидность 1,2 НС с табл.изменениями СС')


delete from bfx_impl.products
 where code in (N'CCP3', N'CMP3')
insert into bfx_impl.products
(id, code, product_group, description)
values
('9a159088-93d2-44c5-b147-3a067f072bfc', N'CCP3', N'credit', N'Защита кредита 3'),
('d2e1d849-e1e6-426e-b181-f5a9c2932408', N'CMP3', N'credit', N'Моя защита 3')


delete from bfx_impl.risk_product_relation
 where product_code in (N'CCP3', N'CMP3')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
('62dece29-7384-40e6-8f86-803775301dc2', N'DLP42204', N'CCP3', '0', NULL, N'DLP42204', N'01', 1),
('b5bc15c8-9976-495d-b311-a787e46fea7a', N'DT42204', N'CCP3', '0', NULL, N'DT42204', N'01', 2),
('0b10a457-bf39-4254-8502-0d376c317131', N'DNST42204', N'CMP3', '0', NULL, N'DNST42204', N'01', 1),
('7351b583-55e6-415f-9f3d-223a4d600b9a', N'DAT42204', N'CMP3', '0', NULL, N'DAT42204', N'01', 2),
('cfeff13f-ae43-44c9-aa36-281394126a23', N'HA42204', N'CMP3', '0', NULL, N'HA42204', N'01', 3),
('65c0f1c1-d484-44bd-af05-9d3bfd498521', N'I42204', N'CMP3', '0', NULL, N'I42204', N'01', 4)