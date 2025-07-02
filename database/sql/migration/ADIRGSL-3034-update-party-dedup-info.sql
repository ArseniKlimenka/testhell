IF EXISTS (
	select * from tempdb.dbo.sysobjects o
	where o.xtype in ('U') 

	and o.id = object_id(N'tempdb..#tempPartyRank')
)
BEGIN
  DROP TABLE #tempPartyRank; 
END
GO


with pd as(
		select
			p.PARTY_CODE,
			JSON_VALUE (p.BODY,'$.partyPersonData.lastName') as lastName,
			JSON_VALUE (p.BODY,'$.partyPersonData.firstName') as firstName,
			JSON_VALUE (p.BODY,'$.partyPersonData.middleName') as middleName,
			JSON_VALUE (p.BODY,'$.partyPersonData.dateOfBirth') as DofB,
			JSON_VALUE (p.BODY,'$.partyDocuments[0].docType.docTypeCode') as docCode, 
			JSON_VALUE (p.BODY,'$.partyDocuments[0].docSeries') as docSeries, 
			JSON_VALUE (p.BODY,'$.partyDocuments[0].docNumber') as docNumber,
			p.SYS_UPDATED_ON as upd_date,
			p.PUBLISHED_ARTIFACT_ID
		from pty.party p
		--where p.PARTY_CODE in ('181489','181492','181494') --пример контрагента, где есть опечатка в ФИО и разные даты рождения
)


	select  
		pd.party_code,
		first_value(pd.party_code)
				over (partition by  
						pd.lastName, 
						pd.firstName, 
						pd.middleName, 
						pd.DofB,
						pd.docCode,
						pd.docSeries, 
						pd.docNumber
						order by pd.upd_date desc
						) 
			as dedupl_number,
		dense_rank()
				 over (partition by  
						pd.lastName, 
						pd.firstName, 
						pd.middleName, 
						pd.DofB,
						pd.docCode,
						pd.docSeries, 
						pd.docNumber 
						order by pd.upd_date desc
						) 
			as party_rank,
		pd.upd_date,
		pd.lastName, 
		pd.firstName, 
		pd.middleName, 
		pd.DofB,
		pd.docCode,
		pd.docSeries, 
		pd.docNumber
	into #tempPartyRank	
	from pd
	join cfx.PUBLISHED_ARTIFACT pa on pa.PUBLISHED_ARTIFACT_ID = pd.PUBLISHED_ARTIFACT_ID
    where pa.CODE_NAME = 'NaturalPerson'

--SELECT * FROM #tempPartyRank
INSERT INTO PTY_IMPL.PARTY_DEDUP_INFO (PARTY_CODE, DEDUPL_NUMBER, UPDATE_ORDER, IS_PROCESSED, ERROR, DATE)
SELECT 
	tpr.PARTY_CODE, 
	tpr.DEDUPL_NUMBER, 
	0 UPDATE_ORDER,
	0 IS_PROCESSED, 
	NULL ERROR, 
	GETDATE() DATE
FROM #tempPartyRank tpr
LEFT JOIN PTY_IMPL.PARTY_DEDUP_INFO pdi ON pdi.DEDUPL_NUMBER = tpr.dedupl_number
WHERE tpr.party_rank != 1 and 
(pdi.DEDUPL_NUMBER != tpr.DEDUPL_NUMBER OR pdi.DEDUPL_NUMBER IS NULL) AND
(pdi.PARTY_CODE != tpr.PARTY_CODE OR pdi.PARTY_CODE IS NULL)
