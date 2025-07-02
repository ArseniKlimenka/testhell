update c
   set c.body = json_modify(
                json_modify(
                json_modify(c.body,
                            '$.insuranceRules.ruleCode', N'MED_2_20210513'),
                            '$.insuranceRules.ruleDescription', N'Правила добровольного медицинского страхования (в редакции от 13 мая 2021 года)'),
                            '$.insuranceRules.ruleDate', N'2021-05-13')
  from pas.contract c
       join cfx.published_artifact pa on pa.published_artifact_id = c.published_artifact_id and pa.code_name = 'CreditLifeInsurancePolicy'
       join pas_impl.policy_hub ph on ph.contract_number = c.contract_number
       join pas_impl.policy_sat_latest psl on psl.policy_hkey = ph.policy_hkey and psl.product_code = 'CDMS'