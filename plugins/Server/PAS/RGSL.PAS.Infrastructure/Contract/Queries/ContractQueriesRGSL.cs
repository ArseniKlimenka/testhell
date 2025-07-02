namespace Adacta.AdInsure.RGSL.PAS.Infrastructure.Contract.Queries
{
    public static class ContractQueriesRGSL
    {
        public static string GetContractsInfoQuery()
        {
            return @"
SELECT ctr.CONTRACT_ID,
	   ctr.CONTRACT_NUMBER,
	   art.CODE_NAME,
       art.PUBLISHED_ARTIFACT_ID,
	   art.CONCEPT_TYPE_ID,
	   art.PUBLISHED_VERSION,
	   eref.ENTITY_REF_ID,
	   pSat.PRODUCT_CODE,
       ps.CODE_NAME as STATE,
       pSat.ISSUE_DATE,
       pSat.HOLDER_CODE
FROM PAS.CONTRACT ctr
	inner join cfg.PROCESS_STATE ps on ps.PROCESS_STATE_ID = ctr.STATE_ID
JOIN CFX.PUBLISHED_ARTIFACT art ON art.PUBLISHED_ARTIFACT_ID = ctr.PUBLISHED_ARTIFACT_ID
JOIN BFX.ENTITY_REF eref ON eref.ENTITY_ID = ctr.CONTRACT_ID
JOIN PAS_IMPL.POLICY_HUB pHub ON pHub.CONTRACT_NUMBER = ctr.CONTRACT_NUMBER
JOIN PAS_IMPL.POLICY_SAT_LATEST pSat ON pSat.POLICY_HKEY = pHub.POLICY_HKEY
WHERE 1 = 1
AND /**where**/
";
        }

        public static string GetContractOrAmendmentSysDataQuery()
        {
            return @"
SELECT ctr.CONTRACT_ID,
	   ctr.CONTRACT_NUMBER,
	   origCtr.CONTRACT_NUMBER AS ORIGINAL_CONTRACT_NUMBER,
	   ctr.SEQ_NUMBER,
	   art.CODE_NAME,
       art.PUBLISHED_ARTIFACT_ID,
	   art.CONCEPT_TYPE_ID,
	   art.PUBLISHED_VERSION,
	   eref.ENTITY_REF_ID
FROM PAS.CONTRACT ctr
JOIN CFX.PUBLISHED_ARTIFACT art ON art.PUBLISHED_ARTIFACT_ID = ctr.PUBLISHED_ARTIFACT_ID
JOIN BFX.ENTITY_REF eref ON eref.ENTITY_ID = ctr.CONTRACT_ID
JOIN PAS.CONTRACT origCtr on origCtr.CONTRACT_ID = ctr.ORIGINAL_DOCUMENT_ID
WHERE 1 = 1
AND /**where**/
";
        }

        public static string UpdateContractRisksQuery()
        {
            return @"
update
  PAS.CONTRACT
set
  BODY = JSON_MODIFY(BODY, '$.risks', JSON_QUERY(@bodyRisks)),
  COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.items[0].attributes.risks', JSON_QUERY(@commonBodyRisks)),
  SYS_UPDATED_ON = GETDATE()
where CONTRACT_NUMBER = @contractNumber
";
        }
    }
}
