IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[ASSET_SAT]') AND TYPE IN (N'U'))
BEGIN
	IF EXISTS (SELECT 1 FROM sys.columns WHERE NAME = N'BOND_DENOMINATION_IN_CURRENCY' AND OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[ASSET_SAT]'))
	BEGIN
		ALTER TABLE PAS_IMPL.ASSET_SAT
		ALTER COLUMN BOND_DENOMINATION_IN_CURRENCY DECIMAL(15,4)
	END
	IF EXISTS (SELECT 1 FROM sys.columns WHERE NAME = N'UNIT_PURCHASE_PRICE' AND OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[ASSET_SAT]'))
	BEGIN
		ALTER TABLE PAS_IMPL.ASSET_SAT
		ALTER COLUMN UNIT_PURCHASE_PRICE DECIMAL(15,4)
	END
	IF EXISTS (SELECT 1 FROM sys.columns WHERE NAME = N'END_UNIT_PRICE' AND OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[ASSET_SAT]'))
	BEGIN
		ALTER TABLE PAS_IMPL.ASSET_SAT
		ALTER COLUMN END_UNIT_PRICE DECIMAL(15,4)
	END
	IF EXISTS (SELECT 1 FROM sys.columns WHERE NAME = N'ASSET_UNIT_PRICE' AND OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[ASSET_SAT]'))
	BEGIN
		ALTER TABLE PAS_IMPL.ASSET_SAT
		ALTER COLUMN ASSET_UNIT_PRICE DECIMAL(15,4)
	END
	IF EXISTS (SELECT 1 FROM sys.columns WHERE NAME = N'ASSET_SIZE' AND OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[ASSET_SAT]'))
	BEGIN
		ALTER TABLE PAS_IMPL.ASSET_SAT
		ALTER COLUMN ASSET_SIZE DECIMAL(15,4)
	END
END