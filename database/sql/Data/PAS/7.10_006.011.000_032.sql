IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[POLICY_SAT]') AND TYPE IN (N'U'))
BEGIN

IF COL_LENGTH('PAS_IMPL.POLICY_SAT','CURRENCY_CODE') IS NULL
BEGIN
ALTER TABLE PAS_IMPL.POLICY_SAT ADD CURRENCY_CODE nvarchar(100)
END

IF COL_LENGTH('PAS_IMPL.POLICY_SAT','INSURANCE_TERMS') IS NULL
BEGIN
ALTER TABLE PAS_IMPL.POLICY_SAT ADD INSURANCE_TERMS int
END

IF COL_LENGTH('PAS_IMPL.POLICY_SAT','INITIATOR_USERNAME') IS NULL
BEGIN
ALTER TABLE PAS_IMPL.POLICY_SAT ADD INITIATOR_USERNAME nvarchar(100)
END

END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[POLICY_SAT]') AND TYPE IN (N'U'))
BEGIN

update ps
   set ps.currency_code = json_value(c.body, '$.basicConditions.currency.currencyCode'),
       ps.insurance_terms = json_value(c.body, '$.basicConditions.insuranceTerms'),
       ps.initiator_username = json_value(c.body, '$.initiator.userName')
  from pas.contract c,
       pas_impl.policy_hub ph,
       pas_impl.policy_sat ps
 where ph.contract_number = c.contract_number
   and ph.policy_hkey = ps.policy_hkey

END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[QUOTE_SAT]') AND TYPE IN (N'U'))
BEGIN

IF COL_LENGTH('PAS_IMPL.QUOTE_SAT','CURRENCY_CODE') IS NULL
BEGIN
ALTER TABLE PAS_IMPL.QUOTE_SAT ADD CURRENCY_CODE nvarchar(100)
END

IF COL_LENGTH('PAS_IMPL.QUOTE_SAT','INSURANCE_TERMS') IS NULL
BEGIN
ALTER TABLE PAS_IMPL.QUOTE_SAT ADD INSURANCE_TERMS int
END

IF COL_LENGTH('PAS_IMPL.QUOTE_SAT','INITIATOR_USERNAME') IS NULL
BEGIN
ALTER TABLE PAS_IMPL.QUOTE_SAT ADD INITIATOR_USERNAME nvarchar(100)
END

END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[QUOTE_SAT]') AND TYPE IN (N'U'))
BEGIN

update qs
   set qs.currency_code = json_value(c.body, '$.basicConditions.currency.currencyCode'),
       qs.insurance_terms = json_value(c.body, '$.basicConditions.insuranceTerms'),
       qs.initiator_username = json_value(c.body, '$.initiator.userName')
  from pas.contract c,
       pas_impl.quote_hub qh,
       pas_impl.quote_sat qs
 where qh.contract_number = c.contract_number
   and qh.quote_hkey = qs.quote_hkey

END
GO