IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[impl_get_credit_aggregated_sums]') AND type IN (N'FN', N'FS', N'FT', N'TF', N'IF'))
BEGIN
DROP FUNCTION [dbo].[impl_get_credit_aggregated_sums];
END
GO

create function impl_get_credit_aggregated_sums(@date date)
returns table
as
return(
with daily_contracts as (
select c.*
  from pas.contract c,
       cfx.published_artifact pa,
       pas_impl.policy_hub h,
       pas_impl.policy_sat s
 where c.published_artifact_id = pa.published_artifact_id
   and c.contract_number = h.contract_number
   and h.policy_hkey = s.policy_hkey
   and s.state = 'Active'
   and pa.code_name = 'CreditLifeInsurancePolicy'
   and ((cast(s.load_date as date) = @date) or (@date is null))
),
insured_sums as (
SELECT c.contract_number,
       row_number() over(partition by c.contract_number order by JSON_VALUE(t.value, '$.periodStartDate')) as period_number,
       '01' as insured_sum_type,
       convert(varchar, CAST(JSON_VALUE(t.value, '$.periodStartDate') as date), 104) as period_start_date,
       convert(varchar, CAST(JSON_VALUE(t.value, '$.periodEndDate') as date), 104) as period_end_date,
       JSON_VALUE((select sp.value
                     from OPENJSON(JSON_QUERY((select r.value
                                                 from OPENJSON(JSON_QUERY(c.body, '$.risks')) r
                                                where JSON_VALUE(r.value, '$.risk.riskCode') = 'DLP42204'),
                                               '$.riskInsuredSumByPeriod')) sp
                    where JSON_VALUE(sp.value, '$.periodStartDate') = JSON_VALUE(t.value, '$.periodStartDate')),
                  '$.insuredSum') as insured_sum
  FROM daily_contracts c
         CROSS APPLY OPENJSON(JSON_QUERY(c.body, '$.surrenderValues')) t
union all
SELECT c.contract_number,
       row_number() over(partition by c.contract_number order by JSON_VALUE(t.value, '$.periodStartDate')) as period_number,
       '04' as insured_sum_type,
       convert(varchar, CAST(JSON_VALUE(t.value, '$.periodStartDate') as date), 104) as period_start_date,
       convert(varchar, CAST(JSON_VALUE(t.value, '$.periodEndDate') as date), 104) as period_end_date,
       JSON_VALUE((select sp.value
                     from OPENJSON(JSON_QUERY((select r.value
                                                 from OPENJSON(JSON_QUERY(c.body, '$.risks')) r
                                                where JSON_VALUE(r.value, '$.risk.riskCode') = 'D42204'),
                                               '$.riskInsuredSumByPeriod')) sp
                    where JSON_VALUE(sp.value, '$.periodStartDate') = JSON_VALUE(t.value, '$.periodStartDate')),
                  '$.insuredSum') as insured_sum
  FROM daily_contracts c
         CROSS APPLY OPENJSON(JSON_QUERY(c.body, '$.surrenderValues')) t
union all
SELECT c.contract_number,
       row_number() over(partition by c.contract_number order by JSON_VALUE(t.value, '$.periodStartDate')) as period_number,
       '05' as insured_sum_type,
       convert(varchar, CAST(JSON_VALUE(t.value, '$.periodStartDate') as date), 104) as period_start_date,
       convert(varchar, CAST(JSON_VALUE(t.value, '$.periodEndDate') as date), 104) as period_end_date,
       JSON_VALUE((select sp.value
                     from OPENJSON(JSON_QUERY((select r.value
                                                 from OPENJSON(JSON_QUERY(c.body, '$.risks')) r
                                                where JSON_VALUE(r.value, '$.risk.riskCode') = 'CD42204'),
                                               '$.riskInsuredSumByPeriod')) sp
                    where JSON_VALUE(sp.value, '$.periodStartDate') = JSON_VALUE(t.value, '$.periodStartDate')),
                  '$.insuredSum') as insured_sum
  FROM daily_contracts c
         CROSS APPLY OPENJSON(JSON_QUERY(c.body, '$.surrenderValues')) t
)
select contract_number,
       '0001' as contract_version,
       '03' as period_type,
       period_number,
       insured_sum_type,
       period_start_date,
       period_end_date,
       insured_sum
  from insured_sums
 where insured_sum is not null
)
GO

-- examples
/*
-- data on date
select *
  from dbo.impl_get_credit_aggregated_sums('2022-02-28')
 order by contract_number, insured_sum_type, period_number

-- data by contract on any date
select *
  from dbo.impl_get_credit_aggregated_sums(null)
 where contract_number in ('88000-000000370')
 order by contract_number, insured_sum_type, period_number
*/