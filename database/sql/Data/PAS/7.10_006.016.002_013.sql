delete from org_impl.bank
 where id = '914dcdbd-27e8-4992-beb3-51c18291e498'
insert into org_impl.bank
(id, bic, name, registration_number, correspondent_account, parent_bic, address_index, region, area_type, area_name, address_line)
values
('914dcdbd-27e8-4992-beb3-51c18291e498', N'004525988', N'ГУ БАНКА РОССИИ ПО ЦФО//УФК ПО Г. МОСКВЕ г. Москва', 'Отсутствует', N'40102810545370000003', null, N'115191', N'45', N'г.', N'Москва', N'3-я Рощинская ул, 3, стр 1')