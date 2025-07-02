update c
   set c.body = json_modify(
                json_modify(
                json_modify(c.body,
                            '$.insuranceRules.ruleCode', N'CL_9_20220221'),
                            '$.insuranceRules.ruleDescription', N'Правила страхования жизни физических лиц №9 (в редакции от 21 февраля 2022 года)'),
                            '$.insuranceRules.ruleDate', N'2022-02-21'),
       c.snapshot_body = json_modify(
                         json_modify(
                         json_modify(c.snapshot_body,
                                     '$.insuranceRules.ruleCode', N'CL_9_20220221'),
                                     '$.insuranceRules.ruleDescription', N'Правила страхования жизни физических лиц №9 (в редакции от 21 февраля 2022 года)'),
                                     '$.insuranceRules.ruleDate', N'2022-02-21')
  from pas.contract c
       join cfx.published_artifact pa on pa.published_artifact_id = c.published_artifact_id
 where pa.code_name = N'CreditLifeInsurancePolicy'
GO

update c
   set c.snapshot_body = json_modify(
                         json_modify(
                         json_modify(c.snapshot_body,
                                     '$.insuranceRules.ruleCode', N'CL_9_20220221'),
                                     '$.insuranceRules.ruleDescription', N'Правила страхования жизни физических лиц №9 (в редакции от 21 февраля 2022 года)'),
                                     '$.insuranceRules.ruleDate', N'2022-02-21')
  from pas.contract c
       join cfx.published_artifact pa on pa.published_artifact_id = c.published_artifact_id
 where pa.code_name in (N'CreditLifeInsuranceCancellation', N'CreditLifeInsuranceReactivation')
GO