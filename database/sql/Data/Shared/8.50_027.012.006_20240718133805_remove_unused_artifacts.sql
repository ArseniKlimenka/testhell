delete from bfx.ENTITY_REF where PUBLISHED_ARTIFACT_ID in
(
	select PUBLISHED_ARTIFACT_ID from cfx.PUBLISHED_ARTIFACT where CODE_NAME in
	(
		'AggregationType',
		'ContractBusinessState',
		'ContractType',
		'InsuranceType',
		'ObjectType',
		'SelectionScope'
	)
)
go
