IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PTY_IMPL].[PARTY_HUB]') AND TYPE IN (N'U'))
BEGIN

with contracts_for_correction as (
select *
  from pas.contract c
 where not json_value(c.body, '$.technicalInformation.creatorUsername') = json_value(c.body, '$.initiator.userName')
   and not json_value(c.body, '$.technicalInformation.isCreatedByOperations') = 'true'
),
users_data as (
SELECT AU.APPLICATION_USER_ID,
       AU.USERNAME,
       AUCP.VALUE AS PARTY_CODE,
       PISL.FULL_NAME AS PARTY_FULL_NAME,
       SP.SERVICE_PROVIDER_CODE AS EMPLOYEE_CODE,
       OUH.ORGANISATION_UNIT_CODE,
       OUISL.NAME AS ORGANISATION_UNIT_NAME,
       SPISL.VISIBILITY_TYPE
  FROM ORG.APPLICATION_USER AU,
       ORG.APPLICATION_USER_CLAIM AUCP,
       ORG.SERVICE_PROVIDER SP,
       CFX.PUBLISHED_ARTIFACT PA,
       ORG_IMPL.SERVICE_PROVIDER_HUB SPH,
       ORG_IMPL.SERVICE_PROVIDER_INFO_SAT_LATEST SPISL,
       ORG_IMPL.ORGANISATION_UNIT_HUB OUH,
       ORG_IMPL.ORGANISATION_UNIT_INFO_SAT_LATEST OUISL,
       PTY_IMPL.PARTY_HUB PH,
       PTY_IMPL.PARTY_INFO_SAT_LATEST PISL
 WHERE 1=1 
   AND AU.APPLICATION_USER_ID = AUCP.APPLICATION_USER_ID
   AND AUCP.CLAIM_TYPE = N'PartyCode'
   AND AUCP.VALUE = SP.PARTY_CODE
   AND SP.PUBLISHED_ARTIFACT_ID = PA.PUBLISHED_ARTIFACT_ID
   AND PA.CODE_NAME = N'Employee'
   AND SPH.SERVICE_PROVIDER_CODE = SP.SERVICE_PROVIDER_CODE
   AND SPISL.SERVICE_PROVIDER_INFO_HKEY = SPH.SERVICE_PROVIDER_HKEY
   AND OUH.ORGANISATION_UNIT_CODE = SPISL.ORGANISATION_UNIT_CODE
   AND OUISL.ORGANISATION_UNIT_INFO_HKEY = OUH.ORGANISATION_UNIT_HKEY
   AND AUCP.VALUE = PH.PARTY_CODE
   AND PH.PARTY_HKEY = PISL.PARTY_INFO_HKEY
)
update c
   set c.common_body = json_modify(
                       json_modify(
                       json_modify(
                       json_modify(
                       json_modify(
                       json_modify(c.common_body,
                         '$.attributes.initiatorName', ud.party_full_name),
                         '$.attributes.initiatorOrganisationUnitName', ud.organisation_unit_name),
                         '$.organisation.organisationalUnit', lower(convert(nvarchar(max), ud.organisation_unit_code))),
                         '$.organisation.policyAdministrator', lower(convert(nvarchar(max), ud.application_user_id))),
                         '$.organisation.salesResponsible', ud.employee_code),
                         '$.organisation.salesInitial', ud.employee_code),
       c.body = json_modify(
                json_modify(
                json_modify(
                json_modify(
                json_modify(
                json_modify(
                json_modify(c.body,
                  '$.initiator.userId', lower(convert(nvarchar(max), ud.application_user_id))),
                  '$.initiator.userName', ud.username),
                  '$.initiator.partyCode', ud.party_code),
                  '$.initiator.partyFullName', ud.party_full_name),
                  '$.initiator.employeeCode', ud.employee_code),
                  '$.initiator.organisationUnitCode', lower(convert(nvarchar(max), ud.organisation_unit_code))),      
                  '$.initiator.organisationUnitName', ud.organisation_unit_name)
  from pas.contract c,
       contracts_for_correction cc,
       users_data ud
 where json_value(cc.body, '$.technicalInformation.creatorUsername') = ud.username
   and c.contract_number = cc.contract_number

END
GO

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[QUOTE_SAT]') AND TYPE IN (N'U'))
BEGIN

update ps
   set ps.initiator_username = json_value(c.body, '$.initiator.userName')
  from pas.contract c,
       pas_impl.quote_hub ph,
       pas_impl.quote_sat ps
 where ph.contract_number = c.contract_number
   and ph.quote_hkey = ps.quote_hkey

END
GO


IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[POLICY_SAT]') AND TYPE IN (N'U'))
BEGIN

update ps
   set ps.initiator_username = json_value(c.body, '$.initiator.userName')
  from pas.contract c,
       pas_impl.policy_hub ph,
       pas_impl.policy_sat ps
 where ph.contract_number = c.contract_number
   and ph.policy_hkey = ps.policy_hkey

END
GO