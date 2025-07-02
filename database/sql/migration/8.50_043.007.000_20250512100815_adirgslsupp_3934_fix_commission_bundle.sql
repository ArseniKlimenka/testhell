IF object_id('tempdb..#EBMGVTB') IS NOT NULL DROP TABLE #EBMGVTB
IF object_id('tempdb..#WrongCommission') IS NOT NULL DROP TABLE #WrongCommission

select c.CONTRACT_NUMBER,
c.body,
c.SNAPSHOT_BODY,
hub.POLICY_HKEY
into #EBMGVTB
from pas.CONTRACT c
inner join PAS_IMPL.POLICY_HUB hub
on hub.CONTRACT_NUMBER=c.CONTRACT_NUMBER
inner join PAS_IMPL.POLICY_SAT_LATEST sat
on sat.POLICY_HKEY=hub.POLICY_HKEY
where sat.PRODUCT_CODE='Ebmgvtb'

select distinct c.CONTRACT_NUMBER, pcs.POLICY_COMMISSION_HKEY
into #WrongCommission
from #EBMGVTB c
left join PAS_IMPL.POLICY_COMMISSION_LINK pcl
on pcl.POLICY_HKEY=c.POLICY_HKEY
left join PAS_IMPL.POLICY_COMMISSION_SAT_LATEST pcs
on pcl.POLICY_COMMISSION_HKEY=pcs.POLICY_COMMISSION_HKEY and PERIOD_NUMBER=1
where 1=1
and JSON_VALUE(body, '$.basicConditions.isSpecialOffer')='true'
and isnull(pcs.MANUAL_RATE,0)!= 0.2096000

update c
set c.BODY = replace(c.BODY, '"calculatedRate": 0.2,', '"calculatedRate": 0.2, "manualRate": 0.2096,'),
c.SNAPSHOT_BODY=replace(c.SNAPSHOT_BODY, '"calculatedRate": 0.2,', '"calculatedRate": 0.2, "manualRate": 0.2096,'),
c.SYS_UPDATED_ON=GETDATE()
from PAS.CONTRACT c
inner join #WrongCommission wc
on c.CONTRACT_NUMBER=wc.CONTRACT_NUMBER

update pcs
set pcs.MANUAL_RATE = 0.2096000
from PAS_IMPL.POLICY_COMMISSION_SAT pcs
inner join #WrongCommission wc
on wc.POLICY_COMMISSION_HKEY=pcs.POLICY_COMMISSION_HKEY and pcs.PERIOD_NUMBER = 1

update ic
set DOC_COMM_RATE= 0.2096000,
CALC_COMM_AMOUNT=BASE_AMOUNT*0.2096000
from PAS_IMPL.P_INVOICED_COMMISSION ic
inner join #WrongCommission wc
on ic.CONTRACT_NUMBER=wc.CONTRACT_NUMBER
