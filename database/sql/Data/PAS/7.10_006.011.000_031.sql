IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[ORG_IMPL].[SERVICE_PROVIDER_INFO_SAT]') AND TYPE IN (N'U'))
BEGIN

IF COL_LENGTH('ORG_IMPL.SERVICE_PROVIDER_INFO_SAT','TAB_NUMBER') IS NULL
BEGIN
ALTER TABLE ORG_IMPL.SERVICE_PROVIDER_INFO_SAT ADD TAB_NUMBER nvarchar(max)
END

END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[ORG_IMPL].[SERVICE_PROVIDER_INFO_SAT]') AND TYPE IN (N'U'))
BEGIN

update spis
   set spis.tab_number = json_value(sp.body, '$.tabNumber')
  from org_impl.service_provider_info_sat spis,
       org_impl.service_provider_hub sph,
       org.service_provider sp
 where sph.service_provider_hkey = spis.service_provider_info_hkey
   and sp.service_provider_code = sph.service_provider_code

END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PTY_IMPL].[PARTY_INFO_SAT]') AND TYPE IN (N'U'))
BEGIN

IF COL_LENGTH('PTY_IMPL.PARTY_INFO_SAT','IS_NON_RESIDENT') IS NULL
BEGIN
ALTER TABLE PTY_IMPL.PARTY_INFO_SAT ADD IS_NON_RESIDENT bit
END

IF COL_LENGTH('PTY_IMPL.PARTY_INFO_SAT','INNKIO') IS NULL
BEGIN
ALTER TABLE PTY_IMPL.PARTY_INFO_SAT ADD INNKIO nvarchar(256)
END

IF COL_LENGTH('PTY_IMPL.PARTY_INFO_SAT','REGISTRATION_COUNTRY_ALFA2') IS NULL
BEGIN
ALTER TABLE PTY_IMPL.PARTY_INFO_SAT ADD REGISTRATION_COUNTRY_ALFA2 nvarchar(256)
END

IF COL_LENGTH('PTY_IMPL.PARTY_INFO_SAT','REGISTRATION_COUNTRY_CODE') IS NULL
BEGIN
ALTER TABLE PTY_IMPL.PARTY_INFO_SAT ADD REGISTRATION_COUNTRY_CODE nvarchar(256)
END

IF COL_LENGTH('PTY_IMPL.PARTY_INFO_SAT','SNILS') IS NULL
BEGIN
ALTER TABLE PTY_IMPL.PARTY_INFO_SAT ADD SNILS nvarchar(256)
END

IF COL_LENGTH('PTY_IMPL.PARTY_INFO_SAT','TIN') IS NULL
BEGIN
ALTER TABLE PTY_IMPL.PARTY_INFO_SAT ADD TIN nvarchar(256)
END

IF COL_LENGTH('PTY_IMPL.PARTY_INFO_SAT','TRADING_PARTNER_CODE') IS NULL
BEGIN
ALTER TABLE PTY_IMPL.PARTY_INFO_SAT ADD TRADING_PARTNER_CODE int
END

IF COL_LENGTH('PTY_IMPL.PARTY_INFO_SAT','BANKRUPTCY_PROCEDURE') IS NULL
BEGIN
ALTER TABLE PTY_IMPL.PARTY_INFO_SAT ADD BANKRUPTCY_PROCEDURE bit
END

IF COL_LENGTH('PTY_IMPL.PARTY_INFO_SAT','LICENSE_REVOKED') IS NULL
BEGIN
ALTER TABLE PTY_IMPL.PARTY_INFO_SAT ADD LICENSE_REVOKED bit
END

IF COL_LENGTH('PTY_IMPL.PARTY_INFO_SAT','UNFULFILLED_OBLIGATION_GU') IS NULL
BEGIN
ALTER TABLE PTY_IMPL.PARTY_INFO_SAT ADD UNFULFILLED_OBLIGATION_GU bit
END

IF COL_LENGTH('PTY_IMPL.PARTY_INFO_SAT','UNFULFILLED_OBLIGATION_CB') IS NULL
BEGIN
ALTER TABLE PTY_IMPL.PARTY_INFO_SAT ADD UNFULFILLED_OBLIGATION_CB bit
END

END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PTY_IMPL].[PARTY_INFO_SAT]') AND TYPE IN (N'U'))
BEGIN

update pis
   set pis.is_non_resident = json_value(p.body, '$.partyGeneralData.isNonResident'),
       pis.innkio = json_value(p.body, '$.partyGeneralData.INNKIO'),
       pis.registration_country_alfa2 = json_value(p.body, '$.partyGeneralData.registrationCountry.alfa2'),
       pis.registration_country_code = json_value(p.body, '$.partyGeneralData.registrationCountry.countryCode'),
       pis.snils = json_value(p.body, '$.partyPersonData.SNILS'),
       pis.tin = json_value(p.body, '$.partyGeneralData.TIN'),
       pis.trading_partner_code = json_value(p.body, '$.partyGeneralData.tradingPartnerCode'),
       pis.bankruptcy_procedure = json_value(p.body, '$.partyOrganisationData.bankruptcyProcedure'),
       pis.license_revoked = json_value(p.body, '$.partyOrganisationData.licenseRevoked'),
       pis.unfulfilled_obligation_gu = json_value(p.body, '$.partyOrganisationData.unfulfilledObligationByGuarantee'),
       pis.unfulfilled_obligation_cb = json_value(p.body, '$.partyOrganisationData.unfulfilledObligationCB')
  from pty_impl.party_hub ph,
       pty_impl.party_info_sat pis,
       pty.party p
 where ph.party_hkey = pis.party_info_hkey
   and ph.party_code = p.party_code

END
GO