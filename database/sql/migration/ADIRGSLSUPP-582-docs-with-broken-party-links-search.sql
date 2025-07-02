-- Поиск договоров с несуществующими контрагентами, по номеру договора, который не прошёл массовую реиндексацию.

DECLARE @contractWithBadReindex nvarchar(64) = 'INSERT_CONTRACT_NUMBER';
DECLARE @batchId nvarchar(64);

SELECT 
	BATCH_ID 
INTO #TempBadBatchesByContract
FROM BFX.DOCUMENT_SYNC_BATCH 
WHERE BODY like CONCAT('%', (SELECT CONTRACT_ID FROM PAS.CONTRACT WHERE CONTRACT_NUMBER = @contractWithBadReindex), '%')
AND STATUS = '3'

CREATE TABLE #TempBatchTable
(
  BatchId NVARCHAR(MAX),
  EntityId NVARCHAR(MAX), 
  EntityType NVARCHAR(MAX), 
  ConfigurationCodeName NVARCHAR(MAX), 
  PublishedArtifactVersion NVARCHAR(MAX),  
)

DECLARE cur_batch CURSOR LOCAL STATIC FORWARD_ONLY for
SELECT 	
	BATCH_ID
FROM #TempBadBatchesByContract

open cur_batch;

fetch next FROM cur_batch into @batchId
while @@FETCH_STATUS = 0 
BEGIN

INSERT INTO #TempBatchTable
SELECT @batchId BatchId, EntityId, EntityType, ConfigurationCodeName, PublishedArtifactVersion 
FROM OPENJSON((SELECT BODY FROM BFX.DOCUMENT_SYNC_BATCH 
WHERE Batch_Id = @batchId), '$' ) 
WITH (
[EntityId] NVARCHAR(MAX) '$.EntityId', 
[EntityType] NVARCHAR(MAX) '$.EntityType', 
[ConfigurationCodeName] NVARCHAR(MAX) '$.ConfigurationCodeName', 
[PublishedArtifactVersion] NVARCHAR(MAX) '$.PublishedArtifactVersion');

fetch next FROM cur_batch into @batchId
END;
close cur_batch;
deallocate cur_batch;

SELECT 
	tbt.*, 
	c.CONTRACT_NUMBER,
	JSON_VALUE(c.BODY, '$.policyHolder.partyData.partyCode') CONTRACT_HOLDER_CODE,
	JSON_VALUE(c.BODY, '$.insuredPerson.partyData.partyCode') CONTRACT_INSURED_CODE,
	JSON_VALUE(c.BODY, '$.initiator.employeeCode') CONTRACT_INITIATOR_EMPLOYEE_CODE, 
	qsl.HOLDER_CODE Q_HOLDER_CODE,
	qsl.INSURED_CODE Q_INSURED_CODE,
	qsl.INITIATOR_EMPLOYEE_CODE Q_INITIATOR_EMPLOYEE_CODE,
	psl.HOLDER_CODE P_HOLDER_CODE,
	psl.INSURED_CODE P_INSURED_CODE,
	psl.INITIATOR_EMPLOYEE_CODE P_INITIATOR_EMPLOYEE_CODE,
	ptyHolder.PARTY_CODE HOLDER_CODE_EXIST,
	ptyInsured.PARTY_CODE INSURED_CODE_EXIST,
	ptyInitiator.PARTY_CODE INITIATOR_CODE_EXIST,
	pdiHolder.DEDUPL_NUMBER HOLDER_DEDUPL_NUMBER,
	pdiInsured.DEDUPL_NUMBER INSURED_DEDUPL_NUMBER,
	pdiInitiator.DEDUPL_NUMBER INITIATOR_DEDUPL_NUMBER
FROM #TempBatchTable tbt
LEFT JOIN PAS.CONTRACT c ON c.CONTRACT_ID = tbt.EntityId
LEFT JOIN PAS_IMPL.QUOTE_HUB qs ON qs.CONTRACT_NUMBER = c.CONTRACT_NUMBER 
LEFT JOIN PAS_IMPL.QUOTE_SAT_LATEST qsl on qsl.QUOTE_HKEY = qs.QUOTE_HKEY 
LEFT JOIN PAS_IMPL.POLICY_HUB ps ON ps.CONTRACT_NUMBER = c.CONTRACT_NUMBER 
LEFT JOIN PAS_IMPL.POLICY_SAT_LATEST psl on psl.POLICY_HKEY = ps.POLICY_HKEY 
LEFT JOIN PTY.PARTY ptyHolder ON ptyHolder.PARTY_CODE = JSON_VALUE(c.BODY, '$.policyHolder.partyData.partyCode')
LEFT JOIN PTY.PARTY ptyInsured ON ptyInsured.PARTY_CODE = JSON_VALUE(c.BODY, '$.insuredPerson.partyData.partyCode')
LEFT JOIN PTY.PARTY ptyInitiator ON ptyInitiator.PARTY_CODE = JSON_VALUE(c.BODY, '$.initiator.partyCode')
LEFT JOIN PTY_IMPL.PARTY_DEDUP_INFO pdiHolder ON pdiHolder.PARTY_CODE = JSON_VALUE(c.BODY, '$.policyHolder.partyData.partyCode')
LEFT JOIN PTY_IMPL.PARTY_DEDUP_INFO pdiInsured ON pdiInsured.PARTY_CODE = JSON_VALUE(c.BODY, '$.insuredPerson.partyData.partyCode')
LEFT JOIN PTY_IMPL.PARTY_DEDUP_INFO pdiInitiator ON pdiInitiator.PARTY_CODE = JSON_VALUE(c.BODY, '$.initiator.partyCode')
WHERE 
(JSON_VALUE(c.BODY, '$.policyHolder.partyData.partyCode') IS NOT NULL AND ptyHolder.PARTY_CODE IS NULL) OR 
(JSON_VALUE(c.BODY, '$.insuredPerson.partyData.partyCode') IS NOT NULL AND ptyInsured.PARTY_CODE IS NULL) OR 
(JSON_VALUE(c.BODY, '$.initiator.partyCode') IS NOT NULL AND ptyInitiator.PARTY_CODE IS NULL)

IF EXISTS (
	select * from tempdb.dbo.sysobjects o
	where o.xtype in ('U') 

	and o.id = object_id(N'tempdb..#TempBadBatchesByContract')
)
BEGIN
  DROP TABLE #TempBadBatchesByContract; 
END
GO

IF EXISTS (
	select * from tempdb.dbo.sysobjects o
	where o.xtype in ('U') 

	and o.id = object_id(N'tempdb..#TempBatchTable')
)
BEGIN
  DROP TABLE #TempBatchTable; 
END
GO
