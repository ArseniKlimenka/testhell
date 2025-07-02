IF EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[impl_ldwh_zloss_view]'))
BEGIN
DROP VIEW [dbo].[impl_ldwh_zloss_view];
END
GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[impl_ldwh_zloss]') AND type IN (N'FN', N'FS', N'FT', N'TF', N'IF'))
BEGIN
DROP FUNCTION [dbo].[impl_ldwh_zloss];
END
GO

create function impl_ldwh_zloss()
returns table
as
return(
SELECT
	clmHub.CLAIM_NUMBER SCHADEN,
	CASE clmSatLatest.CLAIM_STATE
        WHEN 'RequestToClient' THEN '011'
        WHEN 'Expired' THEN '015'
        WHEN 'MethodologyDirectorApproval' THEN '007'
		WHEN 'SecurityApproval' THEN '007'
		WHEN 'ClaimManagerApproval' THEN '007'
		WHEN 'ClaimDirectorApproval' THEN '007'
		WHEN 'LegalApproval' THEN '007'
        WHEN 'Paid' THEN '009'
		WHEN 'Rejected' THEN '008'
		WHEN 'POCreation' THEN '099'
		WHEN 'SentToPayment' THEN '099'
		WHEN 'RejectedByCommonReasons' THEN '008'
		WHEN 'PartiallyPaid' THEN '016'
		WHEN 'RequestToExternalOrganisation' THEN '003'
		WHEN 'ОУСВ' THEN '010'
        ELSE NULL
    END
	ZLOS_ST1,
	NULL ZLOS_ST2,
	CAST(changeState.LOAD_DATE AS DATETIME) AS ZLOS_ST1D,
	CAST(NULL AS DATETIME) AS ZLOS_ST2D,
	NULL ZINS_VERN,
	policySatLatest.CURRENCY_CODE '0DOC_CURRCY',
	clmSatLatest.PAYMENT_AMOUNT_DOC_CUR ZINCEDT_S,
	ieSatLatest.TYPE_CODE ZINCEDT_R,
	CAST(ieSatLatest.IE_DATE AS DATETIME) AS ZINCEDT_D,
	CAST(clmApplicantSat.STATEMENT_RECEIVED_DATE AS DATETIME) AS ZREG_DATE,
	policySatLatest.HOLDER_CODE ZINSURER,
	contract.SEQ_NUMBER ZVERSNUM,
	contract.CONTRACT_NUMBER ZINS_CONT,
	NULL ZVARNUM,
	policySatLatest.PRODUCT_CODE ZINS_PROD,
	clmRiskSatLatest.CODE ZINS_RSK2,
	clmRiskSatLatest.BUSINESS_LINE ZGT_LLOB,
	clmRiskSatLatest.CODE ZINS_RSK1,
	CAST(NULL AS DATETIME) AS ZDECL_D,
	CAST(NULL AS DATETIME) AS ZINS_DATE,
	dbo.impl_sap_date(clmSatLatest.LOAD_DATE) as UPDATED_ON,
	prod.PRODUCT_GROUP as PRODUCT_GROUP
FROM CLM_IMPL.CLM_SAT_LATEST clmSatLatest
LEFT JOIN CLM_IMPL.CLM_IE_LINK clmIeLink ON clmIeLink.CLM_HKEY = clmSatLatest.CLM_HKEY
LEFT JOIN CLM_IMPL.CLM_HUB clmHub ON clmHub.CLM_HKEY = clmIeLink.CLM_HKEY
LEFT JOIN CLM_IMPL.IE_HUB ieHub ON ieHub.IE_HKEY = clmIeLink.IE_HKEY
LEFT JOIN CLM_IMPL.IE_SAT_LATEST ieSatLatest ON ieSatLatest.IE_HKEY = ieHub.IE_HKEY
LEFT JOIN CLM_IMPL.CLM_RISK_SAT_LATEST clmRiskSatLatest ON clmRiskSatLatest.CLM_RISK_HKEY = clmHub.CLM_HKEY and IS_DELETED = 0
LEFT JOIN CLM_IMPL.IE_CONTRACT_LINK ieContractLink ON ieContractLink.IE_HKEY = ieHub.IE_HKEY
LEFT JOIN PAS_IMPL.POLICY_HUB policyHub ON policyHub.POLICY_HKEY = ieContractLink.POLICY_HKEY
LEFT JOIN PAS_IMPL.POLICY_SAT_LATEST policySatLatest ON policySatLatest.POLICY_HKEY = policyHub.POLICY_HKEY
LEFT JOIN PAS.CONTRACT contract ON contract.CONTRACT_NUMBER = policyHub.CONTRACT_NUMBER
LEFT JOIN CLM_IMPL.CLM_APPLICANT_LINK clmApplicantLink ON clmApplicantLink.CLM_HKEY = clmSatLatest.CLM_HKEY
LEFT JOIN CLM_IMPL.CLM_APPLICANT_SAT clmApplicantSat ON clmApplicantSat.CLM_APPLICANT_HKEY = clmApplicantLink.CLM_APPLICANT_HKEY
INNER JOIN(
	SELECT * FROM (
	SELECT *, RANK() OVER (PARTITION BY CONTRACT_NUMBER ORDER BY LOAD_DATE DESC) RANK_STATE FROM (
		SELECT clmSat.CLM_HKEY, clmSat.LOAD_DATE, policyHub.CONTRACT_NUMBER, clmSat.CLAIM_STATE
		FROM CLM_IMPL.CLM_SAT clmSat
		INNER JOIN(
			SELECT clmSatInner.CLM_HKEY CLM_HKEY_1, clmSatInner.LOAD_DATE, policyHubInner.CONTRACT_NUMBER, clmSatInner.CLAIM_STATE,
			LAG(CLAIM_STATE) over(order by clmSatInner.LOAD_DATE) as PREV_CLAIM_STATE
			FROM CLM_IMPL.CLM_SAT clmSatInner
			LEFT JOIN CLM_IMPL.CLM_IE_LINK clmIeLinkInner ON clmIeLinkInner.CLM_HKEY = clmSatInner.CLM_HKEY
			LEFT JOIN CLM_IMPL.IE_CONTRACT_LINK ieContractLinkInner ON ieContractLinkInner.IE_HKEY = clmIeLinkInner.IE_HKEY
			LEFT JOIN PAS_IMPL.POLICY_HUB policyHubInner ON policyHubInner.POLICY_HKEY = ieContractLinkInner.POLICY_HKEY
		) clmInner ON clmSat.CLAIM_STATE != clmInner.PREV_CLAIM_STATE and clmSat.LOAD_DATE = clmInner.LOAD_DATE
		LEFT JOIN CLM_IMPL.CLM_IE_LINK clmIeLink ON clmIeLink.CLM_HKEY = clmSat.CLM_HKEY
		LEFT JOIN CLM_IMPL.IE_CONTRACT_LINK ieContractLink ON ieContractLink.IE_HKEY = clmIeLink.IE_HKEY
		LEFT JOIN PAS_IMPL.POLICY_HUB policyHub ON policyHub.POLICY_HKEY = ieContractLink.POLICY_HKEY
	) TEMP
	) RANKED WHERE RANK_STATE = 1
) changeState ON changeState.CONTRACT_NUMBER = policyHub.CONTRACT_NUMBER and changeState.CLM_HKEY = clmSatLatest.CLM_HKEY
LEFT JOIN BFX_IMPL.PRODUCTS prod on prod.CODE = policySatLatest.PRODUCT_CODE
)
GO

create view IMPL_LDWH_ZLOSS_VIEW
as
select * from impl_ldwh_zloss()
GO

-- examples
/*
select * from dbo.impl_ldwh_zloss()

select * from IMPL_LDWH_zloss_VIEW
*/