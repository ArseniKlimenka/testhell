update c
set body = json_modify(BODY, '$.allocationInformation', null)
from
	pas.CONTRACT c
	inner join cfx.PUBLISHED_ARTIFACT pa on pa.PUBLISHED_ARTIFACT_ID = c.PUBLISHED_ARTIFACT_ID
where 1=1
	and SEQ_NUMBER != 0
	and json_query(body, '$.allocationInformation') is not null
