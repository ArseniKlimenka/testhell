IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[EFR_PRODUCT_RISK]') AND TYPE IN (N'U'))
BEGIN

IF COL_LENGTH('PAS_IMPL.EFR_PRODUCT_RISK','VPDAUSM') IS NULL
BEGIN
ALTER TABLE PAS_IMPL.EFR_PRODUCT_RISK ADD VPDAUSM nvarchar(max)
END

END
GO

UPDATE PAS_IMPL.EFR_PRODUCT_RISK 
SET VPDAUSM = '01'
WHERE MAP_ID IN ('27', '28', '37', '38', '39', '49', '50');
