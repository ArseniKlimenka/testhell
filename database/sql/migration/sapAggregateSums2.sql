IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[impl_get_credit_aggregated_sums2]') AND type IN (N'FN', N'FS', N'FT', N'TF', N'IF'))
BEGIN
DROP FUNCTION [dbo].[impl_get_credit_aggregated_sums2];
END
GO

create function impl_get_credit_aggregated_sums2(@date date)
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
select c.contract_number,
       json_value(t2.value, '$.periodNumber') as period_number,
       '01' as insured_sum_type,
       convert(varchar, cast(json_value(t2.value, '$.periodStartDate') as date), 104) as period_start_date,
       convert(varchar, cast(json_value(t2.value, '$.periodEndDate') as date), 104) as period_end_date,
       json_value(t2.value, '$.insuredSum') as insured_sum
  FROM daily_contracts c
         cross apply openjson(json_query(c.body, '$.risks')) t1
         cross apply openjson(json_query(t1.value, '$.riskInsuredSumByPeriod')) t2
 where json_value(t1.value, '$.risk.riskCode') = 'DLP42204'
union all
select c.contract_number,
       json_value(t2.value, '$.periodNumber') as period_number,
       '04' as insured_sum_type,
       convert(varchar, cast(json_value(t2.value, '$.periodStartDate') as date), 104) as period_start_date,
       convert(varchar, cast(json_value(t2.value, '$.periodEndDate') as date), 104) as period_end_date,
       json_value(t2.value, '$.insuredSum') as insured_sum
  FROM daily_contracts c
         cross apply openjson(json_query(c.body, '$.risks')) t1
         cross apply openjson(json_query(t1.value, '$.riskInsuredSumByPeriod')) t2
 where json_value(t1.value, '$.risk.riskCode') = 'D42204'
union all
select c.contract_number,
       json_value(t2.value, '$.periodNumber') as period_number,
       '05' as insured_sum_type,
       convert(varchar, cast(json_value(t2.value, '$.periodStartDate') as date), 104) as period_start_date,
       convert(varchar, cast(json_value(t2.value, '$.periodEndDate') as date), 104) as period_end_date,
       json_value(t2.value, '$.insuredSum') as insured_sum
  FROM daily_contracts c
         cross apply openjson(json_query(c.body, '$.risks')) t1
         cross apply openjson(json_query(t1.value, '$.riskInsuredSumByPeriod')) t2
 where json_value(t1.value, '$.risk.riskCode') = 'CD42204'      
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
  from dbo.impl_get_credit_aggregated_sums2('2022-02-28')
 order by contract_number, insured_sum_type, period_number

-- data by contract on any date
select *
  from dbo.impl_get_credit_aggregated_sums2(null)
 where contract_number in ('88000-000000370')
 order by contract_number, insured_sum_type, period_number
*/