namespace Adacta.AdInsure.RGSL.Framework.Infrastructure.Activities.Queries
{
    public static class ActivityIndexerRgslQuery
    {
        public static string SelectExtraVerificationData()
        {
            return @"

select
	verificationState.CODE_NAME as VERIFICATION_STATE,
	pols.PARTNER_CODE,
	pols.PARTNER_NAME,
	pols.ISSUE_DATE,
	pols.START_DATE,
	pols.END_DATE,
	pols.PAYMENT_FREQUENCY_CODE,
	pf.DESCRIPTION as PAYMENT_FREQUENCY_NAME,
	pols.PRODUCT_CODE,
	p.DESCRIPTION as PRODUCT_NAME,
	p.PRODUCT_GROUP as PRODUCT_GROUP_CODE,
	contractState.CODE_NAME as CONTRACT_STATE,
	pols.HOLDER_NAME,
	pols.HOLDER_AGE,
	pols.HOLDER_BIRTH_DATE
from
	bfx.UNIVERSAL_DOCUMENT ud
	inner join cfg.PROCESS_STATE verificationState on verificationState.PROCESS_STATE_ID = ud.STATE_ID
	inner join pas.CONTRACT c on c.CONTRACT_NUMBER = @1
	inner join cfg.PROCESS_STATE contractState on contractState.PROCESS_STATE_ID = c.STATE_ID
	inner join bfx.ENTITY_REF er on er.BUSINESS_KEY = c.CONTRACT_NUMBER and er.PUBLISHED_ARTIFACT_ID = c.PUBLISHED_ARTIFACT_ID
	left join pas_impl.POLICY_HUB polh on polh.CONTRACT_NUMBER = c.CONTRACT_NUMBER
	left join pas_impl.POLICY_SAT_LATEST pols on pols.POLICY_HKEY = polh.POLICY_HKEY
	left join bfx_impl.PRODUCTS p on p.CODE = pols.PRODUCT_CODE
	left join bfx_impl.PAYMENT_FREQUENCY pf on pf.CODE = pols.PAYMENT_FREQUENCY_CODE
where 1=1
	and ud.UNIVERSAL_DOCUMENT_NUMBER = @0";
        }
    }
}
