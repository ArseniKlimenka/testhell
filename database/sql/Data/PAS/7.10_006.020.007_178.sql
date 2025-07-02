delete from bfx_impl.attachments_error
where id = 'A9D68820-08DC-4B54-9710-438BD9A618D8';
insert into bfx_impl.attachments_error
(id, code, description_full, description_short, type_of_error, class_of_error)
values
('A9D68820-08DC-4B54-9710-438BD9A618D8', N'34', N'Требуется прикрепление всех необходимых документов', N'КП:ВсеДок', N'Комплектность пакета', N'Критичные ошибки');