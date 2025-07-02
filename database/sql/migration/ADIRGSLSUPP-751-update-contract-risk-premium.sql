IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[QUOTE_SAT]') AND TYPE IN (N'U'))
BEGIN

	IF COL_LENGTH('PAS_IMPL.QUOTE_SAT','RISK_PREMIUM') IS NOT NULL
	BEGIN

	   update qs
	   set qs.risk_premium = case
							   when TRY_CONVERT(decimal(15,2), json_value(c.body, '$.paymentPlan[0].paymentSum')) IS NOT NULL
							   then CONVERT(decimal(15,2), json_value(c.body, '$.paymentPlan[0].paymentSum'))
							   else 0
							 end,
		   qs.load_date = GETDATE()
	  from pas_impl.quote_sat_latest qs
				 join pas_impl.quote_hub qh on qh.quote_hkey = qs.quote_hkey
				 join pas.contract c on c.contract_number = qh.contract_number

	END

	IF COL_LENGTH('PAS_IMPL.QUOTE_SAT','RISK_PREMIUM_ALL') IS NOT NULL
	BEGIN

	   update qs
	   set qs.risk_premium_all = json_value(c.body, '$.paymentPlan[0].paymentSum'),
		   qs.load_date = GETDATE()
	   from pas_impl.quote_sat_latest qs
				 join pas_impl.quote_hub qh on qh.quote_hkey = qs.quote_hkey
				 join pas.contract c on c.contract_number = qh.contract_number

	END

END
GO


IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[POLICY_SAT]') AND TYPE IN (N'U'))
BEGIN

	IF COL_LENGTH('PAS_IMPL.POLICY_SAT','RISK_PREMIUM') IS NOT NULL
	BEGIN

	   update ps
	   set ps.risk_premium = case
							   when TRY_CONVERT(decimal(15,2), json_value(c.body, '$.paymentPlan[0].paymentSum')) IS NOT NULL
							   then CONVERT(decimal(15,2), json_value(c.body, '$.paymentPlan[0].paymentSum')  )
							   else 0
							 end,
		   ps.load_date = GETDATE()
	  from pas_impl.policy_sat_latest ps
				 join pas_impl.policy_hub ph on ph.policy_hkey = ps.policy_hkey
				 join pas.contract c on c.contract_number = ph.contract_number

	END

	IF COL_LENGTH('PAS_IMPL.POLICY_SAT','RISK_PREMIUM_ALL') IS NOT NULL
	BEGIN

	   update ps
	   set ps.risk_premium_all = json_value(c.body, '$.paymentPlan[0].paymentSum'),
		   ps.load_date = GETDATE()
	   from pas_impl.policy_sat_latest ps
				 join pas_impl.policy_hub ph on ph.policy_hkey = ps.policy_hkey
				 join pas.contract c on c.contract_number = ph.contract_number

	END

END
GO

update с
set common_body = json_modify(json_modify(common_body, '$.attributes.riskPremiumAll', json_value(body, '$.paymentPlan[0].paymentSum')), '$.attributes.riskPremium', json_value(body, '$.paymentPlan[0].paymentSum')),
	sys_updated_on = GETDATE()
from pas.contract с
GO