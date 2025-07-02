IF NOT EXISTS (
SELECT
	1
FROM
	sys.indexes
WHERE
name = 'IDX_COM_CALC_STATUS_EXEC_ID'
	AND object_id = OBJECT_ID('PAS_IMPL.COM_CALC_EXECUTION_STATUS') ) BEGIN
	CREATE INDEX IDX_COM_CALC_STATUS_EXEC_ID ON
PAS_IMPL.COM_CALC_EXECUTION_STATUS(EXECUTION_ID)
END
-------------------------------------------------------------------------------------------------------------------------

IF NOT EXISTS (
SELECT
	1
FROM
	sys.indexes
WHERE
name = 'IDX_COM_CALC_STATUS_EXEC_TIME'
	AND object_id = OBJECT_ID('PAS_IMPL.COM_CALC_EXECUTION_STATUS') ) BEGIN
	CREATE INDEX IDX_COM_CALC_STATUS_EXEC_TIME ON
PAS_IMPL.COM_CALC_EXECUTION_STATUS(TIME)
END
-------------------------------------------------------------------------------------------------------------------------

IF NOT EXISTS (
SELECT
	1
FROM
	sys.indexes
WHERE
name = 'IDX_COM_CALC_STATUS_TRIGGERED_BY'
	AND object_id = OBJECT_ID('PAS_IMPL.COM_CALC_EXECUTION_STATUS') ) BEGIN
	CREATE INDEX IDX_COM_CALC_STATUS_TRIGGERED_BY ON
PAS_IMPL.COM_CALC_EXECUTION_STATUS(TRIGGERED_BY)
END
-------------------------------------------------------------------------------------------------------------------------

IF NOT EXISTS (
SELECT
	1
FROM
	sys.indexes
WHERE
name = 'IDX_COM_CALC_STATUS_STATUS_ID'
	AND object_id = OBJECT_ID('PAS_IMPL.COM_CALC_EXECUTION_STATUS') ) BEGIN
	CREATE INDEX IDX_COM_CALC_STATUS_STATUS_ID ON
PAS_IMPL.COM_CALC_EXECUTION_STATUS(STATUS)
END
-------------------------------------------------------------------------------------------------------------------------

IF NOT EXISTS (
SELECT
	1
FROM
	sys.indexes
WHERE
name = 'IDX_COM_CALC_STATUS_TYPE'
	AND object_id = OBJECT_ID('PAS_IMPL.COM_CALC_EXECUTION_STATUS') ) BEGIN
	CREATE INDEX IDX_COM_CALC_STATUS_TYPE ON
PAS_IMPL.COM_CALC_EXECUTION_STATUS(TYPE)
END
-------------------------------------------------------------------------------------------------------------------------