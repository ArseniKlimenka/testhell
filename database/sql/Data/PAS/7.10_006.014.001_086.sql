update c
   set c.body = json_modify(c.body, '$.mainInsuranceConditions.partner.partnerBusinessCode', '15'),
       c.common_body = json_modify(
                       json_modify(c.common_body,
                                   '$.ownership', json_query('{}')),
                                   '$.ownership.partnerBusinessCode', '15')
  from pas.contract c
       join cfx.published_artifact pa on pa.published_artifact_id = c.published_artifact_id
 where pa.code_name like 'Accumulated%' or pa.code_name like 'Investment%'
GO

update c
   set c.body = json_modify(c.body, '$.mainInsuranceConditions.partner.partnerBusinessCode', '249411'),
       c.common_body = json_modify(
                       json_modify(c.common_body,
                                   '$.ownership', json_query('{}')),
                                   '$.ownership.partnerBusinessCode', '249411')
  from pas.contract c
       join cfx.published_artifact pa on pa.published_artifact_id = c.published_artifact_id
 where pa.code_name like 'Credit%'
GO