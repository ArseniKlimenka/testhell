IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[POLICY_SAT]') AND TYPE IN (N'U'))
BEGIN
	IF COL_LENGTH('PAS_IMPL.POLICY_SAT','INITIATOR_EMPLOYEE_CODE') IS NULL
	BEGIN
		ALTER TABLE PAS_IMPL.POLICY_SAT ADD INITIATOR_EMPLOYEE_CODE nvarchar(100)
	END

	IF COL_LENGTH('PAS_IMPL.POLICY_SAT','INITIATOR_ORGUNIT_CODE') IS NULL
	BEGIN
		ALTER TABLE PAS_IMPL.POLICY_SAT ADD INITIATOR_ORGUNIT_CODE nvarchar(100)
	END
END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[POLICY_SAT]') AND TYPE IN (N'U'))
BEGIN
	update ps
	   set ps.initiator_employee_code = json_value(c.body, '$.initiator.employeeCode'),
		   ps.initiator_orgunit_code = json_value(c.body, '$.initiator.organisationUnitCode')
	  from pas.contract c,
		   pas_impl.policy_hub ph,
		   pas_impl.policy_sat ps
	 where ph.contract_number = c.contract_number
	   and ph.policy_hkey = ps.policy_hkey
END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[QUOTE_SAT]') AND TYPE IN (N'U'))
BEGIN
	IF COL_LENGTH('PAS_IMPL.QUOTE_SAT','INITIATOR_EMPLOYEE_CODE') IS NULL
	BEGIN
		ALTER TABLE PAS_IMPL.QUOTE_SAT ADD INITIATOR_EMPLOYEE_CODE nvarchar(100)
	END

	IF COL_LENGTH('PAS_IMPL.QUOTE_SAT','INITIATOR_ORGUNIT_CODE') IS NULL
	BEGIN
		ALTER TABLE PAS_IMPL.QUOTE_SAT ADD INITIATOR_ORGUNIT_CODE nvarchar(100)
	END
END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[QUOTE_SAT]') AND TYPE IN (N'U'))
BEGIN
	update qs
	   set qs.initiator_employee_code = json_value(c.body, '$.initiator.employeeCode'),
		   qs.initiator_orgunit_code = json_value(c.body, '$.initiator.organisationUnitCode')
	  from pas.contract c,
		   pas_impl.quote_hub qh,
		   pas_impl.quote_sat qs
	 where qh.contract_number = c.contract_number
	   and qh.quote_hkey = qs.quote_hkey
END
GO