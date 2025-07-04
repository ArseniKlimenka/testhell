IF EXISTS (SELECT * FROM sys.objects WHERE object_id = object_id(N'BFX_IMPL.PRODUCTS') and type in (N'U'))
BEGIN
	UPDATE BFX_IMPL.PRODUCTS SET DESCRIPTION = N'Базис Актив 2.0 (3 года) Ультра' WHERE CODE = 'IBA2V3VTB'
	UPDATE BFX_IMPL.PRODUCTS SET DESCRIPTION = N'Базис Актив 2.0 (5 лет) Ультра' WHERE CODE = 'IBA2V5VTB'
	UPDATE BFX_IMPL.PRODUCTS SET DESCRIPTION = N'Драйвер гарантия (1 год)' WHERE CODE = 'IDG1LIFEINVEST'
	UPDATE BFX_IMPL.PRODUCTS SET DESCRIPTION = N'Драйвер гарантия (1 год)' WHERE CODE = 'IDG1REINVEST'
	UPDATE BFX_IMPL.PRODUCTS SET DESCRIPTION = N'Драйвер Гарантия (3 года)' WHERE CODE = 'IDG3LIFEINVEST'
	UPDATE BFX_IMPL.PRODUCTS SET DESCRIPTION = N'Драйвер Гарантия (3 года)' WHERE CODE = 'IDG3REINVEST'
	UPDATE BFX_IMPL.PRODUCTS SET DESCRIPTION = N'Драйвер Гарантия (5 лет)' WHERE CODE = 'IDG5LIFEINVEST'
	UPDATE BFX_IMPL.PRODUCTS SET DESCRIPTION = N'Драйвер Гарантия (5 лет)' WHERE CODE = 'IDG5REINVEST'
	UPDATE BFX_IMPL.PRODUCTS SET DESCRIPTION = N'Драйвер Гарантия (2 года)' WHERE CODE = 'IDGP2PB'
	UPDATE BFX_IMPL.PRODUCTS SET DESCRIPTION = N'Драйвер Гарантия (3 года)' WHERE CODE = 'IDGP3PB'
	UPDATE BFX_IMPL.PRODUCTS SET DESCRIPTION = N'Драйвер Гарантия (5 лет)' WHERE CODE = 'IDGP5PB'
END