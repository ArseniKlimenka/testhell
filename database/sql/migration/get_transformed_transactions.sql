IF EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[get_transactions_view]'))
BEGIN
DROP VIEW [dbo].[get_transactions_view];
END
GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[get_transformed_transactions]') AND type IN (N'FN', N'FS', N'FT', N'TF', N'IF'))
BEGIN
DROP FUNCTION [dbo].[get_transformed_transactions];
END
GO

create function get_transformed_transactions()
returns table
as
return (
select
s.IS_DEBIT,
aa.BALANCE_UNIT															as BUKRS,
s.PAIR_NO																as BELNR,
null																	as BUZEI,
tdt.TRANSACTION_DOCUMENT_TYPE_CODE										as BLART,
s.POST_DATE																as BLDAT,
s.POST_DATE																as BUDAT,
tc1.TRANSACTION_CODE													as TCODE,
null																	as XBLNR,
tt.DESCRIPTION															as BKTXT, --TODO: length is defined as 25. But transaction type descriptions are defined as longer (e.g. Начисление вознаграждения посредникам (Оценка))
s.SOURCE_CURRENCY_CODE													as WAERS,
aa.REGISTER																as LDGRP,
aa.LOCAL_DIMENSION_1													as YYGT_FLD1,
aa.LOCAL_DIMENSION_2													as YYGT_FLD2,
ld3.LOCAL_DIMENSION_3_CODE												as YYGT_FLD3,
null																	as YYGT_FLD4,
null																	as YYGT_FLD5,
aa.AA_ORDER_NO															as AUFNR,
null																	as BEWAR,
aa.TRANSACTION_CODE_2													as BSCHL,
s.ACCOUNTING_GROSS_AMOUNT												as DMBTR,
null																	as FWBAS,
sapa.SAP_GL_ACCOUNT_NO													as HKONT,
aa.COST_CENTER															as KOSTL,
null																	as KUNNR,
null																	as LIFNR,
act.ACT_NO																as SGTXT,
null																	as UMSKZ,
aa.TRADING_PARTNER														as VBUND,
s.SOURCE_AMOUNT															as WRBTR,
aa.PARTY_CODE															as XREF1,
aa.XREF2																as XREF2,
aa.PERSONAL_ACCOUNT_NUMBER												as XREF3,
aa.CEDENTS_COUNTRY														as YYGT_CTY,
aa.BUSINESS_LINE														as YYGT_LLOB,
null																	as ZFBDT,
null																	as ZTERM,
	case
		when (aa.TRANSACTION_TYPE_ID = 4 and s.DOCUMENT_TYPE_ID = 1005 and glacc.GL_ACCOUNT_NO in ('48028')) then aa.DOCUMENT_NO
		when (aa.TRANSACTION_TYPE_ID = 4 and aa.BANK_STATEMENT_ITEM_ID is not null and glacc.GL_ACCOUNT_NO not in ('48001','48002','48003','48004')) then cast(aa.BANK_STATEMENT_ITEM_ID as nvarchar(64))
		when (aa.TRANSACTION_TYPE_ID = 5) then pos.REFERENCE_NUMBER
		else aa.DOCUMENT_NO end as ZUONR,
	case
		when aa.AGENT_TYPE = N'broker' then N'Брокер'
		when pisl.CONFIGURATION_CODE_NAME = N'NaturalPerson' then N'Агент'
		when pisl.CONFIGURATION_CODE_NAME = N'LegalEntity' then N'ЮЛ'
		end as INTERMEDIARY_TYPE,
null																	as LAND1,
coalesce(case when bsi.DEBTOR_BANK_ACCOUNT_NO = '40701810701700000301' then 'credit' end, p.product_group)
																		as PRODUCT_GROUP,
ph.CONTRACT_NUMBER														as CONTRACT_NO,
s.SOURCE_LINE_ID														as SOURCE_LINE_ID,
agr.EXTERNAL_NUMBER														as AA_EXTERNAL_NUMBER,
prts.NAME																as AGENT,
case when s.IS_DEBIT = 0 then -s.SOURCE_AMOUNT else s.SOURCE_AMOUNT end	as WRBTR2,
aa.PROPOSED_POST_DATE													as DUE_DATE,
pisl.FULL_NAME															as FULL_NAME,
case when pisl.CONFIGURATION_CODE_NAME = 'LegalEntity' then pisl.SHORT_NAME else pisl.FULL_NAME end as SHORTNAME,
ir.SHORT_DESCRIPTION													as SHORT_DESCRIPTION,
aa.COMMISSION_RATE														as COMMISSION_RATE,
cast (case when s.SOURCE_AMOUNT < 0 then 1 else 0 end as bit)			as IS_STORNO,
dbo.impl_sap_date((select max(c) from (values (e.SYS_CREATED_ON)) as t(c)))
																		as UPDATED_ON
from ACC.GL_SUBLEDGER_ENTRY s
inner join acc.GL_ACCOUNT glacc on glacc.GL_ACCOUNT_ID = s.GL_ACCOUNT_ID
inner join ACC.GL_ADDITIONAL_ATTRIBUTES aa on s.GL_ADDITIONAL_ATTRIBUTE_ID = aa.GL_ADDITIONAL_ATTRIBUTE_ID
inner join ACC_IMPL.SAP_GL_ACCOUNT sapa on aa.SAP_GL_ACCOUNT_ID = sapa.SAP_GL_ACCOUNT_ID
left join ACC.EVENT e on e.EVENT_ID = s.EVENT_ID
left join ACC_IMPL.CT_TRANSACTION_DOCUMENT_TYPE tdt on aa.TRANSACTION_DOCUMENT_TYPE_ID = tdt.TRANSACTION_DOCUMENT_TYPE_ID
left join ACC_IMPL.CT_TRANSACTION_CODE_1 tc1 on aa.TRANSACTION_CODE_1 = tc1.TRANSACTION_CODE_1_ID
left join ACC_IMPL.TRANSACTION_TYPE tt on aa.TRANSACTION_TYPE_ID = tt.TRANSACTION_TYPE_ID
left join ACC_IMPL.CT_LOCAL_DIMENSION_3 ld3 on aa.LOCAL_DIMENSION_3_ID = ld3.LOCAL_DIMENSION_3_ID
left join PAS_IMPL.POLICY_HUB ph on ph.CONTRACT_NUMBER = s.MAIN_CONTRACT_NO
left join PAS_IMPL.POLICY_SAT_LATEST psl on psl.POLICY_HKEY = ph.POLICY_HKEY
left join BFX_IMPL.PRODUCTS p on p.CODE = psl.PRODUCT_CODE
left join PAS_IMPL.POLICY_COMMISSION_LINK pcl on ph.POLICY_HKEY = pcl.POLICY_HKEY
left join PAS_IMPL.AA_SAT_LATEST agr on agr.AA_HKEY = pcl.AA_HKEY
left join PAS_IMPL.AA_PARTICIPANT_LINK prtl on prtl.AA_HKEY = agr.AA_HKEY
left join PAS_IMPL.AA_PARTICIPANT_SAT_LATEST prts on prts.AA_PARTICIPANT_HKEY = prtl.AA_PARTICIPANT_HKEY
left join PTY_IMPL.PARTY_HUB prth on aa.PARTY_CODE = prth.PARTY_CODE
left join PTY_IMPL.PARTY_INFO_SAT_LATEST pisl on pisl.party_info_hkey = prth.party_hkey
left join BFX_IMPL.RISKS ir ON s.SOURCE_LINE_ID = ir.CODE
left join ACC_IMPL.BANK_STATEMENT_ITEM bsi on bsi.BANK_STATEMENT_ITEM_ID = aa.BANK_STATEMENT_ITEM_ID
left join ACC_IMPL.CA_ACT act on act.ACT_ID = aa.COMMISSION_ACT_ID
	left join acc_impl.PAYMENT_ORDER_HUB poh on poh.PAYMENT_ORDER_NUMBER = aa.PAYMENT_ORDER_NUMBER
	left join acc_impl.PAYMENT_ORDER_SAT_LATEST pos on pos.PAYMENT_ORDER_HKEY = poh.PAYMENT_ORDER_HKEY
)
GO

create view GET_TRANSACTIONS_VIEW
as
select * from get_transformed_transactions()
GO

-- examples
/*
select * from get_transformed_transactions()
where ZUONR = '88100-000004210'
order by BELNR desc, IS_DEBIT;

select * from GET_TRANSACTIONS_VIEW
*/