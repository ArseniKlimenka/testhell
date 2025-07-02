IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[POLICY_SAT]') AND TYPE IN (N'U'))
BEGIN
	IF COL_LENGTH('PAS_IMPL.POLICY_SAT','IS_REINVEST') IS NULL
	BEGIN
		ALTER TABLE PAS_IMPL.POLICY_SAT ADD IS_REINVEST bit
	END

	IF COL_LENGTH('PAS_IMPL.POLICY_SAT','ISSUE_FORM_CODE') IS NULL
	BEGIN
		ALTER TABLE PAS_IMPL.POLICY_SAT ADD ISSUE_FORM_CODE nvarchar(20)
	END
END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[POLICY_SAT]') AND TYPE IN (N'U'))
BEGIN
	update ps
	   set ps.is_reinvest = case when json_value(c.body, '$.basicConditions.isReinvest') = 'true' then 1 else 0 end,
		   ps.issue_form_code = json_value(c.body, '$.issueForm.code.issueFormCode')
	  from pas.contract c,
		   pas_impl.policy_hub ph,
		   pas_impl.policy_sat ps
	 where ph.contract_number = c.contract_number
	   and ph.policy_hkey = ps.policy_hkey
END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[QUOTE_SAT]') AND TYPE IN (N'U'))
BEGIN
	IF COL_LENGTH('PAS_IMPL.QUOTE_SAT','IS_REINVEST') IS NULL
	BEGIN
		ALTER TABLE PAS_IMPL.QUOTE_SAT ADD IS_REINVEST bit
	END

	IF COL_LENGTH('PAS_IMPL.QUOTE_SAT','ISSUE_FORM_CODE') IS NULL
	BEGIN
		ALTER TABLE PAS_IMPL.QUOTE_SAT ADD ISSUE_FORM_CODE nvarchar(20)
	END
END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[QUOTE_SAT]') AND TYPE IN (N'U'))
BEGIN
	update qs
	   set qs.is_reinvest = case when json_value(c.body, '$.basicConditions.isReinvest') = 'true' then 1 else 0 end,
	       qs.issue_form_code = json_value(c.body, '$.issueForm.code.issueFormCode')
	  from pas.contract c,
		   pas_impl.quote_hub qh,
		   pas_impl.quote_sat qs
	 where qh.contract_number = c.contract_number
	   and qh.quote_hkey = qs.quote_hkey
END
GO