with temp_query as
(
select t.*,
       sv_key + 1 as new_sv_key
  from
(
select c.contract_number,
       c.body,
       sv.[key] as sv_key,
       max(sv.[key]) over(partition by c.contract_number) as max_sv_key,
       json_value(sv.value, '$.periodStartDate') as periodStartDate,
       json_value(sv.value, '$.periodEndDate') as periodEndDate
  from pas.contract c
       join pas_impl.policy_hub ph on ph.contract_number = c.contract_number
       join pas_impl.policy_sat_latest ps on ps.policy_hkey = ph.policy_hkey
       cross apply openjson(json_query(c.body, '$.surrenderValues')) sv
 where day(ps.start_date) = day(ps.end_date) 
) t
 where t.sv_key = t.max_sv_key
   and day(t.periodStartDate) = day(t.periodEndDate)
   and not periodStartDate = periodEndDate
)
--select * from temp_query
update c
   set c.body = json_modify(
                json_modify(
                json_modify(
                json_modify(
                json_modify(
                json_modify(c.body,
                            'append $.surrenderValues', json_query('{}')),
                            '$.surrenderValues['+cast(tq.new_sv_key as nvarchar)+'].periodStartDate', tq.periodEndDate),
                            '$.surrenderValues['+cast(tq.new_sv_key as nvarchar)+'].periodEndDate', tq.periodEndDate),
                            '$.surrenderValues['+cast(tq.new_sv_key as nvarchar)+'].surrenderValue', 0),
                            '$.surrenderValues['+cast(tq.new_sv_key as nvarchar)+'].periodSurrenderValue', 0),
                            '$.surrenderValues['+cast(tq.sv_key as nvarchar)+'].periodEndDate', convert(nvarchar, DATEADD(day,-1,tq.periodEndDate), 23))
  from pas.contract c
       join temp_query tq on tq.contract_number = c.contract_number