ALTER TABLE ACC_IMPL.BANK_STATEMENT_ITEM ADD PAYMENT_SOURCE_ID INT
go

UPDATE ACC_IMPL.BANK_STATEMENT_ITEM SET PAYMENT_SOURCE_ID = 1 WHERE REGISTRY_REFERENCE_ID IS NULL
go

UPDATE ACC_IMPL.BANK_STATEMENT_ITEM SET PAYMENT_SOURCE_ID = 2 WHERE REGISTRY_REFERENCE_ID IS NOT NULL
go

ALTER TABLE ACC_IMPL.BANK_STATEMENT_ITEM ALTER COLUMN PAYMENT_SOURCE_ID INT NOT NULL
go

ALTER TABLE ACC_IMPL.BANK_STATEMENT_ITEM DROP CONSTRAINT UQ_BANK_STATEMENT_ITEM_NO
go

CREATE UNIQUE INDEX UQ_BANK_STATEMENT_ITEM_NO ON ACC_IMPL.BANK_STATEMENT_ITEM(BANK_STATEMENT_ITEM_NO) WHERE STATUS_ID <> 3
go