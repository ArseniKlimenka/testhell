namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Queries
{
    static class PendingPaymentQueriesRGSL
    {
        public static string GetMatchingIdsToPost()
        {
            return @"
select mat.MATCHING_ID from
	acc_impl.MATCHING_POLICY matp with (updlock)
	inner join acc_impl.MATCHING mat with (updlock) on mat.MATCHING_ID = matp.MATCHING_ID
	inner join acc_impl.ALLOCATION alc with (updlock) on alc.ALLOCATION_ID = mat.ALLOCATION_ID
	inner join acc_impl.ALLOCATION_POLICY alcp with (updlock) on alcp.ALLOCATION_ID = mat.ALLOCATION_ID
	inner join pas_impl.POLICY_HUB phub with (updlock) on phub.CONTRACT_NUMBER = alc.DOCUMENT_NO
	inner join acc_impl.POSTED_PAYMENT_PLAN_SAT_LATEST postedPPs with (updlock) on postedPPs.POSTED_PAYMENT_PLAN_HKEY = phub.POLICY_HKEY
where 1=1
	and mat.CANCELLED = 0
	and mat.CANCELLED_MATCHING_ID is null
	and matp.IS_POSTED = 0
	and matp.POSTING_DATE <= postedPPs.POSTED_UNTIL_POSTING_DATE
	and /**where**/
";
        }
    }
}
