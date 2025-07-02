IF EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[impl_ldwh_zpartner_view]'))
BEGIN
DROP VIEW [dbo].[impl_ldwh_zpartner_view];
END
GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[impl_ldwh_zpartner]') AND type IN (N'FN', N'FS', N'FT', N'TF', N'IF'))
BEGIN
DROP FUNCTION [dbo].[impl_ldwh_zpartner];
END
GO

create function impl_ldwh_zpartner()
returns table
as
return(
with levels (organisation_unit_id, top_parent, level)
as
(
select oup.organisation_unit_id,
       oup.organisation_unit_id as top_parent,
       0 as level
  from org.organisation_unit oup
 where oup.parent_id is null
 union all
select ou.organisation_unit_id,
       c.top_parent as top_parent,
       level + 1 as level
  from org.organisation_unit ou,
       levels c
 where ou.parent_id = c.organisation_unit_id
),
org_units as (
select ou.organisation_unit_id as organisationUnitId,
       ou.organisation_unit_code as organisationUnitCode,
       ousat.name as organisationUnitName,
       ousat.full_name as organisationUnitFullName,
       ousat.code as organisationUnitBusinessCode,
       ou.parent_id as parentId,
       oup.organisation_unit_code as parentCode,
       oupsat.name as parentName,
       oupsat.full_name as parentFullName,
       oupsat.code as parentBusinessCode,
       oupt.organisation_unit_id as topParentId,
       oupt.organisation_unit_code as topParentCode,
       ouptsat.name as topParentName,
       ouptsat.full_name as topParentFullName,
       ouptsat.code as topParentBusinessCode,
       l.level
  from org.organisation_unit ou
       join levels l on ou.organisation_unit_id = l.organisation_unit_id
       left join org_impl.organisation_unit_hub ouhub on ou.organisation_unit_code = ouhub.organisation_unit_code
       left join org_impl.organisation_unit_info_sat_latest ousat on ouhub.organisation_unit_hkey = ousat.organisation_unit_info_hkey
       left join org.organisation_unit oup on oup.organisation_unit_id = ou.parent_id
       left join org_impl.organisation_unit_hub ouphub on oup.organisation_unit_code = ouphub.organisation_unit_code
       left join org_impl.organisation_unit_info_sat_latest oupsat on ouphub.organisation_unit_hkey = oupsat.organisation_unit_info_hkey
       left join org.organisation_unit oupt on oupt.organisation_unit_id = l.top_parent
       left join org_impl.organisation_unit_hub oupthub on oupt.organisation_unit_code = oupthub.organisation_unit_code
       left join org_impl.organisation_unit_info_sat_latest ouptsat on oupthub.organisation_unit_hkey = ouptsat.organisation_unit_info_hkey
),
party_actual_addresses as (
select pas2.*
  from (select pas.*, max(pas.actual_from) over(partition by pas.party_addresses_hkey, pas.address_type_code) as max_actual_from
          from pty_impl.party_addresses_sat_latest pas
         where pas.is_deleted = 0) pas2
 where pas2.actual_from = pas2.max_actual_from
),
party_actual_documents as (
select pds2.*,
       case pds2.doc_type_code
       when 'passport' then '001'
       when 'foreignTravelPassport' then '002'
       when 'foreignCitPassport' then '003'
       when 'militaryID' then '005'
       when 'driverID' then '006'
       when 'birthCertificate' then '007'
       when 'incurredIdentityCard' then '009'
       else 'NO_MAPPING'
       end as doc_type_code_mapped
  from (select pds.*, max(pds.issue_date) over(partition by pds.party_documents_hkey, pds.doc_type_code) as max_issue_date
          from pty_impl.party_documents_sat_latest pds
         where pds.is_deleted = 0) pds2
 where pds2.issue_date = pds2.max_issue_date
),
agent_agreements as (
select * from
(
-- need to select exactly 1 AA for agent
select aa.agent_agreement_id,
       aa.agent_agreement_number,
       aa.seq_number,
       aa.source_entity_id,
       --max(aa.seq_number) over(partition by isnull(aa.source_entity_id, aa.agent_agreement_id)) as max_seq_number,
       max(aa.agent_agreement_number) over(partition by aapl.service_provider_hkey) as max_agent_agreement_number,
       aapl.service_provider_hkey,
       aaps.role,
       aas.cb_agent_type_code,
       aas.load_date
  from pas.agent_agreement aa
       join pas_impl.aa_hub aah on aah.aa_number = aa.agent_agreement_number
       join pas_impl.aa_sat_latest aas on aas.aa_hkey = aah.aa_hkey
       join pas_impl.aa_participant_link aapl on aapl.aa_hkey = aah.aa_hkey
       join pas_impl.aa_participant_sat_latest aaps on aaps.aa_participant_hkey = aapl.aa_participant_hkey
) t
 where agent_agreement_number = max_agent_agreement_number
)
select ph.PARTY_CODE,
       spisl.tab_number as ZPART_TN,
       case ou.topParentBusinessCode
         when '1' then 1
         else 0
       end as ZPART_OWN,
       ~pisl.is_non_resident as ZRESIDENT,
       case aa.role
         when 'Agent' then 1
         else 0
       end as ZAGENT_FL,
       null as ZLEGAL,
       null as ZPART_ROL,
       null as ZPOSITION,
       null as ZDATE_IN,
       null as ZDATE_OUT,
       null as ZORG_UN_B,
       cast(pisl.date_of_birth as datetime) as [0DATEBIRTH],
       pisl.innkio as ZINN,
       pad.doc_type_code_mapped as ZREGD_TY,
       cast(pad.issue_date as datetime) as ZREGD_DI,
       pad.doc_series as ZREGD_SR,
       pad.doc_number as ZREGD_NM,
       replace(replace(pad.issuer_name, CHAR(13), ''), CHAR(10), '') as ZREGD_IS,
       case
         when pisl.natural_person_category is null or pisl.natural_person_category <> 'soleProprietor'
         then pisl.ogrnogrnip
       end as ZOGRN,
       pisl.registration_country_alfa2 as [0COUNTRY],
       pisl.registration_country_code as ZCOUNTRY,
       paa.full_address as ZADDRESS,
       pad.doc_type_code_mapped as ZREG_TYP,
       null as ZOCCUP,
       pisl.snils as ZSNILS,
       case
	       when pisl.natural_person_category = 'soleProprietor'
		     then pisl.ogrnogrnip
	     end as ZOGRNIP,
       null as ZNOTRECOD,
       null as ZREGNUMC,
       pisl.tin as ZTIN,
       null as ZREGNREC,
       null as ZMEDLIC,
       null as ZNAMEOCEN,
       null as ZNUMBOCEN,
       null as ZCRED_AG,
       null as ZCRED_RAT,
       null as ZRATPRIOR,
       null as ZGRPCREDQ,
       null as ZAGCODE,
       null as ZOBLP_ALC,
       null as [0BPARTNER],
       null as [0CUSTOMER],
       null as [0VENDOR],
       '9010' as [0COMP_CODE],
       pisl.trading_partner_code as ZCOMP_ID,
       pisl.bankruptcy_procedure as ZBANKRUPT,
       pisl.license_revoked as ZLICANNUL,
       pisl.unfulfilled_obligation_gu as ZOBLINTM2,
       pisl.unfulfilled_obligation_cb as ZOBLINTM1,
       pisl.license_revoked as ZLICREVOK,
       pisl.license_revoked as ZINFOEXCL,
       null as ZEXPOCEN,
       null as ZLOYD,
       case
         when pisl.last_name is null
         then 'UL'
         else case pisl.natural_person_category
                when 'soleProprietor'
                then 'IP'
                else 'FL'
              end
         end as ZCNTGTYP,
       aa.cb_agent_type_code as ZTYPEBR,
       null as ZCATCNTRA,
       ph.party_code as ZPARTNER,
       pisl.FULL_NAME,
       dbo.impl_sap_date((select max(c) from (values (pisl.load_date), (spisl.load_date), (aa.load_date), (paa.load_date), (pad.load_date)) as t(c))) as UPDATED_ON
  from pty_impl.party_hub ph
       left join pty_impl.party_info_sat_latest pisl on pisl.party_info_hkey = ph.party_hkey
       left join org_impl.service_provider_info_sat_latest spisl on spisl.party_code = ph.party_code
       left join org_units ou on ou.organisationunitcode = spisl.organisation_unit_code
       left join agent_agreements aa on spisl.service_provider_info_hkey = aa.service_provider_hkey
       left join party_actual_addresses paa on paa.party_addresses_hkey = ph.party_hkey and paa.address_type_code = N'R'
       left join party_actual_documents pad on pad.party_documents_hkey = ph.party_hkey and pad.doc_type_code = N'passport'
 where 1=1
)
GO

create view IMPL_LDWH_ZPARTNER_VIEW
as
select * from impl_ldwh_zpartner()
GO

-- examples
/*
select * from dbo.impl_ldwh_zpartner()

select * from IMPL_LDWH_ZPARTNER_VIEW
*/