IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[BFX_IMPL].[FUND_ASSETS]') AND TYPE IN (N'U'))
BEGIN

	IF COL_LENGTH('BFX_IMPL.FUND_ASSETS','ASSET_CURRENT_SHARE') IS NOT NULL
	BEGIN
	    ALTER TABLE [BFX_IMPL].[FUND_ASSETS] ALTER COLUMN ASSET_CURRENT_SHARE DECIMAL(15,4)
	END

END