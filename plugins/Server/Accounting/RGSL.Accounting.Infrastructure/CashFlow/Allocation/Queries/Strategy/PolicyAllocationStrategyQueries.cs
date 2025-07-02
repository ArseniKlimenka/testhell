namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Queries.Strategy
{
    static class PolicyAllocationStrategyQueries
    {
        public static string Insert_PolicyAllocation()
        {
            return @"
insert into acc_impl.ALLOCATION_POLICY (
	ALLOCATION_ID,
	DUE_DATE,
	IS_FIRST_INSTALLMENT,
	EXCHANGE_DIFFERENCE
)
values (
	@AllocationId,
	@DueDate,
	@IsFirstInstallment,
	@ExchangeDifference
)";
        }

        public static string Insert_PolicyMatching()
        {
            return @"
insert into acc_impl.matching_policy (
	matching_id,
	post_amount,
	object_code,
	source_line_id,
	is_life,
	is_advance_payment,
	is_posted,
	posting_date
)
values (
	@MatchingId,
	@PostAmount,
	@ObjectCode,
	@SourceLineId,
	@IsLife,
	@IsAdvancePayment,
	@IsPosted,
	@PostingDate
)";
        }

        public static string Select_PolicyAllocation()
        {
            return @"
select
	alc.allocation_id,
	alc.due_date,
	alc.is_first_installment
from acc_impl.allocation_policy alc
where /**where**/
";
        }

        public static string Select_PolicyMatching()
        {
            return @"
select
	matp.matching_id,
	matp.post_amount,
	matp.object_code,
	matp.source_line_id,
	matp.is_life,
	matp.is_advance_payment,
	matp.is_posted,
	matp.posting_date
from
	acc_impl.MATCHING mat
	inner join acc_impl.matching_policy matp on matp.MATCHING_ID = mat.MATCHING_ID
	/**join**/
where 1=1
	and /**where**/
";
        }

        public static string Select_InstallmentDetails()
        {
            return @"
create table #INSTALLMENT_DETAILS(
    DUE_DATE date,
    POSTING_DATE date,
    OBJECT_CODE nvarchar(128),
    SOURCE_LINE_ID nvarchar(50),
    IS_FIRST_INSTALLMENT bit,
    IS_LIFE bit,
    CURRENCY_CODE nvarchar(3),
    AMOUNT decimal(15, 2),
    OPEN_AMOUNT decimal(15, 2)
);

insert into #INSTALLMENT_DETAILS(DUE_DATE, POSTING_DATE, OBJECT_CODE, SOURCE_LINE_ID, IS_FIRST_INSTALLMENT, IS_LIFE, CURRENCY_CODE, AMOUNT, OPEN_AMOUNT)
select
	ppl.DUE_DATE,
	ppsl.POSTING_DATE,
	ppsl.OBJECT_CODE,
	ppsl.ITEM_NO as SOURCE_LINE_ID,
	ppsl.IS_FIRST_INSTALLMENT,
	rt.IS_LIFE,
	ppsl.CURRENCY_CODE,
	ppsl.AMOUNT,
	ppsl.AMOUNT as OPEN_AMOUNT
from
	pas_impl.POLICY_HUB polh
	inner join pas_impl.P_PAYMENT_PLAN_LINK ppl on ppl.POLICY_HKEY = polh.POLICY_HKEY
	inner join pas_impl.P_PAYMENT_PLAN_SAT_LATEST ppsl on ppsl.P_PAYMENT_PLAN_HKEY = ppl.P_PAYMENT_PLAN_HKEY
	left join BFX_IMPL.RISKS risk on risk.CODE = ppsl.ITEM_NO
	left join BFX_IMPL.RISK_TYPE rt on rt.RISK_TYPE = risk.[TYPE]
where 1=1
	and polh.contract_number = @documentNumber
	and /**where(PP)**/

;

insert into #INSTALLMENT_DETAILS(DUE_DATE, POSTING_DATE, OBJECT_CODE, SOURCE_LINE_ID, IS_FIRST_INSTALLMENT, IS_LIFE, CURRENCY_CODE, AMOUNT, OPEN_AMOUNT)
select
	alcp.DUE_DATE,
	matp.POSTING_DATE,
	matp.OBJECT_CODE,
	matp.SOURCE_LINE_ID,
	alcp.IS_FIRST_INSTALLMENT,
	matp.IS_LIFE,
	alc.DOC_CURRENCY_CODE as CURRENCY_CODE,
	0 as AMOUNT,
	-(mat.DOC_AMOUNT + mat.TOLERANCE_DOC_AMOUNT) as OPEN_AMOUNT
from
	ACC_IMPL.ALLOCATION alc
	inner join ACC_IMPL.ALLOCATION_POLICY alcp on alcp.ALLOCATION_ID = alc.ALLOCATION_ID
	inner join ACC_IMPL.MATCHING mat on mat.ALLOCATION_ID = alc.ALLOCATION_ID
	inner join ACC_IMPL.MATCHING_POLICY matp on matp.MATCHING_ID = mat.MATCHING_ID
where 1=1
	and alc.DOCUMENT_NO = @documentNumber
	and /**where(matching)**/
;

select
	DUE_DATE,
	POSTING_DATE,
	OBJECT_CODE,
	SOURCE_LINE_ID,
	IS_FIRST_INSTALLMENT,
	IS_LIFE,
	CURRENCY_CODE,
	sum(AMOUNT) as AMOUNT,
	sum(OPEN_AMOUNT) as OPEN_AMOUNT
from #INSTALLMENT_DETAILS
group by DUE_DATE, POSTING_DATE, OBJECT_CODE, SOURCE_LINE_ID, IS_FIRST_INSTALLMENT, IS_LIFE, CURRENCY_CODE
;

drop table #INSTALLMENT_DETAILS;
";
        }

        public static string GetPolicyState()
        {
            return @"
select
	ps.CODE_NAME as STATE_CODE,
	pols.INSURED_CODE,
	pols.EXCHANGE_RATE as MANUAL_EXCHANGE_RATE
from pas_impl.POLICY_HUB ph
	inner join pas.CONTRACT c on c.CONTRACT_NUMBER = ph.CONTRACT_NUMBER
	inner join cfg.PROCESS_STATE ps on ps.PROCESS_STATE_ID = c.STATE_ID
	inner join pas_impl.POLICY_SAT_LATEST pols on ph.POLICY_HKEY = pols.POLICY_HKEY
where /**where**/
";
        }
    }
}
