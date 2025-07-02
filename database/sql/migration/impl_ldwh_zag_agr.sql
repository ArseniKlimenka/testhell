IF EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[impl_ldwh_zag_agr_view]'))
BEGIN
DROP VIEW [dbo].[impl_ldwh_zag_agr_view];
END
GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[impl_ldwh_zag_agr]') AND type IN (N'FN', N'FS', N'FT', N'TF', N'IF'))
BEGIN
DROP FUNCTION [dbo].[impl_ldwh_zag_agr];
END
GO

create function impl_ldwh_zag_agr()
returns table
as
return(
select 
	aa.agent_agreement_number				as ZAG_AGR,
	upper(isnull(iasl.external_number, json_value(aa.body, '$.mainAttributes.externalDocumentNumber')))
											as ZAG_AGREX,
	aa.seq_number							as ZAVERSNUM,
	cast(aa.sys_created_on as datetime)		as ZVERS_DAT,
	case json_value(aa.body, '$.mainAttributes.salesChannel.code')
		when '1' then '0'
		when '2' then '1'
		when '3' then '2'
		when '4' then '3'
		when '5' then '5'
		when '6' then '9'
		when '7' then '10'
		else null
	end										as ZDISTR_CH,
	spis.party_code							as ZPARTNER,
	isnull(iasl.mvz_number, json_value(aa.body, '$.organisation.mvzNumber'))
											as ZORG_UNIT,
	null									as ZFILIAL,
	'2'										as ZAGR_TYPE,
	cast(isnull(iasl.conclusion_date, json_value(aa.body, '$.validity.conclusionDate')) as datetime)
											as ZSIGNDATE,
	cast(isnull(asl.start_date, json_value(aa.body, '$.validity.startDate')) as datetime)
											as ZAGR_DATE,
	null									as ZCOMM_CL,
	case aasl.amendment_type when 'CancellationAmendment' then '001' else null end
											as ZEND_REAS,
	null									as ZDEL_IND,
	cast(isnull(asl.end_date, json_value(aa.body, '$.validity.endDate')) as datetime)
											as ZEND_DATE,
	null									as ZPART_TN,
	null									as ZPART_OWN,
	null									as ZORG_UN_B,
	null									as ZDATE_IN,
	null									as ZDATE_OUT,
	null									as ZPOSITION,
	isnull(iasl.cb_agent_type_code, json_value(aa.body, '$.mainAttributes.cbAgentType.code'))
											as ZAGTY_LF,
	case ps.code_name								
		when 'Draft' then '000'								
		when 'Activated' then '001'								
		when 'Annulled' then '002'								
		when 'Cancelled' then '003'								
		when 'PortfolioMovement' then '004'
	end										as ZAGR_STAT,
	null									as ZNM_CHM,
	isnull(iasl.agency_code, json_value(aa.body, '$.mainAttributes.agency.code'))
											as ZAGENCY,
	null									as ZAG_STAT,
	null									as ZNEWP,
	null									as ZDATPR,
	null									as ZEXPERT,
	null									as ZSALE_ID,
	case isnull(iasl.is_personal_business, json_value(aa.body, '$.mainAttributes.isPersonalBusiness')) when 1 then 'X' else null end
											as ZAG_FIB,
	null									as ZPART_TNV,
	null									as ZAG_SUBAG,
	dbo.impl_sap_date((select max(c) from (values (aa.sys_updated_on), (asl.load_date), (aasl.load_date)) as t(c)))
											as UPDATED_ON
  from pas.agent_agreement aa
       left join pas_impl.aa_hub ah on ah.aa_number = aa.agent_agreement_number
       join cfg.process_state ps on ps.process_state_id = aa.state_id
       left join pas_impl.aa_base_sat_latest asl on asl.aa_base_hkey = ah.aa_hkey
       left join pas_impl.aa_sat_latest iasl on iasl.aa_hkey = ah.aa_hkey
       left join pas_impl.aa_amendment_link aal on aal.amendment_hkey = ah.aa_hkey
       left join pas_impl.aa_amendment_sat_latest aasl on aasl.aa_amendment_hkey = aal.agreement_hkey
       left join pas_impl.aa_participant_link pl on pl.aa_hkey = ah.aa_hkey
       left join org_impl.service_provider_hub sph on sph.service_provider_hkey = pl.service_provider_hkey or sph.service_provider_code = json_value(aa.body, '$.participants.agent.serviceProviderCode')
       left join org_impl.service_provider_info_sat_latest spis on spis.service_provider_info_hkey = sph.service_provider_hkey
)
GO

create view IMPL_LDWH_ZAG_AGR_VIEW
as
select * from impl_ldwh_zag_agr()
GO

-- examples
/*
select * from dbo.impl_ldwh_zag_agr()

select * from IMPL_LDWH_ZAG_AGR_VIEW
*/