IF NOT EXISTS (
SELECT
	1
FROM
	sys.indexes
WHERE
	name = 'IDX_AA_AMENDMENT_SAT_MANUAL_NUMBER'
	AND object_id = OBJECT_ID('PAS_IMPL.AA_AMENDMENT_SAT') ) BEGIN
	CREATE INDEX IDX_AA_AMENDMENT_SAT_MANUAL_NUMBER ON
PAS_IMPL.AA_AMENDMENT_SAT(MANUAL_NUMBER)
END

------------------

IF NOT EXISTS (
SELECT
	1
FROM
	sys.indexes
WHERE
	name = 'IDX_AA_AMENDMENT_SAT_SHOULD_BE_SIGNED'
	AND object_id = OBJECT_ID('PAS_IMPL.AA_AMENDMENT_SAT') ) BEGIN
	CREATE INDEX IDX_AA_AMENDMENT_SAT_SHOULD_BE_SIGNED ON
PAS_IMPL.AA_AMENDMENT_SAT(SHOULD_BE_SIGNED)
END

------------------

IF NOT EXISTS (
SELECT
	1
FROM
	sys.indexes
WHERE
	name = 'IDX_AA_AMENDMENT_SAT_AMENDMENT_TYPE'
	AND object_id = OBJECT_ID('PAS_IMPL.AA_AMENDMENT_SAT') ) BEGIN
	CREATE INDEX IDX_AA_AMENDMENT_SAT_AMENDMENT_TYPE ON
PAS_IMPL.AA_AMENDMENT_SAT(AMENDMENT_TYPE)
END

------------------