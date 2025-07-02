namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.GeneralLedger.Queries
{
    public static class GLDimensionsQueries
    {
        /// <summary>
        /// Generates select statement for OFR_ID.
        /// </summary>
        /// <returns>SQL query</returns>
        public static string SelectOfrByCriteria()
        {
            return @"
select top 1
	ofr.OFR_ID,
	ofr.OFR_CODE,
	ofr.DESCRIPTION
from
	ACC_IMPL.OFR_RULE r
	inner join ACC_IMPL.CT_OFR ofr on r.OFR_ID = ofr.OFR_ID
where r.GL_ACCOUNT_ID = @glAccountId
	and (r.PREVIOUS_PERIOD is null or r.PREVIOUS_PERIOD = @isPreviousPeriod)
	and (r.DOCUMENT_TYPE_ID is null or r.DOCUMENT_TYPE_ID = @documentTypeId)
	and (r.CURRENCY_CODE is null or r.CURRENCY_CODE = @currencyCode)
order by
	r.PREVIOUS_PERIOD desc,
	r.DOCUMENT_TYPE_ID desc,
	r.CURRENCY_CODE desc
            ";
        }

        /// <summary>
        /// Generates select statement for SAP GL Account.
        /// </summary>
        /// <returns>SQL query</returns>
        public static string SelectSapGlAccountByCriteria()
        {
            return @"
select top 1
	sa.SAP_GL_ACCOUNT_ID,
	sa.SAP_GL_ACCOUNT_NO,
	sa.DESCRIPTION,
	sa.ATTRIBUTE_SET_ID
from
	ACC_IMPL.SAP_GL_ACCOUNT_RULE r
	inner join ACC_IMPL.SAP_GL_ACCOUNT sa on r.SAP_GL_ACCOUNT_ID = sa.SAP_GL_ACCOUNT_ID
where GL_ACCOUNT_ID = @glAccountId
	and coalesce(r.OFR_ID, -1) = coalesce(@ofrId, -1)
	and (r.PREVIOUS_PERIOD is null or r.PREVIOUS_PERIOD = @isPreviousPeriod)
	and (r.PERSON_TYPE_ID is null or r.PERSON_TYPE_ID = @personTypeId)
	and (r.AGENT_TYPE is null or r.AGENT_TYPE = @agentType)
order by
	case when r.AGENT_TYPE is null then 1 else 0 end,
	sa.SAP_GL_ACCOUNT_ID";
        }

        public static string SelectTransactionDefinition()
        {
            return @"
select top 1
	TRANSACTION_DEFINITION_NO,
	TRANSACTION_TYPE_ID,
	DOCUMENT_TYPE_ID,
	[SIGN],
	IS_PREVIOUS_PERIOD,
	IS_LIFE,
	AGENT_TYPE
from
	acc_impl.TRANSACTION_DEFINITION
where 1=1
	and TRANSACTION_TYPE_ID = @transactionTypeId
	and DOCUMENT_TYPE_ID = @documentTypeId
	and ([SIGN] is null or [SIGN] = @sign)
	and (IS_PREVIOUS_PERIOD is null or IS_PREVIOUS_PERIOD = @isPreviousPeriod)
	and (IS_LIFE is null or IS_LIFE = @isLife)
	and (AGENT_TYPE is null or AGENT_TYPE = @agentType)
order by
	case when AGENT_TYPE is null then 1 else 0 end,
	TRANSACTION_DEFINITION_NO";
        }

        public static string SelectTransactionDefinitionStep()
        {
            return @"
select
	TRANSACTION_DEFINITION_NO,
	IS_DEBIT,
	PAIR_NO,
	PAIR_SEQ_NO,
	GL_ACCOUNT_ID,
	ATTRIBUTE_SET_ID,
	[SIGN]
from
	ACC_IMPL.TRANSACTION_DEFINITION_STEP
where 1=1
	and TRANSACTION_DEFINITION_NO = @transactionDefinitionNo";
        }

        /// <summary>
        /// Generates select statement for SAP GL Account.
        /// </summary>
        /// <returns>SQL query</returns> 
        public static string SelectSapGlAccountById()
        {
            return @"
            select sa.SAP_GL_ACCOUNT_ID, sa.SAP_GL_ACCOUNT_NO, sa.DESCRIPTION, sa.ATTRIBUTE_SET_ID
            from ACC_IMPL.SAP_GL_ACCOUNT sa
            where SAP_GL_ACCOUNT_ID = @sapGlAccountId;        
            ";
        }

        /// <summary>
        /// Generates select statement for Transaction type and it's related properties.
        /// </summary>
        /// <returns>SQL query</returns>   
        public static string SelectTransactionTypeById()
        {
            return @"
            select TRANSACTION_TYPE_ID, DESCRIPTION, TRANSACTION_DOCUMENT_TYPE_ID, LOCAL_DIMENSION_3_ID
            from ACC_IMPL.TRANSACTION_TYPE
            where TRANSACTION_TYPE_ID = @transactionTypeId;
            ";
        }

        /// <summary>
        /// Generates select statement for Currency ISO Code selection
        /// </summary>
        /// <returns></returns>
        public static string SelectCurrencyIsoCodeByCurrencyCode()
        {
            return @"
            select ISO_NUMERIC_CODE
            from BFX.CURRENCY_REF
            where CURRENCY_CODE = @currencyCode
            ";
        }

        public static string SelectPolicyHolderDimensionsList()
        {
            return @"
select
	ph.CONTRACT_NUMBER,
	ps.HOLDER_CODE as PARTY_CODE,
	ps.PARTNER_CODE,
	ps.INITIATOR_EMPLOYEE_CODE,
	ps.EXCHANGE_RATE
from PAS_IMPL.POLICY_HUB ph
	inner join pas_impl.POLICY_SAT_LATEST ps on ph.POLICY_HKEY = ps.POLICY_HKEY
where
	ph.CONTRACT_NUMBER in (@contractNumbers)
";
        }

        public static string SelectPaymentDimensionsList()
        {
            return @"
select
	bsi.BANK_STATEMENT_ITEM_ID,
	bsi.PAYMENT_DATE
from acc_impl.BANK_STATEMENT_ITEM bsi
where 1=1
	and bsi.BANK_STATEMENT_ITEM_ID in (@bsiIds)
";
        }

        public static string SelectServiceProviderDimensions()
        {
            return @"
select
	sph.SERVICE_PROVIDER_CODE,
	spis.PARTY_CODE,
	spis.PARTNER_TYPE,
	spis.PARTNER_CODE as PARTNER_MANUAL_CODE,
	spsa.ORDER_NUMBER as INITIATOR_ORDER_NUMBER,
	rgslb.KSP as INITIATOR_KSP
from
	org_impl.SERVICE_PROVIDER_HUB sph
	inner join org_impl.SERVICE_PROVIDER_INFO_SAT_LATEST spis on spis.SERVICE_PROVIDER_INFO_HKEY = sph.SERVICE_PROVIDER_HKEY
	left join org_impl.SP_SUB_AGENT_SAT_LATEST spsa on spsa.SP_SUB_AGENT_HKEY = sph.SERVICE_PROVIDER_HKEY
	left join bfx_impl.RGS_BRANCHES rgslb on rgslb.ID = spsa.BRANCH_ID
where sph.SERVICE_PROVIDER_CODE in (@serviceProviderCodes)
";
        }

        public static string SelectPartyDimensionsList()
        {
            return @"
select
	ph.PARTY_CODE,
	pi.TRADING_PARTNER_CODE,
	pi.CONFIGURATION_CODE_NAME as PARTY_TYPE
from
	pty_impl.PARTY_HUB ph
	inner join pty_impl.PARTY_INFO_SAT_LATEST pi on ph.PARTY_HKEY = pi.PARTY_INFO_HKEY
where ph.PARTY_CODE in (@partyCodes)
";
        }

        public static string SelectAADataByContractList()
        {
            return @"
select
	ph.CONTRACT_NUMBER,
	MVZ_NUMBER,
	agent.SERVICE_PROVIDER_CODE as AGENT_SERVICE_PROVIDER_CODE,
	aa.ORDER_NUMBER
from
	pas_impl.POLICY_HUB ph
	inner join pas_impl.POLICY_COMMISSION_LINK pcl on ph.POLICY_HKEY = pcl.POLICY_HKEY
	inner join pas_impl.AA_SAT aa on aa.AA_HKEY = pcl.AA_HKEY
	inner join pas_impl.AA_HUB aaHub on aa.AA_HKEY = aaHub.AA_HKEY
	left join (
		select
			pl.AA_HKEY,
			sph.SERVICE_PROVIDER_CODE
		from
			PAS_IMPL.AA_PARTICIPANT_LINK pl
			inner join pas_impl.AA_PARTICIPANT_SAT ps on pl.AA_PARTICIPANT_HKEY = ps.AA_PARTICIPANT_HKEY and ps.ROLE = 'Agent'
			inner join org_impl.SERVICE_PROVIDER_HUB sph on sph.SERVICE_PROVIDER_HKEY = pl.SERVICE_PROVIDER_HKEY
	) agent on agent.AA_HKEY = aa.AA_HKEY
where ph.CONTRACT_NUMBER in (@contractNumbers)
";
        }

        public static string SelectBusinessLineByRiskCodeList()
        {
            return @"
SELECT r.CODE, r.TYPE, r.SHORT_DESCRIPTION, r.FULL_DESCRIPTION, r.BUSINESS_LINE, t.IS_LIFE
FROM BFX_IMPL.RISKS r
inner join BFX_IMPL.RISK_TYPE t on r.TYPE = t.RISK_TYPE
WHERE 1 = 1
AND CODE in (@riskCodes)
            ";
        }

        public static string SelectClaimInfo()
        {
            return @"
select
	clmh.CLAIM_NUMBER,
	polh.CONTRACT_NUMBER,
	clmrs.CODE as SELECTED_RISK_CODE,
	clmas.STATEMENT_APPLICATION_DATE
from
	clm_impl.CLM_HUB clmh
	inner join clm_impl.CLM_IE_LINK clmiel on clmiel.CLM_HKEY = clmh.CLM_HKEY
	inner join clm_impl.CLM_IE_SAT_LATEST clmies on clmies.CLM_IE_HKEY = clmiel.CLM_IE_HKEY and clmies.IS_DELETED = 0
	inner join clm_impl.IE_CONTRACT_LINK iecl on iecl.IE_HKEY = clmiel.IE_HKEY
	inner join clm_impl.IE_CONTRACT_SAT_LATEST iecs on iecs.IE_CONTRACT_HKEY = iecl.IE_CONTRACT_HKEY and iecs.IS_DELETED = 0
	inner join pas_impl.POLICY_HUB polh on polh.POLICY_HKEY = iecl.POLICY_HKEY
	inner join clm_impl.CLM_RISK_SAT_LATEST clmrs on clmrs.CLM_RISK_HKEY = clmh.CLM_HKEY
	inner join clm_impl.CLM_APPLICANT_LINK clmal on clmal.CLM_HKEY = clmh.CLM_HKEY
	inner join clm_impl.CLM_APPLICANT_SAT_LATEST clmas on clmas.CLM_APPLICANT_HKEY = clmal.CLM_APPLICANT_HKEY and clmas.IS_DELETED = 0
where clmh.CLAIM_NUMBER = @claimNumber
                ";
        }

        public static string SelectEndowmentInfo()
        {
            return @"
select
	ewth.ENDOWMENT_NUMBER,
	polh.CONTRACT_NUMBER,
	ewtrs.CODE as SELECTED_RISK_CODE,
	ewtas.STATEMENT_APPLICATION_DATE
from ewt_impl.EWT_HUB ewth
	inner join ewt_impl.EWT_RISK_SAT_LATEST ewtrs on ewtrs.EWT_RISK_HKEY = ewth.EWT_HKEY
	inner join ewt_impl.EWT_CONTRACT_LINK ewtcl on ewtcl.EWT_HKEY = ewth.EWT_HKEY
	inner join ewt_impl.EWT_CONTRACT_SAT_LATEST ewtcs on ewtcs.EWT_CONTRACT_HKEY = ewtcl.EWT_CONTRACT_HKEY and ewtcs.IS_DELETED = 0
	inner join pas_impl.POLICY_HUB polh on polh.POLICY_HKEY = ewtcl.POLICY_HKEY
	inner join ewt_impl.EWT_APPLICANT_LINK ewtal on ewtal.EWT_HKEY = ewth.EWT_HKEY
	inner join ewt_impl.EWT_APPLICANT_SAT_LATEST ewtas on ewtas.EWT_APPLICANT_HKEY = ewtal.EWT_APPLICANT_HKEY and ewtas.IS_DELETED = 0
where ewth.ENDOWMENT_NUMBER = @endowmentNumber
                ";
        }

        public static string SelectMainContractNo()
        {
            return @"
                select ph.CONTRACT_NUMBER
                from PAS_IMPL.AMENDMENT_HUB ah
                inner join pas_impl.POLICY_AMENDMENT_LINK al on ah.AMENDMENT_HKEY = al.AMENDMENT_HKEY
                inner join pas_impl.POLICY_HUB ph on ph.POLICY_HKEY = al.POLICY_HKEY
                where ah.AMENDMENT_NUMBER = @contractNo
                ";
        }
    }
}
