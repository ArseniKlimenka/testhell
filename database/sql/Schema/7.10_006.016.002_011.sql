
IF EXISTS (
SELECT
	1
FROM
	sys.indexes
WHERE
	name = 'IDX_PO_SAT_DOC_CURRENCY_AMOUNT'
	AND object_id = OBJECT_ID('ACC_IMPL.PAYMENT_ORDER_SAT') ) BEGIN
	DROP INDEX IDX_PO_SAT_DOC_CURRENCY_AMOUNT ON
ACC_IMPL.PAYMENT_ORDER_SAT
END
GO

IF EXISTS (
SELECT
	1
FROM
	sys.indexes
WHERE
	name = 'IDX_PO_SAT_PO_CURRENCY_AMOUNT'
	AND object_id = OBJECT_ID('ACC_IMPL.PAYMENT_ORDER_SAT') ) BEGIN
	DROP INDEX IDX_PO_SAT_PO_CURRENCY_AMOUNT ON
ACC_IMPL.PAYMENT_ORDER_SAT
END
GO

IF EXISTS (
SELECT
	1
FROM
	sys.indexes
WHERE
	name = 'IDX_PO_SAT_TOTAL_NETTED_AMOUNT'
	AND object_id = OBJECT_ID('ACC_IMPL.PAYMENT_ORDER_SAT') ) BEGIN
	DROP INDEX IDX_PO_SAT_TOTAL_NETTED_AMOUNT ON
ACC_IMPL.PAYMENT_ORDER_SAT
END
GO

IF EXISTS (
SELECT
	1
FROM
	sys.indexes
WHERE
	name = 'IDX_PO_SAT_TAX_AMOUNT_LC'
	AND object_id = OBJECT_ID('ACC_IMPL.PAYMENT_ORDER_SAT') ) BEGIN
	DROP INDEX IDX_PO_SAT_TAX_AMOUNT_LC ON
ACC_IMPL.PAYMENT_ORDER_SAT
END
GO

IF EXISTS (
SELECT
	1
FROM
	sys.indexes
WHERE
	name = 'IDX_PO_ITEM_SAT_PO_CURRENCY_AMOUNT'
	AND object_id = OBJECT_ID('ACC_IMPL.PAYMENT_ORDER_ITEM_SAT') ) BEGIN
	DROP INDEX IDX_PO_ITEM_SAT_PO_CURRENCY_AMOUNT ON
ACC_IMPL.PAYMENT_ORDER_ITEM_SAT
END
GO

IF EXISTS (
SELECT
	1
FROM
	sys.indexes
WHERE
	name = 'IDX_PO_ITEM_SAT_PAYMENT_CURRENCY_AMOUNT'
	AND object_id = OBJECT_ID('ACC_IMPL.PAYMENT_ORDER_ITEM_SAT') ) BEGIN
	DROP INDEX IDX_PO_ITEM_SAT_PAYMENT_CURRENCY_AMOUNT ON
ACC_IMPL.PAYMENT_ORDER_ITEM_SAT
END
GO

IF COL_LENGTH('ACC_IMPL.PAYMENT_ORDER_SAT','DOC_CURRENCY_AMOUNT') IS NOT NULL
BEGIN
ALTER TABLE ACC_IMPL.PAYMENT_ORDER_SAT ALTER COLUMN DOC_CURRENCY_AMOUNT decimal(15,2)
END

IF COL_LENGTH('ACC_IMPL.PAYMENT_ORDER_SAT','PO_CURRENCY_AMOUNT') IS NOT NULL
BEGIN
ALTER TABLE ACC_IMPL.PAYMENT_ORDER_SAT ALTER COLUMN PO_CURRENCY_AMOUNT decimal(15,2)
END

IF COL_LENGTH('ACC_IMPL.PAYMENT_ORDER_SAT','NETTED_AMOUNT') IS NOT NULL
BEGIN
ALTER TABLE ACC_IMPL.PAYMENT_ORDER_SAT ALTER COLUMN NETTED_AMOUNT decimal(15,2)
END

IF COL_LENGTH('ACC_IMPL.PAYMENT_ORDER_SAT','TOTAL_NETTED_AMOUNT') IS NOT NULL
BEGIN
ALTER TABLE ACC_IMPL.PAYMENT_ORDER_SAT ALTER COLUMN TOTAL_NETTED_AMOUNT decimal(15,2)
END

IF COL_LENGTH('ACC_IMPL.PAYMENT_ORDER_SAT','TAX_AMOUNT_LC') IS NOT NULL
BEGIN
ALTER TABLE ACC_IMPL.PAYMENT_ORDER_SAT ALTER COLUMN TAX_AMOUNT_LC decimal(15,2)
END

IF COL_LENGTH('ACC_IMPL.PAYMENT_ORDER_ITEM_SAT','PO_CURRENCY_AMOUNT') IS NOT NULL
BEGIN
ALTER TABLE ACC_IMPL.PAYMENT_ORDER_ITEM_SAT ALTER COLUMN PO_CURRENCY_AMOUNT decimal(15,2)
END

IF COL_LENGTH('ACC_IMPL.PAYMENT_ORDER_ITEM_SAT','PAYMENT_CURRENCY_AMOUNT') IS NOT NULL
BEGIN
ALTER TABLE ACC_IMPL.PAYMENT_ORDER_ITEM_SAT ALTER COLUMN PAYMENT_CURRENCY_AMOUNT decimal(15,2)
END

IF COL_LENGTH('ACC_IMPL.PAYMENT_ORDER_SAT','NETTED_AMOUNT') IS NOT NULL
BEGIN
ALTER TABLE ACC_IMPL.PAYMENT_ORDER_SAT DROP COLUMN NETTED_AMOUNT
END

IF (EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES  WHERE TABLE_SCHEMA = 'ACC_IMPL' AND  TABLE_NAME = 'PAYMENT_ORDER_SAT'))	
AND COL_LENGTH('ACC_IMPL.PAYMENT_ORDER_SAT','ORIGINAL_TOTAL_AMOUNT') IS NULL
BEGIN
ALTER TABLE ACC_IMPL.PAYMENT_ORDER_SAT ADD ORIGINAL_TOTAL_AMOUNT DECIMAL(15,2)
END