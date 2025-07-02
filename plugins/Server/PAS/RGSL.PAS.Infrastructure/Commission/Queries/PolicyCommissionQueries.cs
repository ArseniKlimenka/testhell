namespace Adacta.AdInsure.RGSL.PAS.Infrastructure.Commission.Queries
{
    static class PolicyCommissionQueries
    {
        public static string SelectPolicyCommissionItems()
        {
			return @"
select
	polh.CONTRACT_NUMBER,
	pcsl.POLICY_COMMISSION_HKEY,
	pcsl.OBJECT_CODE,
	pcsl.ITEM_CODE,
	pcsl.PERIOD_NUMBER,
	pcsl.CALCULATED_RATE as AA_COMM_RATE,
	pcsl.MANUAL_RATE as DOC_COMM_RATE
from
	pas_impl.POLICY_HUB polh
	inner join pas_impl.POLICY_COMMISSION_LINK pcl on pcl.POLICY_HKEY = polh.POLICY_HKEY
	inner join pas_impl.POLICY_COMMISSION_SAT_LATEST pcsl on pcsl.POLICY_COMMISSION_HKEY = pcl.POLICY_COMMISSION_HKEY
where 1=1
	and /**where**/
";

		}
    }
}
