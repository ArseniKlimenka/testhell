update p
   set p.body = json_modify(p.body, '$.partyDocuments', json_query(new_data.new_documents_array))
  from pty.party p,
       (select p.party_code,
               '[' + string_agg(json_modify(pd.value, '$.docType.allowToSalers', dt.allow_to_salers), ',') + ']' as new_documents_array
          from pty.party p
               cross apply openjson(json_query(p.body, '$.partyDocuments')) pd
               join bfx_impl.document_type dt on dt.code = json_value(pd.value, '$.docType.docTypeCode')
         group by p.party_code) new_data
 where p.party_code = new_data.party_code