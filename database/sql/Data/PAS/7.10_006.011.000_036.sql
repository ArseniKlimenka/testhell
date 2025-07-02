IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[POLICY_SAT]') AND TYPE IN (N'U'))
BEGIN

IF COL_LENGTH('PAS_IMPL.POLICY_SAT','PURCHASE_DATE') IS NULL
BEGIN
ALTER TABLE PAS_IMPL.POLICY_SAT ADD PURCHASE_DATE date
END

END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[POLICY_SAT]') AND TYPE IN (N'U'))
BEGIN

update ps
   set ps.purchase_date = 
       case
         when json_value(c.body, '$.basicConditions.issueDate') between '2021-11-01' and '2021-11-30'
         then '2021-12-16' 
         when json_value(c.body, '$.basicConditions.issueDate') between '2021-12-01' and '2021-12-31'
         then '2022-01-20'
         when json_value(c.body, '$.basicConditions.issueDate') between '2022-01-01' and '2022-01-31'
         then '2022-02-17'
         when json_value(c.body, '$.basicConditions.issueDate') between '2022-02-01' and '2022-02-28'
         then '2022-03-17'
         else null
       end
  from pas.contract c,       
       pas_impl.policy_hub ph,
       pas_impl.policy_sat ps,
       cfx.published_artifact pa
 where ph.contract_number = c.contract_number
   and ph.policy_hkey = ps.policy_hkey
   and pa.published_artifact_id = c.published_artifact_id
   and pa.code_name like '%investment%'

END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[QUOTE_SAT]') AND TYPE IN (N'U'))
BEGIN

IF COL_LENGTH('PAS_IMPL.QUOTE_SAT','PURCHASE_DATE') IS NULL
BEGIN
ALTER TABLE PAS_IMPL.QUOTE_SAT ADD PURCHASE_DATE date
END

END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[QUOTE_SAT]') AND TYPE IN (N'U'))
BEGIN

update ps
   set ps.purchase_date = 
       case
         when json_value(c.body, '$.basicConditions.issueDate') between '2021-11-01' and '2021-11-30'
         then '2021-12-16' 
         when json_value(c.body, '$.basicConditions.issueDate') between '2021-12-01' and '2021-12-31'
         then '2022-01-20'
         when json_value(c.body, '$.basicConditions.issueDate') between '2022-01-01' and '2022-01-31'
         then '2022-02-17'
         when json_value(c.body, '$.basicConditions.issueDate') between '2022-02-01' and '2022-02-28'
         then '2022-03-17'
         else null
       end
  from pas.contract c,       
       pas_impl.quote_hub ph,
       pas_impl.quote_sat ps,
       cfx.published_artifact pa
 where ph.contract_number = c.contract_number
   and ph.quote_hkey = ps.quote_hkey
   and pa.published_artifact_id = c.published_artifact_id
   and pa.code_name like '%investment%'

END
GO

update c
   set c.body = json_modify(c.body, '$.basicInvestmentParameters.purchaseDate',
        case
         when json_value(c.body, '$.basicConditions.issueDate') between '2021-11-01' and '2021-11-30'
         then '2021-12-16' 
         when json_value(c.body, '$.basicConditions.issueDate') between '2021-12-01' and '2021-12-31'
         then '2022-01-20'
         when json_value(c.body, '$.basicConditions.issueDate') between '2022-01-01' and '2022-01-31'
         then '2022-02-17'
         when json_value(c.body, '$.basicConditions.issueDate') between '2022-02-01' and '2022-02-28'
         then '2022-03-17'
         else null
       end)
  from pas.contract c,
       cfx.published_artifact pa
 where pa.published_artifact_id = c.published_artifact_id
   and pa.code_name like '%investment%'
GO