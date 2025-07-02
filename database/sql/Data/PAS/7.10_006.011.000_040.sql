update cc
   set cc.body = json_modify(cc.body, '$.technicalInformation.originalDocumentNumber', cp.contract_number)
  from bfx.entity_ref er,
       cfx.published_artifact pa,
       pas.contract cp,
       pas.contract cc
 where pa.published_artifact_id = er.published_artifact_id
   and pa.code_name like '%quote%'
   and cp.contract_id = er.source_id
   and cc.contract_id = er.entity_id