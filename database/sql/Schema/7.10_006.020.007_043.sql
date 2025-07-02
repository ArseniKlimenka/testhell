EXEC sp_RENAME 'ACC_IMPL.MATCHING_POLICY.PAYER_CODE' , 'OBJECT_CODE', 'COLUMN'
go

if exists (select * from sys.tables t
	INNER JOIN sys.partitions p on t.object_id = p.object_id
	WHERE t.object_id = OBJECT_ID(N'[PAS_IMPL].[POLICY_SAT]') and p.rows > 0)
BEGIN

EXEC(N'EXEC sp_RENAME ''PAS_IMPL.P_PAYMENT_PLAN_SAT.GROUP_CODE'' , ''OBJECT_CODE'', ''COLUMN''');

EXEC(N'update ctr set common_body = json_modify(ctr.common_body, ''$.objects[0].code'', pols.INSURED_CODE)
from
	pas_impl.POLICY_HUB polh
	inner join pas_impl.POLICY_SAT_LATEST pols on pols.POLICY_HKEY = polh.POLICY_HKEY
	inner join pas.contract ctr on ctr.CONTRACT_NUMBER = polh.CONTRACT_NUMBER
where 1=1
	and pols.HOLDER_CODE != pols.INSURED_CODE
	and pols.INSURED_CODE != json_value(ctr.common_body, ''$.objects[0].code'')');

EXEC(N'update matp
set OBJECT_CODE = pols.INSURED_CODE
from
	acc_impl.ALLOCATION alc
	inner join acc_impl.ALLOCATION_POLICY alcp on alcp.ALLOCATION_ID = alc.ALLOCATION_ID
	inner join acc_impl.MATCHING mat on mat.ALLOCATION_ID = alc.ALLOCATION_ID
	inner join acc_impl.MATCHING_POLICY matp on matp.MATCHING_ID = mat.MATCHING_ID
	inner join pas_impl.POLICY_HUB polh on polh.CONTRACT_NUMBER = alc.DOCUMENT_NO
	inner join pas_impl.POLICY_SAT_LATEST pols on pols.POLICY_HKEY = polh.POLICY_HKEY
where pols.HOLDER_CODE != pols.INSURED_CODE

update pps
set OBJECT_CODE = pols.INSURED_CODE
from
	pas_impl.POLICY_SAT_LATEST pols
	inner join pas_impl.P_PAYMENT_PLAN_LINK ppl on ppl.POLICY_HKEY = pols.POLICY_HKEY
	inner join pas_impl.P_PAYMENT_PLAN_BILLING_SAT_LATEST ppbs on ppbs.P_PAYMENT_PLAN_BILLING_HKEY = ppl.P_PAYMENT_PLAN_HKEY
	inner join pas_impl.P_PAYMENT_PLAN_SAT pps on pps.P_PAYMENT_PLAN_HKEY = ppl.P_PAYMENT_PLAN_HKEY
where pols.HOLDER_CODE != pols.INSURED_CODE');
END
go