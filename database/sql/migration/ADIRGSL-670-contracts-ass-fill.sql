insert into pas_impl.policy_risks_sat
(policy_risks_hkey, load_date, record_source, hash_diff, risk_code, start_date, end_date, premium, insured_sum, is_deleted)
select ph.policy_hkey,
       psl.load_date,
       N'ADINSURE',
       CONVERT(CHAR(32), HashBytes('MD5', cast(newid() as varbinary(max))), 2),
       json_value(r.value, '$.risk.riskCode'),
       json_value(r.value, '$.startDate'),
       json_value(r.value, '$.endDate'),
       json_value(r.value, '$.riskPremium'),
       json_value(r.value, '$.riskInsuredSum'),
       0
  from pas_impl.POLICY_HUB ph,
       pas_impl.policy_sat_latest psl,
       pas.contract p
       cross apply openjson(json_query(p.body, '$.risks')) r
 where p.contract_number = ph.contract_number
   and ph.policy_hkey = psl.policy_hkey
   and not exists (select * from pas_impl.policy_risks_sat prs where prs.policy_risks_hkey = ph.policy_hkey)
GO

insert into pas_impl.quote_risks_sat
(quote_risks_hkey, load_date, record_source, hash_diff, risk_code, start_date, end_date, premium, insured_sum, is_deleted)
select ph.quote_hkey,
       psl.load_date,
       N'ADINSURE',
       CONVERT(CHAR(32), HashBytes('MD5', cast(newid() as varbinary(max))), 2),
       json_value(r.value, '$.risk.riskCode'),
       json_value(r.value, '$.startDate'),
       json_value(r.value, '$.endDate'),
       json_value(r.value, '$.riskPremium'),
       json_value(r.value, '$.riskInsuredSum'),
       0
  from pas_impl.quote_HUB ph,
       pas_impl.quote_sat_latest psl,
       pas.contract p
       cross apply openjson(json_query(p.body, '$.risks')) r
 where p.contract_number = ph.contract_number
   and ph.quote_hkey = psl.quote_hkey
   and not exists (select * from pas_impl.quote_risks_sat prs where prs.quote_risks_hkey = ph.quote_hkey)
GO

insert into pas_impl.amendment_lines_sat
(amendment_lines_hkey, load_date, record_source, hash_diff, type, sum, is_deleted)
select ph.amendment_hkey,
       psl.load_date,
       N'ADINSURE',
       CONVERT(CHAR(32), HashBytes('MD5', cast(newid() as varbinary(max))), 2),
       json_value(r.value, '$.paymentLineType'),
       json_value(r.value, '$.paymentLineSum'),
       0
  from pas_impl.amendment_hub ph,
       pas_impl.amendment_sat_latest psl,
       pas.contract p
       cross apply openjson(json_query(p.body, '$.paymentAmendmentConditions.paymentLines')) r
 where p.contract_number = ph.amendment_number
   and ph.amendment_hkey = psl.amendment_hkey
   and not exists (select * from pas_impl.amendment_lines_sat prs where prs.amendment_lines_hkey = ph.amendment_hkey)
GO