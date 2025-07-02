IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[QUOTE_SAT]') AND TYPE IN (N'U'))
BEGIN

IF COL_LENGTH('PAS_IMPL.QUOTE_SAT','RISK_PREMIUM') IS NOT NULL
BEGIN

update qs
   set qs.risk_premium = case
                           when TRY_CONVERT(decimal(15,2), json_value(c.body, '$.basicConditions.riskPremium')) IS NOT NULL
                           then CONVERT(decimal(15,2), json_value(c.body, '$.basicConditions.riskPremium')  )
                           else 0
				         end
  from pas_impl.quote_sat qs
			 join pas_impl.quote_hub qh on qh.quote_hkey = qs.quote_hkey
			 join pas.contract c on c.contract_number = qh.contract_number

END

IF COL_LENGTH('PAS_IMPL.QUOTE_SAT','RISKS_MANUAL_CORRECTION') IS NOT NULL
BEGIN

update qs
   set qs.risks_manual_correction = json_value(c.body, '$.risksCorrection.manualCorrection')
  from pas_impl.quote_sat qs
			 join pas_impl.quote_hub qh on qh.quote_hkey = qs.quote_hkey
			 join pas.contract c on c.contract_number = qh.contract_number

END

IF COL_LENGTH('PAS_IMPL.QUOTE_SAT','RISK_PREMIUM_ALL') IS NOT NULL
BEGIN

update qs
   set qs.risk_premium_all = json_value(c.body, '$.paymentPlan[0].paymentSum')
  from pas_impl.quote_sat qs
			 join pas_impl.quote_hub qh on qh.quote_hkey = qs.quote_hkey
			 join pas.contract c on c.contract_number = qh.contract_number

END

IF COL_LENGTH('PAS_IMPL.QUOTE_SAT','HOLDER_EMAIL') IS NOT NULL
BEGIN

update qs
   set qs.holder_email = json_value(c.body, '$.policyHolder.partyData.partyBody.partyEmails[0].email')
  from pas_impl.quote_sat qs
			 join pas_impl.quote_hub qh on qh.quote_hkey = qs.quote_hkey
			 join pas.contract c on c.contract_number = qh.contract_number

END

IF COL_LENGTH('PAS_IMPL.QUOTE_SAT','INSURED_EMAIL') IS NOT NULL
BEGIN

update qs
   set qs.insured_email = json_value(c.body, '$.insuredPerson.partyData.partyBody.partyEmails[0].email')
  from pas_impl.quote_sat qs
			 join pas_impl.quote_hub qh on qh.quote_hkey = qs.quote_hkey
			 join pas.contract c on c.contract_number = qh.contract_number

END

END
GO


IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[POLICY_SAT]') AND TYPE IN (N'U'))
BEGIN

IF COL_LENGTH('PAS_IMPL.POLICY_SAT','RISKS_MANUAL_CORRECTION') IS NOT NULL
BEGIN

update ps
   set ps.risks_manual_correction = json_value(c.body, '$.risksCorrection.manualCorrection')
  from pas_impl.policy_sat ps
			 join pas_impl.policy_hub ph on ph.policy_hkey = ps.policy_hkey
			 join pas.contract c on c.contract_number = ph.contract_number

END

IF COL_LENGTH('PAS_IMPL.POLICY_SAT','RISK_PREMIUM_ALL') IS NOT NULL
BEGIN

update ps
   set ps.risk_premium_all = json_value(c.body, '$.paymentPlan[0].paymentSum')
  from pas_impl.policy_sat ps
			 join pas_impl.policy_hub ph on ph.policy_hkey = ps.policy_hkey
			 join pas.contract c on c.contract_number = ph.contract_number

END

IF COL_LENGTH('PAS_IMPL.POLICY_SAT','HOLDER_EMAIL') IS NOT NULL
BEGIN

update ps
   set ps.holder_email = json_value(c.body, '$.policyHolder.partyData.partyBody.partyEmails[0].email')
  from pas_impl.policy_sat ps
			 join pas_impl.policy_hub ph on ph.policy_hkey = ps.policy_hkey
			 join pas.contract c on c.contract_number = ph.contract_number

END

IF COL_LENGTH('PAS_IMPL.POLICY_SAT','INSURED_EMAIL') IS NOT NULL
BEGIN

update ps
   set ps.holder_email = json_value(c.body, '$.insuredPerson.partyData.partyBody.partyEmails[0].email')
  from pas_impl.policy_sat ps
			 join pas_impl.policy_hub ph on ph.policy_hkey = ps.policy_hkey
			 join pas.contract c on c.contract_number = ph.contract_number

END

END
GO