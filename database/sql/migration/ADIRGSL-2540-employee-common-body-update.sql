update org.service_provider
   set common_body = json_modify(common_body, '$.attributes.sadNumber', json_value(body, '$.sadNumber'))
 where json_value(body, '$.sadNumber') is not null