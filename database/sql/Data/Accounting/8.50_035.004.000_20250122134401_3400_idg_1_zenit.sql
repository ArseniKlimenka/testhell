-- products
delete from bfx_impl.PRODUCTS
 where CODE in ('IDG1ZENIT')
INSERT INTO [BFX_IMPL].[PRODUCTS] 
 SELECT '45B2B7ED-8508-4E6A-924A-411859153E61', N'IDG1ZENIT', N'investment', N'Драйвер Гарантия (1 год)', N'ИСЖ', N'massZENIT', NULL

DELETE FROM [BFX_IMPL].[PRODUCTS] where code ='IDG3ZENIT';
INSERT INTO [BFX_IMPL].[PRODUCTS] SELECT '5633F8F9-3D89-405E-A2CE-40BAD7C12C17', 'IDG3ZENIT', N'investment', N'Драйвер Гарантия (3 года)', N'ИСЖ', N'massZENIT', NULL