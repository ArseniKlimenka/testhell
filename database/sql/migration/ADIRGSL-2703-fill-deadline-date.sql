update pps
set
	pps.DEADLINE_DATE = ppItem.DEADLINE_DATE_NEW
from
	pas_impl.P_PAYMENT_PLAN_SAT pps
	inner join pas_impl.P_PAYMENT_PLAN_LINK ppl on ppl.P_PAYMENT_PLAN_HKEY = pps.P_PAYMENT_PLAN_HKEY
	inner join pas_impl.POLICY_HUB polh on polh.POLICY_HKEY = ppl.POLICY_HKEY
	inner join pas.CONTRACT c on c.CONTRACT_NUMBER = polh.CONTRACT_NUMBER
	cross apply openjson(c.BODY,'$.paymentPlan')
	with
	(
		DUE_DATE date '$.paymentPeriodStart',
		DEADLINE_DATE_NEW date '$.paymentGraceDate'
	) ppItem
where 1=1
	and pps.DEADLINE_DATE is null
	and ppItem.DUE_DATE = ppl.DUE_DATE
go

alter table pas_impl.P_PAYMENT_PLAN_SAT alter column DEADLINE_DATE date not null
go
