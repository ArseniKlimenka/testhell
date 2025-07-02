drop table if exists CONSENT_TO_DATA_TRANSFERING_FNS;

go

select 
  c1.CONTRACT_NUMBER
into
  CONSENT_TO_DATA_TRANSFERING_FNS
from PAS_IMPL.POLICY_SAT_LATEST ps
  join PAS_IMPL.POLICY_HUB ph on ps.POLICY_HKEY = ph.POLICY_HKEY
  join [PAS].[CONTRACT] c on c.CONTRACT_NUMBER = ph.CONTRACT_NUMBER
  join [PAS].[CONTRACT] c1 on c1.ORIGINAL_DOCUMENT_ID = c.ORIGINAL_DOCUMENT_ID
where (ps.STATE = 'Activated' OR ps.STATE = 'Active') 
  AND ps.START_DATE >= '2024-10-10'
  AND ps.INSURANCE_TERMS >= 5
  AND ps.PRODUCT_CODE in (select PRODUCT_CODE FROM [BFX_IMPL].[PRODUCT_CONF] WHERE [CONSENT_TO_DATA_TRANSFERING_FNS] = 1)

go

update
  PAS.CONTRACT
set
  BODY = JSON_MODIFY(BODY, '$.consent', JSON_QUERY('{ "consentToDataTransferingFNS": true }')),
  SNAPSHOT_BODY = JSON_MODIFY(SNAPSHOT_BODY, '$.consent', JSON_QUERY('{ "consentToDataTransferingFNS": true }'))
from 
  CONSENT_TO_DATA_TRANSFERING_FNS trn
where CONTRACT.CONTRACT_NUMBER = trn.CONTRACT_NUMBER;

go

update
  PAS.CONTRACT
set
  BODY = JSON_MODIFY(BODY, '$.productConfiguration.consentToDataTransferingFNS', cast(1 as bit)),
  SNAPSHOT_BODY = JSON_MODIFY(SNAPSHOT_BODY, '$.productConfiguration.consentToDataTransferingFNS', cast(1 as bit)),
  COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.attributes.productConfigurationData.consentToDataTransferingFNS', cast(1 as bit))
from 
  CONSENT_TO_DATA_TRANSFERING_FNS trn
where CONTRACT.CONTRACT_NUMBER = trn.CONTRACT_NUMBER;

go

drop table if exists CONSENT_TO_DATA_TRANSFERING_FNS;

go