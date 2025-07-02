namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.Commission.Act.Queries
{
    static class CommissionActPopulationQueries
    {
        public static string GetContractRisks()
        {
            return @"
select ph.CONTRACT_NUMBER, prs.RISK_CODE, prs.PREMIUM
from
	pas_impl.POLICY_HUB ph
	inner join pas_impl.POLICY_RISKS_SAT_LATEST prs on prs.POLICY_RISKS_HKEY = ph.POLICY_HKEY and prs.IS_DELETED = 0
where /**where**/";
        }
    }
}
