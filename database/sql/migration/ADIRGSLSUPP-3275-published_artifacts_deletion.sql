declare @assetArtId NVARCHAR(100)
set @assetArtId = 
(
	SELECT PUBLISHED_ARTIFACT_ID
	FROM CFX.PUBLISHED_ARTIFACT a
	WHERE CODE_NAME = 'Asset'
)

declare @AssetUpdatedAllStatesArtId NVARCHAR(100)
set @AssetUpdatedAllStatesArtId = 
(
	SELECT PUBLISHED_ARTIFACT_ID
	FROM CFX.PUBLISHED_ARTIFACT a
	WHERE CODE_NAME = 'AssetUpdatedAllStates'
)

delete from CFX.PUBLISHED_ARTIFACT_INDEX
where PUBLISHED_ARTIFACT_ID IN (@assetArtId, @AssetUpdatedAllStatesArtId)

delete from CFX.PUBLISHED_ARTIFACT_ITEM
where PUBLISHED_ARTIFACT_ID IN (@assetArtId, @AssetUpdatedAllStatesArtId)

delete from BFX.RECENT_DOCUMENT
where ENTITY_REF_ID IN (
	select ENTITY_REF_ID
	from BFX.ENTITY_REF
	where PUBLISHED_ARTIFACT_ID IN (@assetArtId, @AssetUpdatedAllStatesArtId)
)

delete from BFX.ATTACHMENT_RELATED_ENTITY
where ENTITY_REF_ID IN (
	select ENTITY_REF_ID
	from BFX.ENTITY_REF
	where PUBLISHED_ARTIFACT_ID IN (@assetArtId, @AssetUpdatedAllStatesArtId)
)

delete from BFX.ENTITY_REF
where PUBLISHED_ARTIFACT_ID IN (@assetArtId, @AssetUpdatedAllStatesArtId)

delete from BFX.UNIVERSAL_DOCUMENT_HISTORY
where UNIVERSAL_DOCUMENT_ID IN (
	select UNIVERSAL_DOCUMENT_ID
	from BFX.UNIVERSAL_DOCUMENT
	where PUBLISHED_ARTIFACT_ID IN (@assetArtId, @AssetUpdatedAllStatesArtId)
)

delete from BFX.UNIVERSAL_DOCUMENT
where PUBLISHED_ARTIFACT_ID IN (@assetArtId, @AssetUpdatedAllStatesArtId)

delete from cfx.PUBLISHED_ARTIFACT
where PUBLISHED_ARTIFACT_ID IN (@assetArtId, @AssetUpdatedAllStatesArtId)