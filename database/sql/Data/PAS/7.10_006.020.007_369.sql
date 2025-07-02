delete from bfx_impl.attachments_error
where id = '043D4719-27C3-4080-B7AF-925B0B02F20E';
insert into bfx_impl.attachments_error
(id, code, description_full, description_short, type_of_error, class_of_error)
values
('043D4719-27C3-4080-B7AF-925B0B02F20E', N'35', N'Отсутствует ключевой информационный документ', N'КП:КИД', N'Комплектность пакета', N'Критичные ошибки');