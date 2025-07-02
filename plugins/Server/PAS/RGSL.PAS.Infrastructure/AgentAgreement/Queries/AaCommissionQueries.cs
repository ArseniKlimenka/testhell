namespace Adacta.AdInsure.RGSL.PAS.Infrastructure.AgentAgreement.Queries
{
    static class AaCommissionQueries
    {
        public static string SelectContracts()
        {
            return @"
select
	polh.CONTRACT_NUMBER,
	pols.CURRENCY_CODE,
	aah.AA_NUMBER as AA_NUMBER,
	aas.EXTERNAL_NUMBER as AA_EXTERNAL_NUMBER,
	sph.SERVICE_PROVIDER_CODE as AGENT_CODE,
	ptys.SHORT_NAME as AGENT_SHORT_NAME,
	aas.IS_TECHNICAL
from
	pas_impl.POLICY_HUB polh
	inner join pas_impl.POLICY_SAT_LATEST pols on pols.POLICY_HKEY = polh.POLICY_HKEY
	inner join pas_impl.POLICY_COMMISSION_LINK pcl on pcl.POLICY_HKEY = polh.POLICY_HKEY
	inner join pas_impl.AA_HUB aah on aah.AA_HKEY = pcl.AA_HKEY
	inner join pas_impl.AA_SAT_LATEST aas on aas.AA_HKEY = pcl.AA_HKEY
	inner join org_impl.SERVICE_PROVIDER_HUB sph on sph.SERVICE_PROVIDER_HKEY = pcl.SERVICE_PROVIDER_HKEY
	inner join org_impl.SERVICE_PROVIDER_INFO_SAT_LATEST sps on sps.SERVICE_PROVIDER_INFO_HKEY = pcl.SERVICE_PROVIDER_HKEY
	inner join pty_impl.PARTY_HUB ptyh on ptyh.PARTY_CODE = sps.PARTY_CODE
	inner join pty_impl.PARTY_INFO_SAT_LATEST ptys on ptys.PARTY_INFO_HKEY = ptyh.PARTY_HKEY
where 1=1
	and /**where**/
";
        }
    }
}
