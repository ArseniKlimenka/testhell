-- ass tables update migration
IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[QUOTE_SAT]') AND TYPE IN (N'U'))
BEGIN

IF COL_LENGTH('PAS_IMPL.QUOTE_SAT','CREDIT_SUM') IS NOT NULL
BEGIN

update qs
   set qs.CREDIT_SUM = case
                         when TRY_CONVERT(decimal(15,2), json_value(c.body, '$.creditContract.creditSum')) IS NOT NULL
                         then CONVERT(decimal(15,2), json_value(c.body, '$.creditContract.creditSum'))
                         else NULL
				               end
  from pas_impl.quote_sat qs
			 join pas_impl.quote_hub qh on qh.quote_hkey = qs.quote_hkey
			 join pas.contract c on c.contract_number = qh.contract_number

END

IF COL_LENGTH('PAS_IMPL.QUOTE_SAT','CREDIT_SUM_NET') IS NOT NULL
BEGIN

update qs
   set qs.CREDIT_SUM_NET = case
                             when TRY_CONVERT(decimal(15,2), json_value(c.body, '$.creditContract.creditSumNet')) IS NOT NULL
                             then CONVERT(decimal(15,2), json_value(c.body, '$.creditContract.creditSumNet'))
                             else NULL
				                   end
  from pas_impl.quote_sat qs
			 join pas_impl.quote_hub qh on qh.quote_hkey = qs.quote_hkey
			 join pas.contract c on c.contract_number = qh.contract_number

END

IF COL_LENGTH('PAS_IMPL.QUOTE_SAT','CREDIT_RATE') IS NOT NULL
BEGIN

update qs
   set qs.CREDIT_RATE = case
                          when TRY_CONVERT(decimal(15,4), json_value(c.body, '$.creditContract.creditRate')) IS NOT NULL
                          then CONVERT(decimal(15,4), json_value(c.body, '$.creditContract.creditRate'))
                          else NULL
				                end
  from pas_impl.quote_sat qs
			 join pas_impl.quote_hub qh on qh.quote_hkey = qs.quote_hkey
			 join pas.contract c on c.contract_number = qh.contract_number

END

IF COL_LENGTH('PAS_IMPL.QUOTE_SAT','ANNUITY_PAYMENT_SUM') IS NOT NULL
BEGIN

update qs
   set qs.ANNUITY_PAYMENT_SUM = case
                                  when TRY_CONVERT(decimal(15,2), json_value(c.body, '$.creditContract.annuityPaymentSum')) IS NOT NULL
                                  then CONVERT(decimal(15,2), json_value(c.body, '$.creditContract.annuityPaymentSum'))
                                  else NULL
				                        end
  from pas_impl.quote_sat qs
			 join pas_impl.quote_hub qh on qh.quote_hkey = qs.quote_hkey
			 join pas.contract c on c.contract_number = qh.contract_number

END

IF COL_LENGTH('PAS_IMPL.QUOTE_SAT','CREDIT_PROGRAM_ID') IS NOT NULL
BEGIN

update qs
   set qs.CREDIT_PROGRAM_ID = json_value(c.body, '$.creditProgram.creditProgramId')
  from pas_impl.quote_sat qs
			 join pas_impl.quote_hub qh on qh.quote_hkey = qs.quote_hkey
			 join pas.contract c on c.contract_number = qh.contract_number

END

END
GO


IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[POLICY_SAT]') AND TYPE IN (N'U'))
BEGIN

IF COL_LENGTH('PAS_IMPL.POLICY_SAT','CREDIT_SUM') IS NOT NULL
BEGIN

update qs
   set qs.CREDIT_SUM = case
                         when TRY_CONVERT(decimal(15,2), json_value(c.body, '$.creditContract.creditSum')) IS NOT NULL
                         then CONVERT(decimal(15,2), json_value(c.body, '$.creditContract.creditSum'))
                         else NULL
				               end
  from pas_impl.POLICY_SAT qs
			 join pas_impl.POLICY_HUB qh on qh.policy_hkey = qs.policy_hkey
			 join pas.contract c on c.contract_number = qh.contract_number

END

IF COL_LENGTH('PAS_IMPL.POLICY_SAT','CREDIT_SUM_NET') IS NOT NULL
BEGIN

update qs
   set qs.CREDIT_SUM_NET = case
                             when TRY_CONVERT(decimal(15,2), json_value(c.body, '$.creditContract.creditSumNet')) IS NOT NULL
                             then CONVERT(decimal(15,2), json_value(c.body, '$.creditContract.creditSumNet'))
                             else NULL
				                   end
  from pas_impl.POLICY_SAT qs
			 join pas_impl.POLICY_HUB qh on qh.policy_hkey = qs.policy_hkey
			 join pas.contract c on c.contract_number = qh.contract_number

END

IF COL_LENGTH('PAS_IMPL.POLICY_SAT','CREDIT_RATE') IS NOT NULL
BEGIN

update qs
   set qs.CREDIT_RATE = case
                          when TRY_CONVERT(decimal(15,4), json_value(c.body, '$.creditContract.creditRate')) IS NOT NULL
                          then CONVERT(decimal(15,4), json_value(c.body, '$.creditContract.creditRate'))
                          else NULL
				                end
  from pas_impl.POLICY_SAT qs
			 join pas_impl.POLICY_HUB qh on qh.policy_hkey = qs.policy_hkey
			 join pas.contract c on c.contract_number = qh.contract_number

END

IF COL_LENGTH('PAS_IMPL.POLICY_SAT','ANNUITY_PAYMENT_SUM') IS NOT NULL
BEGIN

update qs
   set qs.ANNUITY_PAYMENT_SUM = case
                                  when TRY_CONVERT(decimal(15,2), json_value(c.body, '$.creditContract.annuityPaymentSum')) IS NOT NULL
                                  then CONVERT(decimal(15,2), json_value(c.body, '$.creditContract.annuityPaymentSum'))
                                  else NULL
				                        end
  from pas_impl.POLICY_SAT qs
			 join pas_impl.POLICY_HUB qh on qh.policy_hkey = qs.policy_hkey
			 join pas.contract c on c.contract_number = qh.contract_number

END

IF COL_LENGTH('PAS_IMPL.POLICY_SAT','CREDIT_PROGRAM_ID') IS NOT NULL
BEGIN

update qs
   set qs.CREDIT_PROGRAM_ID = json_value(c.body, '$.creditProgram.creditProgramId')
  from pas_impl.POLICY_SAT qs
			 join pas_impl.POLICY_HUB qh on qh.policy_hkey = qs.policy_hkey
			 join pas.contract c on c.contract_number = qh.contract_number

END

END
GO