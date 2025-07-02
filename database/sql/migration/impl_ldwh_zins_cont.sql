IF EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[impl_ldwh_zins_cont_view]'))
BEGIN
DROP VIEW [dbo].[impl_ldwh_zins_cont_view];
END
GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[impl_ldwh_zins_cont]') AND type IN (N'FN', N'FS', N'FT', N'TF', N'IF'))
BEGIN
DROP FUNCTION [dbo].[impl_ldwh_zins_cont];
END
GO

create function impl_ldwh_zins_cont()
returns table
as
return(
with
risks_sum as
(
select policy_risks_hkey, sum(premium) as premium_sum, max(insured_sum) as max_insured_sum
  from pas_impl.policy_risks_sat_latest
where is_deleted = 0
group by policy_risks_hkey
),
risks_group as
(
select
  prsl.policy_risks_hkey,
  r.risks_group,
  sum(prsl.insured_sum) insured_sum
from pas_impl.policy_risks_sat_latest prsl
  join bfx_impl.risks r on r.code = prsl.risk_code
where is_deleted = 0
group by
  prsl.policy_risks_hkey,
  r.risks_group
)
select upper(isnull(pham.contract_number, c.contract_number)) as ZINS_CONT,
       upper(isnull(pham.contract_number, c.contract_number)) as ZINS_CONN,
       cast(isnull(asl.valid_from, psl.start_date) as datetime) as ZVERS_DAT,
       cast(isnull(pslam.issue_date, psl.issue_date) as datetime) as ZCLAIM_DT,
       case
         when psl.state = 'Draft' then '1'
         when psl.state = 'Active' then '2'
         when psl.state = 'Activated' then '4'
         when asl.state = 'Draft' then '1'
         when asl.state = 'Active' then '4'
       end as ZISTAT1,
       null as ZISTATDT1,
       cast(isnull(ah.load_date, ph.load_date) as datetime) as ZI_CRE_DT,
       cast(isnull(psl.load_date, asl.load_date) as datetime) as ZI_UPD_DT,
       cast(isnull(asl.valid_from, psl.start_date) as datetime) as ZI_SEL_DT,
       cast(isnull(pslam.issue_date, psl.issue_date) as datetime) as ZI_CLC_DT,
       isnull(pslam.holder_code, psl.holder_code) as ZINSURER,
       aah.aa_number as ZAG_AGR,
       null as ZCURATOR,
       cast(isnull(asl.valid_from, psl.start_date) as datetime) as ZACT_DT_F,
       cast(isnull(pslam.end_date, psl.end_date) as datetime) as ZACT_DT_E,
       case asl.amendment_type
         when 'Cancellation'
         then cast(asl.valid_from as datetime)
         else null
       end as ZBREAK_DT,
       null as ZCOM_E_DT,
       null as ZORG_UNIT,
       isnull(pslam.currency_code, psl.currency_code) as [0DOC_CURRCY],
       rs.max_insured_sum as ZINS_SUM,
       1 as ZINS_NUM,
       null as ZPROLONG,
       case
         when psl.state = 'Draft'
         then case
                when isnull(pslam.product_code, psl.product_code) in ('CDMS')
                then '12'
                else '11'
              end
         when psl.state in ('Active', 'Activated')
         then case
                when isnull(pslam.product_code, psl.product_code) in ('CDMS')
                then '14'
                else '13'
              end
         when asl.state = 'Active'
         then case
                when asl.amendment_reason = 'byClientCoolOff'
                then '31'
                else case
                       when isnull(alsl.sum, 0) > 0
                       then '32'
                       else '33'
                     end
              end
         else null
       end as ZINS_C_PR,
       null as ZINV_INC,
       case isnull(pslam.payment_frequency_code, psl.payment_frequency_code)
         when 1 then 99
         when 2 then 12
         when 3 then 6
       end as ZPREMPER,
       null as ZINS_PER,
       '2022' as ZVARNUM,
       upper(isnull(pslam.product_code, psl.product_code)) as ZINS_PROD,
       case
         when isnull(pslam.product_code, psl.product_code) in ('CDMS')
         then '5'
         else '1'
       end as ZBRANCH,
       c.seq_number as ZVERSNUM,
       null as ZLLOBKF,
       null as ZCONTADF,
       null as ZCONTADD,
       isnull(pslam.currency_code, psl.currency_code) as ZDOC_VAL,
       null as Z_L_I,
       0 as ZANU_PPRD,
       0 as ZANU_PMTD,
       case isnull(pslam.state, psl.state)
         when 'Draft'
         then cast(isnull(ph.load_date, ah.load_date) as datetime)
         else cast(isnull(pslam.load_date, psl.load_date) as datetime)
       end as ZALGF2DA,
       null as ZCOUNTRY,
       null as ZRESIDENT,
       null as ZREG_CODE,
       null as ZACT_DT_O,
       null as ZOKATO_C,
       case isnull(pslam.payment_frequency_code, psl.payment_frequency_code)
         when 3
         then rs.premium_sum * 2
         else rs.premium_sum
       end as ZBAP_AM,
       case isnull(pslam.payment_frequency_code, psl.payment_frequency_code)
         when '1' then '1'
         else isnull(pslam.insurance_terms, psl.insurance_terms)
       end as ZPREMDUR,
       null as ZCONTVAR,
       null as ZINS_DAYS,
       null as ZZREINSUR,
       null as ZISPULL,
       null as ZVART,
       null as ZREG_AL,
       reverse(substring(reverse(isnull(pslam.initiator_username, psl.initiator_username)), 0, 5)) as ZWEB_USER,
       aah.aa_number as ZAG_CON,
       case
         when psl.state in ('Draft', 'Active')
         then '00'
         when psl.state = 'Activated'
         then '50'
         when asl.state = 'Active'
         then case
                when asl.amendment_reason = 'byClientCoolOff'
                then '08'
                else '09'
              end
         else null
       end as ZISTSTAT,
       null as Z_L_I_2,
       dbo.impl_sap_date((select max(c) from (values (psl.load_date), (asl.load_date), (pslam.load_date), (aasl.load_date)) as t(c))) as UPDATED_ON,
       prod.product_group as PRODUCT_GROUP,
	   case
	     when exists(select 1 from risks_group rg
					 where rg.policy_risks_hkey = isnull(pham.policy_hkey, ph.policy_hkey) and rg.risks_group in ('Endowment', 'Endowment_date'))
	     then 'Y' else 'N' end SURV_AND_ANN,
	   case
	     when exists(select 1 from risks_group rg
					 where rg.policy_risks_hkey = isnull(pham.policy_hkey, ph.policy_hkey) and rg.risks_group = 'CD') and
			  not exists(select 1 from risks_group rg
						 where rg.policy_risks_hkey = isnull(pham.policy_hkey, ph.policy_hkey) and rg.risks_group != 'CD') and
			  ((select sum(insured_sum) from risks_group rg
				where rg.policy_risks_hkey = isnull(pham.policy_hkey, ph.policy_hkey) and rg.risks_group = 'CD') < 1000000)
	     then 'Y' else 'N' end DEATH_AND_CI,
	   case
	     when cast(round(datediff(day, psl.start_date, psl.end_date) / 365.25, 0, 1) as int) > 0
		 then 'Y' else 'N' end DURATION_1Y,
	   'Y' as CANCELLATION_781
  from pas.contract c
       left join cfx.published_artifact cfxpa on cfxpa.published_artifact_id = c.published_artifact_id
       left join cfg.process_state cfgps on cfgps.process_state_id = c.state_id
       left join pas_impl.policy_hub ph on ph.contract_number = c.contract_number
       left join pas_impl.policy_sat_latest psl on psl.policy_hkey = ph.policy_hkey
       left join pas_impl.amendment_hub ah on ah.amendment_number = c.contract_number
       left join pas_impl.amendment_sat_latest asl on asl.amendment_hkey = ah.amendment_hkey
       left join pas_impl.amendment_lines_sat_latest alsl on alsl.amendment_lines_hkey = ah.amendment_hkey and alsl.type = N'surrenderValue'
       left join pas_impl.policy_amendment_link pal on ah.amendment_hkey = pal.amendment_hkey
       left join pas_impl.policy_hub pham on pham.policy_hkey = pal.policy_hkey
       left join pas_impl.policy_sat_latest pslam on pslam.policy_hkey = pham.policy_hkey
       left join pas_impl.policy_commission_link pcl on pcl.policy_hkey = isnull(pham.policy_hkey, ph.policy_hkey)
       left join pas_impl.aa_hub aah on aah.aa_hkey = pcl.aa_hkey
       left join pas_impl.aa_sat_latest aasl on aasl.aa_hkey = aah.aa_hkey
       left join risks_sum rs on rs.policy_risks_hkey = isnull(pham.policy_hkey, ph.policy_hkey)
       left join bfx_impl.products prod on prod.code = psl.product_code
 where 1=1
   and (ph.POLICY_HKEY is not null or ah.AMENDMENT_HKEY is not null)
   and cfxpa.code_name in ('AccumulatedLifeInsurancePolicy', 'CreditLifeInsurancePolicy', 'InvestmentLifeInsurancePolicy','MedLifeInsurancePolicy', 'CollectiveLifeInsurancePolicy', 'EquityLifeInsurancePolicy', 'RiskLifeInsurancePolicy')
)
GO

create view IMPL_LDWH_ZINS_CONT_VIEW
as
select * from impl_ldwh_zins_cont()
GO

-- examples
/*
select * from dbo.impl_ldwh_zins_cont()

select * from IMPL_LDWH_ZINS_CONT_VIEW
*/