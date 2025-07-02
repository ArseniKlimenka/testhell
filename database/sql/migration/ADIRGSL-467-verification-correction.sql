update ud
   set ud.body = json_modify(ud.body, '$.attachmentErrorArray', json_query(new_data.new_errors_array))
  from bfx.universal_document ud,
       (select ud.universal_document_id,
               '[' + string_agg(json_modify(er.value, '$.attachmentErrorDescriptionFull',
               case json_value(er.value, '$.attachmentErrorCode')
                 when 13
                 then N'Отсутствует подпись застрахованного на каком-либо приложенном документе'
                 when 16
                 then N'Файл ДУЛ страхователя не читается или отсутствуют обязательные страницы'
                 else json_value(er.value, '$.attachmentErrorDescriptionFull')
                end
               ), ',') + ']' as new_errors_array
          from bfx.universal_document ud
               cross apply openjson(json_query(ud.body, '$.attachmentErrorArray')) er               
         group by ud.universal_document_id) new_data
 where ud.universal_document_number like N'ВВ%'
   and ud.universal_document_id = new_data.universal_document_id
GO

update ud
   set ud.body = json_modify(ud.body, '$.attachmentErrorArray', json_query(new_data.new_errors_array))
  from bfx.universal_document ud,
       (select ud.universal_document_id,
               '[' + string_agg(json_modify(er.value, '$.attachmentErrorDescriptionShort',
               case json_value(er.value, '$.attachmentErrorCode')
                 when 16
                 then N'ОО:КопияДУЛСтрах'
                 else json_value(er.value, '$.attachmentErrorDescriptionShort')
                end
               ), ',') + ']' as new_errors_array
          from bfx.universal_document ud
               cross apply openjson(json_query(ud.body, '$.attachmentErrorArray')) er               
         group by ud.universal_document_id) new_data
 where ud.universal_document_number like N'ВВ%'
   and ud.universal_document_id = new_data.universal_document_id
GO