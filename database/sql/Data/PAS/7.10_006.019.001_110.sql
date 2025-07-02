delete from bfx_impl.attachments_error
 where id = 'b17fc2b0-39c4-4d7f-b47e-7bf88317aa7e'
insert into bfx_impl.attachments_error
(id, code, description_full, description_short, type_of_error, class_of_error)
values
('b17fc2b0-39c4-4d7f-b47e-7bf88317aa7e', N'33', N'Отсутствует уведомление для клиентов старше 60 лет', N'КП:Увед60+', N'Комплектность пакета', N'Критичные ошибки')