IF NOT EXISTS (
SELECT
	1
FROM
	sys.indexes
WHERE
	name = 'IDX_AA_BASE_SAT_AGENT'
	AND object_id = OBJECT_ID('PAS_IMPL.AA_BASE_SAT') ) BEGIN
	CREATE INDEX IDX_AA_BASE_SAT_AGENT ON
PAS_IMPL.AA_BASE_SAT(AGENT)
END

------------------

IF NOT EXISTS (
SELECT
	1
FROM
	sys.indexes
WHERE
	name = 'IDX_AA_BASE_SAT_START_DATE'
	AND object_id = OBJECT_ID('PAS_IMPL.AA_BASE_SAT') ) BEGIN
	CREATE INDEX IDX_AA_BASE_SAT_START_DATE ON
PAS_IMPL.AA_BASE_SAT(START_DATE)
END

------------------

IF NOT EXISTS (
SELECT
	1
FROM
	sys.indexes
WHERE
	name = 'IDX_AA_BASE_SAT_END_DATE'
	AND object_id = OBJECT_ID('PAS_IMPL.AA_BASE_SAT') ) BEGIN
	CREATE INDEX IDX_AA_BASE_SAT_END_DATE ON
PAS_IMPL.AA_BASE_SAT(END_DATE)
END

------------------