-- procedure for report filling
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[FILL_REPORT_TABLES]') AND type IN (N'P', N'RF', N'PC'))
BEGIN
DROP PROCEDURE [dbo].[FILL_REPORT_TABLES];
END
GO

CREATE PROCEDURE FILL_REPORT_TABLES
AS
BEGIN TRY
begin tran

--bfx_impl.report_org_structure
delete from pas_impl.report_org_structure;
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
t as (
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
       l.level,
       json_value(ou.body, '$.coach.employeeFullName') as coach,
       json_value(ou.body, '$.territorialChief.employeeFullName') as territorialChief,
       json_value(ou.body, '$.regionalChief.employeeFullName') as regionalChief
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
)
insert into pas_impl.report_org_structure
select * from t;

-- bfx_impl.report_verification_info
delete from pas_impl.report_verification_info;
with verification as (
select ph.contract_number,
	     vh.verification_number,
	     vs.state,
       vesl.errors_list
  from pas_impl.policy_hub ph
	     join pas_impl.policy_verification_link pvl on pvl.policy_hkey = ph.policy_hkey
	     join pas_impl.verification_hub vh on vh.verification_hkey = pvl.verification_hkey
	     join pas_impl.verification_sat_latest vs on vs.verification_hkey = pvl.verification_hkey  
       left join (select verification_error_hkey,
                         string_agg('(' + error_description_short + ') ' + error_description_full, '; ') as errors_list
                    from pas_impl.verification_error_sat_latest
                   where is_deleted = 0
                   group by verification_error_hkey) vesl on vesl.verification_error_hkey = vh.verification_hkey
)
insert into pas_impl.report_verification_info
select * from verification;

-- bfx_impl.report_contract
delete from pas_impl.report_contract;
insert into pas_impl.report_contract
select prod.product_group,
       sat.product_code,
       prod.description as product_description,
       sat.contract_number,
       sat.state,
       sat.issue_date,
       sat.start_date,
       sat.end_date,
       pf.description as payment_frequency_desc,
       sat.risk_premium,
       sat.holder_name as holder_name,
       sat.holder_email as holder_email,
       sat.insured_email as insured_email,
       pisl.full_name as initiator_name,
       sat.risks_manual_correction as non_standart_contract,
	     sat.insurance_terms,
	     cr.description as currency,
	     sat.risk_premium_all,
	     sat.holder_birth_date as holder_birth_date,
       sat.is_policy,
       sat.holder_code,
       sat.insured_code,
       sat.initiator_employee_code,
       sat.initiator_orgunit_code,
       sat.is_reinvest,
       sat.issue_form_code,
       spisl.is_personal_manager
  from (
        select 1 is_policy,
               hub.contract_number,
               satl.product_code,
               satl.initiator_orgunit_code,
               satl.issue_date,
               satl.start_date,
               satl.end_date,
               satl.holder_name,
               satl.holder_code,
               satl.insured_code,
               satl.initiator_employee_code,
               satl.state,
               satl.is_reinvest,
               satl.issue_form_code,
               satl.payment_frequency_code,
               satl.insurance_terms,
               satl.currency_code,
               satl.holder_birth_date,
               satl.risk_premium,
               satl.risks_manual_correction,
               satl.risk_premium_all,
               satl.holder_email,
               satl.insured_email
          from pas_impl.policy_hub hub
          join pas_impl.policy_sat_latest satl on satl.policy_hkey = hub.policy_hkey
        union all
        select 0 is_policy,
               hub.contract_number,
               satl.product_code,
               satl.initiator_orgunit_code,
               satl.issue_date,
               satl.start_date,
               satl.end_date,
               satl.holder_name,
               satl.holder_code,
               satl.insured_code,
               satl.initiator_employee_code,
               satl.state,
               satl.is_reinvest,
               satl.issue_form_code,
               satl.payment_frequency_code,
               satl.insurance_terms,
               satl.currency_code,
               satl.holder_birth_date,
               satl.risk_premium,
               satl.risks_manual_correction,
               satl.risk_premium_all,
               satl.holder_email,
               satl.insured_email
          from pas_impl.quote_hub hub
          join pas_impl.quote_sat_latest satl on satl.quote_hkey = hub.quote_hkey
       ) sat
       left join bfx_impl.products prod on prod.code = sat.product_code
       left join bfx_impl.payment_frequency pf on pf.code = sat.payment_frequency_code
       left join bfx.currency_ref cr on cr.currency_code = sat.currency_code
       left join org_impl.service_provider_hub sph on sph.service_provider_code = sat.initiator_employee_code
       left join org_impl.service_provider_info_sat_latest spisl on spisl.service_provider_info_hkey = sph.service_provider_hkey
       left join pty_impl.party_hub ph on ph.party_code = spisl.party_code
       left join pty_impl.party_info_sat_latest pisl on pisl.party_info_hkey = ph.party_hkey;

commit tran
END TRY
BEGIN CATCH
    ROLLBACK tran
    DECLARE @ErrorMessage NVARCHAR(4000); DECLARE @ErrorSeverity INT; DECLARE @ErrorState INT;
    SELECT @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = 1;
    RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState );
END CATCH;
GO