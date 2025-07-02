update bfx_impl.attachments_error
   set description_full = N'Отсутствует подпись застрахованного на каком-либо приложенном документе'
 where code = 13
update bfx_impl.attachments_error
   set description_full = N'Файл ДУЛ страхователя не читается или отсутствуют обязательные страницы',
       description_short = N'ОО:КопияДУЛСтрах'
 where code = 16
GO

delete from bfx_impl.attachments_error
 where code in (31, 32)
insert into bfx_impl.attachments_error
(ID, CODE, DESCRIPTION_FULL, DESCRIPTION_SHORT, TYPE_OF_ERROR, CLASS_OF_ERROR)
VALUES
('03b2feea-afa6-486a-838d-68d0bda1958d', N'31', N'Файл ДУЛ застрахованного не читается или отсутствуют обязательные страницы', N'ОО:КопияДУЛЗастр', N'Ошибка оформления', N'Критичные ошибки'),
('bc2d95fa-5f80-467b-bf06-c974072e3e4b', N'32', N'Ошибки в анкете о финансовых знаниях клиента или не заполнены обязательные пункты анкеты', N'ОО:АнкетаФЗн', N'Ошибка оформления', N'Критичные ошибки')
GO