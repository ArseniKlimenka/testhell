namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Queries
{
    static class MatchingQueriesRGSL
    {
        public static string CreateMatching()
        {
            return @"
insert into acc_impl.matching (
	allocation_id,
	cancelled,
	cancelled_matching_id,
	doc_amount,
	tolerance_doc_amount,
	create_date
)
values (
	@AllocationId,
	@Cancelled,
	@CancelledMatchingId,
	@DocAmount,
	@ToleranceDocAmount,
	@CreateDate
)";
        }

        public static string GetMatching()
        {
            return @"
select
	mat.matching_id,
	mat.allocation_id,
	mat.cancelled,
	mat.cancelled_matching_id,
	mat.doc_amount,
	mat.tolerance_doc_amount,
	mat.create_date
from acc_impl.matching mat
where /**where**/
";
        }
    }
}
