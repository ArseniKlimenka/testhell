IF NOT EXISTS (
SELECT
	1
FROM
	sys.indexes
WHERE
	name = 'IDX_AA_ORGANISATION_UNIT_SAT_CODE'
	AND object_id = OBJECT_ID('PAS_IMPL.AA_ORGANISATION_UNIT_SAT') ) BEGIN
	CREATE INDEX IDX_AA_ORGANISATION_UNIT_SAT_CODE ON
PAS_IMPL.AA_ORGANISATION_UNIT_SAT(CODE)
END

------------------