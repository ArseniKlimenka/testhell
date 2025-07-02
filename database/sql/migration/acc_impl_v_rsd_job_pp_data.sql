if object_id('acc_impl.V_RSD_JOB_PP_DATA', 'V') IS NOT NULL
    drop view acc_impl.V_RSD_JOB_PP_DATA
go

create view acc_impl.V_RSD_JOB_PP_DATA as
select
	t.CONTRACT_NUMBER,
	t.LOAD_DATE,
	pols.START_DATE,
	pols.END_DATE,
	pols.HOLDER_CODE,
	pols.HOLDER_NAME,
	case when ptyis.CONFIGURATION_CODE_NAME = 'LegalEntity' then N'ЮР' else N'ФЛ' end as HOLDER_TYPE,
	t.OBJECT_CODE,
	t.ITEM_NO,
	rt.IS_LIFE,
	pols.PRODUCT_CODE,
	aas.MVZ_NUMBER,
	risk.BUSINESS_LINE,
	t.DUE_DATE,
	t.AMOUNT,
	pols.CURRENCY_CODE,
	coalesce(pols.EXCHANGE_RATE, er.EXCHANGE_RATE) as EXCHANGE_RATE,
	cast(case when pols.EXCHANGE_RATE is null then 0 else 1 end as bit) as MANUAL_EXCHANGE_RATE_USED,
	t.POSTING_DATE,
	t.OPEN_AMOUNT,
	t.DEADLINE_DATE
from acc_impl.RSD_JOB_PP_DATA t
	left join pas_impl.POLICY_HUB polh on polh.CONTRACT_NUMBER = t.CONTRACT_NUMBER
	left join pas_impl.POLICY_SAT_LATEST pols on pols.POLICY_HKEY = polh.POLICY_HKEY
	cross apply (select top 1 cer.EXCHANGE_RATE / cer.UNIT as EXCHANGE_RATE from bfx.CURRENCY_EXCHANGE_RATE cer where cer.CURRENCY_CODE = pols.CURRENCY_CODE and cer.EXCHANGE_RATE_DATE <= t.POSTING_DATE order by cer.EXCHANGE_RATE_DATE desc) er
	left join pty_impl.PARTY_HUB ptyh on ptyh.PARTY_CODE = pols.HOLDER_CODE
	left join pty_impl.PARTY_INFO_SAT_LATEST ptyis on ptyis.PARTY_INFO_HKEY = ptyh.PARTY_HKEY
	left join bfx_impl.RISKS risk on risk.CODE = t.ITEM_NO
	left join bfx_impl.RISK_TYPE rt on rt.RISK_TYPE = risk.[TYPE]
	left join pas_impl.POLICY_COMMISSION_LINK pcl on pcl.POLICY_HKEY = polh.POLICY_HKEY
	left join pas_impl.AA_SAT_LATEST aas on aas.AA_HKEY = pcl.AA_HKEY
where 1=1
	and t.OPEN_AMOUNT != 0
go
