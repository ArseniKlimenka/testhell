namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.Commission.Queries
{
    static class PayableCommissionQueries
    {
        public static string InsertPC()
        {
            return @"
insert into acc_impl.payable_commission (
	matching_id,
	cancelled,
	cancelled_pc_id,
	create_date,
	policy_commission_hkey,
	object_code,
	item_code,
	period_number,
	doc_base_amount,
	is_migrated
)
values (
	@MatchingId,
	@Cancelled,
	@CancelledPcId,
	@CreateDate,
	@PolicyCommissionHkey,
	@ObjectCode,
	@ItemCode,
	@PeriodNumber,
	@DocBaseAmount,
	@IsMigrated
)
";
        }

        public static string SelectPC()
        {
            return @"
select
	pc.payable_commission_id,
	pc.matching_id,
	pc.cancelled,
	pc.cancelled_pc_id,
	pc.create_date,
	pc.policy_commission_hkey,
	pc.object_code,
	pc.item_code,
	pc.period_number,
	pc.doc_base_amount,
	pc.is_migrated
from
	acc_impl.allocation alc
	inner join acc_impl.allocation_policy alcp on alcp.ALLOCATION_ID = alc.ALLOCATION_ID
	inner join acc_impl.matching mat on mat.ALLOCATION_ID = alc.ALLOCATION_ID
	inner join acc_impl.matching_policy matp on matp.MATCHING_ID = mat.MATCHING_ID
	inner join acc_impl.payable_commission pc on pc.MATCHING_ID = mat.MATCHING_ID
where 1=1
	and /**where**/
";
        }
    }
}
