select
	pis.FULL_NAME as INSURED_FULL_NAME,
	r.SHORT_DESCRIPTION as RISK_NAME,
	pps.INSURANCE_YEAR,
	t.DUE_DATE,
	coalesce(t.DOC_COMM_RATE, t.AA_COMM_RATE) as COMM_RATE
from
	(
		select
			CONTRACT_NUMBER,
			DUE_DATE,
			POSTING_DATE,
			OBJECT_CODE,
			ITEM_NO,
			CURRENCY_CODE,
			sum(BASE_AMOUNT) as BASE_AMOUNT,
			AA_COMM_RATE,
			DOC_COMM_RATE,
			sum(CALC_COMM_AMOUNT) as CALC_COMM_AMOUNT,
			COMM_TYPE
		from pas_impl.P_INVOICED_COMMISSION
		where 1=1
			and COMM_TYPE = 1
			and CONTRACT_NUMBER = @contractNumber
		group by
			CONTRACT_NUMBER,
			DUE_DATE,
			POSTING_DATE,
			OBJECT_CODE,
			ITEM_NO,
			CURRENCY_CODE,
			AA_COMM_RATE,
			DOC_COMM_RATE,
			COMM_TYPE
	) t
	inner join pty_impl.PARTY_HUB ph on ph.PARTY_CODE = t.OBJECT_CODE
	inner join pty_impl.PARTY_INFO_SAT_LATEST pis on pis.PARTY_INFO_HKEY = ph.PARTY_HKEY
	inner join pas_impl.POLICY_HUB polh on polh.CONTRACT_NUMBER = t.CONTRACT_NUMBER
	inner join pas_impl.P_PAYMENT_PLAN_LINK ppl on ppl.POLICY_HKEY = polh.POLICY_HKEY and ppl.DUE_DATE = t.DUE_DATE
	inner join pas_impl.P_PAYMENT_PLAN_SAT_LATEST pps on pps.P_PAYMENT_PLAN_HKEY = ppl.P_PAYMENT_PLAN_HKEY and pps.ITEM_NO = t.ITEM_NO
	inner join bfx_impl.RISKS r on r.CODE = t.ITEM_NO
where 1=1
order by pps.INSURANCE_YEAR, t.ITEM_NO