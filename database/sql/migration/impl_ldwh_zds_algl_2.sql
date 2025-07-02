if exists (select * from sys.views where object_id = object_id(N'[dbo].[impl_ldwh_zds_algl_2_view]'))
begin
    drop view [dbo].[impl_ldwh_zds_algl_2_view];
end
go

if exists (select * from dbo.sysobjects where id = object_id(N'[dbo].[impl_ldwh_zds_algl_2]') and type in (N'FN', N'FS', N'FT', N'TF', N'IF'))
begin
    drop function [dbo].[impl_ldwh_zds_algl_2];
end
go

create function impl_ldwh_zds_algl_2()
returns table
as
return
(
    select
        getdate()                           as TMSTMP,
        200                                 as MANDT,
        aa.BALANCE_UNIT                     as BUKRS,
        s.PAIR_NO                           as BELBEIN,
        s.SOURCE_LINE_ID                    as BELEGZN,
        year(s.POST_DATE)                   as GESJAHR,
        tran_def.BELEGTC                    as BELEGTC,
        tran_def.BELEGSC_ALGL_2             as BELEGSC,
        s.ACCOUNTING_GROSS_AMOUNT           as BLPBUBE,
        'RUB'                               as WAERS,
        s.SOURCE_AMOUNT                     as BLPBUBP,
        s.SOURCE_CURRENCY_CODE              as PRDWAER,
        aa.PROPOSED_POST_DATE               as FAELLID,
        s.POST_DATE                         as BUCHUND,
        null                                as KONTOAC,
        null                                as KONTONR,
        null                                as BUCHUGC,
        null                                as BUCHUGN,
        tran_def.VORGAST_ALGL_2             as VORGAST,
        null                                as BUENDEN,
        coalesce(con.SEQ_NUMBER, 0)         as SVTVERS,
        upper(ph.CONTRACT_NUMBER)           as VTREXTN,
        upper(psl.PRODUCT_CODE)             as PRODUKC,
        prod.PRODUCT_GROUP                  as PRODUCT_GROUP,
        case when aa.BUSINESS_LINE = '42204' then '1' when aa.BUSINESS_LINE = '10800' then '5' end 
											as BRANCHC,
        s.SOURCE_LINE_ID                    as DECKUAC,
        95729                               as ORGANR,
        aa_data.AA_NUMBER                   as VERMVNR,
        aa_data.AGENT_PARTY_CODE            as VERMBNR,
        case when s.DOCUMENT_TYPE_ID in (1004, 1005) then aa.DOCUMENT_NO end 
											as SCHADEN,
        null                                as SASSCHN,
        case when s.DOCUMENT_TYPE_ID in (7, 1005, 1006, 1007, 1008) then 
			right(parsename(replace(s.SOURCE_DOCUMENT_NO, '_', '.'), 2), 1) + 
			parsename(replace(s.SOURCE_DOCUMENT_NO, '_', '.'), 1) end 
											as SCHADBN,
        porph.PARTY_CODE                    as PARTNEN,
        pos.EXCHANGE_RATE                   as ZZEX_RATE,
		case
            when s.POST_DATE = aa.PROPOSED_POST_DATE then 1
            when s.POST_DATE > aa.PROPOSED_POST_DATE and year(s.POST_DATE) = year(aa.PROPOSED_POST_DATE) then 2
            when year(s.POST_DATE) > year(aa.PROPOSED_POST_DATE) then 3
        end                                 as ZZ_STORNO_TYP,
		(select top 1 caa.PROPOSED_POST_DATE
		 from ACC.GL_SUBLEDGER_ENTRY cse
		 left join ACC.GL_ADDITIONAL_ATTRIBUTES caa on cse.GL_ADDITIONAL_ATTRIBUTE_ID = caa.GL_ADDITIONAL_ATTRIBUTE_ID
		 where cse.CONTRACT_NO = s.CONTRACT_NO
		   and cse.DOCUMENT_TYPE_ID in (2, 1012))
											as ZZ_FUNDDATE,
        null                                as ZZ_CANC_IND,
        case when aa.TRANSACTION_TYPE_ID = 3 then s.SOURCE_DOCUMENT_NO else null end 
											as ZACTID_INT,
        case when s.POSTING_SCHEME_ID = 55 then upper(aa.DOCUMENT_NO) end 
											as ZZIDENTNR,
        null                                as ZZ_ID_ALICE,
        (select max(cse.pair_no)
	     from ACC.GL_SUBLEDGER_ENTRY cse
	     where aa.CANCELLED_DOCUMENT_NO = cse.SOURCE_DOCUMENT_NO
		   and s.DOCUMENT_TYPE_ID = cse.DOCUMENT_TYPE_ID
		   and coalesce(s.SOURCE_LINE_ID, 'xyz') = coalesce (cse.SOURCE_LINE_ID, 'xyz')
		   and s.IS_DEBIT = cse.IS_DEBIT)   as ZZREVID,
        null                                as ZZ_GB_REVERSAL,
        null                                as ZZ_DN_PRNT,
        e.EVENT_DATE                        as CREATE_DATE,
        aa.BUSINESS_LINE                    as LLOB,
        aa.PERSONAL_ACCOUNT_NUMBER          as '/ALCS/XREF3',
        'RUB'                               as HWAER,
        coalesce(aa.COST_CENTER,
				 (select top 1 caa.COST_CENTER
				  from ACC.GL_SUBLEDGER_ENTRY cse
				  join ACC.GL_ADDITIONAL_ATTRIBUTES caa on cse.GL_ADDITIONAL_ATTRIBUTE_ID = caa.GL_ADDITIONAL_ATTRIBUTE_ID
				  where parsename(aa.XREF2, 2) in ('48001', '48002', '48003', '48021', '48022', '48023', '48024')
					and s.CONTRACT_NO = cse.CONTRACT_NO
					and s.PAIR_NO = cse.PAIR_NO
					and s.IS_DEBIT <> cse.IS_DEBIT))
											as ZZKSP,
        aa.XREF2                            as ZZ_XREF2,
        '2022'                              as PRDTARV,
        upper(ph.CONTRACT_NUMBER)           as VERTRAN,
        coalesce(con.SEQ_NUMBER, 0)         as ALGVERS,
        null                                as DCH,
        null                                as FGR,
        aa.LOCAL_DIMENSION_1                as LD1,
        aa.LOCAL_DIMENSION_2                as LD2,
        ld3.LOCAL_DIMENSION_3_CODE          as LD3,
        null                                as FE2,
        null                                as CD1,
        aa.TRANSACTION_CODE_2               as BUCHUSC,
        aa.AA_ORDER_NO                      as AUFNR,
        null                                as RECHNUN, --TODO
		dbo.impl_sap_date((select max(c) from (values (e.SYS_CREATED_ON)) as t(c)))
											as UPDATED_ON
    from
        ACC.GL_SUBLEDGER_ENTRY s
        inner join ACC.EVENT e on e.EVENT_ID = s.EVENT_ID
        inner join ACC.GL_ADDITIONAL_ATTRIBUTES aa on s.GL_ADDITIONAL_ATTRIBUTE_ID = aa.GL_ADDITIONAL_ATTRIBUTE_ID
        inner join ACC_IMPL.SAP_GL_ACCOUNT sapa on aa.SAP_GL_ACCOUNT_ID = sapa.SAP_GL_ACCOUNT_ID
        left join (
			select
				aas.ORDER_NUMBER,
                aas.EXTERNAL_NUMBER,
                aaspis.PARTY_CODE as AGENT_PARTY_CODE,
                ph.CONTRACT_NUMBER,
                aah.AA_NUMBER,
                row_number() over (partition by pcl.AA_HKEY, pcl.POLICY_HKEY order by pcl.LOAD_DATE desc) as NUM,
				aas.LOAD_DATE
			from PAS_IMPL.AA_SAT_LATEST aas
			inner join PAS_IMPL.AA_HUB aah on aas.AA_HKEY = aah.AA_HKEY
			inner join PAS_IMPL.AA_PARTICIPANT_LINK aapl on aapl.AA_HKEY = aas.AA_HKEY
			inner join PAS_IMPL.AA_PARTICIPANT_SAT_LATEST aaps on aaps.AA_PARTICIPANT_HKEY = aapl.AA_PARTICIPANT_HKEY and aaps.ROLE = 'Agent'
			inner join ORG_IMPL.SERVICE_PROVIDER_INFO_SAT_LATEST aaspis on aaspis.SERVICE_PROVIDER_INFO_HKEY = aapl.SERVICE_PROVIDER_HKEY
			inner join PAS_IMPL.POLICY_COMMISSION_LINK pcl on pcl.AA_HKEY = aas.AA_HKEY
			inner join PAS_IMPL.POLICY_HUB ph on pcl.POLICY_HKEY = ph.POLICY_HKEY
        ) aa_data on aa_data.ORDER_NUMBER = aa.AA_ORDER_NO and aa_data.CONTRACT_NUMBER = s.MAIN_CONTRACT_NO and NUM = 1
		left join ACC_IMPL.TRANSACTION_DEFINITION tran_def on tran_def.TRANSACTION_DEFINITION_NO = aa.TRANSACTION_DEFINITION_NO
        left join ACC_IMPL.PAYMENT_ORDER_HUB poh on poh.PAYMENT_ORDER_NUMBER = aa.DOCUMENT_NO and s.DOCUMENT_TYPE_ID in (7, 1005, 1006, 1007, 1008)
        left join ACC_IMPL.PAYMENT_ORDER_SAT_LATEST pos on pos.PAYMENT_ORDER_HKEY = poh.PAYMENT_ORDER_HKEY
        left join ACC_IMPL.PO_RECIPIENT_LINK porl on porl.PAYMENT_ORDER_HKEY = poh.PAYMENT_ORDER_HKEY
        left join PTY_IMPL.PARTY_HUB porph on porph.PARTY_HKEY = porl.PARTY_HKEY
        left join ACC_IMPL.CT_TRANSACTION_DOCUMENT_TYPE tdt on aa.TRANSACTION_DOCUMENT_TYPE_ID = tdt.TRANSACTION_DOCUMENT_TYPE_ID
        left join ACC_IMPL.CT_TRANSACTION_CODE_1 tc1 on aa.TRANSACTION_CODE_1 = tc1.TRANSACTION_CODE_1_ID
        left join ACC_IMPL.TRANSACTION_TYPE tt on aa.TRANSACTION_TYPE_ID = tt.TRANSACTION_TYPE_ID
        left join ACC_IMPL.CT_LOCAL_DIMENSION_3 ld3 on aa.LOCAL_DIMENSION_3_ID = ld3.LOCAL_DIMENSION_3_ID
        left join PAS.CONTRACT con on con.CONTRACT_NUMBER = s.CONTRACT_NO
        left join PAS_IMPL.POLICY_HUB ph on ph.CONTRACT_NUMBER = s.MAIN_CONTRACT_NO
        left join PAS_IMPL.POLICY_SAT_LATEST psl on psl.POLICY_HKEY = ph.POLICY_HKEY
        left join BFX_IMPL.PRODUCTS prod on prod.CODE = psl.PRODUCT_CODE
)
go

create view IMPL_LDWH_ZDS_ALGL_2_VIEW
as
select * from impl_ldwh_zds_algl_2()
go

-- examples
/*
select * from dbo.impl_ldwh_zds_algl_2()

select * from IMPL_LDWH_ZDS_ALGL_2_VIEW
*/
